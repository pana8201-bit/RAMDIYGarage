/* =====================================================================
   F-250 / F-350 (HEAVY DUTY / SUPER DUTY) SPEC DATABASE - 1990-present
   ---------------------------------------------------------------------
   Loaded after data.js. Adds generations, engines and transmissions
   tagged with `models: ["F-250","F-350"]`.

   Same rules as data.js: anything listed in `verify` shows a VERIFY tag.
   Super Duty specs vary widely by SRW/DRW, axle, wheelbase, emissions
   package and build date. Part numbers we're not confident about read
   "confirm P/N by VIN" instead of being guessed.

   Model-year notes:
   - 1990-1997: F-250 / F-250 HD / F-350 on the OBS (8th/9th gen) body.
   - 1997.5-1999: the "F-250 Light Duty" (7-lug) is an F-150-based truck.
     Select F-150 for its engine specs. There is no 1998 MY F-350.
   - 1999+: the Super Duty launched in early 1998 as a 1999 model.
   ===================================================================== */

const HD = ["F-250", "F-350"];
const HD_VIN = "Motorcraft - confirm P/N by VIN";

/* ---------------------------------------------------------------------
   HD GENERATIONS
   --------------------------------------------------------------------- */
GENERATIONS.push(
  {
    id: "hd_obs", models: HD, code: "8th/9th Gen HD", platform: "OBS (F-250 / F-250 HD / F-350)", years: [1990, 1997],
    lugTorque: "140 lb-ft (190 N·m)", lugPattern: "8 x 6.5 in (8 x 165.1 mm)", lugThread: "9/16-18",
    washer: "≈ 3.0 qt (2.8 L)",
    coolant: "Motorcraft Premium (Green) Ethylene Glycol, 50/50 · Diesel: add SCA (Motorcraft FW-15) at each coolant service",
    rearAxle: "F-250: Dana 60/61 or Sterling 10.25\" · F-350: Dana 70 or Sterling 10.25\" - SAE 75W-140 Synthetic (+ XL-3 Friction Modifier for Traction-Lok) - check axle tag",
    rearAxleCap: "Sterling 10.25\": ≈ 7.5 pt (3.5 L) · Dana 60/70: ≈ 6.0-6.5 pt (2.8-3.1 L)",
    transferCase: "Borg-Warner 1356 / 1356 ESOF - Motorcraft MERCON ATF - ≈ 3.25 pt (1.5 L)",
    fuelTank: "Dual tanks (most): ≈ 19.0 gal front (midship) + 18.2 gal rear - varies by wheelbase",
    airFilter: HD_VIN + " (varies by engine)", cabinFilter: "Not equipped",
    fuelFilter: "Gas: Motorcraft FG-800A (inline, frame rail)", fuelFilterMi: 30000,
    frontDiff: "F-250: Dana 50 TTB · F-350: Dana 60 (solid) - SAE 80W-90 Hypoid (75W-90 Synthetic OK)",
    frontDiffCap: "Dana 50 TTB: ≈ 3.8 pt (1.8 L) · Dana 60: ≈ 6.0 pt (2.8 L)",
    brakeFluid: "Motorcraft High Performance DOT 3 (PM-1-C)", brakeMo: 36,
    coolantMi: 36000, coolantMo: 36, coolantNote: "Green coolant: every 3 yr / 36,000 mi. Diesels: test SCA level at each oil change",
    notes: [
      "1997-1999 F-250 'Light Duty' (7-lug, F-150 body): select F-150 to see its engine specs.",
      "F-350 DRW: retorque lug nuts after the first 50-100 mi following a wheel change. Dual rear wheels can lose clamp load as they settle."
    ],
    verify: ["lugTorque", "washer", "rearAxle", "rearAxleCap", "transferCase", "fuelTank", "fuelFilter", "frontDiffCap"]
  },
  {
    id: "sd1", models: HD, code: "Super Duty Gen 1", platform: "P131 / P132 (2005 refresh)", years: [1999, 2007],
    lugTorque: "165 lb-ft (224 N·m)", lugPattern: "8 x 170 mm", lugThread: "M14 x 2.0",
    washer: "≈ 4.0 qt (3.8 L)",
    coolant: "1999-2002: Motorcraft Premium (Green) · 2003-07: Motorcraft Premium Gold - check reservoir label",
    rearAxle: "Sterling 10.5\" (most SRW) · Dana 80 (F-350 DRW, some) - SAE 75W-140 Synthetic (+ XL-3 Friction Modifier for Traction-Lok)",
    rearAxleCap: "Sterling 10.5\": ≈ 7.3 pt (3.5 L) · Dana 80: ≈ 8.0 pt (3.8 L)",
    transferCase: "Borg-Warner 1356 (manual) / 4406 ESOF - Motorcraft MERCON V - ≈ 2.0 qt (1.9 L)",
    fuelTank: "Short bed ≈ 29 gal (110 L) · Long bed ≈ 38 gal (144 L)",
    airFilter: HD_VIN + " (varies by engine)", cabinFilter: "Not equipped",
    fuelFilter: "Gas: inline frame-rail filter - " + HD_VIN, fuelFilterMi: 30000,
    frontDiff: "Dana 50 (some 1999-2004 F-250) / Dana 60 - SAE 75W-90 Synthetic Hypoid",
    frontDiffCap: "≈ 5.5-6.5 pt (2.6-3.1 L) by axle",
    brakeFluid: "Motorcraft High Performance DOT 3 (PM-1-C)", brakeMo: 36,
    coolantMi: 100000, coolantMo: 72, coolantNote: "Gold: first at 6 yr / 100,000 mi, then every 3 yr / 50,000 mi · Green (1999-2002): every 3 yr / 45,000 mi",
    notes: ["2005+ trucks have the coil-spring front 4x4 (radius arm). Front axle U-joints and hub bearings are high-wear items."],
    verify: ["washer", "rearAxleCap", "transferCase", "fuelTank", "fuelFilter", "frontDiffCap"]
  },
  {
    id: "sd2", models: HD, code: "Super Duty Gen 2", platform: "P356", years: [2008, 2010],
    lugTorque: "165 lb-ft (224 N·m)", lugPattern: "8 x 170 mm", lugThread: "M14 x 2.0",
    washer: "≈ 4.0 qt (3.8 L)",
    coolant: "Motorcraft Premium Gold (yellow), 50/50",
    rearAxle: "Sterling 10.5\" (SRW) · Dana 80 (DRW) - SAE 75W-140 Synthetic (+ XL-3 Friction Modifier for Traction-Lok)",
    rearAxleCap: "Sterling 10.5\": ≈ 7.3 pt (3.5 L) · Dana 80: ≈ 8.0 pt (3.8 L)",
    transferCase: "Motorcraft MERCON V - ≈ 2.0 qt (1.9 L)",
    fuelTank: "Short bed ≈ 29 gal (110 L) · Long bed ≈ 38 gal (144 L)",
    airFilter: HD_VIN + " (varies by engine)", cabinFilter: "Not equipped (most builds)",
    fuelFilter: "Gas: inline frame-rail filter - " + HD_VIN, fuelFilterMi: 30000,
    frontDiff: "Dana 60 - SAE 75W-90 Synthetic Hypoid", frontDiffCap: "≈ 5.5-6.5 pt (2.6-3.1 L)",
    brakeFluid: "Motorcraft High Performance DOT 3 (PM-1-C)", brakeMo: 36,
    coolantMi: 100000, coolantMo: 72, coolantNote: "Gold: first at 6 yr / 100,000 mi, then every 3 yr / 50,000 mi",
    notes: [],
    verify: ["washer", "rearAxleCap", "transferCase", "fuelTank", "cabinFilter", "fuelFilter", "frontDiffCap"]
  },
  {
    id: "sd3", models: HD, code: "Super Duty Gen 3", platform: "P473", years: [2011, 2016],
    lugTorque: "165 lb-ft (224 N·m)", lugPattern: "8 x 170 mm", lugThread: "M14 x 2.0",
    washer: "≈ 4.5 qt (4.3 L)",
    coolant: "Motorcraft Orange (VC-3DIL-B), 50/50 - gas and 6.7L diesel",
    rearAxle: "Sterling 10.5\" (SRW) · Dana 80 (DRW) - SAE 75W-140 Synthetic (+ XL-3 Friction Modifier for limited-slip)",
    rearAxleCap: "Sterling 10.5\": ≈ 7.3 pt (3.5 L) · Dana 80: ≈ 8.0 pt (3.8 L)",
    transferCase: "Motorcraft MERCON LV - ≈ 2.0 qt (1.9 L)",
    fuelTank: "Gas: 26 gal SB / 35 gal LB · Diesel: 26 gal SB / 37.5 gal LB",
    airFilter: HD_VIN + " (varies by engine)", cabinFilter: HD_VIN + " (equipped on some builds)",
    fuelFilter: "Gas: in-tank, integrated with fuel pump module - lifetime", fuelFilterMi: null,
    frontDiff: "Dana 60 - SAE 75W-90 Synthetic Hypoid", frontDiffCap: "≈ 5.5-6.5 pt (2.6-3.1 L)",
    brakeFluid: "Motorcraft High Performance DOT 3 (PM-1-C)", brakeMo: 36,
    coolantMi: 150000, coolantMo: 120, coolantNote: "Orange: first at 10 yr / 150,000 mi, then every 5 yr / 75,000 mi",
    notes: ["Diesel: DEF tank ≈ 5 gal. Use API-certified DEF (ISO 22241) only."],
    verify: ["washer", "rearAxleCap", "transferCase", "fuelTank", "cabinFilter", "frontDiffCap"]
  },
  {
    id: "sd4", models: HD, code: "Super Duty Gen 4", platform: "P558 (aluminum body)", years: [2017, 2022],
    lugTorque: "165 lb-ft (224 N·m)", lugPattern: "8 x 170 mm", lugThread: "M14 x 2.0",
    washer: "≈ 4.5 qt (4.3 L)",
    coolant: "Motorcraft Orange (VC-3DIL-B) - some 2020+ use Motorcraft Yellow. Check the reservoir label and never mix",
    rearAxle: "Ford 10.5\" (SRW) · Ford 11.5\" (DRW / high GVWR) - SAE 75W-85 or 75W-140 Synthetic per axle tag / Owner's Manual",
    rearAxleCap: "10.5\": ≈ 3.5 qt (3.3 L) · 11.5\": ≈ 4.0 qt (3.8 L)",
    transferCase: "Motorcraft MERCON LV - ≈ 2.0 qt (1.9 L)",
    fuelTank: "Short bed 34 gal (129 L) · Long bed 48 gal (182 L)",
    airFilter: HD_VIN + " (varies by engine)", cabinFilter: HD_VIN,
    fuelFilter: "Gas: in-tank, integrated with fuel pump module - lifetime", fuelFilterMi: null,
    frontDiff: "Dana 60 (Super 60) - SAE 75W-90 Synthetic Hypoid", frontDiffCap: "≈ 5.5-6.5 pt (2.6-3.1 L)",
    brakeFluid: "Motorcraft DOT 4 LV High Performance (PM-20)", brakeMo: 36,
    coolantMi: 150000, coolantMo: 120, coolantNote: "Orange: first at 10 yr / 150,000 mi, then every 5 yr / 75,000 mi",
    notes: ["Aluminum body: use isolating anti-seize on steel fasteners into aluminum.", "Diesel: DEF tank ≈ 7.5 gal. Use API-certified DEF (ISO 22241) only."],
    verify: ["washer", "coolant", "rearAxle", "rearAxleCap", "transferCase", "cabinFilter", "frontDiffCap"]
  },
  {
    id: "sd5", models: HD, code: "Super Duty Gen 5", platform: "P708", years: [2023, 2099],
    lugTorque: "165 lb-ft (224 N·m)", lugPattern: "8 x 170 mm", lugThread: "M14 x 2.0",
    washer: "≈ 4.5 qt (4.3 L)",
    coolant: "Motorcraft Orange or Yellow - check the reservoir label and never mix",
    rearAxle: "Ford 10.5\" (SRW) · Ford 11.5\" (DRW / high GVWR) - SAE 75W-85 or 75W-140 Synthetic per axle tag / Owner's Manual",
    rearAxleCap: "10.5\": ≈ 3.5 qt (3.3 L) · 11.5\": ≈ 4.0 qt (3.8 L)",
    transferCase: "Motorcraft MERCON LV - ≈ 2.0 qt (1.9 L)",
    fuelTank: "Short bed 34 gal (129 L) · Long bed 48 gal (182 L)",
    airFilter: HD_VIN + " (varies by engine)", cabinFilter: HD_VIN,
    fuelFilter: "Gas: in-tank, integrated with fuel pump module - lifetime", fuelFilterMi: null,
    frontDiff: "Dana 60-class solid front axle - SAE 75W-90 Synthetic Hypoid", frontDiffCap: "≈ 5.5-6.5 pt (2.6-3.1 L)",
    brakeFluid: "Motorcraft DOT 4 LV High Performance (PM-20)", brakeMo: 36,
    coolantMi: 150000, coolantMo: 120, coolantNote: "First at 10 yr / 150,000 mi, then every 5 yr / 75,000 mi",
    notes: ["Diesel: use API-certified DEF (ISO 22241) only."],
    verify: ["lugTorque", "washer", "coolant", "rearAxle", "rearAxleCap", "transferCase", "cabinFilter", "frontDiff", "frontDiffCap"]
  }
);

