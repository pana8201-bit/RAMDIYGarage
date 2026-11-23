/* =====================================================================
   MAINTENANCE SCHEDULE (Ram / Dodge Ram) + WIPER BLADE DATA
   ---------------------------------------------------------------------
   Loaded after data-van.js.

   IMPORTANT: these intervals were compiled from general knowledge of
   Chrysler / Ram maintenance schedules ("Schedule A / B" on older
   trucks, the Oil Change Indicator on 2011+ trucks). They have NOT yet
   been checked against each model year's Owner's Manual, so every item
   is labelled UNVERIFIED in the app. Confirm against your Owner's
   Manual (or mopar.com / your dealer's VIN lookup) before relying on
   them.

   Confidence levels:
     confirmed - read from the Ram document for this model and year
                 (none yet - reserved for checked items)
     assumed   - Ram-style interval, not yet checked against the manual
     general   - Ram doesn't schedule this item; typical DIY practice
   Intervals are "whichever comes first" (miles or months).
   ===================================================================== */

const SCHED_SOURCES = {
  OLD: "Chrysler 'Schedule A / B' era (1994-2008) - not yet checked against your manual",
  OCI: "Ram Oil Change Indicator era (2009+) - not yet checked against your manual",
  GEN: "Not in Ram's schedule - typical practice"
};
const CONF_RANK = { confirmed: 3, inferred: 2, assumed: 1, general: 0 };
const CONF_LABEL = { confirmed: "RAM MANUAL", inferred: "RAM · NEARBY YEAR", assumed: "UNVERIFIED", general: "NOT A RAM ITEM" };
const BRAND = "Ram";

const SEVERE_DEF = "Severe duty (Ram's \"Schedule A\" / severe conditions): towing or a heavy payload, extended idling, dusty or off-road driving, " +
  "frequent short trips, stop-and-go or delivery use, extreme heat or cold, and commercial / fleet use.";

const iv = (mi, mo) => ({ mi: mi || null, mo: mo || null });
const OCI = "Ram: change oil when the Oil Change Indicator says so, but never go past the maximum shown. " +
  "The tracker reminds you at that maximum unless you set your own interval.";
const minConf = (a, b) => (CONF_RANK[a] <= CONF_RANK[b] ? a : b);

function era(c) {
  const y = c.year;
  const m = c.model || c.gen.models[0];
  const hd = ["Ram 2500", "Ram 3500", "Ram Chassis Cab"].includes(m);
  const van = ["ProMaster", "ProMaster City"].includes(m);
  if (y <= 2008) return { k: "old", src: "OLD", hd, van };
  return { k: y >= 2019 ? "new" : "mid", src: "OCI", hd, van };
}

