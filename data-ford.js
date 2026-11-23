/* =====================================================================
   CURRENT US FORD LINEUP - CURRENT GENERATION SPEC DATA
   ---------------------------------------------------------------------
   Loaded after data.js and data-hd.js.

   Lineup checked against public sources, November 2026. Still in US
   production: Mustang, Mustang Mach-E, Bronco, Bronco Sport, Explorer,
   Expedition, Maverick, Ranger, Transit / E-Transit, E-Series, F-150 and
   Super Duty.
   Not included (production ended): Escape (final MY2026, ended Dec 2025),
   Edge (ended 2024), F-150 Lightning (ended Dec 2025, kept under F-150
   for 2022-2025).

   ALL DATA IN THIS FILE IS PRELIMINARY. Every generation is marked
   `preliminary: true` and the UI shows a warning. Values we're not sure
   of say "confirm" / "confirm P/N by VIN" instead of being guessed, and
   uncertain numbers are listed in `verify`.
   ===================================================================== */

const FV = "Motorcraft - confirm P/N by VIN";
const CONFIRM = "Confirm in Owner's Manual";
const CONFIRM_WSM = "Confirm in Workshop Manual";

/* ---------------------------------------------------------------------
   VEHICLE CATALOG - drives the Category / Model pickers
   --------------------------------------------------------------------- */
const CATALOG = [
  { id: "F-150",          cat: "Trucks", drives: ["4x2", "4x4"] },
  { id: "F-250",          cat: "Trucks", drives: ["4x2", "4x4"] },
  { id: "F-350",          cat: "Trucks", drives: ["4x2", "4x4"] },
  { id: "Ranger",         cat: "Trucks", drives: ["4x2", "4x4"] },
  { id: "Maverick",       cat: "Trucks", drives: ["FWD", "AWD"] },
  { id: "Bronco",         cat: "SUVs",   drives: ["4x4"] },
  { id: "Bronco Sport",   cat: "SUVs",   drives: ["AWD"] },
  { id: "Explorer",       cat: "SUVs",   drives: ["RWD", "AWD"] },
  { id: "Expedition",     cat: "SUVs",   drives: ["4x2", "4x4"] },
  { id: "Mustang Mach-E", cat: "SUVs",   drives: ["RWD", "AWD"] },
  { id: "Mustang",        cat: "Cars",   drives: ["RWD"] },
  { id: "Transit",        cat: "Vans",   drives: ["RWD", "AWD"] },
  { id: "E-Series",       cat: "Vans",   drives: ["RWD"] }
];
const CATEGORIES = ["Trucks", "SUVs", "Cars", "Vans"];
const MODELS = CATALOG.map((m) => m.id);

/* Defaults shared by modern (2015+) generations */
const MODERN = {
  washer: CONFIRM,
  coolant: "Motorcraft Orange (VC-3DIL-B) or Yellow (VC-13DL-G) - check the reservoir label and never mix",
  brakeFluid: "Motorcraft DOT 4 LV High Performance (PM-20)", brakeMo: 36,
  coolantMi: 150000, coolantMo: 120, coolantNote: "First at 10 yr / 150,000 mi, then every 5 yr / 75,000 mi",
  fuelFilter: "In-tank, integrated with fuel pump module - lifetime", fuelFilterMi: null,
  airFilter: FV, cabinFilter: FV,
  rearAxle: "N/A", rearAxleCap: "N/A", frontDiff: "N/A", frontDiffCap: "N/A", transferCase: "N/A",
  preliminary: true, notes: []
};
const gen = (o) => Object.assign({}, MODERN, o, { verify: ["washer", "coolant", ...(o.verify || [])] });

/* Defaults for battery-electric "engines" */
const EVBASE = {
  family: "Battery Electric", isEV: true,
  oilCap: "N/A - no engine oil", oilVisc: "N/A", oilSpec: "N/A", filter: "N/A (cabin air filter only)", drainTorque: "N/A",
  plug: "N/A", gap: "N/A", plugMi: null, airFilter: "N/A - no engine", fuelFilter: "N/A", fuelFilterMi: null,
  fuelTank: "N/A - battery electric (no fuel tank)", trans: ["edu_gen"], intervalMi: 10000, intervalMo: 12
};

const R87_ = "Regular unleaded 87 AKI";
const R87T = "Regular unleaded 87 AKI · 91+ AKI recommended for towing / best performance";
const P91R = "Premium unleaded 91 AKI recommended (87 minimum)";
const TURBO_GAP = "0.028-0.031 in (0.71-0.79 mm)";
const NA_GAP = "0.049-0.053 in (1.25-1.35 mm)";

/* ---------------------------------------------------------------------
   TRANSMISSIONS (new)
   --------------------------------------------------------------------- */
