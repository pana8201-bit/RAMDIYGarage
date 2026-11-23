/* =====================================================================
   RAM 1500 / 1500 CLASSIC - SPEC DATA (1994 - present)
   ---------------------------------------------------------------------
   Loaded after data.js. Generations and engines carry `models`.

   Generations:
     2nd gen BR  (1994-2001)  Dodge Ram 1500
     3rd gen DR  (2002-2008)  Dodge Ram 1500
     4th gen DS  (2009-2018)  Dodge Ram 1500 (2009-10) / Ram 1500 (2011+)
       ... continued as the "Ram 1500 Classic" (2019-2024)
     5th gen DT  (2019-present) Ram 1500

   Reference values only - see the header of data.js.
   ===================================================================== */

const R15 = ["Ram 1500"];
const R15C = ["Ram 1500 Classic"];

/* ---------------------------------------------------------------------
   GENERATIONS
   --------------------------------------------------------------------- */
const R15_G4 = {
  code: "4th Gen (DS)", platform: "DS",
  lugTorque: "130 lb-ft (176 N·m)", lugPattern: "5 x 5.5 in (5 x 139.7 mm)", lugThread: "M14 x 1.5",
  washer: "≈ 4.5 L (4.75 qt)",
  coolant: "2009-12: " + COOL_HOAT + " · 2013+: " + COOL_OAT + " - check the reservoir label",
  rearAxle: "Chrysler 9.25\" (some AAM) - SAE 75W-85 synthetic GL-5 (2013+) / 75W-140 synthetic (earlier) - add friction modifier for Trac-Lok / anti-spin",
  rearAxleCap: "9.25\": ≈ 2.2-2.4 L (4.6-5.0 pt)",
  frontDiff: "Chrysler 8.0\" / 9.25\" IFS - SAE 75W-90 GL-5 (75W-85 synthetic on later builds - check tag)",
  frontDiffCap: "≈ 1.5-1.7 L (3.2-3.6 pt)",
  transferCase: "NV233 / BW 44-44 / BW 44-45 / BW 44-46 (varies by trim) - Mopar ATF+4 or Mopar transfer case fluid per tag - ≈ 1.2-1.6 L",
  fuelTank: "26 gal (98 L) standard · 32 gal (121 L) on long-bed / some crew cabs",
  airFilter: PN, cabinFilter: PN,
  fuelFilter: "In-tank, part of the fuel pump module - lifetime", fuelFilterMi: null,
  brakeFluid: "Mopar DOT 3 Brake Fluid (DOT 4 on some later builds - check the cap)", brakeMo: 36,
  coolantMi: 150000, coolantMo: 120, coolantNote: "OAT: 10 yr / 150,000 mi · HOAT: 5 yr / 100,000 mi",
  notes: [
    "Air-suspension (2013+ option): set the system to Tire/Jack mode or disable it before lifting the truck.",
    "Rear axle: 75W-85 synthetic replaced 75W-140 on 2013+ trucks - read the axle tag before buying fluid."
  ],
  verify: ["washer", "rearAxle", "rearAxleCap", "frontDiff", "frontDiffCap", "transferCase", "fuelTank", "lugTorque"]
};