/* ---------------------------------------------------------------------
   HD TRANSMISSIONS
   --------------------------------------------------------------------- */
// The E4OD stayed in the HD trucks through 1997.
TRANSMISSIONS.find((t) => t.id === "e4od").years = [1990, 1997];

TRANSMISSIONS.push(
  { id: "zf5", name: "ZF S5-42 5-Speed Manual", type: "Manual", years: [1990, 1997],
    fluid: "Motorcraft MERCON ATF",
    capacity: "≈ 3.3 qt (3.1 L)",
    drain: "Drain & fill plugs: ≈ 30-44 lb-ft (40-60 N·m)", pan: "No pan - fill to bottom of fill-plug hole",
    verify: ["fluid", "capacity", "drain"] },
  { id: "c6", name: "C6 3-Speed Automatic", type: "Automatic", years: [1990, 1996],
    fluid: "Motorcraft MERCON ATF",
    capacity: "Total: ≈ 12.0 qt (11.4 L) · Pan drop refill: ≈ 5-6 qt",
    drain: "No drain plug - pan drop service", pan: "Pan bolts: 12-16 lb-ft (16-22 N·m)",
    verify: ["capacity", "pan"] },
  { id: "zf5sd", name: "ZF S5-47 5-Speed Manual", type: "Manual", years: [1999, 2004],
    fluid: "Motorcraft MERCON V ATF (some early builds: synthetic manual transmission fluid - check tag)",
    capacity: "≈ 3.4 qt (3.2 L)",
    drain: "Drain & fill plugs: ≈ 30-44 lb-ft (40-60 N·m)", pan: "No pan - fill to bottom of fill-plug hole",
    verify: ["fluid", "capacity", "drain"] },
  { id: "zf6", name: "ZF S6-650 6-Speed Manual", type: "Manual", years: [1999, 2010],
    fluid: "Motorcraft MERCON V ATF (some early builds: synthetic manual transmission fluid - check tag)",
    capacity: "≈ 3.4 qt (3.2 L)",
    drain: "Drain & fill plugs: ≈ 30-44 lb-ft (40-60 N·m)", pan: "No pan - fill to bottom of fill-plug hole",
    verify: ["fluid", "capacity", "drain"] },
  { id: "5r110w", name: "5R110W TorqShift 5-Speed Automatic", type: "Automatic", years: [2003, 2010],
    fluid: "Motorcraft MERCON SP",
    capacity: "Total: ≈ 17.5 qt (16.6 L) · Pan drop refill: ≈ 7-8 qt",
    drain: "Pan drain plug (most): ≈ 106 lb-in (12 N·m)", pan: "Pan bolts: ≈ 89 lb-in (10 N·m) · Check level hot, in Park, engine idling",
    verify: ["capacity", "drain", "pan"] },
  { id: "6r140", name: "6R140 TorqShift 6-Speed Automatic", type: "Automatic", years: [2011, 2019],
    fluid: "Motorcraft MERCON LV",
    capacity: "Total: ≈ 17.5-19.0 qt (16.6-18.0 L) · Drain & fill: ≈ 8 qt",
    drain: "Pan drain plug: ≈ 106 lb-in (12 N·m)", pan: "Pan bolts: ≈ 89 lb-in (10 N·m) · Level check: hot, engine idling, per WSM",
    verify: ["capacity", "drain", "pan"] },
  { id: "10r100", name: "10R100 10-Speed Automatic", type: "Automatic", years: [2023, 2099],
    fluid: "Motorcraft MERCON ULV (XT-12-QULV) - NOT compatible with MERCON LV",
    capacity: "Total: confirm in WSM",
    drain: "Drain / level-check plug: confirm in WSM", pan: "Level check at operating temperature per WSM procedure",
    verify: ["fluid", "capacity", "drain"] },
  { id: "10r140", name: "10R140 TorqShift 10-Speed Automatic", type: "Automatic", years: [2020, 2099],
    fluid: "Motorcraft MERCON ULV (XT-12-QULV) - NOT compatible with MERCON LV",
    capacity: "Total: ≈ 15.5-17.0 qt (14.7-16.1 L)",
    drain: "Drain / level-check plug: confirm in WSM", pan: "Level check at operating temperature per WSM procedure",
    verify: ["capacity", "drain"] }
);