/* Ram-style interval for one item. Returns { n, s, first, note, sNote, conf, src } or null. */
function makerItem(id, c) {
  const E = era(c), e = c.eng, t = c.trans, g = c.gen;
  const diesel = !!e.isDiesel;
  const cummins = /cummins/i.test(e.family);
  const ecod = /ecodiesel/i.test(e.family);
  let r = null, cap = "assumed", src = E.src;
  const oil = () => {
    if (E.k === "old") return diesel ? { n: iv(7500, 6), s: iv(3000, 3) } : { n: iv(6000, 6), s: iv(3000, 3),
      note: "Older Chrysler trucks: Schedule B (normal) ≈ 6,000-7,500 mi / 6 months; Schedule A (severe) 3,000 mi / 3 months." };
    if (cummins && c.year < 2013) return { n: iv(7500, 6), s: iv(5000, 6), note: OCI + " Cummins (2007.5-2012): ≈ 7,500 mi / 6 months maximum." };
    if (cummins) return { n: iv(15000, 6), s: iv(7500, 6), note: OCI + " Cummins (2013+): up to ≈ 15,000 mi / 6 months." };
    if (ecod) return { n: iv(10000, 12), s: iv(5000, 6), note: OCI + " EcoDiesel: ≈ 10,000 mi / 1 year maximum." };
    if (E.k === "new") return { n: iv(10000, 12), s: iv(5000, 6), note: OCI + " 2019+ gas: ≈ 10,000 mi / 1 year maximum." };
    return { n: iv(8000, 6), s: iv(4000, 6), note: OCI + " 2009-2018 gas: ≈ 8,000 mi / 6 months maximum." };
  };
  switch (id) {
    case "oil": { const o = oil(); r = { n: o.n, s: o.s, note: o.note, sNote: "Severe: towing, idling, dusty / off-road, short trips or extreme temperatures." }; break; }
    case "rot": { const o = oil(); r = { n: iv(Math.min(o.n.mi, 8000)), s: null, note: "Ram: rotate tires at every oil change (about every 6,000-8,000 mi)." };
      if (c.drive && /DRW/.test(c.drive)) r.note += " DRW: rotate fronts only unless rear wear is uneven."; break; }
    case "air":
      r = diesel ? { n: iv(30000), s: iv(15000), note: "Diesel: replace when the restriction indicator (if fitted) says so, or at the interval shown.", sNote: "Dusty / off-road: inspect at every oil change." }
                 : { n: iv(30000), s: iv(15000), sNote: "Dusty / off-road: inspect at every oil change." };
      break;
    case "cabin":
      r = { n: iv(20000, 12), s: iv(10000, 6) };
      break;
    case "fuel": {
      const own = e.fuelFilterMi ?? g.fuelFilterMi;
      if (!own) return null;
      r = { n: iv(own), s: iv(Math.round(own / 2)), note: diesel ? "Diesel fuel filter(s). Also replace right away if the 'water in fuel' light won't clear after draining." : undefined };
      break;
    }
    case "sep":
      if (!diesel) return null;
      r = { n: iv(oil().n.mi), s: null, note: "Drain the fuel / water separator at each oil change, or right away when the 'water in fuel' light comes on." };
      break;
    case "plugs":
      if (!e.plugMi) return null;
      r = e.plugMi >= 100000 ? { n: iv(100000), s: null, note: /qty 16/.test(e.plug || "") ? "HEMI: 16 plugs (2 per cylinder)." : undefined }
                             : { n: iv(e.plugMi), s: null, note: "Older engine with copper / standard plugs." };
      break;
    case "brake":
      r = { n: iv(null, g.brakeMo || 36), s: null, note: "Ram doesn't list a fixed brake-fluid change on most trucks. Many shops recommend every 2-3 years, sooner if you tow." };
      cap = "general"; src = "GEN";
      break;
    case "coolant":
      r = { n: iv(g.coolantMi, g.coolantMo), s: null, note: g.coolantNote };
      if (cummins && E.k === "old") r.sNote = "Cummins with green coolant: test SCA / DCA4 at each oil change.";
      break;
    case "trans": {
      if (t.type === "EV") return null;
      if (t.type === "Manual") { r = { n: iv(60000), s: iv(30000) }; break; }
      if (/^a[56]18$|^a500$|^48re$/.test(t.id)) r = { n: iv(60000), s: iv(30000), note: "Hydraulic 4-speed: change fluid and filter and adjust the bands (where fitted) at each service." };
      else if (/rfe|42rle|62te/.test(t.id)) r = { n: iv(120000), s: iv(60000), note: "Normal use: Ram often lists no fixed change - the interval shown is for tracking. Severe / towing: ≈ 60,000 mi." };
      else if (/as6/.test(t.id)) r = { n: iv(120000), s: iv(60000), note: "Aisin: use only the Aisin-specific ATF." };
      else r = { n: iv(150000), s: iv(60000), note: "ZF-based 8 / 9-speed: Ram lists no normal-use change - the interval shown is for tracking. Use only ZF 8 & 9 Speed ATF." };
      break;
    }
    case "rear":
      r = E.k === "old" ? { n: iv(60000), s: iv(30000) } : { n: iv(120000), s: iv(30000), sNote: "Towing / heavy payload: change about every 20,000-30,000 mi." };
      break;
    case "front":
      r = E.k === "old" ? { n: iv(60000), s: iv(30000) } : { n: iv(120000), s: iv(30000) };
      break;
    case "tcase":
      r = E.k === "old" ? { n: iv(60000), s: iv(30000) } : { n: iv(120000), s: iv(60000) };
      break;
    case "ccv":
      if (!cummins || c.year < 2007) return null;
      r = { n: iv(67500), s: null, note: "6.7L Cummins crankcase ventilation (CCV) filter." };
      break;
    case "def":
      if (!(cummins && c.year >= 2013) && !ecod) return null;
      r = { n: iv(112500), s: null, note: "DEF (diesel exhaust fluid) filter in the DEF tank / pump. Top up DEF at every fill-up or when the dash asks." };
      break;
    case "lash":
      if (!cummins) return null;
      r = { n: iv(c.year <= 1998 ? 24000 : 150000), s: null, note: "Cummins valve lash check / adjustment." };
      break;
    case "lube":
      if (!(E.hd && c.drive === "4x4") && !(E.k === "old" && c.drive === "4x4")) return null;
      r = { n: iv(oil().n.mi), s: null, note: "Grease the steering linkage and front-suspension fittings (tie rods, drag link, ball joints where fitted) at each oil change." };
      break;
    case "belt":
      r = { n: iv(120000), s: null, note: "Inspect at every oil change after 60,000 mi; replace the belt (and check the tensioner) by about 120,000 mi." };
      break;
    case "wiper":
      r = { n: iv(null, 12), s: null, note: "Check the blades every 6 months and replace when they streak or chatter - many owners replace yearly." };
      cap = "general"; src = "GEN";
      break;
    case "battery":
      r = { n: iv(null, 12), s: null, note: "Have the 12V battery load-tested yearly once it's 3+ years old. Diesels have two batteries - replace them as a pair." };
      cap = "general"; src = "GEN";
      break;
    case "evcool":
      if (!e.isEV) return null;
      r = { n: iv(150000, 120), s: null, note: "Battery / electronics coolant - dealer service. Interval not confirmed." };
      break;
    case "edrive":
      if (!e.isEV) return null;
      r = { n: iv(150000, 120), s: null, note: "Electric drive unit fluid - dealer service. Interval not confirmed." };
      break;
    default: return null;
  }
  r.conf = cap === "general" ? "general" : minConf("assumed", cap);
  r.src = src;
  return r;
}
/* Kept for compatibility with app.js */
const fordItem = makerItem;