GENERATIONS.push(
  {
    id: "r15_g2", models: R15, code: "2nd Gen (BR)", platform: "BR", years: [1994, 2001],
    lugTorque: "≈ 95 lb-ft (129 N·m) - range 85-115 lb-ft", lugPattern: "5 x 5.5 in (5 x 139.7 mm)", lugThread: "1/2-20",
    washer: "≈ 2.8 L (3.0 qt)",
    coolant: "1994-2000: " + COOL_GREEN + " · 2001: " + COOL_HOAT + " - check the reservoir label",
    rearAxle: "Chrysler 9.25\" - SAE 80W-90 / 75W-90 GL-5 (75W-140 synthetic for towing) - add 4 oz friction modifier for Trac-Lok",
    rearAxleCap: "≈ 2.2 L (4.65 pt)",
    frontDiff: "Dana 44 (solid axle) - SAE 75W-90 / 80W-90 GL-5",
    frontDiffCap: "≈ 1.3-1.5 L (2.8-3.2 pt)",
    transferCase: "NV231 / NV241 - Mopar ATF+4 (originally ATF+3) - ≈ 1.2-1.6 L (2.5-3.4 pt)",
    fuelTank: "26 gal (98 L) short bed · 35 gal (132 L) long bed",
    airFilter: PN, cabinFilter: "Not equipped",
    fuelFilter: "Gas: in-tank on most builds - not a routine item", fuelFilterMi: null,
    brakeFluid: "Mopar DOT 3 Brake Fluid", brakeMo: 36,
    coolantMi: 52500, coolantMo: 36, coolantNote: "Green coolant: every 3 yr / 52,500 mi · HOAT: 5 yr / 100,000 mi",
    notes: [
      "Front axle on 4x4: Dana 44 with a vacuum-actuated center axle disconnect (CAD) on most years - check vacuum lines if 4WD won't engage.",
      "Check the ball joints and tie-rod ends at every oil change - a common wear item on 2nd gen trucks."
    ],
    verify: ["lugTorque", "washer", "rearAxleCap", "frontDiffCap", "transferCase", "fuelTank"]
  },
  {
    id: "r15_g3", models: R15, code: "3rd Gen (DR)", platform: "DR", years: [2002, 2008],
    lugTorque: "≈ 135 lb-ft (183 N·m)", lugPattern: "5 x 5.5 in (5 x 139.7 mm)", lugThread: "M14 x 1.5",
    washer: "≈ 4.0 L (4.2 qt)",
    coolant: COOL_HOAT,
    rearAxle: "Chrysler 9.25\" - SAE 75W-140 synthetic GL-5 (some 75W-90) - add friction modifier for Trac-Lok",
    rearAxleCap: "≈ 2.2-2.4 L (4.6-5.0 pt)",
    frontDiff: "Chrysler 8.0\" IFS (4x4) - SAE 75W-90 GL-5",
    frontDiffCap: "≈ 1.5-1.7 L (3.2-3.6 pt)",
    transferCase: "NV233 / NV243 / NV244 (full-time on some) - Mopar ATF+4 - ≈ 1.2-1.6 L",
    fuelTank: "26 gal (98 L) short bed · 34-35 gal (129-132 L) long bed",
    airFilter: PN, cabinFilter: "Not equipped",
    fuelFilter: "In-tank, part of the fuel pump module - lifetime", fuelFilterMi: null,
    brakeFluid: "Mopar DOT 3 Brake Fluid", brakeMo: 36,
    coolantMi: 100000, coolantMo: 60, coolantNote: "HOAT: 5 yr / 100,000 mi",
    notes: ["The 2002 Ram 1500 is a 3rd gen truck; 2500/3500 changed to the 3rd gen body for 2003."],
    verify: ["lugTorque", "washer", "rearAxle", "rearAxleCap", "frontDiffCap", "transferCase", "fuelTank"]
  },
  Object.assign({ id: "r15_g4", models: R15, years: [2009, 2018] }, R15_G4),
  Object.assign({}, R15_G4, { id: "r15_g4c", models: R15C, code: "4th Gen (DS) Classic", platform: "DS (sold alongside the DT)", years: [2019, 2024],
    coolant: COOL_OAT, notes: ["The 1500 Classic is the 4th gen truck continued for 2019-2024 alongside the new DT."].concat(R15_G4.notes) }),
  {
    id: "r15_dt", models: R15, code: "5th Gen (DT)", platform: "DT", years: [2019, 2099],
    lugTorque: "130 lb-ft (176 N·m)", lugPattern: "6 x 5.5 in (6 x 139.7 mm)", lugThread: "M14 x 1.5",
    washer: "≈ 4.5 L (4.75 qt)",
    coolant: COOL_OAT,
    rearAxle: "AAM 9.25\" / 9.5\" (varies) - SAE 75W-85 synthetic GL-5 - add friction modifier only if the axle tag says so",
    rearAxleCap: "≈ 2.0-2.4 L (4.2-5.0 pt)",
    frontDiff: "AAM 9.25\" IFS (4x4) - SAE 75W-85 synthetic GL-5 (check tag)",
    frontDiffCap: "≈ 1.5-1.7 L (3.2-3.6 pt)",
    transferCase: "BorgWarner 48-11 (part-time) / 48-12 (on-demand) - Mopar transfer case fluid per tag - ≈ 1.5 L",
    fuelTank: "23 gal (87 L) or 26 gal (98 L) standard · 33 gal (125 L) optional / TRX / RHO",
    airFilter: PN, cabinFilter: PN,
    fuelFilter: "In-tank, part of the fuel pump module - lifetime", fuelFilterMi: null,
    brakeFluid: "Mopar DOT 3 / DOT 4 Brake Fluid - check the reservoir cap", brakeMo: 36,
    coolantMi: 150000, coolantMo: 120, coolantNote: "OAT: 10 yr / 150,000 mi",
    notes: [
      "6-lug wheels on the DT - 4th gen (5-lug) wheels don't fit.",
      "Air-suspension trucks: turn on Tire/Jack mode before lifting or jacking.",
      "eTorque trucks have a 48V battery behind the rear seat - leave it to the dealer."
    ],
    verify: ["washer", "rearAxle", "rearAxleCap", "frontDiffCap", "transferCase", "fuelTank"]
  }
);