TRANSMISSIONS.push(
  { id: "10r60", name: "10R60 10-Speed Automatic", type: "Automatic", years: [2020, 2099],
    fluid: "Motorcraft MERCON ULV (XT-12-QULV) - NOT compatible with MERCON LV",
    capacity: CONFIRM_WSM, drain: "Drain / level-check plug: confirm in WSM",
    pan: "Level check at operating temperature per WSM procedure", verify: ["capacity", "drain"] },
  { id: "10r60h", name: "10R60 MHT 10-Speed (Modular Hybrid Transmission)", type: "Automatic Hybrid", years: [2020, 2099],
    fluid: "Motorcraft MERCON ULV (XT-12-QULV)", capacity: CONFIRM_WSM, drain: "Confirm in WSM",
    pan: "Dealer service recommended (integrated e-motor)", verify: ["capacity", "drain"] },
  { id: "8f35", name: "8F35 8-Speed Automatic", type: "Automatic", years: [2020, 2099],
    fluid: "Motorcraft MERCON ULV (XT-12-QULV)", capacity: CONFIRM_WSM, drain: "Confirm in WSM",
    pan: "Level check per WSM procedure", verify: ["fluid", "capacity", "drain"] },
  { id: "hf45", name: "HF45 Hybrid eCVT (power-split)", type: "eCVT", years: [2020, 2099],
    fluid: "Motorcraft MERCON ULV (confirm in Owner's Manual)", capacity: CONFIRM_WSM, drain: "Confirm in WSM",
    pan: "Dealer service recommended (integrated motor/generator)", verify: ["fluid", "capacity", "drain"] },
  { id: "mt82", name: "Getrag MT82-D4 6-Speed Manual", type: "Manual", years: [2024, 2099],
    fluid: "Motorcraft MERCON LV (confirm in Owner's Manual)", capacity: CONFIRM_WSM,
    drain: "Drain & fill plugs: confirm in WSM", pan: "No pan - fill to bottom of fill-plug hole", verify: ["fluid", "capacity", "drain"] },
  { id: "tr3160", name: "Tremec TR-3160 6-Speed Manual", type: "Manual", years: [2024, 2099],
    fluid: "Confirm in Owner's Manual", capacity: CONFIRM_WSM,
    drain: "Drain & fill plugs: confirm in WSM", pan: "No pan - fill to bottom of fill-plug hole", verify: ["capacity", "drain"] },
  { id: "dct7", name: "Tremec 7-Speed Dual-Clutch (DCT)", type: "Dual-Clutch", years: [2026, 2099],
    fluid: "Specified DCT fluid - dealer service recommended", capacity: "Dealer service",
    drain: "N/A - dealer service", pan: "N/A", verify: [] },
  { id: "mti550", name: "Getrag MTI550 7-Speed Manual (6 + crawler)", type: "Manual", years: [2021, 2099],
    fluid: "Confirm in Owner's Manual", capacity: CONFIRM_WSM,
    drain: "Drain & fill plugs: confirm in WSM", pan: "No pan - fill to bottom of fill-plug hole", verify: ["capacity", "drain"] },
  { id: "edu_gen", name: "Single-Speed Electric Drive Unit(s)", type: "EV", years: [2021, 2099],
    fluid: "Ford-specified e-drive fluid - dealer service", capacity: "N/A for DIY", drain: "N/A", pan: "N/A", verify: [] }
);

/* ---------------------------------------------------------------------
   GENERATIONS (new)
   --------------------------------------------------------------------- */
