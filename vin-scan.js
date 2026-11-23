/* =====================================================================
   VIN SCANNER - camera barcode scan + photo + text recognition (OCR)
   ---------------------------------------------------------------------
   - Barcode: the native BarcodeDetector API (Android Chrome, recent
     Safari) when available, otherwise ZXing (zxing.min.js, Apache-2.0,
     bundled locally). All decoding happens on the device.
   - VIN plate text: Tesseract.js (Apache-2.0), loaded from a CDN only
     the first time someone taps "Read VIN text". The image is processed
     on the device.
   - VIN extraction validates the check digit and fixes common OCR
     misreads (O->0, I->1, S->5, B->8 ...).
   Exposes window.VinScan = { open, extractVin, decodeImage }.
   ===================================================================== */
(() => {
  "use strict";

  // ---------------- VIN helpers ----------------
  const W = [8, 7, 6, 5, 4, 3, 2, 10, 0, 9, 8, 7, 6, 5, 4, 3, 2];
  const T = { A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8, J: 1, K: 2, L: 3, M: 4, N: 5, P: 7, R: 9, S: 2, T: 3, U: 4, V: 5, W: 6, X: 7, Y: 8, Z: 9 };
  const val = (c) => (/\d/.test(c) ? +c : T[c]);
  const checkOk = (v) => {
    if (!/^[A-HJ-NPR-Z0-9]{17}$/.test(v)) return false;
    let s = 0; for (let i = 0; i < 17; i++) s += val(v[i]) * W[i];
    const cd = s % 11 === 10 ? "X" : String(s % 11);
    return cd === v[8];
  };
  // I/O/Q never appear in VINs
  const FORCE = { O: "0", Q: "0", I: "1" };
  // other common OCR confusions, tried only if the check digit fails
  const ALT = { "0": ["D"], D: ["0"], "1": ["L", "T"], L: ["1"], T: ["1", "7"], "5": ["S"], S: ["5"], "8": ["B"], B: ["8"],
                "2": ["Z"], Z: ["2", "7"], "6": ["G"], G: ["6"], "7": ["T", "Z"], "4": ["A"], A: ["4"], U: ["V"], V: ["U", "Y"], Y: ["V"] };

  // Positions 13-17 of a North American VIN are always digits; position 9 is a digit or X;
  // position 10 (model year) is never U, Z or 0.
  const TO_DIGIT = { O: "0", Q: "0", D: "0", I: "1", L: "1", T: "7", S: "5", B: "8", Z: "2", G: "6", A: "4" };
  const posOk = (v) => /^[0-9X]$/.test(v[8]) && !/[UZ0]/.test(v[9]) && /^\d{5}$/.test(v.slice(12));

  function fixCandidate(raw, ocr) {
    let v = raw.split("").map((c) => FORCE[c] || c).join("");
    if (!/^[A-Z0-9]{17}$/.test(v)) return null;
    // barcodes are read exactly - only text recognition gets look-alike corrections
    if (!ocr) return checkOk(v) ? { vin: v } : { vin: v, invalid: true };
    // letters in the always-numeric serial positions are misreads
    v = v.slice(0, 12) + v.slice(12).split("").map((c) => TO_DIGIT[c] || c).join("");
    if (v[8] !== "X" && TO_DIGIT[v[8]]) v = v.slice(0, 8) + TO_DIGIT[v[8]] + v.slice(9);
    const changed = v !== raw.replace(/[IOQ]/g, (c) => FORCE[c]);
    if (checkOk(v) && posOk(v)) return { vin: v, corrected: changed };
    // a single look-alike substitution that makes the check digit valid
    const fixes = new Set();
    for (let i = 0; i < 17; i++) for (const r of ALT[v[i]] || []) {
      const t = v.slice(0, i) + r + v.slice(i + 1);
      if (checkOk(t) && posOk(t)) fixes.add(t);
    }
    if (fixes.size === 1) return { vin: [...fixes][0], corrected: true };
    return { vin: v, invalid: true };
  }

  /* Pull a VIN out of scanned/recognized text. Returns
     { vin, quality: "valid" | "corrected" | "unverified" } or null.
     opts.ocr = true allows look-alike corrections (text recognition only). */
  function extractVin(text, opts = {}) {
    if (!text) return null;
    let s = String(text).toUpperCase();
    s = s.replace(/^\s*I(?=[A-Z0-9]{17}\b)/, "");          // Code 39 import-vehicle prefix
    const tokens = s.split(/[^A-Z0-9]+/).filter(Boolean);
    const cands = [];
    for (const tk of tokens) {
      if (tk.length === 17) cands.push(tk);
      else if (tk.length === 18 && tk[0] === "I") cands.push(tk.slice(1));
      else if (tk.length > 17) for (let i = 0; i + 17 <= tk.length; i++) cands.push(tk.slice(i, i + 17));
    }
    // OCR often splits the VIN with spaces - also try the text with spaces removed
    const joined = s.replace(/[^A-Z0-9]/g, "");
    if (joined.length >= 17 && joined.length <= 60) for (let i = 0; i + 17 <= joined.length; i++) cands.push(joined.slice(i, i + 17));
    let best = null;
    for (const c of cands) {
      const f = fixCandidate(c, !!opts.ocr);
      if (!f) continue;
      if (!f.invalid) return { vin: f.vin, quality: f.corrected ? "corrected" : "valid" };
      if (!best) best = { vin: f.vin, quality: "unverified" };
    }
    return best;
  }

  // ---------------- barcode engines ----------------
  const FORMATS_NATIVE = ["code_39", "code_128", "data_matrix", "qr_code", "pdf417"];
  let nativeDet = null, zxReader = null;

  async function getNative() {
    if (nativeDet !== null) return nativeDet || null;
    nativeDet = false;
    try {
      if ("BarcodeDetector" in window) {
        const sup = await window.BarcodeDetector.getSupportedFormats();
        const f = FORMATS_NATIVE.filter((x) => sup.includes(x));
        if (f.includes("code_39") || f.includes("code_128") || f.includes("data_matrix")) nativeDet = new window.BarcodeDetector({ formats: f });
      }
    } catch { nativeDet = false; }
    return nativeDet || null;
  }

  function getZx() {
    if (zxReader) return zxReader;
    const Z = window.ZXing;
    if (!Z) return null;
    const hints = new Map();
    hints.set(Z.DecodeHintType.POSSIBLE_FORMATS, [Z.BarcodeFormat.CODE_39, Z.BarcodeFormat.CODE_128,
      Z.BarcodeFormat.DATA_MATRIX, Z.BarcodeFormat.QR_CODE, Z.BarcodeFormat.PDF_417]);
    hints.set(Z.DecodeHintType.TRY_HARDER, true);
    zxReader = new Z.MultiFormatReader();
    zxReader.setHints(hints);
    return zxReader;
  }

  function zxDecodeCanvas(canvas) {
    const Z = window.ZXing, r = getZx();
    if (!r) return null;
    try {
      const src = new Z.HTMLCanvasElementLuminanceSource(canvas);
      const res = r.decodeWithState(new Z.BinaryBitmap(new Z.HybridBinarizer(src)));
      return res && res.getText();
    } catch { return null; } finally { try { r.reset(); } catch { /* ignore */ } }
  }

  // Draw a source into a canvas: optional centered crop, rotated 90 deg and/or
  // de-skewed by `angle` degrees (a tilted 1D barcode needs a scan line that
  // crosses every bar).
  function toCanvas(src, sw, sh, { crop = null, rotate = false, angle = 0, maxW = 1280 } = {}) {
    let x = 0, y = 0, w = sw, h = sh;
    if (crop) { w = Math.round(sw * crop.w); h = Math.round(sh * crop.h); x = Math.round((sw - w) / 2); y = Math.round((sh - h) / 2); }
    const scale = Math.min(1, maxW / Math.max(w, h));
    const cw = Math.round(w * scale), ch = Math.round(h * scale);
    const c = document.createElement("canvas");
    c.width = rotate ? ch : cw; c.height = rotate ? cw : ch;
    const ctx = c.getContext("2d", { willReadFrequently: true });
    ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, c.width, c.height);
    ctx.translate(c.width / 2, c.height / 2);
    if (rotate) ctx.rotate(Math.PI / 2);
    if (angle) ctx.rotate((angle * Math.PI) / 180);
    ctx.drawImage(src, x, y, w, h, -cw / 2, -ch / 2, cw, ch);
    return c;
  }

  async function nativeDetect(src) {
    const nd = await getNative();
    if (!nd) return null;
    try {
      const codes = await nd.detect(src);
      for (const c of codes) { const v = extractVin(c.rawValue); if (v) return { ...v, raw: c.rawValue, method: "barcode" }; }
    } catch { /* fall through to ZXing */ }
    return null;
  }
  function zxTry(src, sw, sh, opts) {
    const txt = zxDecodeCanvas(toCanvas(src, sw, sh, opts));
    const v = txt && extractVin(txt);
    return v ? { ...v, raw: txt, method: "barcode" } : null;
  }

  // full search for still photos
  const SKEWS = [0, -5, 5, -10, 10, -15, 15];
  async function decodeSource(src, sw, sh, crops, skews = SKEWS) {
    const n = await nativeDetect(src);
    if (n) return n;
    for (const angle of skews) for (const crop of crops) for (const rotate of [false, true]) {
      const r = zxTry(src, sw, sh, { crop, rotate, angle });
      if (r) return r;
    }
    return null;
  }

  // decode a still image (File/Blob or HTMLImageElement)
  async function decodeImage(fileOrImg) {
    const img = fileOrImg instanceof HTMLImageElement ? fileOrImg : await loadImage(fileOrImg);
    return decodeSource(img, img.naturalWidth, img.naturalHeight, [null, { w: 0.9, h: 0.5 }, { w: 0.7, h: 0.3 }]);
  }

  // Live video: one cheap attempt per frame, cycling through crop and skew
  // variations so the phone stays responsive.
  const FRAME_PLAN = [
    { crop: { w: 0.9, h: 0.45 } }, { crop: null }, { crop: { w: 0.9, h: 0.45 }, angle: -6 }, { crop: { w: 0.9, h: 0.45 }, angle: 6 },
    { crop: { w: 0.9, h: 0.45 }, rotate: true }, { crop: { w: 0.9, h: 0.45 }, angle: -12 }, { crop: { w: 0.9, h: 0.45 }, angle: 12 }
  ];
  let frameN = 0;
  async function decodeFrame(v) {
    const n = await nativeDetect(v);
    if (n) return n;
    const plan = FRAME_PLAN[frameN++ % FRAME_PLAN.length];
    return zxTry(v, v.videoWidth, v.videoHeight, { ...plan, maxW: 1024 });
  }
  function loadImage(file) {
    return new Promise((res, rej) => {
      const url = URL.createObjectURL(file), img = new Image();
      img.onload = () => { URL.revokeObjectURL(url); res(img); };
      img.onerror = () => { URL.revokeObjectURL(url); rej(new Error("Can't read image")); };
      img.src = url;
    });
  }

  // ---------------- OCR (Tesseract, loaded on demand) ----------------
  const TESS_URL = "https://cdn.jsdelivr.net/npm/tesseract.js@5.1.1/dist/tesseract.min.js";
  let tessLoading = null, tessWorker = null;
  function loadTess() {
    if (window.Tesseract) return Promise.resolve();
    if (tessLoading) return tessLoading;
    tessLoading = new Promise((res, rej) => {
      const s = document.createElement("script");
      s.src = TESS_URL; s.async = true;
      s.onload = () => res(); s.onerror = () => { tessLoading = null; rej(new Error("Couldn't load the text reader. Check your internet connection.")); };
      document.head.appendChild(s);
    });
    return tessLoading;
  }
  async function getWorker(onProgress) {
    await loadTess();
    if (tessWorker) return tessWorker;
    tessWorker = await window.Tesseract.createWorker("eng", 1, {
      logger: (m) => { if (onProgress && m && typeof m.progress === "number") onProgress(m.status, m.progress); }
    });
    await tessWorker.setParameters({ tessedit_char_whitelist: "ABCDEFGHJKLMNPRSTUVWXYZ0123456789IOQ ", tessedit_pageseg_mode: "6" });
    return tessWorker;
  }
  // grayscale + contrast stretch improves OCR on stamped / reflective plates
  function enhance(canvas) {
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    const d = ctx.getImageData(0, 0, canvas.width, canvas.height), p = d.data;
    let mn = 255, mx = 0;
    for (let i = 0; i < p.length; i += 4) { const g = (p[i] * 0.299 + p[i + 1] * 0.587 + p[i + 2] * 0.114) | 0; p[i] = g; if (g < mn) mn = g; if (g > mx) mx = g; }
    const k = mx > mn ? 255 / (mx - mn) : 1;
    for (let i = 0; i < p.length; i += 4) { const g = Math.max(0, Math.min(255, (p[i] - mn) * k)); p[i] = p[i + 1] = p[i + 2] = g; }
    ctx.putImageData(d, 0, 0);
    return canvas;
  }
  async function ocrCanvas(canvas, onProgress) {
    const w = await getWorker(onProgress);
    const attempts = [enhance(canvas)];
    // second try: inverted (light text on dark plates)
    const inv = document.createElement("canvas"); inv.width = canvas.width; inv.height = canvas.height;
    const ictx = inv.getContext("2d"); ictx.filter = "invert(1)"; ictx.drawImage(canvas, 0, 0); attempts.push(inv);
    let lastText = "";
    for (const c of attempts) {
      const { data } = await w.recognize(c);
      lastText = data.text || "";
      const v = extractVin(lastText, { ocr: true });
      if (v && v.quality !== "unverified") return { ...v, raw: lastText, method: "text" };
      if (v && attempts.indexOf(c) === attempts.length - 1) return { ...v, raw: lastText, method: "text" };
    }
    return { vin: null, raw: lastText, method: "text" };
  }

  // ---------------- scanner UI ----------------
  let ui = null, stream = null, video = null, running = false, timer = null, onResult = null, torchOn = false, busy = false;

  function buildUI() {
    if (ui) return ui;
    const el = document.createElement("div");
    el.id = "vinScanner";
    el.className = "scan hidden";
    el.innerHTML = `
      <div class="scan-top">
        <span class="scan-title">SCAN VIN</span>
        <button class="scan-x" id="scanClose" type="button" aria-label="Close">&#10005;</button>
      </div>
      <div class="scan-view">
        <video id="scanVideo" playsinline muted autoplay></video>
        <div class="scan-guide"><div class="scan-box"><i></i></div></div>
        <div class="scan-msg" id="scanMsg">Starting camera...</div>
      </div>
      <div class="scan-tips" id="scanTips">
        <b>Door-jamb sticker:</b> fit the barcode inside the box. It scans automatically.<br>
        <b>Windshield plate (no barcode):</b> hold steady, then tap <b>READ VIN TEXT</b>.
      </div>
      <div class="scan-btns">
        <button class="btn" id="scanOcr" type="button">READ VIN TEXT</button>
        <label class="btn ghost scan-photo">PHOTO<input type="file" id="scanFile" accept="image/*" capture="environment" hidden></label>
        <button class="btn ghost hidden" id="scanTorch" type="button">LIGHT</button>
      </div>`;
    document.body.appendChild(el);
    ui = el;
    video = el.querySelector("#scanVideo");
    el.querySelector("#scanClose").onclick = close;
    el.querySelector("#scanOcr").onclick = readText;
    el.querySelector("#scanTorch").onclick = toggleTorch;
    el.querySelector("#scanFile").onchange = onPhoto;
    document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !ui.classList.contains("hidden")) close(); });
    document.addEventListener("visibilitychange", () => { if (document.hidden && running) close(); });
    return ui;
  }
  const msg = (t, cls = "") => { const m = ui.querySelector("#scanMsg"); m.textContent = t; m.className = "scan-msg " + cls; };

  async function open(cb) {
    onResult = cb;
    buildUI();
    ui.classList.remove("hidden");
    document.body.classList.add("scan-open");
    torchOn = false; busy = false;
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia || !window.isSecureContext) {
      msg("The camera isn't available here (it needs https). Use PHOTO instead.", "err");
      return;
    }
    try {
      stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: { facingMode: { ideal: "environment" }, width: { ideal: 1920 }, height: { ideal: 1080 } }
      });
    } catch (e) {
      msg(e && e.name === "NotAllowedError"
        ? "Camera permission was denied. Allow camera access for this site in your browser settings, or use PHOTO."
        : "Couldn't start the camera. Use PHOTO instead.", "err");
      return;
    }
    video.srcObject = stream;
    try { await video.play(); } catch { /* autoplay muted should work */ }
    const track = stream.getVideoTracks()[0];
    try {
      const caps = track.getCapabilities ? track.getCapabilities() : {};
      ui.querySelector("#scanTorch").classList.toggle("hidden", !caps.torch);
      if (caps.focusMode && caps.focusMode.includes("continuous")) await track.applyConstraints({ advanced: [{ focusMode: "continuous" }] });
    } catch { /* optional */ }
    msg("Point at the VIN barcode...");
    running = true;
    loop();
  }

  async function loop() {
    if (!running) return;
    if (!busy && video.readyState >= 2 && video.videoWidth) {
      busy = true;
      try {
        const r = await decodeFrame(video);
        if (r && running) { finish(r); return; }
      } catch { /* keep scanning */ }
      busy = false;
    }
    timer = setTimeout(loop, 120);
  }

  function finish(r) {
    if (navigator.vibrate) try { navigator.vibrate(80); } catch { /* ignore */ }
    msg("VIN found: " + r.vin, "ok");
    const cb = onResult;
    setTimeout(() => { close(); if (cb) cb(r); }, 350);
  }

  async function readText() {
    if (busy && running) { /* scanning frame - wait */ }
    let canvas;
    if (video && video.videoWidth) canvas = toCanvas(video, video.videoWidth, video.videoHeight, { crop: { w: 0.9, h: 0.45 }, maxW: 1600 });
    else { msg("No camera image - use PHOTO.", "err"); return; }
    await runOcr(canvas);
  }

  async function runOcr(canvas) {
    const wasRunning = running; running = false; clearTimeout(timer);
    const btn = ui.querySelector("#scanOcr"); btn.disabled = true;
    msg(window.Tesseract ? "Reading text..." : "Loading text reader (first time only, ~3 MB)...");
    try {
      const r = await ocrCanvas(canvas, (st, p) => {
        if (/recogniz/i.test(st)) msg(`Reading text... ${Math.round(p * 100)}%`);
        else if (/load|init/i.test(st)) msg(`Loading text reader... ${Math.round(p * 100)}%`);
      });
      if (r.vin) { finish(r); return; }
      msg("Couldn't find a VIN in the text. Move closer, avoid glare, and try again.", "err");
    } catch (e) {
      msg((e && e.message) || "Text reading failed.", "err");
    } finally { btn.disabled = false; }
    if (wasRunning && stream) { running = true; busy = false; loop(); }
  }

  async function onPhoto(e) {
    const f = e.target.files && e.target.files[0];
    e.target.value = "";
    if (!f) return;
    const wasRunning = running; running = false; clearTimeout(timer);
    msg("Checking photo for a barcode...");
    try {
      const img = await loadImage(f);
      const r = await decodeImage(img);
      if (r) { finish(r); return; }
      // no barcode -> OCR the middle of the photo
      await runOcr(toCanvas(img, img.naturalWidth, img.naturalHeight, { crop: { w: 0.95, h: 0.6 }, maxW: 1800 }));
      return;
    } catch (err) {
      msg((err && err.message) || "Couldn't read that photo.", "err");
    }
    if (wasRunning && stream) { running = true; busy = false; loop(); }
  }

  async function toggleTorch() {
    const track = stream && stream.getVideoTracks()[0];
    if (!track) return;
    torchOn = !torchOn;
    try { await track.applyConstraints({ advanced: [{ torch: torchOn }] }); } catch { torchOn = false; }
    ui.querySelector("#scanTorch").classList.toggle("on", torchOn);
  }

  function close() {
    running = false; busy = false; clearTimeout(timer);
    if (stream) { stream.getTracks().forEach((t) => t.stop()); stream = null; }
    if (video) video.srcObject = null;
    if (ui) ui.classList.add("hidden");
    document.body.classList.remove("scan-open");
  }

  window.VinScan = { open, close, extractVin, decodeImage, checkOk };
})();