/* ---------------------------------------------------------------------
   HD ENGINES
   --------------------------------------------------------------------- */
const DIESEL_FUEL_OLD = "Diesel #2 · #1 or winter blend in cold climates (ULSD is the only diesel sold today)";
const DIESEL_FUEL_ULSD = "Ultra-Low Sulfur Diesel (ULSD) only - up to B20 biodiesel";
const HD_R87 = "Regular unleaded 87 AKI";

ENGINES.push(
  // ---------------- OBS 1990-1997 ----------------
  { id: "hd49i6", models: HD, name: "4.9L I6 (300 CID)", family: "Ford Inline-Six", years: [1990, 1996],
    oilCap: "6.0 qt (5.7 L)", oilVisc: "SAE 10W-30 (5W-30 cold climates)", oilSpec: "API SG/SH · Ford ESE-M2C153",
    filter: "Motorcraft FL-1A", drainTorque: "15-25 lb-ft (20-34 N·m)",
    fuel: HD_R87, plug: "Motorcraft ASF-42C", gap: "0.044 in (1.1 mm)", plugMi: 30000,
    airFilter: "Motorcraft FA-1034",
    trans: ["zf5", "c6", "e4od"], intervalMi: 5000, intervalMo: 6,
    notes: ["Mostly F-250. F-350 availability varies by year and cab."],
    verify: ["plug", "gap", "airFilter"] },
  { id: "hd58", models: HD, name: "5.8L V8 (351W CID) EFI", family: "Windsor V8", years: [1990, 1997],
    oilCap: "6.0 qt (5.7 L)", oilVisc: "SAE 10W-30 (5W-30 cold climates)", oilSpec: "API SG/SH · Ford ESE-M2C153",
    filter: "Motorcraft FL-1A", drainTorque: "15-25 lb-ft (20-34 N·m)",
    fuel: HD_R87, plug: "Motorcraft ASF-42C", gap: "0.044 in (1.1 mm)", plugMi: 30000,
    airFilter: "Motorcraft FA-1034",
    trans: ["zf5", "c6", "e4od"], intervalMi: 5000, intervalMo: 6, notes: [],
    verify: ["plug", "gap", "airFilter"] },
  { id: "hd75", models: HD, name: "7.5L V8 (460 CID) EFI", family: "385-Series Big Block V8", years: [1990, 1997],
    oilCap: "6.0 qt (5.7 L)", oilVisc: "SAE 10W-30 (5W-30 cold climates)", oilSpec: "API SG/SH · Ford ESE-M2C153",
    filter: "Motorcraft FL-1A", drainTorque: "15-25 lb-ft (20-34 N·m)",
    fuel: HD_R87, plug: "Motorcraft ASF-42C", gap: "0.044 in (1.1 mm)", plugMi: 30000,
    trans: ["zf5", "c6", "e4od"], intervalMi: 5000, intervalMo: 6,
    notes: ["Heavy towing: change oil every 3,000 mi."],
    verify: ["filter", "plug", "gap"] },
  { id: "hd73idi", models: HD, name: "7.3L V8 IDI Diesel (Navistar)", family: "IDI V8 Diesel", years: [1990, 1994],
    oilCap: "10.0 qt (9.5 L)", oilVisc: "SAE 15W-40 (10W-30 below 0 °F / -18 °C)", oilSpec: "API CE / CF-4 diesel rated",
    filter: "Motorcraft FL-784", drainTorque: "≈ 25 lb-ft (34 N·m)",
    fuel: DIESEL_FUEL_OLD, plug: "N/A - diesel (glow plugs)", gap: "N/A", plugMi: null,
    fuelFilter: HD_VIN + " (spin-on, top of engine)", fuelFilterMi: 15000,
    trans: ["zf5", "c6", "e4od"], intervalMi: 5000, intervalMo: 6,
    notes: ["Turbocharged from 1993.5 (factory turbo).", "Drain the fuel/water separator at each oil change.", "Diesel coolant needs SCA additive to protect against cylinder cavitation. Test it at each oil change."],
    verify: ["oilCap", "drainTorque", "fuelFilter"] },
  { id: "hd73psd_obs", models: HD, name: "7.3L Power Stroke Turbo Diesel (OBS)", family: "Power Stroke V8 Diesel (HEUI)", years: [1994, 1997],
    oilCap: "15.0 qt (14.2 L)", oilVisc: "SAE 15W-40 (5W-40 synthetic / 10W-30 in cold climates)", oilSpec: "API CG-4 / CH-4 diesel rated",
    filter: "Motorcraft FL-1995", drainTorque: "≈ 15-20 lb-ft (20-27 N·m)",
    fuel: DIESEL_FUEL_OLD, plug: "N/A - diesel (glow plugs)", gap: "N/A", plugMi: null,
    fuelFilter: HD_VIN + " (top-mounted filter / water separator)", fuelFilterMi: 15000,
    trans: ["zf5", "e4od"], intervalMi: 5000, intervalMo: 6,
    notes: ["Introduced as a 1994.5 model.", "HEUI injection is sensitive to oil quality - don't stretch oil intervals.", "Drain the fuel/water separator at each oil change."],
    verify: ["drainTorque", "fuelFilter"] },

  // ---------------- Super Duty 1999-2010 ----------------
  { id: "sd54_2v", models: HD, name: "5.4L V8 2-Valve (Triton)", family: "Modular V8", years: [1999, 2004],
    oilCap: "6.0 qt (5.7 L)", oilVisc: "SAE 5W-30 (1999-2000) · SAE 5W-20 (2001+)", oilSpec: "Ford WSS-M2C930-A (5W-20)",
    filter: "Motorcraft FL-820S", drainTorque: "8-12 lb-ft (11-16 N·m)",
    fuel: HD_R87, plug: "Motorcraft SP-493 (AGSF-32PM) platinum", gap: "0.052-0.056 in (1.3-1.4 mm)", plugMi: 100000,
    trans: ["zf5sd", "4r100"], intervalMi: 5000, intervalMo: 6,
    notes: ["1999-2002 2-valve heads have few spark plug threads - plugs can eject. Hand-start, never over-torque."],
    verify: ["drainTorque", "plug"] },
  { id: "sd68_2v", models: HD, name: "6.8L V10 2-Valve (Triton)", family: "Modular V10", years: [1999, 2004],
    oilCap: "7.0 qt (6.6 L)", oilVisc: "SAE 5W-30 (1999-2000) · SAE 5W-20 (2001+)", oilSpec: "Ford WSS-M2C930-A (5W-20)",
    filter: "Motorcraft FL-820S", drainTorque: "8-12 lb-ft (11-16 N·m)",
    fuel: HD_R87, plug: HD_VIN + " (platinum)", gap: "0.052-0.056 in (1.3-1.4 mm)", plugMi: 100000,
    trans: ["zf6", "4r100"], intervalMi: 5000, intervalMo: 6,
    notes: ["2-valve heads have few spark plug threads - plugs can eject. Hand-start, never over-torque."],
    verify: ["oilCap", "drainTorque", "plug", "gap"] },
  { id: "sd73psd", models: HD, name: "7.3L Power Stroke Turbo Diesel", family: "Power Stroke V8 Diesel (HEUI)", years: [1999, 2003],
    oilCap: "15.0 qt (14.2 L)", oilVisc: "SAE 15W-40 (5W-40 synthetic / 10W-30 in cold climates)", oilSpec: "API CH-4 / CI-4 diesel rated",
    filter: "Motorcraft FL-1995", drainTorque: "≈ 15-20 lb-ft (20-27 N·m)",
    fuel: DIESEL_FUEL_OLD, plug: "N/A - diesel (glow plugs)", gap: "N/A", plugMi: null,
    fuelFilter: "Motorcraft FD-4596 (top-mounted filter / water separator)", fuelFilterMi: 15000,
    trans: ["zf6", "4r100"], intervalMi: 5000, intervalMo: 6,
    notes: ["Drain the fuel/water separator at each oil change.", "Diesel coolant needs SCA protection - test it at each oil change."],
    verify: ["drainTorque", "fuelFilter"] },
  { id: "sd60psd", models: HD, name: "6.0L Power Stroke Turbo Diesel", family: "Power Stroke V8 Diesel (HEUI)", years: [2003, 2007],
    oilCap: "15.0 qt (14.2 L)", oilVisc: "SAE 15W-40 (10W-30 / 5W-40 in cold climates)", oilSpec: "API CJ-4 / CI-4 · Ford WSS-M2C171-E",
    filter: "Motorcraft FL-2016", drainTorque: "≈ 18 lb-ft (24 N·m)",
    fuel: DIESEL_FUEL_ULSD, plug: "N/A - diesel (glow plugs)", gap: "N/A", plugMi: null,
    fuelFilter: HD_VIN + " (engine-mounted + frame-mounted filter set)", fuelFilterMi: 15000,
    trans: ["zf6", "5r110w"], intervalMi: 5000, intervalMo: 6,
    notes: ["Introduced as a 2003.5 model.", "Use Motorcraft Gold coolant only. Watch the oil cooler / EGR cooler temperature split (a sign of cooler failure).", "Oil filter cap: torque to 25 lb-ft (34 N·m)."],
    verify: ["drainTorque", "fuelFilter"] },
  { id: "sd54_3v", models: HD, name: "5.4L V8 3-Valve (Triton)", family: "Modular V8", years: [2005, 2010],
    oilCap: "7.0 qt (6.6 L)", oilVisc: "SAE 5W-20", oilSpec: "Ford WSS-M2C930-A",
    filter: "Motorcraft FL-820S", drainTorque: "≈ 21 lb-ft (28 N·m)",
    fuel: HD_R87 + " · E85 OK on Flex-Fuel builds", plug: "Early (≈2005-07 build): Motorcraft SP-515 (PZT2FE) 2-piece · Later: SP-546 (PZT14F) 1-piece",
    gap: "0.052-0.056 in (1.3-1.4 mm) - pre-gapped", plugMi: 100000,
    trans: ["zf6", "5r110w"], intervalMi: 5000, intervalMo: 6,
    notes: ["Early 3V 2-piece plugs are known to break off in the head. Remove with the engine warm, follow Ford TSB 08-7-6, and have an extractor tool on hand."],
    verify: ["drainTorque", "gap"] },
  { id: "sd68_3v", models: HD, name: "6.8L V10 3-Valve (Triton)", family: "Modular V10", years: [2005, 2010],
    oilCap: "7.0 qt (6.6 L)", oilVisc: "SAE 5W-20", oilSpec: "Ford WSS-M2C930-A",
    filter: "Motorcraft FL-820S", drainTorque: "≈ 21 lb-ft (28 N·m)",
    fuel: HD_R87, plug: "Early: Motorcraft SP-515 (PZT2FE) 2-piece · Later: SP-546 (PZT14F) 1-piece",
    gap: "0.052-0.056 in (1.3-1.4 mm) - pre-gapped", plugMi: 100000,
    trans: ["zf6", "5r110w"], intervalMi: 5000, intervalMo: 6,
    notes: ["Same 3-valve spark plug breakage warning as the 5.4L 3V (Ford TSB 08-7-6)."],
    verify: ["drainTorque", "plug", "gap"] },
  { id: "sd64psd", models: HD, name: "6.4L Power Stroke Twin-Turbo Diesel", family: "Power Stroke V8 Diesel (common rail)", years: [2008, 2010],
    oilCap: "15.0 qt (14.2 L)", oilVisc: "SAE 15W-40 (10W-30 / 5W-40 in cold climates)", oilSpec: "API CJ-4 · Ford WSS-M2C171-E",
    filter: "Motorcraft FL-2016", drainTorque: "≈ 18 lb-ft (24 N·m)",
    fuel: DIESEL_FUEL_ULSD, plug: "N/A - diesel (glow plugs)", gap: "N/A", plugMi: null,
    fuelFilter: HD_VIN + " (frame-mounted + engine-mounted filter set)", fuelFilterMi: 15000,
    trans: ["zf6", "5r110w"], intervalMi: 5000, intervalMo: 6,
    notes: ["Has a diesel particulate filter (DPF). Long idling and short trips speed up oil dilution from regeneration.", "Drain the frame-mounted water separator at each oil change."],
    verify: ["filter", "drainTorque", "fuelFilter", "fuelFilterMi"] },

  // ---------------- Super Duty 2011-present ----------------
  { id: "sd62", models: HD, name: "6.2L V8 (Boss) Gas", family: "Boss V8 (SOHC 2V)", years: [2011, 2022],
    oilCap: "7.0 qt (6.6 L)", oilVisc: "SAE 5W-20", oilSpec: "Ford WSS-M2C945-A",
    filter: "Motorcraft FL-820S", drainTorque: "≈ 20 lb-ft (27 N·m)",
    fuel: HD_R87 + " · E85 OK on Flex-Fuel builds", plug: HD_VIN + " - qty 16 (2 per cylinder)", gap: "≈ 0.050 in (1.3 mm)", plugMi: 100000,
    trans: ["6r140", "10r140"], transYears: { "6r140": [2011, 2019], "10r140": [2020, 2022] }, intervalMi: 7500, intervalMo: 6,
    notes: ["Follow the Intelligent Oil-Life Monitor (IOLM). Shorten intervals when towing heavy.", "2011-19: 6R140 6-speed · 2020-22: 10R140 10-speed."],
    verify: ["oilCap", "drainTorque", "plug", "gap"] },
  { id: "sd67psd_g1", models: HD, name: "6.7L Power Stroke Turbo Diesel (Gen 1)", family: "Power Stroke V8 Diesel (Scorpion)", years: [2011, 2016],
    oilCap: "13.0 qt (12.3 L)", oilVisc: "SAE 10W-30 (15W-40 OK above 0 °F / -18 °C)", oilSpec: "API CJ-4 · Ford WSS-M2C171-E",
    filter: "Motorcraft FL-2051S", drainTorque: "≈ 18 lb-ft (24 N·m)",
    fuel: DIESEL_FUEL_ULSD + " · DEF: API-certified, ISO 22241", plug: "N/A - diesel (glow plugs)", gap: "N/A", plugMi: null,
    fuelFilter: HD_VIN + " (frame-mounted primary + engine-mounted secondary set)", fuelFilterMi: 30000,
    trans: ["6r140"], intervalMi: 10000, intervalMo: 12,
    notes: ["Follow the IOLM, up to 10,000 mi / 12 mo. Severe duty (towing, idling, extreme temperatures): 5,000 mi.", "Drain the water separator when the message center asks, or at each oil change."],
    verify: ["drainTorque", "fuelFilter", "fuelFilterMi"] },
  { id: "sd67psd_g2", models: HD, name: "6.7L Power Stroke Turbo Diesel (Gen 2)", family: "Power Stroke V8 Diesel (Scorpion)", years: [2017, 2022],
    oilCap: "13.0 qt (12.3 L)", oilVisc: "SAE 10W-30 (15W-40 OK above 0 °F / -18 °C)", oilSpec: "API CK-4 · Ford WSS-M2C171-F1",
    filter: "Motorcraft FL-2051S", drainTorque: "≈ 18 lb-ft (24 N·m)",
    fuel: DIESEL_FUEL_ULSD + " · DEF: API-certified, ISO 22241", plug: "N/A - diesel (glow plugs)", gap: "N/A", plugMi: null,
    fuelFilter: HD_VIN + " (frame-mounted primary + engine-mounted secondary set)", fuelFilterMi: 30000,
    trans: ["6r140", "10r140"], transYears: { "6r140": [2017, 2019], "10r140": [2020, 2022] },
    intervalMi: 10000, intervalMo: 12,
    notes: ["2017-19: 6R140 6-speed · 2020-22: 10R140 10-speed.", "Follow the IOLM, up to 10,000 mi / 12 mo. Severe duty: 5,000 mi."],
    verify: ["filter", "drainTorque", "fuelFilter", "fuelFilterMi"] },
  { id: "sd73gas", models: HD, name: "7.3L V8 Gas (OHV)", family: "Ford 7.3L Pushrod V8", years: [2020, 2099],
    oilCap: "8.0 qt (7.6 L)", oilVisc: "SAE 5W-30", oilSpec: "Ford WSS-M2C961-A1",
    filter: HD_VIN, drainTorque: "≈ 20 lb-ft (27 N·m)",
    fuel: HD_R87 + " · E85 OK on Flex-Fuel builds", plug: HD_VIN, gap: HD_VIN, plugMi: 100000,
    trans: ["10r140"], intervalMi: 7500, intervalMo: 6,
    notes: ["Follow the IOLM. Shorten intervals when towing heavy."],
    verify: ["oilCap", "drainTorque", "plugMi"] },
  { id: "sd68v8", models: HD, name: "6.8L V8 Gas (OHV)", family: "Ford Pushrod V8", years: [2023, 2099],
    oilCap: HD_VIN, oilVisc: "SAE 5W-30", oilSpec: "Ford WSS-M2C961-A1",
    filter: HD_VIN, drainTorque: "≈ 20 lb-ft (27 N·m)",
    fuel: HD_R87, plug: HD_VIN, gap: HD_VIN, plugMi: 100000,
    trans: ["10r100"], intervalMi: 7500, intervalMo: 6,
    notes: ["Base gas engine from 2023 (F-250 / F-350 SRW)."],
    verify: ["oilVisc", "drainTorque", "plugMi"] },
  { id: "sd67psd_g3", models: HD, name: "6.7L Power Stroke Turbo Diesel (Std / High Output)", family: "Power Stroke V8 Diesel", years: [2023, 2099],
    oilCap: "≈ 13.0 qt (12.3 L)", oilVisc: "SAE 10W-30", oilSpec: "API CK-4 · Ford WSS-M2C171-F1",
    filter: HD_VIN, drainTorque: "≈ 18 lb-ft (24 N·m)",
    fuel: DIESEL_FUEL_ULSD + " · DEF: API-certified, ISO 22241", plug: "N/A - diesel (glow plugs)", gap: "N/A", plugMi: null,
    fuelFilter: HD_VIN + " (primary + secondary set)", fuelFilterMi: 30000,
    trans: ["10r140"], intervalMi: 10000, intervalMo: 12,
    notes: ["Follow the IOLM, up to 10,000 mi / 12 mo. Severe duty: 5,000 mi."],
    verify: ["oilCap", "drainTorque", "fuelFilterMi"] }
);

/* Engines marked diesel get a water-separator item in the schedule */
ENGINES.forEach((e) => { e.models = e.models || ["F-150"]; e.isDiesel = /diesel/i.test(e.family); });
GENERATIONS.forEach((g) => { g.models = g.models || ["F-150"]; });

SERVICE_TYPES.splice(5, 0, "Fuel/Water Separator Drain", "DEF Refill");
