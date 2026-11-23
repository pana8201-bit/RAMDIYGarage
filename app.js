/* RAM DIY Garage - Ram / Dodge Ram (1994-present) reference - application logic */
(() => {
  "use strict";

  const $ = (s) => document.querySelector(s);
  const $$ = (s) => Array.from(document.querySelectorAll(s));
  const LS = "ramgarage.v1";          // separate from the Ford app so both can live on one phone
  const MAX_YEAR = new Date().getFullYear() + 1;

  // ---------------- state ----------------
  const defaults = {
    truck: null,              // {model, year, engine, trans, drive}
    name: "", vin: "",
    odo: null,
    settings: { warn: 500 },
    schedMode: "normal",       // "normal" | "severe"
    intervals: {},             // per-item custom intervals { oil: {mi, mo}, ... }
    log: [],
    expenses: [],
    lastNotified: null
  };
  let S = load();
  let sel = { model: DEFAULT_MODEL, year: null, engine: null, trans: null, drive: "4x2" };

  function load() {
    const base = JSON.parse(JSON.stringify(defaults));
    try {
      const d = JSON.parse(localStorage.getItem(LS)) || {};
      const s = Object.assign(base, d, { settings: Object.assign(base.settings, d.settings || {}) });
      if (s.truck && !s.truck.model) s.truck.model = DEFAULT_MODEL;
      if (!Array.isArray(s.expenses)) s.expenses = [];
      if (!s.intervals || typeof s.intervals !== "object") s.intervals = {};
      // migrate the old single oil-interval setting to a custom oil interval
      if (s.settings.mi || s.settings.mo) {
        if (!s.intervals.oil) s.intervals.oil = { mi: +s.settings.mi || null, mo: +s.settings.mo || null, migrated: true };
        delete s.settings.mi; delete s.settings.mo;
      }
      return s;
    } catch { return base; }
  }
  function save() { localStorage.setItem(LS, JSON.stringify(S)); }

  // ---------------- helpers ----------------
  const inRange = (y, r) => y >= r[0] && y <= r[1];
  const genFor = (y, m = sel.model) => GENERATIONS.find((g) => g.models.includes(m) && inRange(y, g.years));
  const engById = (id) => ENGINES.find((e) => e.id === id);
  const trById = (id) => TRANSMISSIONS.find((t) => t.id === id);
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const fmtMi = (n) => (n == null || isNaN(n) ? "---" : Number(n).toLocaleString("en-US"));
  const fmtDate = (d) => new Date(d + (d.length === 10 ? "T12:00:00" : "")).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
  const addMonths = (iso, m) => { const d = new Date(iso + "T12:00:00"); d.setMonth(d.getMonth() + Number(m)); return d; };
  const todayISO = () => { const d = new Date(); d.setMinutes(d.getMinutes() - d.getTimezoneOffset()); return d.toISOString().slice(0, 10); };

  function toast(msg) {
    const t = $("#toast"); t.textContent = msg; t.classList.add("show");
    clearTimeout(toast._t); toast._t = setTimeout(() => t.classList.remove("show"), 2200);
  }

  function enginesFor(y, m = sel.model) { return ENGINES.filter((e) => e.models.includes(m) && inRange(y, e.years)); }
  const money = (n) => "$" + Number(n || 0).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const newId = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
  // short value for summary tiles
  const short = (v) => (/confirm/i.test(v || "") ? "See VIN" : String(v || "-").replace("Mopar ", "").split(" (")[0]);
  const truckLabel = (t) => `${t.year} ${t.model || DEFAULT_MODEL}`;
  const CONFIRM_TXT = "Confirm in Owner's Manual";
  function transFor(y, eng) {
    return eng.trans
      .map(trById)
      .filter((t) => t && inRange(y, (eng.transYears && eng.transYears[t.id]) || t.years));
  }

  // ---------------- selector ----------------
  function yearsFor(m) {
    const out = [];
    for (let y = MAX_YEAR; y >= MIN_YEAR; y--) if (genFor(y, m) && enginesFor(y, m).length) out.push(y);
    return out;
  }
  function fillYears() {
    const s = $("#selYear"); s.innerHTML = "";
    const ys = yearsFor(sel.model);
    ys.forEach((y) => s.add(new Option(y, y)));
    if (!ys.includes(sel.year)) sel.year = ys.reduce((a, b) => (Math.abs(b - sel.year) < Math.abs(a - sel.year) ? b : a), ys[0]);
    s.value = sel.year;
  }
  const catOf = (m) => (CATALOG.find((x) => x.id === m) || CATALOG[0]).cat;
  function fillCats() {
    $("#segCat").innerHTML = CATEGORIES.map((c) => `<button data-v="${c}">${c}</button>`).join("");
    $$("#segCat button").forEach((b) => (b.onclick = () => {
      const first = CATALOG.find((x) => x.cat === b.dataset.v);
      setModel(first.id); refreshAll();
    }));
  }
  function setModel(m) {
    if (!CATALOG.some((x) => x.id === m)) m = DEFAULT_MODEL;
    sel.model = m;
    const cat = catOf(m);
    $$("#segCat button").forEach((b) => b.classList.toggle("on", b.dataset.v === cat));
    const s = $("#selModel"); s.innerHTML = "";
    CATALOG.filter((x) => x.cat === cat).forEach((x) => s.add(new Option(x.id, x.id)));
    s.value = m;
  }
  // drive types valid for this model + engine + year
  function drivesFor() {
    const base = (CATALOG.find((x) => x.id === sel.model) || {}).drives || ["4x2", "4x4"];
    const e = engById(sel.engine);
    let d = base;
    if (e && e.drives) d = d.filter((x) => e.drives.includes(x));
    if (e && e.drivesFor) d = d.filter((x) => e.drivesFor(sel.year).includes(x));
    return d.length ? d : base;
  }
  function fillDrives() {
    const ds = drivesFor();
    $("#segDrive").innerHTML = ds.map((d) => `<button data-v="${d}">${d}</button>`).join("");
    $$("#segDrive button").forEach((b) => (b.onclick = () => { setDrive(b.dataset.v); renderSpecs(); }));
    setDrive(ds.includes(sel.drive) ? sel.drive : ds[ds.length - 1]);
  }
  function refreshAll() { fillYears(); fillEngines(); fillTrans(); fillDrives(); renderSpecs(); }
  function fillEngines() {
    const s = $("#selEngine"); s.innerHTML = "";
    enginesFor(sel.year).forEach((e) => s.add(new Option(e.name, e.id)));
    if (!enginesFor(sel.year).some((e) => e.id === sel.engine)) sel.engine = s.options[0]?.value;
    s.value = sel.engine;
  }
  function fillTrans() {
    const s = $("#selTrans"); s.innerHTML = "";
    const list = transFor(sel.year, engById(sel.engine));
    list.forEach((t) => s.add(new Option(t.name, t.id)));
    if (!list.some((t) => t.id === sel.trans)) sel.trans = (list.find((t) => t.type !== "Manual") || list[0])?.id;   // default to the automatic
    s.value = sel.trans;
  }
  function setDrive(v) {
    sel.drive = v;
    $$("#segDrive button").forEach((b) => b.classList.toggle("on", b.dataset.v === v));
  }

  function bindSelector() {
    $("#selYear").onchange = (e) => { sel.year = +e.target.value; fillEngines(); fillTrans(); fillDrives(); renderSpecs(); };
    $("#selEngine").onchange = (e) => { sel.engine = e.target.value; fillTrans(); fillDrives(); renderSpecs(); };
    $("#selTrans").onchange = (e) => { sel.trans = e.target.value; renderSpecs(); };
    $("#selModel").onchange = (e) => { setModel(e.target.value); refreshAll(); };
    $("#btnSaveTruck").onclick = () => {
      const prev = S.truck;
      S.truck = { ...sel };
      // a different vehicle -> its own schedule; drop custom intervals
      const changed = prev && (prev.model !== sel.model || prev.engine !== sel.engine || prev.year !== sel.year);
      const hadCustom = Object.keys(S.intervals || {}).length > 0;
      if (changed && hadCustom) S.intervals = {};
      save(); renderAll();
      toast(`Saved ${truckLabel(sel)} as your vehicle${changed && hadCustom ? " - custom intervals reset to " + BRAND + "'s" : ""}`);
    };
  }

  // ---------------- VIN decoder ----------------
  // Offline checks (format, check digit, model year, Dodge / Ram WMI) + NHTSA vPIC decode
  // (free public API, no key). The decoded data is matched to the app's
  // model / year / engine / transmission / drive lists.
  const VIN_W = [8, 7, 6, 5, 4, 3, 2, 10, 0, 9, 8, 7, 6, 5, 4, 3, 2];
  const VIN_T = { A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8, J: 1, K: 2, L: 3, M: 4, N: 5, P: 7, R: 9, S: 2, T: 3, U: 4, V: 5, W: 6, X: 7, Y: 8, Z: 9 };
  const YEAR_CODES = "ABCDEFGHJKLMNPRSTVWXY123456789";
  let lastVin = null;

  function vinLocal(raw) {
    const vin = String(raw || "").toUpperCase().replace(/[^A-Z0-9]/g, "");
    const r = { vin, ok: false, errors: [], warnings: [] };
    if (vin.length !== 17) { r.errors.push(`A VIN has 17 characters - you entered ${vin.length}.`); return r; }
    if (/[IOQ]/.test(vin)) { r.errors.push("VINs never use the letters I, O or Q. Check for the numbers 1 and 0."); return r; }
    let sum = 0;
    for (let i = 0; i < 17; i++) sum += (/\d/.test(vin[i]) ? +vin[i] : VIN_T[vin[i]]) * VIN_W[i];
    const cd = sum % 11 === 10 ? "X" : String(sum % 11);
    r.checkOk = cd === vin[8];
    if (!r.checkOk) r.warnings.push(`The check digit (9th character) doesn't match - it should be "${cd}". This usually means a typo, so double-check the VIN.`);
    const yi = YEAR_CODES.indexOf(vin[9]);
    if (yi >= 0) r.year = (/\d/.test(vin[6]) ? 1980 : 2010) + yi;
    r.wmi = vin.slice(0, 3);
    // Dodge / Ram trucks and vans: 1B7, 3B7, 1D7, 3D7, 1C6, 3C6, 3C7, 2C7 ... ProMaster City: ZFB
    r.isRam = /^[123][BCD][3-7]/.test(vin) || /^ZFB/.test(vin);
    if (!r.isRam) r.warnings.push(`This doesn't look like a Dodge / Ram truck or van VIN (it starts with ${r.wmi}).`);
    r.ok = true;
    return r;
  }

  async function vinNhtsa(vin) {
    const ctl = new AbortController(), to = setTimeout(() => ctl.abort(), 12000);
    try {
      const res = await fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVinValues/${vin}?format=json`, { signal: ctl.signal });
      if (!res.ok) throw new Error("HTTP " + res.status);
      const j = await res.json();
      return (j.Results && j.Results[0]) || null;
    } finally { clearTimeout(to); }
  }

  // NHTSA returns Make DODGE (to 2010) or RAM (2011+). The truck size is in
  // Model ("1500", "2500", "ProMaster") or, on older trucks, in Series with Model "Ram".
  function vinModel(n, vin) {
    if (!/dodge|ram/i.test(String(n.Make || ""))) return null;
    const m = `${n.Model || ""} ${n.Series || ""} ${n.Series2 || ""}`.trim();
    const year = parseInt(n.ModelYear, 10) || 0;
    const incomplete = /incomplete|chassis cab/i.test(`${n.BodyClass || ""} ${n.VehicleType || ""}`);
    if (/promaster city/i.test(m)) return "ProMaster City";
    if (/promaster/i.test(m)) return "ProMaster";
    if (/[45]500/.test(m)) return "Ram Chassis Cab";
    if (/classic/i.test(m)) return "Ram 1500 Classic";
    if (/1500/.test(m)) {
      // 2019-2024: the old DS body was sold as the "1500 Classic". Its VINs use R in
      // position 4 (1C6RR...), the new DT uses S (1C6SR...).
      if (year >= 2019 && year <= 2024 && vin && vin[3] === "R") return "Ram 1500 Classic";
      return "Ram 1500";
    }
    if (/3500/.test(m)) return incomplete && year >= 2008 ? "Ram Chassis Cab" : "Ram 3500";
    if (/2500/.test(m)) return "Ram 2500";
    return null;
  }

  function vinDrive(n, model) {
    const opts = (CATALOG.find((x) => x.id === model) || {}).drives || [];
    const d = String(n.DriveType || "").toLowerCase();
    const pick = (...c) => c.find((x) => opts.includes(x)) || null;
    if (/4wd|4x4|4-wheel/.test(d)) return pick("4x4", "AWD");
    if (/awd|all-wheel/.test(d)) return pick("AWD", "4x4");
    if (/fwd|front-wheel/.test(d)) return pick("FWD", "4x2");
    if (/4x2|rwd|rear-wheel|2wd/.test(d)) return pick("4x2", "RWD", "FWD");
    return null;
  }

  function vinEngineScore(e, n) {
    let s = 0;
    const disp = parseFloat(n.DisplacementL);
    const el = String(n.ElectrificationLevel || "").toLowerCase();
    const fuel1 = String(n.FuelTypePrimary || "").toLowerCase(), fuel2 = String(n.FuelTypeSecondary || "").toLowerCase();
    const info = `${n.EngineModel || ""} ${n.OtherEngineInfo || ""} ${n.Trim || ""} ${n.Series || ""}`.toLowerCase();
    const trim = String(n.Trim || "").toLowerCase();
    const nEV = /electric/.test(fuel1) || /bev/.test(el);
    const nHyb = !nEV && (/hev|hybrid/.test(el) || /electric/.test(fuel2) || /hybrid/.test(info));
    const nDsl = /diesel/.test(fuel1 + fuel2);
    const nTurbo = /yes/i.test(n.Turbo || "") || /turbo/.test(info);
    const nNA = !nTurbo && /hemi|vvt|pentastar|magnum/.test(info);
    const label = e.name + " " + e.family;
    const eDisp = parseFloat((e.name.match(/(\d+\.\d)\s*L/) || [])[1]);
    const eTurbo = !e.isDiesel && /turbo|supercharged/i.test(label);
    const eHyb = /hybrid/i.test(label);
    const eHO = /\bHO\b|high output|\bRHO\b/i.test(e.name);

    if (disp > 0 && !isNaN(eDisp)) s += Math.abs(disp - eDisp) < 0.06 ? 6 : -12;
    if (nEV !== !!e.isEV) s -= 15; else if (nEV) s += 6;
    if (nDsl !== !!e.isDiesel) s -= 10; else if (nDsl) s += 3;
    if (nHyb) s += eHyb ? 5 : -5; else if (eHyb) s -= 3;
    if (!e.isDiesel && !e.isEV) { if (nTurbo) s += eTurbo ? 3 : -4; else if (nNA) s += eTurbo ? -3 : 2; }
    if (/high output|\bho\b|\brho\b/.test(info)) s += eHO ? 4 : -2; else if (eHO) s -= 1;
    const valves = (info.match(/\b(12|24)[ -]?v(alve)?\b/) || [])[1];
    if (valves) s += new RegExp(valves + "-valve", "i").test(e.name) ? 3 : /(12|24)-valve/i.test(e.name) ? -3 : 0;
    if (/supercharg|trx|srt/.test(info + trim)) s += /supercharged|srt-10/i.test(e.name) ? 4 : -2; else if (/supercharged|srt-10/i.test(e.name)) s -= 3;
    if (/etorque|mild hybrid|48v/.test(info)) s += /etorque/i.test(e.name) ? 2 : 0;
    const paren = (e.name.match(/\(([^)]+)\)/) || [])[1];
    if (trim && paren && paren.toLowerCase().split(/[\s\/,]+/).some((w) => w.length > 1 && !/^\d+$|^hp$/.test(w) && new RegExp("\\b" + w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "\\b").test(trim))) s += 2;
    const hp = parseFloat(n.EngineHP), ehp = parseFloat((e.name.match(/(\d{3})\s*hp/i) || [])[1]);
    if (hp && ehp) s += Math.abs(hp - ehp) <= 20 ? 2 : -1;
    return s;
  }

  function vinTrans(list, n) {
    const st = String(n.TransmissionStyle || "").toLowerCase(), sp = String(n.TransmissionSpeeds || "").trim();
    let c = list;
    if (/manual/.test(st)) c = c.filter((t) => t.type === "Manual");
    else if (/auto|cvt|dual/.test(st)) c = c.filter((t) => t.type !== "Manual");
    else { const a = c.filter((t) => t.type !== "Manual"); if (a.length) c = a; }   // not reported: assume automatic
    if (sp) { const m = c.filter((t) => new RegExp("\\b" + sp + "-Speed", "i").test(t.name)); if (m.length) c = m; }
    if (!c.length) c = list;
    return { trans: c[0], ambiguous: c.length > 1 && new Set(c.map((t) => t.type === "Manual")).size > 1 };
  }

  // Match decoded data to the app's lists
  function vinMatch(local, n) {
    const out = { notes: [], warnings: [] };
    const year = parseInt(n && n.ModelYear, 10) || local.year;
    out.year = year;
    let model = n ? vinModel(n, local.vin) : null;
    // Older Dodge Ram VINs often come back as Model "Ram" with no size. On
    // 1994-2010 Dodge truck VINs (1B7 / 3B7 / 1D7 / 3D7) the 6th character is the
    // series: 1 = 1500, 2 = 2500, 3 = 3500.
    if (!model && n && /^[13][BD]7/.test(local.vin) && year <= 2010) {
      const sd = local.vin[5];
      model = sd === "1" ? "Ram 1500" : sd === "2" ? "Ram 2500" : sd === "3" ? "Ram 3500" : null;
      if (model) out.notes.push(`NHTSA didn't return the truck size. ${model} was worked out from the VIN's series code - check it.`);
    }
    if (!model) {
      out.unsupported = n && n.Model ? `${n.Model}` : null;
      return out;
    }
    out.model = model;
    if (!yearsFor(model).includes(year)) { out.yearOutOfRange = true; return out; }
    const cands = enginesFor(year, model);
    const ranked = cands.map((e) => ({ e, s: vinEngineScore(e, n) })).sort((a, b) => b.s - a.s);
    const best = ranked[0], second = ranked[1];
    const engineData = parseFloat(n.DisplacementL) > 0 || /electric/i.test(n.FuelTypePrimary || "");
    out.engine = best.e.id;
    out.conf = !engineData || best.s < 0 ? "low" : !second || best.s - second.s >= 3 ? "high" : "check";
    if (out.conf === "check") out.notes.push(`${best.e.isEV ? "Battery" : "Engine"}: NHTSA's data fits more than one option (${ranked.filter((r) => best.s - r.s < 3).map((r) => r.e.name).join(" / ")}). Check the ${best.e.isEV ? "battery" : "engine"} selection.`);
    if (out.conf === "low") out.notes.push("NHTSA didn't report enough engine detail. Pick your engine from the list (it's on the emissions label under the hood).");
    const tl = transFor(year, best.e);
    const tr = vinTrans(tl, n);
    out.trans = tr.trans && tr.trans.id;
    if (tr.ambiguous || (tl.length > 1 && !n.TransmissionStyle)) out.notes.push("Transmission: NHTSA didn't say which one. Check the transmission selection.");
    out.drive = vinDrive(n, model);
    if (!out.drive) out.notes.push("Drive type wasn't reported. Check the driveline buttons.");
    return out;
  }

  function vinEngineText(n) {
    if (/electric/i.test(n.FuelTypePrimary || "")) return "Battery electric" + (n.EngineHP ? ` · ${Math.round(n.EngineHP)} hp` : "");
    const cfg = /v-shaped/i.test(n.EngineConfiguration || "") ? "V" : /in-line/i.test(n.EngineConfiguration || "") ? "I" : "";
    const bits = [];
    if (parseFloat(n.DisplacementL) > 0) bits.push(`${parseFloat(n.DisplacementL).toFixed(1)}L ${cfg}${n.EngineCylinders || ""}`.trim());
    if (/yes/i.test(n.Turbo || "") || /gtdi/i.test(n.EngineModel || "")) bits.push("Turbo");
    if (n.EngineModel && !/^(ram|dodge|chrysler)$/i.test(n.EngineModel)) bits.push(n.EngineModel);
    const sc = (String(n.OtherEngineInfo || "").match(/sales code:?\s*(\w+)/i) || [])[1];
    if (sc) bits.push("Sales code " + sc);
    const fuel = [n.FuelTypePrimary, n.FuelTypeSecondary].filter(Boolean).join(" / ");
    if (fuel) bits.push(fuel);
    if (/hev|hybrid/i.test(n.ElectrificationLevel || "")) bits.push("Hybrid");
    if (parseFloat(n.EngineHP)) bits.push(`${Math.round(n.EngineHP)} hp`);
    return bits.join(" · ") || "Not reported";
  }

  function applyMatch(m) {
    setModel(m.model);
    sel.year = m.year; fillYears();
    sel.engine = m.engine; fillEngines();
    sel.trans = m.trans; fillTrans();
    if (m.drive) sel.drive = m.drive;
    fillDrives(); renderSpecs();
  }

  function renderVin(state) {
    const box = $("#vinOut");
    if (!state) { box.innerHTML = ""; return; }
    if (state.loading) { box.innerHTML = `<div class="vinbox"><div class="vinbody hint">Decoding ${esc(state.vin)} with NHTSA…</div></div>`; return; }
    const { local, n, m, offline } = state;
    const warn = [...local.errors, ...local.warnings, ...(m ? m.warnings : [])];
    if (n && n.ErrorCode && !/^0$|^1$|^1,|^0,/.test(String(n.ErrorCode)) && n.ErrorText) warn.push("NHTSA: " + String(n.ErrorText).split(";")[0]);
    let match = "";
    if (m && m.model && !m.yearOutOfRange && m.engine) {
      const e = engById(m.engine), t = trById(m.trans);
      const chip = m.conf === "high" ? `<span class="chip ok">MATCHED</span>` : m.conf === "check" ? `<span class="chip warn">CHECK ENGINE</span>` : `<span class="chip warn">PARTIAL MATCH</span>`;
      match = `<div class="vinmatch">${chip}<div class="sub">Applied: ${m.year} ${esc(m.model)} · ${esc(e ? e.name : "-")} · ${esc(t ? t.name : "-")}${m.drive ? " · " + esc(m.drive) : ""}</div>
        ${m.notes.map((x) => `<div class="sub sev">${esc(x)}</div>`).join("")}</div>`;
    } else if (m && m.yearOutOfRange) {
      const ys = yearsFor(m.model);
      match = `<div class="vinmatch"><span class="chip bad">NOT COVERED</span><div class="sub sev">This is a ${m.year} ${esc(m.model)}. The app covers the ${esc(m.model)} for ${Math.min(...ys)}-${Math.max(...ys) >= MAX_YEAR ? "present" : Math.max(...ys)} only.</div></div>`;
    } else if (n) {
      match = `<div class="vinmatch"><span class="chip bad">NOT COVERED</span><div class="sub sev">${m && m.unsupported ? esc(m.unsupported) + " isn't" : "This vehicle isn't"} in the app yet. Covered: ${esc(MODELS.join(", "))}.</div></div>`;
    } else if (offline && local.ok) {
      match = `<div class="vinmatch"><span class="chip warn">OFFLINE</span><div class="sub sev">Couldn't reach NHTSA (no connection?). From the VIN itself: model year ${local.year || "?"}${local.isRam ? ", Dodge / Ram" : ""}. Pick the rest from the lists below, or try again when you're online.</div></div>`;
    }
    const rows = n ? `<table class="spec">
        ${row("Vehicle", `${n.ModelYear || local.year || ""} ${String(n.Make || "").replace(/\b\w+/g, (w) => w[0] + w.slice(1).toLowerCase())} ${n.Model || ""}`.trim())}
        ${n.Trim || n.Series ? row("Trim / series", [n.Trim, n.Series].filter(Boolean).join(" · ")) : ""}
        ${row("Engine (NHTSA)", vinEngineText(n))}
        ${row("Drive", n.DriveType || "Not reported")}
        ${row("Transmission", n.TransmissionStyle ? `${n.TransmissionStyle}${n.TransmissionSpeeds ? " " + n.TransmissionSpeeds + "-speed" : ""}` : "Not reported")}
        ${n.BodyClass ? row("Body", [n.BodyClass, n.BodyCabType].filter(Boolean).join(" · ")) : ""}
        ${n.GVWR ? row("GVWR", n.GVWR) : ""}
        ${n.PlantCity ? row("Built", [n.PlantCity, n.PlantState || n.PlantCountry].filter(Boolean).join(", ")) : ""}
      </table>` : "";
    const canSave = m && m.model && !m.yearOutOfRange && m.engine;
    box.innerHTML = `<div class="vinbox">
      <div class="vinhead">VIN ${esc(local.vin)}${local.ok ? (local.checkOk ? ' <span class="chip ok">CHECK DIGIT OK</span>' : ' <span class="chip bad">CHECK DIGIT</span>') : ""}</div>
      <div class="vinbody">
        ${local.scanNote ? `<div class="vinscan">📷 ${esc(local.scanNote)}</div>` : ""}
        ${warn.map((w) => `<div class="vinwarn">⚠ ${esc(w)}</div>`).join("")}
        ${match}${rows}
        <div class="row-btns">
          ${canSave ? `<button class="btn" id="btnVinSave" type="button">★ SAVE AS MINE</button>` : `<span></span>`}
          <button class="btn ghost" id="btnVinClear" type="button">CLEAR</button>
        </div>
        <p class="hint">The VIN is sent only to NHTSA's free public decoder (vpic.nhtsa.dot.gov). Results come from NHTSA's database and can be incomplete, so double-check your selections.</p>
      </div></div>`;
    $("#btnVinClear").onclick = () => { lastVin = null; $("#vinInput").value = ""; renderVin(null); };
    if (canSave) $("#btnVinSave").onclick = () => {
      S.vin = local.vin;
      S.vinInfo = n ? { trim: n.Trim || "", series: n.Series || "", body: [n.BodyClass, n.BodyCabType].filter(Boolean).join(" · "),
        gvwr: n.GVWR || "", plant: [n.PlantCity, n.PlantState || n.PlantCountry].filter(Boolean).join(", "), decoded: todayISO() } : null;
      $("#btnSaveTruck").click();
    };
  }

  async function decodeVin(scanNote) {
    const local = vinLocal($("#vinInput").value);
    if (typeof scanNote === "string" && scanNote) local.scanNote = scanNote;
    $("#vinInput").value = local.vin;
    if (!local.ok) { renderVin({ local, n: null, m: null }); return; }
    renderVin({ loading: true, vin: local.vin });
    let n = null, offline = false;
    try { n = await vinNhtsa(local.vin); } catch { offline = true; }
    const m = n ? vinMatch(local, n) : null;
    lastVin = { local, n, m, offline };
    if (m && m.model && !m.yearOutOfRange && m.engine) applyMatch(m);
    else if (offline && local.year && yearsFor(sel.model).includes(local.year)) { sel.year = local.year; fillYears(); fillEngines(); fillTrans(); fillDrives(); renderSpecs(); }
    renderVin(lastVin);
  }

  function bindVin() {
    const inp = $("#vinInput");
    inp.addEventListener("input", () => {
      const p = inp.selectionStart; inp.value = inp.value.toUpperCase().replace(/[^A-Z0-9]/g, ""); try { inp.setSelectionRange(p, p); } catch { /* ignore */ }
    });
    inp.addEventListener("keydown", (e) => { if (e.key === "Enter") { e.preventDefault(); decodeVin(); } });
    $("#btnVin").onclick = () => decodeVin();
    $("#btnScan").onclick = () => {
      if (!window.VinScan) return toast("Scanner not available");
      window.VinScan.open((r) => {
        $("#vinInput").value = r.vin;
        const how = r.method === "barcode" ? "Scanned from barcode" : "Read from VIN text";
        const note = r.quality === "corrected" ? `${how} - one character was auto-corrected using the check digit. Compare it with your vehicle.`
          : r.quality === "unverified" ? `${how} - the check digit doesn't match, so some characters may be misread. Compare it with your vehicle and fix any typos.`
          : r.method === "text" ? `${how} - compare it with your vehicle before saving.` : how + ".";
        decodeVin(note);
      });
    };
  }

  // ---------------- spec sheet ----------------
  function row(label, value, { big = false, flag = false, copy = false } = {}) {
    const c = copy && value && !/^N\/A|confirm|Not equipped|In-tank/i.test(value)
      ? `<button class="copy" data-copy="${esc(value.split(" (")[0])}" title="Copy">⧉</button>` : "";
    return `<tr><th>${esc(label)}</th><td class="${big ? "big" : ""}${big && String(value).length > 28 ? " long" : ""}">${esc(value)}${flag ? '<span class="vtag">VERIFY</span>' : ""}${c}</td></tr>`;
  }

  function renderSpecs() {
    const g = genFor(sel.year), e = engById(sel.engine), t = trById(sel.trans);
    if (!g || !e || !t) { $("#specOut").innerHTML = ""; return; }
    const ev = (k) => (e.verify || []).includes(k);
    const tv = (k) => (t.verify || []).includes(k);
    const gv = (k) => (g.verify || []).includes(k);
    const ctx = { year: sel.year, gen: g, eng: e, trans: t, drive: sel.drive };
    const comps = driveComps(ctx);

    $("#genLine").textContent =
      `${sel.model} · ${g.code} · ${g.platform} · MY ${g.years[0]}-${g.years[1] > 2090 ? "present" : g.years[1]} · ${e.family}`;

    const hero = e.isEV ? `
      <div class="hero">
        <div class="kpi"><div class="k">LUG NUT TORQUE</div><div class="v">${esc(g.lugTorque.split(" (")[0])}</div></div>
        <div class="kpi"><div class="k">WASHER FLUID</div><div class="v">${esc(g.washer)}</div></div>
        <div class="kpi"><div class="k">DRIVE</div><div class="v">${esc(sel.drive)}</div></div>
        <div class="kpi"><div class="k">TIRE ROTATION</div><div class="v">${(() => { const r = scheduleFor({ ...ctx, model: sel.model }).find((x) => x.id === "rot"); return r ? fmtIv(effInterval(r, ctx, 1)) : "-"; })()}</div></div>
      </div>` : `
      <div class="hero">
        <div class="kpi"><div class="k">OIL CAPACITY</div><div class="v">${esc(short(e.oilCap))}</div></div>
        <div class="kpi"><div class="k">OIL GRADE</div><div class="v">${esc(short(e.oilVisc).replace("SAE ", ""))}</div></div>
        <div class="kpi"><div class="k">OIL FILTER</div><div class="v">${esc(short(e.filter))}</div></div>
        <div class="kpi"><div class="k">LUG TORQUE</div><div class="v">${esc(short(g.lugTorque))}</div></div>
      </div>`;

    const engineCard = e.isEV ? "" : `
      <div class="card">
        <div class="card-h"><span class="sec">SEC 02</span> ENGINE LUBRICATION</div>
        <table class="spec">
          ${row("Oil capacity (w/ filter)", e.oilCap, { big: true, flag: ev("oilCap") })}
          ${row("Oil viscosity", e.oilVisc, { flag: ev("oilVisc") })}
          ${row("Oil specification", e.oilSpec)}
          ${row("Oil filter", e.filter, { big: true, flag: ev("filter"), copy: true })}
          ${row("Oil pan drain plug torque", e.drainTorque, { flag: ev("drainTorque") })}
        </table>
      </div>`;

    const transCard = `
      <div class="card">
        <div class="card-h"><span class="sec">SEC 03</span> TRANSMISSION · ${esc(t.type.toUpperCase())}</div>
        <table class="spec">
          ${row("Unit", t.name)}
          ${row("Fluid type", t.fluid, { big: true })}
          ${row("Fluid capacity", t.capacity, { flag: tv("capacity") })}
          ${row("Drain plug torque", t.drain, { flag: tv("drain") })}
          ${row("Pan / level check", t.pan, { flag: tv("pan") })}
        </table>
      </div>`;

    // engine-level overrides take precedence over generation values
    const pick = (k) => (e[k] !== undefined ? e[k] : g[k]);
    const pv = (k) => (e[k] !== undefined ? ev(k) : gv(k));

    const fuelCard = `
      <div class="card">
        <div class="card-h"><span class="sec">SEC 04</span> FUEL · IGNITION</div>
        <table class="spec">
          ${row("Fuel type", e.fuel, { big: true, flag: ev("fuel") })}
          ${row(e.isEV ? "Energy storage" : "Fuel tank capacity", pick("fuelTank"), { flag: pv("fuelTank") })}
          ${e.isEV || e.isDiesel ? "" : row("Spark plug", e.plug, { big: true, flag: ev("plug"), copy: true })}
          ${e.isEV || e.isDiesel ? "" : row("Spark plug gap", e.gap, { flag: ev("gap") })}
          ${e.isDiesel ? row("Ignition", "Compression ignition - " + String(e.plug || "").replace(/^N\/A - diesel\s*/i, "").replace(/^\(|\)$/g, "") || "diesel") : ""}
          ${e.plugMi ? row("Plug replacement", `Every ${fmtMi(e.plugMi)} mi`, { flag: ev("plugMi") }) : ""}
        </table>
      </div>`;

    const filterCard = `
      <div class="card">
        <div class="card-h"><span class="sec">SEC 05</span> FILTERS</div>
        <table class="spec">
          ${e.isEV ? "" : row("Oil filter", e.filter, { flag: ev("filter"), copy: true })}
          ${row("Engine air filter", pick("airFilter"), { big: true, flag: pv("airFilter"), copy: true })}
          ${row("Cabin air filter", g.cabinFilter, { flag: gv("cabinFilter"), copy: true })}
          ${e.isEV ? "" : row("Fuel filter", pick("fuelFilter"), { flag: pv("fuelFilter"), copy: true })}
        </table>
      </div>`;

    const has = (c) => comps.includes(c);
    const drvRows = [
      has("rear") ? row("Rear differential fluid", g.rearAxle, { big: true, flag: gv("rearAxle") }) : "",
      has("rear") ? row("Rear differential capacity", g.rearAxleCap, { flag: gv("rearAxleCap") }) : "",
      has("front") ? row("Front differential fluid", g.frontDiff, { big: true, flag: gv("frontDiff") }) : "",
      has("front") ? row("Front differential capacity", g.frontDiffCap, { flag: gv("frontDiffCap") }) : "",
      has("tcase") ? row("Transfer case", g.transferCase, { flag: gv("transferCase") }) : "",
      has("ptu") ? row("Power transfer unit (PTU)", g.ptu || CONFIRM_TXT, { big: true }) : "",
      has("ptu") ? row("PTU capacity", g.ptuCap || CONFIRM_TXT) : "",
      has("rdu") ? row("Rear drive unit (RDU)", g.rdu || CONFIRM_TXT, { big: true }) : "",
      has("rdu") ? row("RDU capacity", g.rduCap || CONFIRM_TXT) : ""
    ].join("");
    const diffCard = e.isEV ? "" : !comps.length ? `
      <div class="card">
        <div class="card-h"><span class="sec">SEC 06</span> DRIVELINE</div>
        <p class="hint" style="margin-bottom:12px">FWD: the differential is inside the transaxle and shares its fluid. See Transmission above.</p>
      </div>` : `
      <div class="card">
        <div class="card-h"><span class="sec">SEC 06</span> DRIVELINE · DIFFERENTIALS</div>
        <table class="spec">
          ${drvRows}
          ${row("Fill level", "To the bottom edge of the fill-plug hole, vehicle level (unless the manual says otherwise)")}
        </table>
        ${sel.drive === "4x2" && (CATALOG.find((x) => x.id === sel.model) || {}).drives.includes("4x4")
          ? '<p class="hint" style="margin-bottom:12px">Select 4x4 to see front differential and transfer case specs.</p>' : ""}
      </div>`;

    const chassisCard = `
      <div class="card">
        <div class="card-h"><span class="sec">SEC 07</span> WHEELS · CHASSIS · FLUIDS</div>
        <table class="spec">
          ${row("Lug nut torque", g.lugTorque, { big: true })}
          ${row("Bolt pattern", g.lugPattern)}
          ${row("Stud thread", g.lugThread)}
          ${row("Washer fluid reservoir", g.washer, { flag: gv("washer") })}
          ${e.isEV ? "" : row("Engine coolant", g.coolant)}
          ${row("Brake fluid", g.brakeFluid)}
        </table>
      </div>`;

    const w = wipersFor(g, sel.year);
    const wConf = w ? ({ high: "Sources agree", medium: "One good source / minor conflict", low: "Sources disagree - measure your blades" })[w.conf] : "";
    const wiperCard = `
      <div class="card">
        <div class="card-h"><span class="sec">SEC 07B</span> WIPER BLADES</div>
        ${w ? `<table class="spec">
          ${row("Driver side", inch(w.d), { big: true, flag: w.conf === "low" })}
          ${row("Passenger side", inch(w.p), { big: true, flag: w.conf === "low" })}
          ${row("Rear", w.r ? inch(w.r) : "None", { flag: !!w.r && /confirm/i.test(String(w.r)) })}
          ${row("Arm connector", w.conn, { flag: /disagree|differ/i.test(w.conn) })}
          ${row("Blade styles that fit", wiperStyles(w))}
          ${row("Data confidence", wConf)}
        </table>
        ${w.note || w.alt ? `<p class="hint" style="margin-bottom:12px">${esc([w.note, w.alt].filter(Boolean).join(" "))}</p>` : ""}
        <p class="hint" style="margin-bottom:12px">Sizes come from blade-maker guides (Rain-X / Bosch / Trico) and retailer fitment lists, and haven't been checked for every year. If in doubt, measure the old blade tip to tip.</p>`
          : `<p class="hint" style="margin-bottom:12px">Wiper size not available for this vehicle yet - measure the old blade tip to tip.</p>`}
      </div>`;
    const schedCard = renderSchedule(ctx);
    const prelim = g.preliminary ? `
      <div class="prelim">⚠ <b>PRELIMINARY DATA.</b> Specs for the ${esc(sel.model)} were added recently and are incomplete.
        Many values say "confirm" - always check your Owner's Manual or do a Mopar parts lookup by VIN.</div>` : "";

    const notes = [...(e.notes || []), ...(g.notes || [])];
    const notesCard = notes.length ? `
      <div class="card">
        <div class="card-h"><span class="sec">SEC 09</span> ENGINEERING NOTES</div>
        <ul class="notes">${notes.map((n) => `<li>${esc(n)}</li>`).join("")}</ul>
      </div>` : "";

    setTimeout(() => $$("#segSched button").forEach((b) => (b.onclick = () => {
      S.schedMode = b.dataset.v; S.lastNotified = null; save(); renderAll();
    })), 0);
    $("#specOut").innerHTML = `${prelim}
      <div class="card">
        <div class="card-h"><span class="sec">SUMMARY</span> ${sel.year} ${sel.model} · ${esc(e.name)} · ${sel.drive.toUpperCase()}</div>
        ${hero}
      </div>
      ${engineCard}${transCard}${fuelCard}${filterCard}${diffCard}${chassisCard}${wiperCard}${schedCard}${notesCard}`;

    $$("#specOut .copy").forEach((b) => (b.onclick = () => {
      navigator.clipboard?.writeText(b.dataset.copy).then(() => toast(`Copied ${b.dataset.copy}`));
    }));
  }

  // ---------------- DIY maintenance schedule ----------------
  const normType = (t) => SERVICE_ALIASES[t] || t;
  const resolve = (v, c) => (typeof v === "function" ? v(c) : v);

  function isMyTruck(c) {
    return S.truck && (S.truck.model || DEFAULT_MODEL) === sel.model && S.truck.year === c.year && S.truck.engine === c.eng.id && S.truck.trans === c.trans.id && S.truck.drive === c.drive;
  }

  // Interval in effect for one item: the user's custom value, or the
  // maker's normal / severe value. `logCount` picks "first" vs "then every".
  function effInterval(item, c, logCount) {
    const f = item.ford, cust = (S.intervals || {})[item.id];
    const sevMode = S.schedMode === "severe" && f.s;
    const base = sevMode ? f.s : (f.first && !logCount ? f.first : f.n);
    if (cust && (cust.mi || cust.mo)) {
      return { mi: cust.mi || null, mo: cust.mo || null, src: "custom", ford: base, sev: !!sevMode };
    }
    return { mi: base.mi, mo: base.mo, src: sevMode ? "severe" : f.first && !logCount ? "first" : "normal", ford: base, sev: !!sevMode };
  }
  const fmtIv = (iv) => [iv.mi ? `${fmtMi(iv.mi)} mi` : null, iv.mo ? `${iv.mo % 12 === 0 && iv.mo >= 12 ? iv.mo / 12 + " yr" : iv.mo + " mo"}` : null].filter(Boolean).join(" / ") || "Inspect";

  function myCtx() {
    if (!S.truck) return null;
    const g = genFor(S.truck.year, S.truck.model || DEFAULT_MODEL), e = engById(S.truck.engine), t = trById(S.truck.trans);
    if (!g || !e || !t) return null;
    return { year: S.truck.year, gen: g, eng: e, trans: t, drive: S.truck.drive, model: S.truck.model || DEFAULT_MODEL };
  }

  function scheduleStatus(item, c, mineOverride) {
    const logs = S.log.filter((l) => normType(l.type) === item.type).sort((a, b) => b.date.localeCompare(a.date) || b.miles - a.miles);
    const ivl = effInterval(item, c, logs.length);
    const mi = ivl.mi, mo = ivl.mo;
    if (!(mineOverride ?? isMyTruck(c))) return { mi, mo, ivl };
    const last = logs[0];
    if (!last) return { mi, mo, ivl, never: true };
    const warnMi = Math.max(+S.settings.warn || 0, mi ? mi * 0.1 : 0);
    const odo = S.odo != null ? Math.max(S.odo, last.miles) : last.miles;
    const miLeft = mi ? last.miles + mi - odo : null;
    const dueDate = mo ? addMonths(last.date, mo) : null;
    const dLeft = dueDate ? Math.ceil((dueDate - new Date()) / 864e5) : null;
    const over = (miLeft != null && miLeft <= 0) || (dLeft != null && dLeft <= 0);
    const soon = !over && ((miLeft != null && miLeft <= warnMi) || (dLeft != null && dLeft <= 30));
    return { mi, mo, ivl, last, miLeft, dueDate, dLeft, lvl: over ? "bad" : soon ? "warn" : "ok", dueMi: mi ? last.miles + mi : null };
  }

  function renderSchedule(c) {
    const mine = isMyTruck(c);
    const items = scheduleFor({ ...c, model: sel.model });
    const sevOn = S.schedMode === "severe";
    const rows = items.map((s) => {
      const st = scheduleStatus(s, c);
      const f = s.ford, ivl = st.ivl;
      const part = s.part ? resolve(s.part, c) : "";
      const tag = ivl.src === "custom" ? `<span class="itag cust">YOUR INTERVAL</span>` : ivl.sev ? `<span class="itag sev">SEVERE</span>` : "";
      const fordLine = ivl.src === "custom"
        ? `${BRAND}: ${fmtIv(f.n)}${f.s ? " · severe " + fmtIv(f.s) : ""}`
        : f.first ? `${BRAND}: first at ${fmtIv(f.first)}, then every ${fmtIv(f.n)}` : f.s && !ivl.sev ? `Severe: ${fmtIv(f.s)}` : ivl.sev ? `Normal: ${fmtIv(f.n)}` : "";
      let status = "";
      if (mine) {
        if (st.never) status = `<span class="chip">NOT LOGGED</span>`;
        else {
          const bits = [];
          if (st.dueMi) bits.push(st.miLeft <= 0 ? `${fmtMi(-st.miLeft)} mi over` : `${fmtMi(st.miLeft)} mi left`);
          if (st.dueDate) bits.push(st.dLeft <= 0 ? "date passed" : `${st.dLeft} d left`);
          status = `<span class="chip ${st.lvl}">${st.lvl === "bad" ? "OVERDUE" : st.lvl === "warn" ? "DUE SOON" : "OK"}</span>
                    <div class="sub">Last ${fmtMi(st.last.miles)} mi · ${fmtDate(st.last.date)} · ${bits.join(" · ")}</div>`;
        }
      }
      return `<li>
        <div class="sx-h"><b>${esc(s.type)}</b><span class="every">${fmtIv(ivl)}</span></div>
        <div class="srcline">${tag}<span class="conf ${f.conf}">${CONF_LABEL[f.conf]}</span> <span class="srcname">${esc(SCHED_SOURCES[f.src] || "")}</span></div>
        ${fordLine ? `<div class="sub">${esc(fordLine)}</div>` : ""}
        ${part ? `<div class="sub">${esc(part)}</div>` : ""}
        ${f.note ? `<div class="sub sev">${esc(f.note)}</div>` : ""}
        ${(f.sNote && (sevOn || f.s)) ? `<div class="sub sev">Severe: ${esc(f.sNote)}</div>` : ""}
        ${status}
      </li>`;
    }).join("");
    return `
      <div class="card">
        <div class="card-h"><span class="sec">SEC 08</span> MAINTENANCE SCHEDULE</div>
        <div class="seg schedseg" id="segSched">
          <button data-v="normal" class="${sevOn ? "" : "on"}">NORMAL</button><button data-v="severe" class="${sevOn ? "on" : ""}">SEVERE DUTY</button>
        </div>
        <p class="hint">${sevOn ? esc(SEVERE_DEF) + " Items without a severe interval use the normal one." : "Normal-duty schedule."}
          Whichever comes first, miles or months. ${mine ? "Status comes from your Service Log. Change any interval in <b>MY RIDE → Maintenance intervals</b>." : "Tap <b>★ SAVE AS MINE</b> to track these against your Service Log and set your own intervals."}</p>
        <ul class="sched">${rows}</ul>
        <p class="hint" style="margin-bottom:12px"><b>Labels:</b> UNVERIFIED = a typical Ram / Chrysler interval that hasn't been checked against your Owner's Manual yet ·
          NOT A RAM ITEM = Ram doesn't schedule it; typical practice. <b>Always check your own Owner's Manual</b> - on 2009+ trucks, follow the Oil Change Indicator.</p>
      </div>`;
  }

  // ---------------- service tracker ----------------
  function primaryItem() {
    const c = myCtx();
    if (!c) return null;
    const items = scheduleFor(c);
    return items.find((x) => x.id === (c.eng.isEV ? "rot" : "oil")) || null;
  }
  function primaryService() { const p = primaryItem(); return p ? p.type : "Oil & Filter Change"; }

  function computeDue() {
    if (!S.truck) return null;
    const pi = primaryItem();
    const type = primaryService();
    const last = S.log.filter((l) => normType(l.type) === type).sort((a, b) => b.miles - a.miles || b.date.localeCompare(a.date))[0];
    if (!last) return { type, none: true };
    const ivl = pi ? effInterval(pi, myCtx(), 1) : { mi: 5000, mo: 6 };
    const mi = +ivl.mi || 0, mo = +ivl.mo || 0, warn = +S.settings.warn || 0;
    const dueMiles = mi ? last.miles + mi : Infinity;
    const dueDate = mo ? addMonths(last.date, mo) : new Date(8.64e15);
    const odo = S.odo != null ? Math.max(S.odo, last.miles) : last.miles;
    const milesLeft = dueMiles - odo;
    const daysLeft = Math.ceil((dueDate - new Date()) / 864e5);
    const totalDays = Math.max(1, Math.round((dueDate - new Date(last.date + "T12:00:00")) / 864e5));
    const lvl = (left, w) => (left <= 0 ? "bad" : left <= w ? "warn" : "ok");
    return {
      type, last, dueMiles, dueDate, milesLeft, daysLeft, ivl, hasMi: !!mi, hasMo: !!mo,
      miPct: mi ? Math.min(100, Math.max(0, ((odo - last.miles) / mi) * 100)) : 0,
      dPct: mo ? Math.min(100, Math.max(0, ((totalDays - daysLeft) / totalDays) * 100)) : 0,
      miLvl: mi ? lvl(milesLeft, warn) : "ok", dLvl: mo ? lvl(daysLeft, 14) : "ok"
    };
  }

  // Other maintenance items that are overdue or due soon (Service tab)
  function renderUpcoming() {
    const box = $("#upcoming");
    const c = myCtx();
    if (!c) { box.innerHTML = `<div class="empty">Save your vehicle to see its maintenance status.</div>`; return []; }
    const prim = primaryService();
    const rows = scheduleFor(c).filter((s) => s.type !== prim).map((s) => ({ s, st: scheduleStatus(s, c, true) }));
    const due = rows.filter((r) => r.st.lvl === "bad" || r.st.lvl === "warn")
      .sort((a, b) => (a.st.lvl === b.st.lvl ? 0 : a.st.lvl === "bad" ? -1 : 1));
    const never = rows.filter((r) => r.st.never).length;
    box.innerHTML = (due.length ? `<ul class="sched">${due.map(({ s, st }) => {
      const bits = [];
      if (st.dueMi) bits.push(st.miLeft <= 0 ? `${fmtMi(-st.miLeft)} mi over` : `${fmtMi(st.miLeft)} mi left`);
      if (st.dueDate) bits.push(st.dLeft <= 0 ? "date passed" : `${st.dLeft} days left`);
      return `<li><div class="sx-h"><b>${esc(s.type)}</b><span class="chip ${st.lvl}">${st.lvl === "bad" ? "OVERDUE" : "DUE SOON"}</span></div>
        <div class="sub">Every ${fmtIv(st.ivl)} · last ${fmtMi(st.last.miles)} mi · ${bits.join(" · ")}</div></li>`;
    }).join("")}</ul>` : `<div class="empty">Nothing else is overdue or due soon.</div>`) +
      (never ? `<p class="hint" style="margin-bottom:12px">${never} item${never > 1 ? "s haven't" : " hasn't"} been logged yet, so ${never > 1 ? "they aren't" : "it isn't"} tracked. Log the last time you did ${never > 1 ? "them" : "it"} to start tracking.</p>` : "");
    return due;
  }

  function renderDue() {
    const d = computeDue(), box = $("#nextDue"), ban = $("#dueBanner");
    ban.className = "banner hidden";
    if (!S.truck) { box.innerHTML = `<div class="empty" style="grid-column:1/-1">Select your vehicle on the SPECS tab and tap <b>★ SAVE AS MINE</b>.</div>`; renderUpcoming(); return; }
    if (d.none) { box.innerHTML = `<div class="empty" style="grid-column:1/-1">No ${esc(d.type)} logged yet. Record your last one below to start reminders.</div>`; renderUpcoming(); return; }

    box.innerHTML = `
      ${d.hasMi ? `<div class="gauge ${d.miLvl}">
        <div class="k">MILES REMAINING</div>
        <div class="v">${d.milesLeft <= 0 ? "OVERDUE" : fmtMi(d.milesLeft)}</div>
        <div class="s">due @ ${fmtMi(d.dueMiles)} mi</div>
        <div class="bar"><i style="width:${d.miPct}%"></i></div>
      </div>` : ""}
      ${d.hasMo ? `<div class="gauge ${d.dLvl}">
        <div class="k">DAYS REMAINING</div>
        <div class="v">${d.daysLeft <= 0 ? "OVERDUE" : d.daysLeft}</div>
        <div class="s">due ${d.dueDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</div>
        <div class="bar"><i style="width:${d.dPct}%"></i></div>
      </div>` : ""}
      <div class="s" style="grid-column:1/-1;font-size:11px;color:var(--muted);text-align:center">
        ${esc(d.type)} · every ${fmtIv(d.ivl)} (${d.ivl.src === "custom" ? "your interval" : d.ivl.sev ? "severe duty" : "normal duty"}) · last @ ${fmtMi(d.last.miles)} mi on ${fmtDate(d.last.date)}
      </div>`;

    const others = renderUpcoming();
    const worst = [d.miLvl, d.dLvl].includes("bad") ? "bad" : [d.miLvl, d.dLvl].includes("warn") ? "warn" : null;
    if (worst) {
      ban.className = `banner ${worst}`;
      ban.innerHTML = worst === "bad"
        ? `🛢 ${esc(d.type).toUpperCase()} OVERDUE - service your vehicle now.`
        : `🛢 ${esc(d.type)} due soon - ${d.hasMi && d.milesLeft > 0 ? fmtMi(d.milesLeft) + " mi" : ""}${d.hasMi && d.hasMo && d.milesLeft > 0 && d.daysLeft > 0 ? " / " : ""}${d.hasMo && d.daysLeft > 0 ? d.daysLeft + " days" : ""} left.`;
      maybeNotify(d, worst);
    } else if (others.some((o) => o.st.lvl === "bad")) {
      const n = others.filter((o) => o.st.lvl === "bad").length;
      ban.className = "banner bad";
      ban.innerHTML = `🔧 ${n} maintenance item${n > 1 ? "s" : ""} overdue - see the SERVICE tab.`;
    }
  }

  function renderHistory() {
    const h = $("#history");
    if (!S.log.length) { h.innerHTML = `<div class="empty">No services recorded.</div>`; return; }
    const list = [...S.log].sort((a, b) => b.date.localeCompare(a.date) || b.miles - a.miles);
    h.innerHTML = `<ul class="hist">${list.map((l) => `
      <li>
        <div class="ty">${esc(l.type)}</div><div class="mi">${fmtMi(l.miles)} mi</div>
        <div class="dt">${fmtDate(l.date)}${l.cost ? " · $" + Number(l.cost).toFixed(2) : ""}</div>
        <button class="del" data-id="${l.id}">DELETE</button>
        ${l.notes ? `<div class="nt">${esc(l.notes)}</div>` : ""}
      </li>`).join("")}</ul>`;
    $$("#history .del").forEach((b) => (b.onclick = () => {
      if (!confirm("Delete this service record?")) return;
      S.log = S.log.filter((l) => l.id !== b.dataset.id); save(); renderAll();
    }));
  }

  function bindLog() {
    const t = $("#logType"); SERVICE_TYPES.forEach((s) => t.add(new Option(s, s)));
    $("#logDate").value = todayISO();

    $("#logForm").onsubmit = (ev) => {
      ev.preventDefault();
      const miles = +$("#logMiles").value;
      if (!miles || miles < 0) return toast("Enter a valid mileage");
      S.log.push({
        id: newId(),
        type: t.value, date: $("#logDate").value, miles,
        cost: $("#logCost").value ? +$("#logCost").value : null,
        notes: $("#logNotes").value.trim()
      });
      if (S.odo == null || miles > S.odo) S.odo = miles;
      S.lastNotified = null;
      save(); $("#logForm").reset(); $("#logDate").value = todayISO();
      renderAll(); toast("Service recorded");
    };

    $("#btnOdo").onclick = () => {
      const v = +$("#odoInput").value;
      if (!v) return toast("Enter odometer reading");
      S.odo = v; save(); $("#odoInput").value = ""; renderAll(); toast("Odometer updated");
    };

    $("#btnExport").onclick = () => {
      const blob = new Blob([JSON.stringify(S, null, 2)], { type: "application/json" });
      download(blob, `truck-backup-${todayISO()}.json`);
    };
    $("#fileImport").onchange = async (e) => {
      const f = e.target.files[0]; if (!f) return;
      try {
        const d = JSON.parse(await f.text());
        if (!Array.isArray(d.log)) throw 0;
        if (!confirm(`Import ${d.log.length} service records and ${(d.expenses || []).length} expenses? This replaces current data.`)) return;
        localStorage.setItem(LS, JSON.stringify(d)); S = load(); init(); toast("Data imported");
      } catch { toast("Invalid backup file"); }
      e.target.value = "";
    };

    $("#btnNotify").onclick = async () => {
      if (!("Notification" in window)) return toast("Notifications not supported - use Add to Calendar");
      const p = await Notification.requestPermission();
      toast(p === "granted" ? "Reminders enabled" : "Permission denied");
      if (p === "granted") { S.lastNotified = null; save(); renderDue(); }
    };
    $("#btnIcs").onclick = makeIcs;
  }

  function download(blob, name) {
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = name;
    document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  }

  async function maybeNotify(d, lvl) {
    if (!("Notification" in window) || Notification.permission !== "granted") return;
    const key = `${d.last.id}:${lvl}:${todayISO()}`;
    if (S.lastNotified === key) return;
    S.lastNotified = key; save();
    const body = lvl === "bad" ? `${d.type} is overdue (due at ${fmtMi(d.dueMiles)} mi).`
      : `${d.type} due in ${fmtMi(Math.max(0, d.milesLeft))} mi or ${Math.max(0, d.daysLeft)} days.`;
    try {
      const reg = await navigator.serviceWorker?.getRegistration();
      const title = `${S.truck.model || DEFAULT_MODEL} Service Reminder`;
      if (reg) reg.showNotification(title, { body, icon: "icon.svg", tag: "truck-due" });
      else new Notification(title, { body, icon: "icon.svg" });
    } catch { /* ignore */ }
  }

  // Calendar file with alarms - the most reliable "automatic" reminder on iOS/Android
  function makeIcs() {
    const d = computeDue();
    if (!d || d.none) return toast("Log an oil change first");
    const ymd = (dt) => dt.toISOString().slice(0, 10).replace(/-/g, "");
    const stamp = new Date().toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
    const nm = S.name ? ` (${S.name})` : "";
    const md = S.truck.model || DEFAULT_MODEL;
    const ics = [
      "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//RAM DIY Garage//EN", "CALSCALE:GREGORIAN",
      "BEGIN:VEVENT",
      `UID:truck-${d.last.id}@ramdiygarage`, `DTSTAMP:${stamp}`,
      `DTSTART;VALUE=DATE:${ymd(d.dueDate)}`,
      `DTEND;VALUE=DATE:${ymd(new Date(d.dueDate.getTime() + 864e5))}`,
      `SUMMARY:${md} ${d.type} due${nm}`,
      `DESCRIPTION:${d.type} due by ${fmtMi(d.dueMiles)} mi or this date (whichever first).\\nLast service: ${fmtMi(d.last.miles)} mi on ${d.last.date}.`,
      "BEGIN:VALARM", "TRIGGER:-P7D", "ACTION:DISPLAY", `DESCRIPTION:${md} service due in 1 week`, "END:VALARM",
      "BEGIN:VALARM", "TRIGGER:PT9H", "ACTION:DISPLAY", `DESCRIPTION:${md} service due today`, "END:VALARM",
      "END:VEVENT", "END:VCALENDAR"
    ].join("\r\n");
    download(new Blob([ics], { type: "text/calendar" }), "truck-service-due.ics");
    toast("Open the file to add to your calendar");
  }

  // ---------------- expenses ----------------
  const EXP_CATS = ["Modification", "Maintenance", "Repair", "Parts", "Tools", "Tires & Wheels",
    "Accessories", "Detailing", "Insurance", "Registration / Fees", "Fuel", "Other"];
  const CAT_COLORS = ["#1700F4", "#2D96CD", "#c41e1e", "#0a7d38", "#c77700", "#6b3fa0",
    "#00838f", "#ad1457", "#5d4037", "#455a64", "#7cb342", "#8a96ad"];

  // all money spent: manual expenses + costs entered on service log records
  function allExpenses() {
    const svc = S.log.filter((l) => l.cost > 0).map((l) => ({
      id: "svc-" + l.id, date: l.date, amount: +l.cost, category: "Maintenance",
      desc: normType(l.type), vendor: "", miles: l.miles, notes: l.notes || "", fromLog: true
    }));
    return [...S.expenses, ...svc].sort((a, b) => b.date.localeCompare(a.date));
  }

  function expPeriodFilter(list) {
    const p = $("#expPeriod").value, now = new Date();
    if (p === "all") return list;
    if (p === "ytd") return list.filter((x) => x.date.slice(0, 4) === String(now.getFullYear()));
    const days = +p;
    const cut = new Date(now.getTime() - days * 864e5).toISOString().slice(0, 10);
    return list.filter((x) => x.date >= cut);
  }

  function renderExpenses() {
    const cat = $("#expFilterCat").value;
    const all = allExpenses();
    let list = expPeriodFilter(all);
    const periodTotal = list.reduce((s, x) => s + x.amount, 0);
    const byCat = {};
    list.forEach((x) => (byCat[x.category] = (byCat[x.category] || 0) + x.amount));
    if (cat !== "all") list = list.filter((x) => x.category === cat);

    // cost per mile (lifetime): needs a span of mileage readings
    const miles = all.map((x) => x.miles).filter((m) => m > 0);
    if (S.odo) miles.push(S.odo);
    const span = miles.length > 1 ? Math.max(...miles) - Math.min(...miles) : 0;
    const lifetime = all.reduce((s, x) => s + x.amount, 0);
    const mods = all.filter((x) => x.category === "Modification").reduce((s, x) => s + x.amount, 0);
    const maint = all.filter((x) => ["Maintenance", "Repair"].includes(x.category)).reduce((s, x) => s + x.amount, 0);

    $("#expKpis").innerHTML = `
      <div class="kpi"><div class="k">PERIOD TOTAL</div><div class="v">${money(periodTotal)}</div></div>
      <div class="kpi"><div class="k">LIFETIME</div><div class="v">${money(lifetime)}</div></div>
      <div class="kpi"><div class="k">MODS (ALL TIME)</div><div class="v">${money(mods)}</div></div>
      <div class="kpi"><div class="k">MAINT + REPAIR</div><div class="v">${money(maint)}</div></div>
      <div class="kpi wide"><div class="k">COST PER MILE (LIFETIME)</div><div class="v">${span > 0 ? "$" + (lifetime / span).toFixed(3) + " / mi" : "—"}</div>
        <div class="kk">${span > 0 ? `over ${fmtMi(span)} logged miles` : "Add mileage to entries to calculate"}</div></div>`;

    const cats = Object.entries(byCat).sort((a, b) => b[1] - a[1]);
    const max = cats.length ? cats[0][1] : 1;
    $("#expBreakdown").innerHTML = cats.length ? `<ul class="bars">${cats.map(([c, v]) => {
      const col = CAT_COLORS[EXP_CATS.indexOf(c)] || "#8a96ad";
      return `<li><span class="bl">${esc(c)}</span><span class="bt"><i style="width:${(v / max) * 100}%;background:${col}"></i></span>
        <span class="bv">${money(v)}</span><span class="bp">${periodTotal ? Math.round((v / periodTotal) * 100) : 0}%</span></li>`;
    }).join("")}</ul>` : `<div class="empty">No expenses in this period.</div>`;

    $("#expList").innerHTML = list.length ? `<ul class="hist">${list.map((x) => `
      <li>
        <div class="ty">${esc(x.desc || x.category)}</div><div class="mi">${money(x.amount)}</div>
        <div class="dt"><span class="cat" style="background:${CAT_COLORS[EXP_CATS.indexOf(x.category)] || "#8a96ad"}">${esc(x.category)}</span>
          ${fmtDate(x.date)}${x.miles ? " · " + fmtMi(x.miles) + " mi" : ""}${x.vendor ? " · " + esc(x.vendor) : ""}</div>
        ${x.fromLog ? `<span class="src">SERVICE LOG</span>` : `<button class="del" data-id="${x.id}">DELETE</button>`}
        ${x.notes ? `<div class="nt">${esc(x.notes)}</div>` : ""}
      </li>`).join("")}</ul>` : `<div class="empty">No expenses recorded.</div>`;

    $$("#expList .del").forEach((b) => (b.onclick = () => {
      if (!confirm("Delete this expense?")) return;
      S.expenses = S.expenses.filter((x) => x.id !== b.dataset.id); save(); renderExpenses();
    }));
  }

  function bindExpenses() {
    const c = $("#expCat"), f = $("#expFilterCat");
    EXP_CATS.forEach((x) => { c.add(new Option(x, x)); f.add(new Option(x, x)); });
    $("#expDate").value = todayISO();
    $("#expPeriod").onchange = renderExpenses;
    f.onchange = renderExpenses;

    $("#expForm").onsubmit = (ev) => {
      ev.preventDefault();
      const amount = +$("#expAmt").value;
      if (!(amount > 0)) return toast("Enter an amount");
      const miles = +$("#expMiles").value || null;
      S.expenses.push({
        id: newId(), date: $("#expDate").value, amount, category: c.value,
        desc: $("#expDesc").value.trim(), vendor: $("#expVendor").value.trim(),
        miles, notes: $("#expNotes").value.trim()
      });
      if (miles && (S.odo == null || miles > S.odo)) S.odo = miles;
      save(); $("#expForm").reset(); $("#expDate").value = todayISO();
      renderExpenses(); renderTruck(); toast("Expense recorded");
    };

    $("#btnExpCsv").onclick = () => {
      const q = (v) => `"${String(v ?? "").replace(/"/g, '""')}"`;
      const rows = [["Date", "Category", "Description", "Vendor", "Amount", "Mileage", "Notes", "Source"]]
        .concat(allExpenses().map((x) => [x.date, x.category, x.desc, x.vendor, x.amount.toFixed(2), x.miles || "", x.notes, x.fromLog ? "Service Log" : "Expense"]));
      download(new Blob([rows.map((r) => r.map(q).join(",")).join("\r\n")], { type: "text/csv" }), `truck-expenses-${todayISO()}.csv`);
    };
  }

  // ---------------- my truck / settings ----------------
  function renderTruck() {
    const m = $("#myTruck");
    if (!S.truck) { m.innerHTML = `<div class="empty">No vehicle saved yet.</div>`; }
    else {
      const e = engById(S.truck.engine), t = trById(S.truck.trans);
      m.innerHTML = `<table class="spec">
        ${row("Vehicle", truckLabel(S.truck), { big: true })}
        ${row("Engine", e?.name || "-")}
        ${row("Transmission", t?.name || "-")}
        ${row("Driveline", S.truck.drive.toUpperCase())}
        ${S.vin ? row("VIN", S.vin) : ""}
        ${S.vinInfo && S.vinInfo.trim ? row("Trim / series", [S.vinInfo.trim, S.vinInfo.series].filter(Boolean).join(" · ")) : ""}
        ${S.vinInfo && S.vinInfo.body ? row("Body", S.vinInfo.body) : ""}
        ${S.vinInfo && S.vinInfo.gvwr ? row("GVWR", S.vinInfo.gvwr) : ""}
        ${S.vinInfo && S.vinInfo.plant ? row("Built", S.vinInfo.plant) : ""}
        ${row("Odometer", S.odo != null ? fmtMi(S.odo) + " mi" : "---")}
      </table>`;
    }
    $("#setName").value = S.name || "";
    $("#setVin").value = S.vin || "";
    $("#setWarn").value = S.settings.warn ?? 500;
    $("#odoChip").textContent = S.odo != null ? `${fmtMi(S.odo)} mi` : "--- mi";
    renderIntervals();
  }

  // Editable per-item intervals (MY RIDE tab)
  function renderIntervals() {
    const box = $("#ivList");
    $$("#segMode button").forEach((b) => b.classList.toggle("on", b.dataset.v === (S.schedMode || "normal")));
    const c = myCtx();
    if (!c) { box.innerHTML = `<div class="empty">Save your vehicle on the SPECS tab first.</div>`; return; }
    const items = scheduleFor(c);
    box.innerHTML = `<ul class="ivl">${items.map((s) => {
      const logs = S.log.filter((l) => normType(l.type) === s.type).length;
      const ivl = effInterval(s, c, logs), f = s.ford, cust = (S.intervals || {})[s.id];
      const fordTxt = f.first && !logs && !ivl.sev ? `first ${fmtIv(f.first)}, then ${fmtIv(f.n)}` : fmtIv(ivl.ford);
      return `<li data-id="${s.id}">
        <div class="sx-h"><b>${esc(s.type)}</b>${cust ? `<span class="itag cust">YOUR INTERVAL</span>` : `<span class="conf ${f.conf}">${CONF_LABEL[f.conf]}</span>`}</div>
        <div class="sub">${BRAND} ${ivl.sev ? "severe" : "normal"}: ${esc(fordTxt)}</div>
        <div class="ivrow">
          <label>MILES<input type="number" inputmode="numeric" min="0" step="500" class="ivmi" value="${cust ? cust.mi || "" : ""}" placeholder="${ivl.ford.mi ? ivl.ford.mi : "-"}"></label>
          <label>MONTHS<input type="number" inputmode="numeric" min="0" class="ivmo" value="${cust ? cust.mo || "" : ""}" placeholder="${ivl.ford.mo ? ivl.ford.mo : "-"}"></label>
          <button class="btn ghost ivreset" type="button" ${cust ? "" : "disabled"}>DEFAULT</button>
        </div>
      </li>`;
    }).join("")}</ul>`;
    $$("#ivList li").forEach((li) => {
      const id = li.dataset.id;
      const commit = () => {
        const mi = Math.max(0, Math.round(+li.querySelector(".ivmi").value || 0));
        const mo = Math.max(0, Math.round(+li.querySelector(".ivmo").value || 0));
        if (mi || mo) S.intervals[id] = { mi: mi || null, mo: mo || null };
        else delete S.intervals[id];
        S.lastNotified = null; save(); renderDue(); renderSpecs(); renderIntervals();
        const f = scheduleFor(c).find((x) => x.id === id);
        const fordMi = f && (S.schedMode === "severe" && f.ford.s ? f.ford.s.mi : f.ford.n.mi);
        toast(mi && fordMi && mi > fordMi * 1.5 ? `Saved - note that's longer than the ${fmtMi(fordMi)} mi default` : mi || mo ? "Interval saved" : "Back to the default interval");
      };
      li.querySelector(".ivmi").onchange = commit;
      li.querySelector(".ivmo").onchange = commit;
      li.querySelector(".ivreset").onclick = () => { delete S.intervals[id]; save(); renderDue(); renderSpecs(); renderIntervals(); toast("Back to the default interval"); };
    });
  }

  function bindSettings() {
    $("#btnSaveSettings").onclick = () => {
      S.name = $("#setName").value.trim();
      const v = $("#setVin").value.trim().toUpperCase().replace(/[^A-Z0-9]/g, "");
      if (v !== (S.vin || "")) S.vinInfo = null;
      S.vin = v;
      S.settings.warn = Math.max(0, +$("#setWarn").value || 0);
      S.lastNotified = null; save(); renderAll(); toast("Settings saved");
    };
    $$("#segMode button").forEach((b) => (b.onclick = () => {
      S.schedMode = b.dataset.v; S.lastNotified = null; save(); renderAll();
      toast(b.dataset.v === "severe" ? "Using the severe-duty schedule" : "Using the normal schedule");
    }));
    $("#btnResetAll").onclick = () => {
      if (!Object.keys(S.intervals || {}).length) return toast("Already using the default intervals");
      if (!confirm("Reset all your custom intervals to the defaults?")) return;
      S.intervals = {}; save(); renderAll(); toast("All intervals reset to defaults");
    };
    $("#btnWipe").onclick = () => {
      if (!confirm("Erase your vehicle, settings, ALL service history and ALL expenses from this device?")) return;
      localStorage.removeItem(LS); S = load(); init(); toast("Data erased");
    };
  }

  // ---------------- tabs ----------------
  function bindTabs() {
    $$(".tabbar button").forEach((b) => (b.onclick = () => {
      $$(".tabbar button").forEach((x) => x.classList.toggle("on", x === b));
      $$(".tab").forEach((t) => t.classList.toggle("active", t.id === "tab-" + b.dataset.tab));
      window.scrollTo(0, 0);
    }));
  }

  function renderAll() { renderDue(); renderHistory(); renderTruck(); renderSpecs(); renderExpenses(); }

  function init() {
    $("#rev").textContent = "REV " + DATA_VERSION;
    sel = S.truck ? { model: DEFAULT_MODEL, ...S.truck } : { model: DEFAULT_MODEL, year: new Date().getFullYear(), engine: null, trans: null, drive: "4x4" };
    if (sel.year > MAX_YEAR || sel.year < MIN_YEAR) sel.year = MAX_YEAR - 1;
    setModel(sel.model);
    fillYears(); fillEngines(); fillTrans(); fillDrives();
    renderAll();
  }

  let bound = false;
  function boot() {
    if (!bound) {
      fillCats(); bindSelector(); bindVin(); bindLog(); bindExpenses(); bindSettings(); bindTabs(); bound = true;
      $("#btnDecodeSaved").onclick = () => {
        const v = $("#setVin").value.trim();
        if (!v) return toast("Enter a VIN first");
        $("#vinInput").value = v;
        document.querySelector('.tabbar button[data-tab="specs"]').click();
        decodeVin();
      };
      $("#btnScanSaved").onclick = () => {
        document.querySelector('.tabbar button[data-tab="specs"]').click();
        $("#btnScan").click();
      };
    }
    init();
    if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
      navigator.serviceWorker.register("sw.js").catch(() => {});
    }
    // Re-check reminders whenever the app returns to the foreground
    document.addEventListener("visibilitychange", () => { if (!document.hidden) renderDue(); });
  }
  boot();
  // deep-link: ?tab=log
  const qt = new URLSearchParams(location.search).get("tab");
  if (qt) document.querySelector(`.tabbar button[data-tab="${qt}"]`)?.click();
})();
