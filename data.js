/* =====================================================================
   RAM DIY GARAGE - CORE SPEC DATA (catalog, transmissions, shared)
   ---------------------------------------------------------------------
   Load order: data.js -> data-1500.js -> data-hd.js -> data-van.js ->
   schedule.js -> app.js

   Values are compiled reference data (Mopar / owner's-manual style
   figures) and have NOT been checked against official Stellantis
   service information. Anything listed in an item's `verify` array is
   flagged "VERIFY" in the UI. Part numbers we're not confident about
   read "confirm P/N by VIN" instead of being guessed. ALWAYS confirm
   against the Owner's Manual, the fill-plug / axle tag, or a Mopar
   parts lookup by VIN before final torque.
   ===================================================================== */

const DATA_VERSION = "2026.11-ram1";
const MIN_YEAR = 1994;
const DEFAULT_MODEL = "Ram 1500";

const PN = "Mopar - confirm P/N by VIN";
const CONFIRM = "Confirm in Owner's Manual";
const CONFIRM_WSM = "Confirm in service manual";

/* ---------------------------------------------------------------------
   VEHICLE CATALOG - drives the Category / Model pickers
   --------------------------------------------------------------------- */
const CATALOG = [
  { id: "Ram 1500",         cat: "Pickups",     drives: ["4x2", "4x4"] },
  { id: "Ram 1500 Classic", cat: "Pickups",     drives: ["4x2", "4x4"] },
  { id: "Ram 2500",         cat: "Pickups",     drives: ["4x2", "4x4"] },
  { id: "Ram 3500",         cat: "Pickups",     drives: ["4x2", "4x4"] },
  { id: "Ram Chassis Cab",  cat: "Chassis Cab", drives: ["4x2", "4x4"] },
  { id: "ProMaster",        cat: "Vans",        drives: ["FWD"] },
  { id: "ProMaster City",   cat: "Vans",        drives: ["FWD"] }
];
const CATEGORIES = ["Pickups", "Chassis Cab", "Vans"];
const MODELS = CATALOG.map((m) => m.id);

const GENERATIONS = [];
const ENGINES = [];

/* ---------------------------------------------------------------------
   FLUIDS
   --------------------------------------------------------------------- */
const ATF4 = "Mopar ATF+4 (MS-9602) - do not use Dexron / Mercon";
const ATF34 = "Mopar ATF+4 (MS-9602) - replaces the original ATF+3; never use Dexron / Mercon";
const ZF8 = "Mopar ZF 8 & 9 Speed ATF - NOT interchangeable with ATF+4";
const AISIN = "Mopar AS68RC / AS69RC ATF (Aisin-specific) - NOT interchangeable with ATF+4";

/* ---------------------------------------------------------------------
   TRANSMISSIONS
   --------------------------------------------------------------------- */