/* ---------------------------------------------------------------------
   ENGINES
   intervalMi / intervalMo are fallbacks; schedule.js supplies the real ones.
   --------------------------------------------------------------------- */
const MAG_PLUG = "Champion RC12LYC (copper) or Mopar equivalent";
const HEMI_NOTE = "5.7L HEMI: use 5W-20 meeting MS-6395 - a lifter / cam wear issue is linked to long idling and thin oil changes. Don't stretch oil changes on trucks that idle a lot.";
const MDS_NOTE = "Multi-Displacement System (cylinder deactivation): use the specified oil grade so the MDS lifters work correctly.";

const ENG = (o) => Object.assign({ intervalMi: 5000, intervalMo: 6, notes: [], verify: [] }, o);

ENGINES.push(
  // ---------- 2nd gen Magnum ----------
  ENG({ id: "r39", models: R15, name: "3.9L V6 Magnum", family: "Magnum V6", years: [1994, 2001],
    oilCap: "4.0 qt (3.8 L) with filter", oilVisc: "SAE 5W-30 (10W-30 above 0 °F)", oilSpec: "API SJ / Chrysler MS-6395",
    filter: "Mopar MO-090 (4105409)", drainTorque: "≈ 25 lb-ft (34 N·m)",
    trans: ["nv3500", "a500"], fuel: R87, plug: MAG_PLUG, gap: "0.035 in (0.89 mm)", plugMi: 30000,
    verify: ["oilCap", "filter", "drainTorque", "plug"] }),
  ENG({ id: "r52", models: R15, name: "5.2L V8 Magnum (318)", family: "Magnum V8", years: [1994, 2001],
    oilCap: "5.0 qt (4.7 L) with filter", oilVisc: "SAE 5W-30 (10W-30 above 0 °F)", oilSpec: "API SJ / Chrysler MS-6395",
    filter: "Mopar MO-090 (4105409)", drainTorque: "≈ 25 lb-ft (34 N·m)",
    trans: ["nv3500", "nv4500", "a518"], transYears: { nv3500: [1994, 2001], nv4500: [1994, 1997] },
    fuel: R87, plug: MAG_PLUG, gap: "0.035 in (0.89 mm)", plugMi: 30000,
    notes: ["Intake manifold plenum gasket leaks are common on Magnum V8s - check for oil consumption / smoke on start-up."],
    verify: ["filter", "drainTorque", "plug"] }),
  ENG({ id: "r59", models: R15, name: "5.9L V8 Magnum (360)", family: "Magnum V8", years: [1994, 2003],
    oilCap: "5.0 qt (4.7 L) with filter", oilVisc: "SAE 5W-30 (10W-30 above 0 °F)", oilSpec: "API SJ / Chrysler MS-6395",
    filter: "Mopar MO-090 (4105409)", drainTorque: "≈ 25 lb-ft (34 N·m)",
    trans: ["nv4500", "a518"], transYears: { nv4500: [1994, 2001] },
    fuel: R87, plug: MAG_PLUG, gap: "0.035 in (0.89 mm)", plugMi: 30000,
    notes: ["Intake manifold plenum gasket leaks are common on Magnum V8s.", "2002-2003: 5.9L carried over into the 3rd gen 1500."],
    verify: ["filter", "drainTorque", "plug"] }),

  // ---------- 3rd gen ----------
  ENG({ id: "r37_g3", models: R15, name: "3.7L V6 PowerTech", family: "PowerTech V6", years: [2002, 2008],
    oilCap: "5.0 qt (4.7 L) with filter", oilVisc: "SAE 5W-30 (5W-20 on 2005+ - check oil-fill cap)", oilSpec: "Chrysler MS-6395",
    filter: "Mopar MO-090 (4105409)", drainTorque: "≈ 25 lb-ft (34 N·m)",
    trans: ["nv3500", "a500", "42rle"], transYears: { a500: [2002, 2002], "42rle": [2003, 2008] },
    fuel: R87, plug: PN, gap: "0.040 in (1.0 mm)", plugMi: 30000,
    verify: ["oilVisc", "filter", "drainTorque", "gap", "plugMi"] }),
  ENG({ id: "r47_g3", models: R15, name: "4.7L V8 PowerTech", family: "PowerTech V8", years: [2002, 2007],
    oilCap: "6.0 qt (5.7 L) with filter", oilVisc: "SAE 5W-30 (5W-20 on 2005+ - check oil-fill cap)", oilSpec: "Chrysler MS-6395",
    filter: "Mopar MO-090 (4105409)", drainTorque: "≈ 25 lb-ft (34 N·m)",
    trans: ["nv3500", "45rfe", "545rfe"], transYears: { nv3500: [2002, 2004], "45rfe": [2002, 2003] },
    fuel: R87FFV, plug: PN, gap: "0.040 in (1.0 mm)", plugMi: 30000,
    notes: ["Overheating is the 4.7L's weak spot (it can drop valve seats). Keep the coolant fresh and the fan clutch working."],
    verify: ["oilVisc", "filter", "drainTorque", "gap", "plugMi"] }),
  ENG({ id: "r47ho", models: R15, name: "4.7L V8 PowerTech (High Output, 310 hp)", family: "PowerTech V8", years: [2008, 2008],
    oilCap: "6.0 qt (5.7 L) with filter", oilVisc: "SAE 5W-20", oilSpec: "Chrysler MS-6395",
    filter: "Mopar MO-090 (4105409)", drainTorque: "≈ 25 lb-ft (34 N·m)",
    trans: ["545rfe"], fuel: R87FFV, plug: PN, gap: "0.040 in (1.0 mm)", plugMi: 30000,
    verify: ["filter", "drainTorque", "gap", "plugMi"] }),
  ENG({ id: "r57_g3", models: R15, name: "5.7L HEMI V8 (2003-2008)", family: "HEMI V8 (Gen III)", years: [2003, 2008],
    oilCap: "7.0 qt (6.6 L) with filter", oilVisc: "SAE 5W-20 (5W-30 on 2003-04 - check oil-fill cap)", oilSpec: "Chrysler MS-6395",
    filter: "Mopar MO-090 (4105409)", drainTorque: "≈ 25 lb-ft (34 N·m)",
    trans: ["545rfe"], fuel: HEMI_FUEL, plug: PN + " - qty 16 (2 per cylinder)", gap: "0.043 in (1.1 mm)", plugMi: 30000,
    notes: [HEMI_NOTE, "2006+ HEMI has MDS. " + MDS_NOTE],
    verify: ["oilVisc", "filter", "drainTorque", "gap", "plugMi"] }),
  ENG({ id: "r83srt", models: R15, name: "8.3L V10 (SRT-10)", family: "Viper V10", years: [2004, 2006], drives: ["4x2"],
    oilCap: CONFIRM, oilVisc: "SAE 10W-30 or 5W-50 synthetic per Owner's Manual", oilSpec: CONFIRM,
    filter: PN, drainTorque: CONFIRM,
    trans: ["t56", "48re"], transYears: { "48re": [2005, 2006] },
    fuel: "Premium unleaded 91 AKI minimum", plug: PN, gap: CONFIRM, plugMi: 100000,
    fuelTank: "≈ 26-35 gal (by cab)",
    notes: ["SRT-10 is a rear-wheel-drive specialty truck - many values here are unconfirmed."],
    verify: ["oilVisc", "plugMi", "fuelTank"] }),

  // ---------- 4th gen (DS) 2009-2018 ----------
  ENG({ id: "r37_g4", models: R15, name: "3.7L V6 PowerTech", family: "PowerTech V6", years: [2009, 2012],
    oilCap: "5.0 qt (4.7 L) with filter", oilVisc: "SAE 5W-20", oilSpec: "Chrysler MS-6395",
    filter: "Mopar MO-090 (4105409)", drainTorque: "≈ 25 lb-ft (34 N·m)",
    trans: ["42rle"], fuel: R87, plug: PN, gap: "0.040 in (1.0 mm)", plugMi: 100000,
    verify: ["filter", "drainTorque", "gap", "plugMi"] }),
  ENG({ id: "r47_g4", models: R15, name: "4.7L V8 PowerTech", family: "PowerTech V8", years: [2009, 2013],
    oilCap: "6.0 qt (5.7 L) with filter", oilVisc: "SAE 5W-20", oilSpec: "Chrysler MS-6395",
    filter: "Mopar MO-090 (4105409)", drainTorque: "≈ 25 lb-ft (34 N·m)",
    trans: ["545rfe", "65rfe"], transYears: { "545rfe": [2009, 2010], "65rfe": [2011, 2013] },
    fuel: R87FFV, plug: PN, gap: "0.040 in (1.0 mm)", plugMi: 100000,
    verify: ["filter", "drainTorque", "gap", "plugMi"] }),
  ENG({ id: "r57_g4", models: R15, name: "5.7L HEMI V8 VVT (MDS)", family: "HEMI V8 (Eagle)", years: [2009, 2018],
    oilCap: "7.0 qt (6.6 L) with filter", oilVisc: "SAE 5W-20", oilSpec: "Chrysler MS-6395",
    filter: "2009-12: Mopar MO-090 (4105409) · 2013+: Mopar MO-349 (68191349AA)", drainTorque: "≈ 25 lb-ft (34 N·m)",
    trans: ["545rfe", "65rfe", "8hp"], transYears: { "545rfe": [2009, 2010], "65rfe": [2011, 2014] },
    fuel: HEMI_FUEL, plug: PN + " - qty 16 (2 per cylinder)", gap: "0.043 in (1.1 mm)", plugMi: 100000,
    notes: [HEMI_NOTE, MDS_NOTE],
    verify: ["filter", "drainTorque", "gap"] }),
  ENG({ id: "r36_g4", models: R15, name: "3.6L V6 Pentastar", family: "Pentastar V6", years: [2013, 2018],
    oilCap: "6.0 qt (5.7 L) with filter", oilVisc: "SAE 5W-20", oilSpec: "Chrysler MS-6395",
    filter: PN + " (cartridge)", drainTorque: "≈ 20 lb-ft (27 N·m) · filter cap ≈ 18 lb-ft (25 N·m)",
    trans: ["8hp"], fuel: R87FFV, plug: PN, gap: "0.043 in (1.1 mm)", plugMi: 100000,
    notes: ["Cartridge oil filter on top of the engine - replace the cap O-ring each time.", "Oil-cooler / filter-housing leaks (plastic housing in the valley) are a known Pentastar issue."],
    verify: ["filter", "drainTorque", "gap"] }),
  ENG({ id: "r30ed_g2", models: R15, name: "3.0L V6 EcoDiesel (Gen 2)", family: "EcoDiesel V6 Turbo Diesel (VM Motori)", years: [2014, 2018],
    oilCap: "≈ 10.5 qt (9.9 L) with filter - " + CONFIRM.toLowerCase(), oilVisc: "SAE 5W-30 full synthetic", oilSpec: "Chrysler MS-10902 (low-ash diesel oil)",
    filter: PN, drainTorque: CONFIRM,
    trans: ["8hp"], fuel: ULSD_DEF, plug: "N/A - diesel (glow plugs are a dealer item)", gap: "N/A", plugMi: null,
    fuelFilter: PN + " (fuel filter / water separator)", fuelFilterMi: 20000,
    notes: ["Only use oil meeting MS-10902 - regular diesel oil can damage the DPF.", "Drain the water separator when the dash shows 'water in fuel'."],
    verify: ["oilCap", "fuelFilterMi"] }),

  // ---------- 1500 Classic (2019-2024) ----------
  ENG({ id: "r36_cl", models: R15C, name: "3.6L V6 Pentastar", family: "Pentastar V6", years: [2019, 2024],
    oilCap: "6.0 qt (5.7 L) with filter", oilVisc: "SAE 5W-20 (0W-20 on some later builds - check oil-fill cap)", oilSpec: "Chrysler MS-6395",
    filter: PN + " (cartridge)", drainTorque: "≈ 20 lb-ft (27 N·m) · filter cap ≈ 18 lb-ft (25 N·m)",
    trans: ["8hp"], fuel: R87FFV, plug: PN, gap: "0.043 in (1.1 mm)", plugMi: 100000,
    notes: ["Cartridge oil filter on top of the engine - replace the cap O-ring each time."],
    verify: ["oilVisc", "drainTorque", "gap"] }),
  ENG({ id: "r57_cl", models: R15C, name: "5.7L HEMI V8 VVT (MDS)", family: "HEMI V8 (Eagle)", years: [2019, 2024],
    oilCap: "7.0 qt (6.6 L) with filter", oilVisc: "SAE 5W-20", oilSpec: "Chrysler MS-6395",
    filter: "Mopar MO-349 (68191349AA)", drainTorque: "≈ 25 lb-ft (34 N·m)",
    trans: ["8hp"], fuel: HEMI_FUEL, plug: PN + " - qty 16 (2 per cylinder)", gap: "0.043 in (1.1 mm)", plugMi: 100000,
    notes: [HEMI_NOTE, MDS_NOTE],
    verify: ["filter", "drainTorque", "gap"] }),

  // ---------- 5th gen (DT) 2019+ ----------
  ENG({ id: "r36_et", models: R15, name: "3.6L V6 Pentastar eTorque (mild hybrid)", family: "Pentastar V6 eTorque", years: [2019, 2024],
    oilCap: "≈ 6.0 qt (5.7 L) with filter", oilVisc: "SAE 0W-20 (check oil-fill cap)", oilSpec: "Chrysler MS-6395",
    filter: PN + " (cartridge)", drainTorque: "≈ 20 lb-ft (27 N·m)",
    trans: ["8hp"], fuel: R87FFV, plug: PN, gap: "0.043 in (1.1 mm)", plugMi: 100000,
    notes: ["eTorque: belt-driven motor-generator plus a 48V battery - the accessory belt and tensioner are special parts."],
    verify: ["oilCap", "oilVisc", "drainTorque", "gap"] }),
  ENG({ id: "r57_dt", models: R15, name: "5.7L HEMI V8 VVT (eTorque or non-eTorque)", family: "HEMI V8 (Eagle)", years: [2019, 2024],
    oilCap: "7.0 qt (6.6 L) with filter", oilVisc: "SAE 5W-20", oilSpec: "Chrysler MS-6395",
    filter: "Mopar MO-349 (68191349AA)", drainTorque: "≈ 25 lb-ft (34 N·m)",
    trans: ["8hp"], fuel: HEMI_FUEL, plug: PN + " - qty 16 (2 per cylinder)", gap: "0.043 in (1.1 mm)", plugMi: 100000,
    notes: [HEMI_NOTE, MDS_NOTE],
    verify: ["filter", "drainTorque", "gap"] }),
  ENG({ id: "r30ed_g3", models: R15, name: "3.0L V6 EcoDiesel (Gen 3)", family: "EcoDiesel V6 Turbo Diesel (VM Motori)", years: [2020, 2023],
    oilCap: CONFIRM, oilVisc: "SAE 5W-30 full synthetic", oilSpec: "Chrysler MS-10902 (low-ash diesel oil)",
    filter: PN, drainTorque: CONFIRM,
    trans: ["8hp"], fuel: ULSD_DEF, plug: "N/A - diesel (glow plugs are a dealer item)", gap: "N/A", plugMi: null,
    fuelFilter: PN + " (fuel filter / water separator)", fuelFilterMi: 20000,
    notes: ["Only use oil meeting MS-10902 - regular diesel oil can damage the DPF.", "Drain the water separator when the dash shows 'water in fuel'."],
    verify: ["fuelFilterMi"] }),
  ENG({ id: "r62trx", models: R15, name: "6.2L Supercharged HEMI V8 (TRX, 702 hp)", family: "HEMI V8 Supercharged (Hellcat)", years: [2021, 2024], drives: ["4x4"],
    oilCap: "≈ 7.0 qt (6.6 L) with filter", oilVisc: "SAE 0W-40 full synthetic", oilSpec: "Chrysler MS-12633",
    filter: PN, drainTorque: "≈ 25 lb-ft (34 N·m)",
    trans: ["8hp95"], fuel: "Premium unleaded 91 AKI minimum (93 recommended)", plug: PN, gap: CONFIRM, plugMi: 100000,
    fuelTank: "33 gal (125 L)",
    notes: ["TRX has its own front / rear axles (Dana 60 rear) - see the axle tag for fluid."],
    verify: ["oilCap", "drainTorque", "plugMi"] }),
  ENG({ id: "r30hso", models: R15, name: "3.0L I6 Hurricane Twin-Turbo SO (420 hp)", family: "Hurricane I6 Twin-Turbo", years: [2025, 2099],
    oilCap: CONFIRM, oilVisc: "SAE 0W-20 (check oil-fill cap)", oilSpec: CONFIRM,
    filter: PN, drainTorque: CONFIRM,
    trans: ["8hp"], fuel: R87 + " · 91 AKI recommended for towing", plug: PN, gap: CONFIRM, plugMi: 100000,
    notes: ["New engine for 2025 - many service values aren't published yet. Use your Owner's Manual."],
    verify: ["oilVisc", "fuel", "plugMi"] }),
  ENG({ id: "r30hho", models: R15, name: "3.0L I6 Hurricane Twin-Turbo HO (540 hp, RHO)", family: "Hurricane I6 Twin-Turbo HO", years: [2025, 2099],
    oilCap: CONFIRM, oilVisc: CONFIRM, oilSpec: CONFIRM,
    filter: PN, drainTorque: CONFIRM,
    trans: ["8hp"], fuel: "Premium unleaded 91 AKI recommended", plug: PN, gap: CONFIRM, plugMi: 100000,
    notes: ["New engine for 2025 - many service values aren't published yet. Use your Owner's Manual.", "Offered in the RHO (4x4) and select trims."],
    verify: ["fuel", "plugMi"] }),
  ENG({ id: "r57_26", models: R15, name: "5.7L HEMI V8 VVT (2026+)", family: "HEMI V8 (Eagle)", years: [2026, 2099],
    oilCap: "7.0 qt (6.6 L) with filter", oilVisc: "SAE 5W-20 (check oil-fill cap)", oilSpec: "Chrysler MS-6395",
    filter: "Mopar MO-349 (68191349AA)", drainTorque: "≈ 25 lb-ft (34 N·m)",
    trans: ["8hp"], fuel: HEMI_FUEL, plug: PN + " - qty 16 (2 per cylinder)", gap: "0.043 in (1.1 mm)", plugMi: 100000,
    notes: ["The HEMI returned to the Ram 1500 for 2026 after a one-year break.", HEMI_NOTE],
    verify: ["oilVisc", "filter", "drainTorque", "gap"] })
);