/* Display order + applicability. `part` = what to buy / use. */
const SCHEDULE = [
  { id: "oil", type: "Oil & Filter Change", when: (c) => !c.eng.isEV,
    part: (c) => (c.eng.oilVisc && c.eng.oilVisc !== "N/A" ? `${c.eng.oilCap} ${c.eng.oilVisc.split(" (")[0]} · ${c.eng.filter}` : "") },
  { id: "rot", type: "Tire Rotation", when: () => true },
  { id: "air", type: "Engine Air Filter", when: (c) => !c.eng.isEV, part: (c) => c.eng.airFilter ?? c.gen.airFilter },
  { id: "cabin", type: "Cabin Air Filter", when: (c) => !/^Not equipped/.test(c.gen.cabinFilter || ""), part: (c) => c.gen.cabinFilter },
  { id: "fuel", type: "Fuel Filter", when: (c) => !!(c.eng.fuelFilterMi ?? c.gen.fuelFilterMi), part: (c) => c.eng.fuelFilter || c.gen.fuelFilter },
  { id: "sep", type: "Fuel/Water Separator Drain", when: (c) => !!c.eng.isDiesel },
  { id: "plugs", type: "Spark Plugs", when: (c) => !!c.eng.plugMi, part: (c) => `${c.eng.plug} · gap ${c.eng.gap}` },
  { id: "brake", type: "Brake Fluid", when: () => true, part: (c) => c.gen.brakeFluid },
  { id: "coolant", type: "Coolant Flush", when: (c) => !c.eng.isEV, part: (c) => c.gen.coolant },
  { id: "trans", type: "Transmission Fluid", when: (c) => c.trans.type !== "EV", part: (c) => c.trans.fluid },
  { id: "rear", type: "Rear Differential Fluid", when: (c) => driveComps(c).includes("rear"), part: (c) => c.gen.rearAxle },
  { id: "front", type: "Front Differential Fluid", when: (c) => driveComps(c).includes("front"), part: (c) => c.gen.frontDiff },
  { id: "tcase", type: "Transfer Case Fluid", when: (c) => driveComps(c).includes("tcase"), part: (c) => c.gen.transferCase },
  { id: "lube", type: "Front End Lubrication", when: () => true, part: () => "NLGI #2 chassis grease" },
  { id: "ccv", type: "Crankcase Vent Filter", when: (c) => !!c.eng.isDiesel },
  { id: "def", type: "DEF Filter", when: (c) => !!c.eng.isDiesel },
  { id: "lash", type: "Valve Lash Adjustment", when: (c) => !!c.eng.isDiesel },
  { id: "belt", type: "Drive Belt", when: (c) => !c.eng.isEV },
  { id: "evcool", type: "EV Battery Coolant", when: (c) => !!c.eng.isEV, part: () => "Dealer service" },
  { id: "edrive", type: "Electric Drive Fluid", when: (c) => !!c.eng.isEV, part: (c) => c.trans.fluid },
  { id: "wiper", type: "Wiper Blades", when: () => true, part: (c) => { const w = wipersFor(c.gen, c.year); return w ? wiperShort(w) : ""; } },
  { id: "battery", type: "Battery Test", when: () => true }
];