const TRANSMISSIONS = [
  // ---------- manuals ----------
  { id: "nv3500", name: "NV3500 5-Speed Manual", type: "Manual", years: [1994, 2004],
    fluid: "Mopar Manual Transmission Lubricant (MS-9224) - some later builds ATF+4; check the tag",
    capacity: "≈ 2.3 L (4.8 pt) 4x2 · ≈ 2.5 L (5.3 pt) 4x4",
    drain: "Drain & fill plugs: ≈ 30 lb-ft (40 N·m)", pan: "No pan - fill to bottom of fill-plug hole",
    verify: ["fluid", "capacity", "drain"] },
  { id: "nv4500", name: "NV4500 5-Speed Manual (heavy duty)", type: "Manual", years: [1994, 2004],
    fluid: "SAE 75W-85 synthetic GL-4 manual transmission lube - check the tag",
    capacity: "≈ 3.8 L (8.0 pt)",
    drain: "Drain & fill plugs: ≈ 30 lb-ft (40 N·m)", pan: "No pan - fill to bottom of fill-plug hole",
    verify: ["fluid", "capacity", "drain"] },
  { id: "nv5600", name: "NV5600 6-Speed Manual (heavy duty)", type: "Manual", years: [1999, 2005],
    fluid: "Mopar ATF+4 per later Mopar service info (some builds 75W-85 synthetic) - check the tag",
    capacity: CONFIRM_WSM, drain: "Drain & fill plugs: " + CONFIRM_WSM, pan: "No pan - fill to bottom of fill-plug hole",
    verify: ["fluid"] },
  { id: "g56", name: "G56 6-Speed Manual (Mercedes-Benz)", type: "Manual", years: [2005, 2018],
    fluid: ATF4, capacity: CONFIRM_WSM, drain: "Drain & fill plugs: " + CONFIRM_WSM,
    pan: "No pan - fill to bottom of fill-plug hole", verify: [] },
  { id: "t56", name: "Tremec T56 6-Speed Manual (SRT-10)", type: "Manual", years: [2004, 2006],
    fluid: CONFIRM, capacity: CONFIRM_WSM, drain: CONFIRM_WSM, pan: "No pan - fill to bottom of fill-plug hole", verify: [] },

  // ---------- 4-speed hydraulic (RH/RE) ----------
  { id: "a500", name: "42RH / 42RE 4-Speed Automatic (A500)", type: "Automatic", years: [1994, 2003],
    fluid: ATF34, capacity: "Pan drop refill ≈ 3.8 L (4 qt) · total dry ≈ 8 L (8.5 qt)",
    drain: "No drain plug - pan drop service (replace filter)", pan: "Pan bolts: ≈ 125 lb-in (14 N·m)",
    verify: ["capacity", "pan"] },
  { id: "a518", name: "46RH / 46RE 4-Speed Automatic (A518)", type: "Automatic", years: [1994, 2003],
    fluid: ATF34, capacity: "Pan drop refill ≈ 3.8-4.7 L (4-5 qt) · total dry ≈ 13.4 L (14 qt)",
    drain: "No drain plug - pan drop service (replace filter)", pan: "Pan bolts: ≈ 125 lb-in (14 N·m)",
    verify: ["capacity", "pan"] },
  { id: "a618", name: "47RH / 47RE 4-Speed Automatic (A618, heavy duty)", type: "Automatic", years: [1994, 2003],
    fluid: ATF34, capacity: "Pan drop refill ≈ 4.7 L (5 qt) · total dry ≈ 14 L (14.8 qt)",
    drain: "No drain plug - pan drop service (replace filter)", pan: "Pan bolts: ≈ 125 lb-in (14 N·m)",
    verify: ["capacity", "pan"] },
  { id: "48re", name: "48RE 4-Speed Automatic (heavy duty)", type: "Automatic", years: [2003, 2007],
    fluid: ATF4, capacity: "Pan drop refill ≈ 4.7 L (5 qt) · total dry ≈ 14 L (14.8 qt)",
    drain: "No drain plug - pan drop service (replace filter)", pan: "Pan bolts: ≈ 125 lb-in (14 N·m)",
    verify: ["capacity", "pan"] },
  { id: "42rle", name: "42RLE 4-Speed Automatic", type: "Automatic", years: [2003, 2012],
    fluid: ATF4, capacity: "Pan drop refill ≈ 4 L (4.2 qt) · total ≈ 8 L",
    drain: "No drain plug - pan drop service", pan: "Pan bolts: ≈ 105 lb-in (12 N·m)",
    verify: ["capacity", "pan"] },

  // ---------- RFE electronic ----------
  { id: "45rfe", name: "45RFE 4/5-Speed Automatic", type: "Automatic", years: [2002, 2003],
    fluid: ATF4, capacity: "Pan drop refill ≈ 5 L (5.3 qt) · total ≈ 13.3 L (14 qt)",
    drain: "No drain plug (most) - pan drop service, 2 filters", pan: "Pan bolts: ≈ 105 lb-in (12 N·m)",
    verify: ["capacity", "pan"] },
  { id: "545rfe", name: "545RFE 5-Speed Automatic", type: "Automatic", years: [2003, 2010],
    fluid: ATF4, capacity: "Pan drop refill ≈ 5 L (5.3 qt) · total ≈ 13.3 L (14 qt)",
    drain: "No drain plug (most) - pan drop service, 2 filters", pan: "Pan bolts: ≈ 105 lb-in (12 N·m)",
    verify: ["capacity", "pan"] },
  { id: "65rfe", name: "65RFE 6-Speed Automatic", type: "Automatic", years: [2009, 2013],
    fluid: ATF4, capacity: "Pan drop refill ≈ 5 L (5.3 qt) · total ≈ 13.3 L (14 qt)",
    drain: "No drain plug (most) - pan drop service, 2 filters", pan: "Pan bolts: ≈ 105 lb-in (12 N·m)",
    verify: ["capacity", "pan"] },
  { id: "66rfe", name: "66RFE 6-Speed Automatic (HD gas)", type: "Automatic", years: [2007, 2019],
    fluid: ATF4, capacity: "Pan drop refill ≈ 5.5 L (5.8 qt) · total ≈ 14 L (14.8 qt)",
    drain: "Pan drop service, 2 filters (some pans have a drain plug)", pan: "Pan bolts: ≈ 105 lb-in (12 N·m)",
    verify: ["capacity", "pan"] },
  { id: "68rfe", name: "68RFE 6-Speed Automatic (Cummins)", type: "Automatic", years: [2007, 2099],
    fluid: ATF4, capacity: "Pan drop refill ≈ 5.5-7.5 L (6-8 qt) · total ≈ 15 L (16 qt)",
    drain: "Pan drop service, 2 filters (some pans have a drain plug)", pan: "Pan bolts: ≈ 105 lb-in (12 N·m)",
    verify: ["capacity", "pan"] },
  { id: "as68rc", name: "Aisin AS68RC 6-Speed Automatic (Cummins HO)", type: "Automatic", years: [2007, 2018],
    fluid: AISIN, capacity: "Drain-and-fill ≈ 6.6 L (7 qt) · total ≈ 15 L - " + CONFIRM_WSM,
    drain: "Drain plug: " + CONFIRM_WSM, pan: "Level checked at the fill / check plug at temperature - see service manual",
    verify: ["capacity"] },
  { id: "as69rc", name: "Aisin AS69RC 6-Speed Automatic (Cummins HO)", type: "Automatic", years: [2019, 2099],
    fluid: AISIN, capacity: "Drain-and-fill ≈ 6.6 L (7 qt) · total ≈ 15 L - " + CONFIRM_WSM,
    drain: "Drain plug: " + CONFIRM_WSM, pan: "Level checked at the fill / check plug at temperature - see service manual",
    verify: ["capacity"] },

  // ---------- ZF-based TorqueFlite 8 ----------
  { id: "8hp", name: "TorqueFlite 8 8-Speed Automatic (8HP70 / 8HP75)", type: "Automatic", years: [2013, 2099],
    fluid: ZF8, capacity: "Total ≈ 8-9 L - " + CONFIRM_WSM,
    drain: "Sealed unit - fill / level-check plug, no dipstick", pan: "Plastic pan with integral filter - replace as an assembly",
    verify: ["capacity"] },
  { id: "8hp95", name: "TorqueFlite 8 HD 8-Speed Automatic (8HP95)", type: "Automatic", years: [2021, 2024],
    fluid: ZF8, capacity: CONFIRM_WSM,
    drain: "Sealed unit - fill / level-check plug, no dipstick", pan: "Plastic pan with integral filter - replace as an assembly", verify: [] },
  { id: "8hp75hd", name: "TorqueFlite 8 HD 8-Speed Automatic (8HP75-LCV)", type: "Automatic", years: [2019, 2099],
    fluid: ZF8, capacity: CONFIRM_WSM,
    drain: "Sealed unit - fill / level-check plug, no dipstick", pan: "Plastic pan with integral filter - replace as an assembly", verify: [] },

  // ---------- vans (FWD) ----------
  { id: "62te", name: "62TE 6-Speed Automatic Transaxle", type: "Automatic", years: [2014, 2019],
    fluid: ATF4, capacity: "Pan drop refill ≈ 4 L (4.2 qt) · total ≈ 9 L - " + CONFIRM_WSM,
    drain: "No drain plug - pan drop service", pan: "Pan bolts: ≈ 105 lb-in (12 N·m)", verify: ["capacity", "pan"] },
  { id: "948te", name: "948TE 9-Speed Automatic Transaxle (ZF 9HP)", type: "Automatic", years: [2015, 2099],
    fluid: ZF8, capacity: CONFIRM_WSM,
    drain: "Sealed unit - drain / fill plugs, no dipstick", pan: "Dealer service recommended", verify: [] },
  { id: "amt", name: "M40 6-Speed Automated Manual (AMT)", type: "Automated Manual", years: [2014, 2017],
    fluid: CONFIRM, capacity: CONFIRM_WSM, drain: CONFIRM_WSM, pan: "No pan - fill to bottom of fill-plug hole", verify: [] },
  { id: "edu_pm", name: "Single-Speed Electric Drive Unit", type: "EV", years: [2024, 2099],
    fluid: "Mopar-specified e-drive fluid - dealer service", capacity: "N/A for DIY", drain: "N/A", pan: "N/A", verify: [] }
];