GENERATIONS.push(
  gen({ id: "mus7", models: ["Mustang"], code: "7th Gen", platform: "S650", years: [2024, 2099],
    lugTorque: "150 lb-ft (204 N·m)", lugPattern: "5 x 114.3 mm", lugThread: "M14 x 1.5",
    fuelTank: "≈ 16-17 gal (61-64 L) by engine",
    rearAxle: "Ford 8.8\" IRS (Torsen LSD on Performance Pack / Dark Horse) - SAE 75W-85 Synthetic (WSL-M2C192-A)",
    rearAxleCap: "≈ 3.0-3.5 pt (1.4-1.7 L)",
    notes: ["Staggered wheel and tire setups can't be rotated front-to-back. Rotate side-to-side only if the tires aren't directional.",
            "Ford: heavy track or high-rpm use can bring on a wrench light for timing-chain replacement.",
            "Mustang GTD (2025+) is not covered - specialist / dealer service only."],
    verify: ["lugTorque", "fuelTank", "rearAxle", "rearAxleCap"] }),

  gen({ id: "mache1", models: ["Mustang Mach-E"], code: "1st Gen", platform: "CX727 (GE1)", years: [2021, 2099],
    lugTorque: "≈ 100 lb-ft (135 N·m)", lugPattern: "5 x 114.3 mm", lugThread: "M14 x 1.5",
    coolant: "Battery / e-drive coolant loop - dealer service",
    fuelTank: "N/A - battery electric", airFilter: "N/A - no engine", fuelFilter: "N/A",
    notes: ["High-voltage system (orange cables). Don't service HV components yourself.", "The 12V battery still needs regular testing."],
    verify: ["lugTorque"] }),

  gen({ id: "bronco6", models: ["Bronco"], code: "6th Gen", platform: "U725 (T6)", years: [2021, 2099],
    lugTorque: "150 lb-ft (204 N·m)", lugPattern: "6 x 139.7 mm (6 x 5.5 in)", lugThread: "M14 x 1.5",
    fuelTank: "2-door ≈ 16.9 gal (64 L) · 4-door ≈ 20.8 gal (79 L)",
    rearAxle: "Dana AdvanTEK solid rear axle (M220 class) - SAE 75W-85 Synthetic per axle tag / Owner's Manual",
    rearAxleCap: CONFIRM,
    frontDiff: "Dana AdvanTEK IFS front differential - synthetic hypoid gear lube per Owner's Manual", frontDiffCap: CONFIRM,
    transferCase: "2-speed part-time or 2-speed 4WD Auto (Advanced 4x4) - Motorcraft MERCON LV",
    notes: ["Fluid service intervals should be shortened after water crossings or heavy off-road use."],
    verify: ["lugTorque", "fuelTank", "rearAxle", "frontDiff", "transferCase"] }),

  gen({ id: "bsport1", models: ["Bronco Sport"], code: "1st Gen", platform: "CX430 (C2)", years: [2021, 2099],
    lugTorque: "100 lb-ft (135 N·m)", lugPattern: "5 x 108 mm", lugThread: "M14 x 1.5",
    fuelTank: "≈ 16.0 gal (61 L)",
    ptu: "Power transfer unit - synthetic hypoid gear lube per Owner's Manual", ptuCap: CONFIRM_WSM,
    rdu: "Rear drive unit - per Owner's Manual (Badlands twin-clutch RDU uses its own specified fluid)", rduCap: CONFIRM_WSM,
    verify: ["lugTorque", "lugThread", "fuelTank"] }),

  gen({ id: "expl6", models: ["Explorer"], code: "6th Gen", platform: "U625 (CD6)", years: [2020, 2099],
    lugTorque: "150 lb-ft (204 N·m)", lugPattern: CONFIRM, lugThread: "M14 x 1.5",
    fuelTank: "≈ 18 gal (68 L) · Hybrid ≈ 20 gal (76 L)",
    rearAxle: "Rear differential - synthetic hypoid gear lube per Owner's Manual", rearAxleCap: CONFIRM,
    frontDiff: "Integrated with PTU (AWD)", frontDiffCap: "N/A",
    ptu: "Power transfer unit / front drive (AWD) - synthetic hypoid gear lube per Owner's Manual", ptuCap: CONFIRM_WSM,
    components: { RWD: ["rear"], AWD: ["rear", "ptu"] },
    notes: ["Police Interceptor Utility versions are not covered."],
    verify: ["lugTorque", "fuelTank"] }),

  gen({ id: "exped5", models: ["Expedition"], code: "5th Gen", platform: "U717 (T3)", years: [2025, 2099],
    lugTorque: "150 lb-ft (204 N·m)", lugPattern: "6 x 135 mm", lugThread: "M14 x 1.5",
    fuelTank: "Standard ≈ 24 gal · MAX ≈ 28 gal",
    rearAxle: "IRS rear differential - SAE 75W-85 Synthetic (WSL-M2C192-A)", rearAxleCap: CONFIRM,
    frontDiff: "IFS front differential - SAE 75W-85 Synthetic", frontDiffCap: CONFIRM,
    transferCase: "2-speed transfer case (4WD Auto) - Motorcraft MERCON LV",
    verify: ["fuelTank", "rearAxle", "frontDiff", "transferCase"] }),

  gen({ id: "mav1", models: ["Maverick"], code: "1st Gen", platform: "P758 (C2)", years: [2022, 2099],
    lugTorque: "100 lb-ft (135 N·m)", lugPattern: "5 x 108 mm", lugThread: "M14 x 1.5",
    fuelTank: "Hybrid 13.8 gal (52 L) · EcoBoost 16.5 gal (62 L)",
    ptu: "Power transfer unit - synthetic hypoid gear lube per Owner's Manual", ptuCap: CONFIRM_WSM,
    rdu: "Rear drive unit - per Owner's Manual (Tremor / Lobo twin-clutch RDU uses its own specified fluid)", rduCap: CONFIRM_WSM,
    notes: ["2025+ refresh: hybrid AWD became available, and the EcoBoost became AWD-only."],
    verify: ["lugTorque", "lugThread"] }),

  gen({ id: "ranger6", models: ["Ranger"], code: "6th Gen (US)", platform: "P703 (T6.2)", years: [2024, 2099],
    lugTorque: "150 lb-ft (204 N·m)", lugPattern: "6 x 139.7 mm (6 x 5.5 in)", lugThread: CONFIRM,
    fuelTank: "≈ 18 gal (68 L)",
    rearAxle: "Ford 8.8\" (Raptor: Dana 44 AdvanTEK) - SAE 75W-85 Synthetic per axle tag", rearAxleCap: CONFIRM,
    frontDiff: "IFS front differential - synthetic hypoid gear lube per Owner's Manual", frontDiffCap: CONFIRM,
    transferCase: "2-speed electronic shift-on-the-fly / Advanced 4WD with 4A - Motorcraft MERCON LV",
    verify: ["lugTorque", "fuelTank", "rearAxle", "transferCase"] }),

  gen({ id: "transit4", models: ["Transit"], code: "4th Gen (US)", platform: "V363", years: [2015, 2099],
    lugTorque: "150 lb-ft (204 N·m)", lugPattern: "SRW: 5 x 160 mm · DRW: 6 x 180 mm", lugThread: "M14 x 1.5",
    fuelTank: "≈ 25 gal (95 L) · optional ≈ 31 gal (117 L)",
    rearAxle: "Rear axle - synthetic gear lube per axle tag / Owner's Manual", rearAxleCap: CONFIRM,
    ptu: "AWD transfer unit (2020+) - per Owner's Manual", ptuCap: CONFIRM_WSM,
    components: { RWD: ["rear"], AWD: ["rear", "ptu"] },
    notes: ["DRW: retorque lug nuts after the first 50-100 mi following a wheel change.", "Ford: torque the rear axle U-bolts every 30,000 mi.",
            "E-Transit: battery electric, RWD only. HV system - dealer service."],
    verify: ["lugTorque", "lugPattern", "fuelTank"] }),

  gen({ id: "eseries", models: ["E-Series"], code: "Cutaway / Stripped Chassis", platform: "E-Series (2021+ powertrain)", years: [2021, 2099],
    lugTorque: "165 lb-ft (224 N·m)", lugPattern: "8-lug - " + CONFIRM.toLowerCase(), lugThread: CONFIRM,
    fuelTank: "≈ 40 gal (151 L) · optional ≈ 55 gal (cutaway)",
    rearAxle: "Heavy-duty rear axle (DRW) - SAE 75W-140 Synthetic per axle tag", rearAxleCap: CONFIRM,
    cabinFilter: "Not equipped (most builds)",
    notes: ["Ford: torque the rear axle U-bolts every 30,000 mi, and repack non-sealed front wheel bearings every 60,000 mi.",
            "Cutaway / stripped chassis: the upfitter's body can change fluid access and some capacities.",
            "DRW: retorque lug nuts after the first 50-100 mi following a wheel change."],
    verify: ["lugTorque", "fuelTank", "rearAxle", "cabinFilter"] })
);