function scheduleFor(c) {
  return SCHEDULE.filter((s) => s.when(c)).map((s) => ({ ...s, ford: makerItem(s.id, c) })).filter((s) => s.ford);
}

/* =====================================================================
   WIPER BLADES
   Sizes compiled from blade-maker application guides; NOT yet
   cross-checked for every year. conf: high / medium / low.
   ===================================================================== */
const WIPERS = {
  r15_g2:  [{ years: [1994, 2001], d: 22, p: 22, r: null, conn: "9x3 J-hook", conf: "medium" }],
  r15_g3:  [{ years: [2002, 2008], d: 22, p: 22, r: null, conn: "9x3 J-hook", conf: "medium" }],
  r15_g4:  [{ years: [2009, 2018], d: 22, p: 22, r: null, conn: "9x3 J-hook", conf: "medium" }],
  r15_g4c: [{ years: [2019, 2024], d: 22, p: 22, r: null, conn: "9x3 J-hook", conf: "medium" }],
  r15_dt:  [{ years: [2019, 2099], d: 22, p: 22, r: null, conn: "Pinch tab / J-hook (sources differ)", conf: "low",
              note: "Check your wiper arm connector before buying - sources disagree for the DT." }],
  hd_g2:   [{ years: [1994, 2002], d: 22, p: 22, r: null, conn: "9x3 J-hook", conf: "medium" }],
  hd_g3:   [{ years: [2003, 2009], d: 22, p: 22, r: null, conn: "9x3 J-hook", conf: "medium" }],
  hd_g4:   [{ years: [2010, 2018], d: 22, p: 22, r: null, conn: "9x3 J-hook", conf: "medium" }],
  hd_g5:   [{ years: [2019, 2099], d: 22, p: 22, r: null, conn: "Pinch tab / J-hook (sources differ)", conf: "low",
              note: "Check your wiper arm connector before buying." }],
  cc_g1:   [{ years: [2008, 2018], d: 22, p: 22, r: null, conn: "9x3 J-hook", conf: "medium" }],
  cc_g2:   [{ years: [2019, 2099], d: 22, p: 22, r: null, conn: "Pinch tab / J-hook (sources differ)", conf: "low" }],
  pm1:     [{ years: [2014, 2099], d: 26, p: 16, r: "None on most vans", conn: "Top lock / side pin (sources differ)", conf: "low",
              note: "ProMaster sizes vary by year in retailer guides - measure the old blades." }],
  pmc1:    [{ years: [2015, 2022], d: 26, p: 14, r: "Not confirmed", conn: "Push button / top lock (sources differ)", conf: "low",
              note: "Measure the old blades - sources disagree." }]
};

function wipersFor(gen, year) {
  const list = WIPERS[gen && gen.id] || [];
  return list.find((w) => year >= w.years[0] && year <= w.years[1]) || null;
}
const inch = (v) => (typeof v === "number" ? v + "\"" : v);
function wiperShort(w) {
  return `Driver ${inch(w.d)} · Passenger ${inch(w.p)}${w.r && typeof w.r === "number" ? " · Rear " + inch(w.r) : ""} · ${w.conn.split(" (")[0]}`;
}
function wiperStyles(w) {
  if (/J-hook/i.test(w.conn) && !/pinch|push|top lock|side pin/i.test(w.conn)) return "Conventional (frame), beam (frameless) or hybrid blades all fit a 9x3 J-hook arm - most blades include this adapter.";
  if (/side pin|top lock/i.test(w.conn)) return "Choose a blade listed for your arm type (side pin / top lock) - many multi-adapter blades include it.";
  return "Beam or hybrid blades with the matching pinch-tab / J-hook adapter. Check the blade's fit list for your model.";
}