/* Driveline components present for a given drive type.
   rear = rear axle, front = front axle, tcase = transfer case. */
const DEFAULT_COMPONENTS = {
  "4x2": ["rear"], "4x4": ["rear", "front", "tcase"],
  "RWD": ["rear"], "FWD": [], "AWD": ["ptu", "rdu"]
};
function driveComps(c) {
  if (c.eng.isEV) return [];
  const o = c.gen.components || {};
  return o[c.drive] || DEFAULT_COMPONENTS[c.drive] || [];
}

/* Service types for the tracker */
const SERVICE_TYPES = [
  "Oil & Filter Change", "Tire Rotation", "Engine Air Filter", "Cabin Air Filter",
  "Fuel Filter", "Fuel/Water Separator Drain", "Spark Plugs", "Transmission Fluid",
  "Rear Differential Fluid", "Front Differential Fluid", "Transfer Case Fluid",
  "Coolant Flush", "Brake Fluid", "Crankcase Vent Filter", "DEF Filter", "Valve Lash Adjustment",
  "Front End Lubrication", "EV Battery Coolant", "Electric Drive Fluid",
  "Brake Pads / Rotors", "Drive Belt", "Battery Test", "Battery Replacement",
  "Wiper Blades", "Other"
];
const SERVICE_ALIASES = { "Rear Axle Fluid": "Rear Differential Fluid", "Front Axle Fluid": "Front Differential Fluid", "Battery": "Battery Replacement" };