/* ---------------------------------------------------------------------
   ENGINES (new)
   --------------------------------------------------------------------- */
ENGINES.push(
  // ---------- F-150 2027 ----------
  { id: "f150_30eb", models: ["F-150"], name: "3.0L V6 EcoBoost (325 hp)", family: "EcoBoost V6 Twin-Turbo", years: [2027, 2099],
    oilCap: CONFIRM, oilVisc: "SAE 5W-30", oilSpec: "Ford WSS-M2C961-A1", filter: FV, drainTorque: "≈ 20 lb-ft (27 N·m)",
    fuel: R87T, plug: FV, gap: TURBO_GAP, plugMi: 60000, trans: ["10r80"], intervalMi: 5000, intervalMo: 6,
    notes: ["New for 2027. Replaces the 2.7L EcoBoost."], verify: ["oilVisc", "drainTorque", "gap", "plugMi"] },

  // ---------- Mustang ----------
  { id: "mus23", models: ["Mustang"], name: "2.3L EcoBoost I4", family: "EcoBoost I4 Turbo", years: [2024, 2099],
    oilCap: "≈ 5.7 qt (5.4 L)", oilVisc: "SAE 5W-30", oilSpec: "Ford WSS-M2C961-A1", filter: "Motorcraft FL-910S", drainTorque: "≈ 20 lb-ft (27 N·m)",
    fuel: R87T, plug: FV, gap: TURBO_GAP, plugMi: 60000, trans: ["10r80"], intervalMi: 5000, intervalMo: 6,
    verify: ["oilCap", "filter", "drainTorque", "gap", "plugMi"] },
  { id: "mus50gt", models: ["Mustang"], name: "5.0L Coyote V8 (GT)", family: "Coyote V8 Gen 4", years: [2024, 2099],
    oilCap: "≈ 10.0 qt (9.5 L)", oilVisc: "SAE 5W-30 (check oil-fill cap)", oilSpec: "Ford WSS-M2C961-A1", filter: "Motorcraft FL-500S", drainTorque: "≈ 20 lb-ft (27 N·m)",
    fuel: P91R, plug: FV, gap: NA_GAP, plugMi: 100000, trans: ["10r80", "mt82"], intervalMi: 7500, intervalMo: 6,
    verify: ["oilCap", "oilVisc", "drainTorque", "gap"] },
  { id: "mus50dh", models: ["Mustang"], name: "5.0L Coyote V8 (Dark Horse, 500 hp)", family: "Coyote V8 Gen 4", years: [2024, 2099],
    oilCap: "≈ 10.0 qt (9.5 L)", oilVisc: "Check oil-fill cap (track use may call for a different grade)", oilSpec: CONFIRM, filter: "Motorcraft FL-500S", drainTorque: "≈ 20 lb-ft (27 N·m)",
    fuel: P91R, plug: FV, gap: NA_GAP, plugMi: 100000, trans: ["10r80", "tr3160"], intervalMi: 5000, intervalMo: 6,
    verify: ["oilCap", "drainTorque", "gap"] },
  { id: "mus52sc", models: ["Mustang"], name: "5.2L Supercharged V8 (Dark Horse SC)", family: "Predator V8", years: [2026, 2099],
    oilCap: CONFIRM, oilVisc: "SAE 5W-50 Full Synthetic (check oil-fill cap)", oilSpec: CONFIRM, filter: FV, drainTorque: CONFIRM,
    fuel: "Premium unleaded 91 AKI minimum (93 recommended)", plug: FV, gap: FV, plugMi: 60000, trans: ["dct7"], intervalMi: 5000, intervalMo: 6,
    notes: ["The supercharger intercooler uses its own low-temperature coolant loop."], verify: ["oilVisc", "fuel", "plugMi"] },

  // ---------- Mustang Mach-E ----------
  Object.assign({}, EVBASE, { id: "mache_sr", models: ["Mustang Mach-E"], name: "Standard Range battery (≈ 70-73 kWh usable)", years: [2021, 2099],
    fuel: "Electricity - Standard Range ≈ 70-73 kWh usable (NMC or LFP by year)", verify: ["fuel"] }),
  Object.assign({}, EVBASE, { id: "mache_er", models: ["Mustang Mach-E"], name: "Extended Range battery (≈ 88-91 kWh usable)", years: [2021, 2099],
    fuel: "Electricity - Extended Range ≈ 88-91 kWh usable", notes: ["GT and Rally are Extended Range, AWD."], verify: ["fuel"] }),

  // ---------- Bronco ----------
  { id: "br23", models: ["Bronco"], name: "2.3L EcoBoost I4 (300 hp)", family: "EcoBoost I4 Turbo", years: [2021, 2099],
    oilCap: "≈ 6.0 qt (5.7 L)", oilVisc: "SAE 5W-30", oilSpec: "Ford WSS-M2C961-A1", filter: "Motorcraft FL-910S", drainTorque: "≈ 20 lb-ft (27 N·m)",
    fuel: R87T, plug: FV, gap: TURBO_GAP, plugMi: 60000, trans: ["mti550", "10r60"], intervalMi: 5000, intervalMo: 6,
    verify: ["oilCap", "filter", "drainTorque", "gap", "plugMi"] },
  { id: "br27", models: ["Bronco"], name: "2.7L EcoBoost V6 (330 hp)", family: "Nano EcoBoost V6", years: [2021, 2099],
    oilCap: "≈ 6.0 qt (5.7 L)", oilVisc: "SAE 5W-30", oilSpec: "Ford WSS-M2C961-A1", filter: FV, drainTorque: "≈ 20 lb-ft (27 N·m) - composite pan",
    fuel: R87T, plug: FV, gap: TURBO_GAP, plugMi: 60000, trans: ["10r60"], intervalMi: 5000, intervalMo: 6,
    notes: ["Composite (plastic) oil pan: replace the drain plug O-ring each change and never use an impact."],
    verify: ["oilCap", "drainTorque", "gap", "plugMi"] },
  { id: "br30r", models: ["Bronco"], name: "3.0L EcoBoost V6 (Bronco Raptor)", family: "EcoBoost V6 Twin-Turbo", years: [2022, 2099],
    oilCap: CONFIRM, oilVisc: "SAE 5W-30", oilSpec: "Ford WSS-M2C961-A1", filter: FV, drainTorque: CONFIRM,
    fuel: P91R, plug: FV, gap: TURBO_GAP, plugMi: 60000, trans: ["10r60"], intervalMi: 5000, intervalMo: 6,
    verify: ["oilVisc", "gap", "plugMi"] },

  // ---------- Bronco Sport ----------
  { id: "bs15", models: ["Bronco Sport"], name: "1.5L EcoBoost I3", family: "EcoBoost I3 Turbo (Dragon)", years: [2021, 2099],
    oilCap: CONFIRM, oilVisc: "Check oil-fill cap (0W-20 on most 1.5L builds)", oilSpec: CONFIRM, filter: "Motorcraft FL-910S", drainTorque: CONFIRM,
    fuel: R87_, plug: FV, gap: TURBO_GAP, plugMi: 60000, trans: ["8f35"], intervalMi: 5000, intervalMo: 6,
    verify: ["oilVisc", "filter", "gap", "plugMi"] },
  { id: "bs20", models: ["Bronco Sport"], name: "2.0L EcoBoost I4 (Badlands)", family: "EcoBoost I4 Turbo", years: [2021, 2099],
    oilCap: "≈ 5.7 qt (5.4 L)", oilVisc: "SAE 5W-30", oilSpec: "Ford WSS-M2C961-A1", filter: "Motorcraft FL-910S", drainTorque: "≈ 20 lb-ft (27 N·m)",
    fuel: R87T, plug: FV, gap: TURBO_GAP, plugMi: 60000, trans: ["8f35"], intervalMi: 5000, intervalMo: 6,
    verify: ["oilCap", "filter", "drainTorque", "gap", "plugMi"] },

  // ---------- Explorer ----------
  { id: "ex23", models: ["Explorer"], name: "2.3L EcoBoost I4", family: "EcoBoost I4 Turbo", years: [2020, 2099],
    oilCap: "≈ 6.0 qt (5.7 L)", oilVisc: "SAE 5W-30", oilSpec: "Ford WSS-M2C961-A1", filter: "Motorcraft FL-910S", drainTorque: "≈ 20 lb-ft (27 N·m)",
    fuel: R87T, plug: FV, gap: TURBO_GAP, plugMi: 60000, trans: ["10r60"], intervalMi: 5000, intervalMo: 6,
    verify: ["oilCap", "filter", "drainTorque", "gap", "plugMi"] },
  { id: "ex30", models: ["Explorer"], name: "3.0L EcoBoost V6 (ST / Platinum)", family: "EcoBoost V6 Twin-Turbo", years: [2020, 2099],
    oilCap: CONFIRM, oilVisc: "SAE 5W-30", oilSpec: "Ford WSS-M2C961-A1", filter: FV, drainTorque: CONFIRM,
    fuel: P91R, plug: FV, gap: TURBO_GAP, plugMi: 60000, trans: ["10r60"], intervalMi: 5000, intervalMo: 6,
    notes: ["ST: all years. Platinum: 2020-25 and 2027+ (not offered on the 2026 Platinum)."], verify: ["oilVisc", "gap", "plugMi"] },
  { id: "ex33h", models: ["Explorer"], name: "3.3L V6 Hybrid", family: "Cyclone V6 Hybrid", years: [2020, 2024],
    oilCap: CONFIRM, oilVisc: "SAE 5W-20 (check oil-fill cap)", oilSpec: CONFIRM, filter: FV, drainTorque: CONFIRM,
    fuel: R87_, plug: FV, gap: NA_GAP, plugMi: 100000, trans: ["10r60h"], intervalMi: 7500, intervalMo: 6,
    notes: ["High-voltage system (orange cables). Don't service HV components yourself."], verify: ["oilVisc", "gap"] },

  // ---------- Expedition ----------
  { id: "exp35", models: ["Expedition"], name: "3.5L EcoBoost V6", family: "EcoBoost V6 Twin-Turbo", years: [2025, 2099],
    oilCap: "6.0 qt (5.7 L)", oilVisc: "SAE 5W-30", oilSpec: "Ford WSS-M2C961-A1", filter: "Motorcraft FL-500S", drainTorque: "20 lb-ft (27 N·m)",
    fuel: R87T, plug: FV, gap: TURBO_GAP, plugMi: 60000, trans: ["10r80"], intervalMi: 5000, intervalMo: 6,
    verify: ["oilCap", "filter", "gap", "plugMi"] },
  { id: "exp35ho", models: ["Expedition"], name: "3.5L EcoBoost V6 High Output (Tremor / Platinum)", family: "EcoBoost V6 Twin-Turbo HO", years: [2025, 2099],
    oilCap: "6.0 qt (5.7 L)", oilVisc: "SAE 5W-30", oilSpec: "Ford WSS-M2C961-A1", filter: "Motorcraft FL-500S", drainTorque: "20 lb-ft (27 N·m)",
    fuel: P91R, plug: FV, gap: TURBO_GAP, plugMi: 60000, trans: ["10r80"], intervalMi: 5000, intervalMo: 6,
    verify: ["oilCap", "filter", "fuel", "gap", "plugMi"] },

  // ---------- Maverick ----------
  { id: "mav25h", models: ["Maverick"], name: "2.5L Hybrid I4 (191 hp combined)", family: "Duratec I4 Hybrid (Atkinson)", years: [2022, 2099],
    oilCap: CONFIRM, oilVisc: "SAE 0W-20 (check oil-fill cap)", oilSpec: CONFIRM, filter: "Motorcraft FL-910S", drainTorque: CONFIRM,
    fuel: R87_, plug: FV, gap: NA_GAP, plugMi: 100000, trans: ["hf45"], intervalMi: 7500, intervalMo: 6,
    drivesFor: (y) => (y <= 2024 ? ["FWD"] : ["FWD", "AWD"]),
    notes: ["High-voltage system (orange cables). Don't service HV components yourself.", "Hybrid AWD available from 2025."],
    verify: ["oilVisc", "filter", "gap"] },
  { id: "mav20", models: ["Maverick"], name: "2.0L EcoBoost I4 (250 hp)", family: "EcoBoost I4 Turbo", years: [2022, 2099],
    oilCap: "≈ 5.7 qt (5.4 L)", oilVisc: "SAE 5W-30", oilSpec: "Ford WSS-M2C961-A1", filter: "Motorcraft FL-910S", drainTorque: "≈ 20 lb-ft (27 N·m)",
    fuel: R87T, plug: FV, gap: TURBO_GAP, plugMi: 60000, trans: ["8f35"], intervalMi: 5000, intervalMo: 6,
    drivesFor: (y) => (y <= 2024 ? ["FWD", "AWD"] : ["AWD"]),
    notes: ["AWD-only from 2025. Lobo uses a 'Quick Shift' calibration."], verify: ["oilCap", "filter", "drainTorque", "gap", "plugMi"] },

  // ---------- Ranger ----------
  { id: "ra23", models: ["Ranger"], name: "2.3L EcoBoost I4 (270 hp)", family: "EcoBoost I4 Turbo", years: [2024, 2099],
    oilCap: "≈ 6.0 qt (5.7 L)", oilVisc: "SAE 5W-30", oilSpec: "Ford WSS-M2C961-A1", filter: "Motorcraft FL-910S", drainTorque: "≈ 20 lb-ft (27 N·m)",
    fuel: R87T, plug: FV, gap: TURBO_GAP, plugMi: 60000, trans: ["10r60"], intervalMi: 5000, intervalMo: 6,
    verify: ["oilCap", "filter", "drainTorque", "gap", "plugMi"] },
  { id: "ra27", models: ["Ranger"], name: "2.7L EcoBoost V6 (315 hp)", family: "Nano EcoBoost V6", years: [2024, 2099],
    oilCap: "≈ 6.0 qt (5.7 L)", oilVisc: "SAE 5W-30", oilSpec: "Ford WSS-M2C961-A1", filter: FV, drainTorque: "≈ 20 lb-ft (27 N·m) - composite pan",
    fuel: R87T, plug: FV, gap: TURBO_GAP, plugMi: 60000, trans: ["10r60"], intervalMi: 5000, intervalMo: 6,
    verify: ["oilCap", "drainTorque", "gap", "plugMi"] },
  { id: "ra30r", models: ["Ranger"], name: "3.0L EcoBoost V6 (Ranger Raptor)", family: "EcoBoost V6 Twin-Turbo", years: [2024, 2099],
    oilCap: CONFIRM, oilVisc: "SAE 5W-30", oilSpec: "Ford WSS-M2C961-A1", filter: FV, drainTorque: CONFIRM,
    fuel: P91R, plug: FV, gap: TURBO_GAP, plugMi: 60000, trans: ["10r60"], intervalMi: 5000, intervalMo: 6,
    drives: ["4x4"], verify: ["oilVisc", "gap", "plugMi"] },

  // ---------- Transit ----------
  { id: "tr37", models: ["Transit"], name: "3.7L V6 Ti-VCT", family: "Cyclone V6", years: [2015, 2019],
    oilCap: "6.0 qt (5.7 L)", oilVisc: "SAE 5W-20", oilSpec: "Ford WSS-M2C945-A", filter: "Motorcraft FL-500S", drainTorque: "≈ 20 lb-ft (27 N·m)",
    fuel: R87_ + " · E85 OK on Flex-Fuel builds", plug: FV, gap: NA_GAP, plugMi: 100000, trans: ["6r80"], intervalMi: 7500, intervalMo: 6,
    drives: ["RWD"], verify: ["drainTorque", "gap"] },
  { id: "tr35eb1", models: ["Transit"], name: "3.5L EcoBoost V6", family: "EcoBoost V6 Twin-Turbo", years: [2015, 2019],
    oilCap: "6.0 qt (5.7 L)", oilVisc: "SAE 5W-30", oilSpec: "Ford WSS-M2C946-A", filter: "Motorcraft FL-820S", drainTorque: "20 lb-ft (27 N·m)",
    fuel: R87T, plug: FV, gap: TURBO_GAP, plugMi: 60000, trans: ["6r80"], intervalMi: 5000, intervalMo: 6,
    drives: ["RWD"], verify: ["filter", "gap", "plugMi"] },
  { id: "tr32d", models: ["Transit"], name: "3.2L Power Stroke I5 Turbo Diesel", family: "Power Stroke I5 Diesel", years: [2015, 2019],
    oilCap: CONFIRM, oilVisc: CONFIRM, oilSpec: "Ford diesel spec - " + CONFIRM.toLowerCase(), filter: FV, drainTorque: CONFIRM,
    fuel: "Ultra-Low Sulfur Diesel (ULSD) only - up to B20 biodiesel · DEF: API-certified, ISO 22241",
    plug: "N/A - diesel (glow plugs)", gap: "N/A", plugMi: null,
    fuelFilter: FV + " (fuel filter / water separator)", fuelFilterMi: 30000,
    trans: ["6r80"], intervalMi: 7500, intervalMo: 6, drives: ["RWD"],
    notes: ["Drain the water separator when the message center asks."], verify: ["fuelFilterMi"] },
  { id: "tr35", models: ["Transit"], name: "3.5L V6 PFDi (275 hp)", family: "Cyclone V6 (port + direct injection)", years: [2020, 2099],
    oilCap: "≈ 6.0 qt (5.7 L)", oilVisc: "SAE 5W-30", oilSpec: "Ford WSS-M2C961-A1", filter: "Motorcraft FL-500S", drainTorque: "≈ 20 lb-ft (27 N·m)",
    fuel: R87_, plug: FV, gap: NA_GAP, plugMi: 100000, trans: ["10r80"], intervalMi: 7500, intervalMo: 6,
    verify: ["oilCap", "oilVisc", "filter", "drainTorque", "gap"] },
  { id: "tr35eb2", models: ["Transit"], name: "3.5L EcoBoost V6 (310 hp)", family: "EcoBoost V6 Twin-Turbo", years: [2020, 2099],
    oilCap: "6.0 qt (5.7 L)", oilVisc: "SAE 5W-30", oilSpec: "Ford WSS-M2C961-A1", filter: "Motorcraft FL-500S", drainTorque: "20 lb-ft (27 N·m)",
    fuel: R87T, plug: FV, gap: TURBO_GAP, plugMi: 60000, trans: ["10r80"], intervalMi: 5000, intervalMo: 6,
    verify: ["oilCap", "filter", "gap", "plugMi"] },
  Object.assign({}, EVBASE, { id: "etransit", models: ["Transit"], name: "E-Transit (battery electric)", years: [2022, 2099],
    fuel: "Electricity - ≈ 68 kWh usable (larger ≈ 89 kWh pack available from 2024)", drives: ["RWD"], verify: ["fuel"] }),

  // ---------- E-Series ----------
  { id: "es73", models: ["E-Series"], name: "7.3L V8 Gas (OHV)", family: "Ford 7.3L Pushrod V8", years: [2021, 2099],
    oilCap: "≈ 8.0 qt (7.6 L)", oilVisc: "SAE 5W-30", oilSpec: "Ford WSS-M2C961-A1", filter: FV, drainTorque: "≈ 20 lb-ft (27 N·m)",
    fuel: R87_, plug: FV, gap: FV, plugMi: 100000, trans: ["6r140"], transYears: { "6r140": [2021, 2099] },
    intervalMi: 7500, intervalMo: 6, verify: ["oilCap", "drainTorque", "plugMi"] }
);

/* ---------------------------------------------------------------------
   Drive restrictions on existing engines
   --------------------------------------------------------------------- */
const _setDrives = (id, d) => { const e = ENGINES.find((x) => x.id === id); if (e) e.drives = d; };
_setDrives("ev", ["4x4"]);             // F-150 Lightning: dual-motor 4x4 only
_setDrives("35eb_ho_g2", ["4x4"]);     // Raptor
_setDrives("35eb_ho_g3", ["4x4"]);     // Raptor
_setDrives("52sc", ["4x4"]);           // Raptor R
_setDrives("58lt", ["4x2"]);           // 1993-95 SVT Lightning

/* Recompute derived flags for all engines */
ENGINES.forEach((e) => { e.models = e.models || ["F-150"]; e.isDiesel = /diesel/i.test(e.family); });
GENERATIONS.forEach((g) => { g.models = g.models || ["F-150"]; });