/* Shared fuel strings */
const R87 = "Regular unleaded 87 AKI";
const R87FFV = "Regular unleaded 87 AKI · E85 OK on Flex-Fuel builds (yellow fuel cap / FFV badge)";
const HEMI_FUEL = "Mid-grade 89 AKI recommended · 87 AKI acceptable";
const ULSD = "Ultra-Low Sulfur Diesel (ULSD) only - up to B20 biodiesel";
const ULSD_DEF = ULSD + " · DEF: API-certified, ISO 22241";
const DSL_OLD = "Diesel #2 · #1 or winter blend in cold climates (ULSD is the only on-road diesel sold today)";

/* Shared coolant strings */
const COOL_GREEN = "Mopar Antifreeze/Coolant (green ethylene glycol), 50/50";
const COOL_HOAT = "Mopar Antifreeze/Coolant 5 Year / 100,000 Mile Formula (HOAT, orange), 50/50";
const COOL_OAT = "Mopar Antifreeze/Coolant 10 Year / 150,000 Mile Formula (OAT, purple) - never mix with HOAT";

/* Merge helper: fill in fields an engine doesn't set. Called at the end of data-van.js. */
function finalizeData() {
  ENGINES.forEach((e) => {
    e.isDiesel = /diesel|cummins/i.test(e.family);
    e.notes = e.notes || [];
    e.verify = e.verify || [];
  });
  GENERATIONS.forEach((g) => { g.notes = g.notes || []; g.verify = g.verify || []; });
}
