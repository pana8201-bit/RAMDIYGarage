/* =====================================================================
   RAM 2500 / 3500 HEAVY DUTY + CHASSIS CAB - SPEC DATA (1994 - present)
   ---------------------------------------------------------------------
   Loaded after data-1500.js.

   Generations:
     2nd gen BR/BE (1994-2002)  Dodge Ram 2500/3500
     3rd gen DR/DH (2003-2009)  Dodge Ram 2500/3500
     4th gen DJ/D2 (2010-2018)  Dodge Ram (2010) / Ram (2011+)
     5th gen DJ/D2 (2019-present)
     Chassis Cab 3500/4500/5500 (2008-present, DD/DP)

   HD specs vary widely by SRW/DRW, axle, wheelbase, emissions package
   and build date. Reference values only - see the header of data.js.
   ===================================================================== */

const HD = ["Ram 2500", "Ram 3500"];
const CC = ["Ram Chassis Cab"];

const CUMMINS_COOL_OLD = COOL_GREEN + " · Cummins: keep SCA / DCA4 at the correct level";
const DANA60_F = "Dana 60 (solid) - SAE 75W-90 synthetic GL-5";
const AAM1150 = "AAM 11.5\" - SAE 75W-85 synthetic GL-5 (75W-90 on earlier builds) - check axle tag";

GENERATIONS.push(
  {
    id: "hd_g2", models: HD, code: "2nd Gen HD (BR/BE)", platform: "BR / BE", years: [1994, 2002],
    lugTorque: "≈ 135 lb-ft (183 N·m) SRW · ≈ 145 lb-ft DRW - check manual", lugPattern: "8 x 6.5 in (8 x 165.1 mm)", lugThread: "9/16-18",
    washer: "≈ 2.8 L (3.0 qt)",
    coolant: "Gas: " + COOL_GREEN + " · " + CUMMINS_COOL_OLD,
    rearAxle: "Dana 80 (3500 / most diesel 2500) or Dana 70 / AAM 10.5\" - SAE 75W-140 synthetic GL-5 (+ friction modifier for limited slip)",
    rearAxleCap: "Dana 80: ≈ 3.5-3.8 L (7.4-8.0 pt) · Dana 70: ≈ 3.0 L (6.3 pt)",
    frontDiff: "Dana 60 (solid) - SAE 75W-90 / 80W-90 GL-5",
    frontDiffCap: "≈ 2.6-3.0 L (5.5-6.3 pt)",
    transferCase: "NP241 DHD / NV241 HD / NV271 - Mopar ATF+4 (originally ATF+3) - ≈ 2.0-2.5 L",
    fuelTank: "≈ 34-35 gal (129-132 L)",
    airFilter: PN, cabinFilter: "Not equipped",
    fuelFilter: "Gas: in-tank on most builds · Cummins: engine-mounted fuel filter / water separator", fuelFilterMi: null,
    brakeFluid: "Mopar DOT 3 Brake Fluid", brakeMo: 36,
    coolantMi: 52500, coolantMo: 36, coolantNote: "Green: every 3 yr / 52,500 mi",
    notes: [
      "Lube the front suspension / steering grease fittings (tie rods, drag link, ball joints where fitted) at every oil change.",
      "DRW: retorque lug nuts after the first 50-100 mi following a wheel change."
    ],
    verify: ["lugTorque", "washer", "rearAxle", "rearAxleCap", "frontDiffCap", "transferCase", "fuelTank"]
  },
  {
    id: "hd_g3", models: HD, code: "3rd Gen HD (DR/DH)", platform: "DR / DH / D1", years: [2003, 2009],
    lugTorque: "≈ 135-145 lb-ft (183-197 N·m) - check manual for SRW / DRW", lugPattern: "8 x 6.5 in (8 x 165.1 mm)", lugThread: "M14 x 1.5",
    washer: "≈ 4.0 L (4.2 qt)",
    coolant: COOL_HOAT,
    rearAxle: "AAM 11.5\" (most) or Dana 70 / AAM 10.5\" (some gas 2500) - SAE 75W-90 synthetic GL-5 (+ friction modifier for limited slip) - check axle tag",
    rearAxleCap: "AAM 11.5\": ≈ 3.3 L (7.0 pt) · AAM 10.5\": ≈ 2.4 L (5.1 pt)",
    frontDiff: "AAM 9.25\" solid axle - SAE 75W-90 synthetic GL-5",
    frontDiffCap: "≈ 1.7-1.9 L (3.6-4.0 pt)",
    transferCase: "NV271 / NV273 (2003-07) · BW 44-47 / 44-48 (later) - Mopar ATF+4 - ≈ 2.0 L",
    fuelTank: "≈ 34-35 gal (129-132 L)",
    airFilter: PN, cabinFilter: "Not equipped (most builds)",
    fuelFilter: "Gas: in-tank - lifetime · Cummins: engine-mounted fuel filter / water separator", fuelFilterMi: null,
    brakeFluid: "Mopar DOT 3 Brake Fluid", brakeMo: 36,
    coolantMi: 100000, coolantMo: 60, coolantNote: "HOAT: 5 yr / 100,000 mi",
    notes: [
      "Lube the front suspension / steering grease fittings at every oil change.",
      "DRW: retorque lug nuts after the first 50-100 mi following a wheel change.",
      "'Death wobble' on solid-axle 4x4s is usually a worn track bar, tie rods or ball joints - inspect at each oil change."
    ],
    verify: ["lugTorque", "washer", "rearAxle", "rearAxleCap", "frontDiffCap", "transferCase", "fuelTank", "cabinFilter"]
  },
  {
    id: "hd_g4", models: HD, code: "4th Gen HD (DJ/D2)", platform: "DJ / D2", years: [2010, 2018],
    lugTorque: "≈ 130-140 lb-ft (176-190 N·m) - check manual for SRW / DRW", lugPattern: "8 x 6.5 in (8 x 165.1 mm)", lugThread: "M14 x 1.5",
    washer: "≈ 4.5 L (4.75 qt)",
    coolant: "2010-12: " + COOL_HOAT + " · 2013+: " + COOL_OAT + " - check the reservoir label",
    rearAxle: AAM1150 + " · 3500 DRW / HO: AAM 11.8\"", rearAxleCap: "AAM 11.5\": ≈ 3.3 L (7.0 pt) · AAM 11.8\": ≈ 3.6 L (7.6 pt)",
    frontDiff: "AAM 9.25\" solid axle - SAE 75W-90 synthetic GL-5", frontDiffCap: "≈ 1.7-1.9 L (3.6-4.0 pt)",
    transferCase: "BW 44-47 (manual shift) / BW 44-48 (electronic) - Mopar ATF+4 - ≈ 1.8-2.0 L",
    fuelTank: "32 gal (121 L) short bed · 34 gal (129 L) long bed",
    airFilter: PN, cabinFilter: PN,
    fuelFilter: "Gas: in-tank - lifetime · Cummins: chassis-mounted filter / separator + engine filter", fuelFilterMi: null,
    brakeFluid: "Mopar DOT 3 Brake Fluid", brakeMo: 36,
    coolantMi: 150000, coolantMo: 120, coolantNote: "OAT: 10 yr / 150,000 mi · HOAT: 5 yr / 100,000 mi",
    notes: [
      "Lube the front suspension / steering grease fittings at every oil change.",
      "DRW: retorque lug nuts after the first 50-100 mi following a wheel change.",
      "2014+ 2500: coil-spring (5-link) rear; 2013+ 3500: leaf springs with optional rear air."
    ],
    verify: ["lugTorque", "washer", "rearAxle", "rearAxleCap", "frontDiffCap", "transferCase", "fuelTank"]
  },
  {
    id: "hd_g5", models: HD, code: "5th Gen HD", platform: "DJ / D2 (2019 redesign)", years: [2019, 2099],
    lugTorque: "≈ 130-140 lb-ft (176-190 N·m) - check manual for SRW / DRW", lugPattern: "8 x 6.5 in (8 x 165.1 mm)", lugThread: "M14 x 1.5",
    washer: "≈ 4.5 L (4.75 qt)",
    coolant: COOL_OAT,
    rearAxle: AAM1150 + " · 3500 HO: AAM 12.0\"", rearAxleCap: "AAM 11.5\": ≈ 3.3 L (7.0 pt) · AAM 12\": " + CONFIRM.toLowerCase(),
    frontDiff: "AAM 9.25\" solid axle - SAE 75W-90 synthetic GL-5 (Power Wagon: AAM 9.25\" with locker)", frontDiffCap: "≈ 1.7-1.9 L (3.6-4.0 pt)",
    transferCase: "BW 44-47 / 44-48 - Mopar ATF+4 - ≈ 1.8-2.0 L",
    fuelTank: "31-32 gal (117-121 L) short bed · 50 gal (189 L) optional / long bed - varies by cab / bed",
    airFilter: PN, cabinFilter: PN,
    fuelFilter: "Gas: in-tank - lifetime · Cummins: chassis-mounted filter / separator", fuelFilterMi: null,
    brakeFluid: "Mopar DOT 3 / DOT 4 Brake Fluid - check the reservoir cap", brakeMo: 36,
    coolantMi: 150000, coolantMo: 120, coolantNote: "OAT: 10 yr / 150,000 mi",
    notes: [
      "Lube the front suspension / steering grease fittings at every oil change.",
      "DRW: retorque lug nuts after the first 50-100 mi following a wheel change."
    ],
    verify: ["lugTorque", "washer", "rearAxle", "rearAxleCap", "frontDiffCap", "transferCase", "fuelTank"]
  },
  {
    id: "cc_g1", models: CC, code: "Chassis Cab 3500/4500/5500", platform: "DD / DP", years: [2008, 2018],
    lugTorque: "3500: ≈ 140 lb-ft · 4500/5500 (19.5\" wheels): ≈ 250-275 lb-ft - check manual", lugPattern: "3500: 8 x 6.5 in · 4500/5500: 10 x 225 mm (hub-piloted)", lugThread: "3500: M14 x 1.5 · 4500/5500: M22 x 1.5",
    washer: "≈ 4.5 L (4.75 qt)",
    coolant: "2008-12: " + COOL_HOAT + " · 2013+: " + COOL_OAT,
    rearAxle: "3500: AAM 11.5\" / 11.8\" · 4500/5500: Dana S110 / AAM 13.5\" - SAE 75W-90 synthetic GL-5 - check axle tag",
    rearAxleCap: CONFIRM,
    frontDiff: "AAM 9.25\" (3500) / Dana 60 / AAM 10.0\" (4500/5500) - SAE 75W-90 synthetic GL-5", frontDiffCap: CONFIRM,
    transferCase: "BW 44-47 / 44-48 / NV273 - Mopar ATF+4 - ≈ 2.0 L",
    fuelTank: "≈ 22 gal (aft-axle) or 52 gal (midship) - varies by build",
    airFilter: PN, cabinFilter: PN,
    fuelFilter: "Cummins: chassis-mounted filter / separator + engine filter", fuelFilterMi: null,
    brakeFluid: "Mopar DOT 3 Brake Fluid", brakeMo: 36,
    coolantMi: 150000, coolantMo: 120, coolantNote: "OAT: 10 yr / 150,000 mi",
    notes: ["4500/5500 use 19.5\" hub-piloted wheels - torque in stages in a star pattern, retorque after 50-100 mi.",
            "Commercial use is almost always severe duty - use the SEVERE DUTY schedule."],
    verify: ["lugTorque", "lugPattern", "rearAxle", "frontDiff", "transferCase", "fuelTank"]
  },
  {
    id: "cc_g2", models: CC, code: "Chassis Cab 3500/4500/5500", platform: "DD / DP (2019 redesign)", years: [2019, 2099],
    lugTorque: "3500: ≈ 140 lb-ft · 4500/5500 (19.5\" wheels): ≈ 250-275 lb-ft - check manual", lugPattern: "3500: 8 x 6.5 in · 4500/5500: 10 x 225 mm (hub-piloted)", lugThread: "3500: M14 x 1.5 · 4500/5500: M22 x 1.5",
    washer: "≈ 4.5 L (4.75 qt)",
    coolant: COOL_OAT,
    rearAxle: "3500: AAM 11.8\" · 4500/5500: AAM 13.5\" - SAE 75W-90 synthetic GL-5 - check axle tag",
    rearAxleCap: CONFIRM,
    frontDiff: "AAM 9.25\" (3500) / AAM 10.0\" (4500/5500) - SAE 75W-90 synthetic GL-5", frontDiffCap: CONFIRM,
    transferCase: "BW 44-47 / 44-48 - Mopar ATF+4 - ≈ 2.0 L",
    fuelTank: "≈ 22 gal (aft-axle) or 52 gal (midship) - varies by build",
    airFilter: PN, cabinFilter: PN,
    fuelFilter: "Cummins: chassis-mounted filter / separator", fuelFilterMi: null,
    brakeFluid: "Mopar DOT 3 / DOT 4 Brake Fluid - check the reservoir cap", brakeMo: 36,
    coolantMi: 150000, coolantMo: 120, coolantNote: "OAT: 10 yr / 150,000 mi",
    notes: ["4500/5500 use 19.5\" hub-piloted wheels - torque in stages in a star pattern, retorque after 50-100 mi.",
            "Commercial use is almost always severe duty - use the SEVERE DUTY schedule."],
    verify: ["lugTorque", "lugPattern", "rearAxle", "frontDiff", "transferCase", "fuelTank"]
  }
);

const CUM_NOTE_12V = "12-valve P7100 pump: check the 'killer dowel pin' (KDP) behind the timing cover on high-mileage engines.";
const VALVE_LASH = "Cummins: check / set valve lash every 150,000 mi (Mopar schedule on later trucks) - a DIY job with a feeler gauge and barring tool.";

ENGINES.push(
  // ---------- 2nd gen HD (1994-2002) ----------
  ENG({ id: "hd59", models: HD, name: "5.9L V8 Magnum (360) Gas", family: "Magnum V8", years: [1994, 2002],
    oilCap: "5.0 qt (4.7 L) with filter", oilVisc: "SAE 5W-30 (10W-30 above 0 °F)", oilSpec: "API SJ / Chrysler MS-6395",
    filter: "Mopar MO-090 (4105409)", drainTorque: "≈ 25 lb-ft (34 N·m)",
    trans: ["nv4500", "a618"], transYears: { nv4500: [1994, 2001] },
    fuel: R87, plug: MAG_PLUG, gap: "0.035 in (0.89 mm)", plugMi: 30000,
    verify: ["filter", "drainTorque", "plug"] }),
  ENG({ id: "hd80v10", models: HD, name: "8.0L V10 Magnum Gas", family: "Magnum V10", years: [1994, 2003],
    oilCap: "7.0 qt (6.6 L) with filter", oilVisc: "SAE 10W-30", oilSpec: "API SJ / Chrysler MS-6395",
    filter: PN, drainTorque: "≈ 25 lb-ft (34 N·m)",
    trans: ["nv4500", "nv5600", "a618"], transYears: { nv4500: [1994, 2001], nv5600: [2001, 2003] },
    fuel: R87, plug: "Champion QC9MC4 or Mopar equivalent", gap: "0.045 in (1.14 mm)", plugMi: 30000,
    notes: ["Thirsty but durable. Exhaust manifold studs often break - inspect for ticking."],
    verify: ["oilCap", "drainTorque", "plug", "gap"] }),
  ENG({ id: "hd59c12", models: HD, name: "5.9L Cummins 12-Valve Turbo Diesel", family: "Cummins B-Series I6 Diesel (12V)", years: [1994, 1998],
    oilCap: "11.0 qt (10.4 L) with filter", oilVisc: "SAE 15W-40 (5W-40 synthetic in cold climates)", oilSpec: "API CF-4 / CG-4 or later diesel oil",
    filter: "Fleetguard LF3894 or Mopar equivalent", drainTorque: "≈ 60 lb-ft (81 N·m)",
    trans: ["nv4500", "a618"],
    fuel: DSL_OLD, plug: "N/A - diesel (no glow plugs; intake grid heater)", gap: "N/A", plugMi: null,
    fuelFilter: "Fleetguard FF5079 / FS-series (engine-mounted) or Mopar equivalent", fuelFilterMi: 15000,
    notes: [CUM_NOTE_12V, VALVE_LASH.replace("150,000 mi (Mopar schedule on later trucks)", "≈ 24,000-30,000 mi on 12-valve engines")],
    verify: ["filter", "drainTorque", "fuelFilter", "fuelFilterMi"] }),
  ENG({ id: "hd59c24", models: HD, name: "5.9L Cummins 24-Valve ISB Turbo Diesel (VP44)", family: "Cummins B-Series I6 Diesel (24V)", years: [1998, 2002],
    oilCap: "12.0 qt (11.4 L) with filter", oilVisc: "SAE 15W-40 (5W-40 synthetic in cold climates)", oilSpec: "API CH-4 or later diesel oil",
    filter: "Fleetguard LF3894 or Mopar equivalent", drainTorque: "≈ 60 lb-ft (81 N·m)",
    trans: ["nv4500", "nv5600", "a618"], transYears: { nv4500: [1998, 2000], nv5600: [1999, 2002] },
    fuel: DSL_OLD, plug: "N/A - diesel (intake grid heater)", gap: "N/A", plugMi: null,
    fuelFilter: "Fleetguard FS-1251 (engine-mounted) or Mopar equivalent", fuelFilterMi: 15000,
    notes: ["VP44 injection pump: low lift-pump pressure kills it. Fit a fuel pressure gauge and keep the fuel filter fresh.", VALVE_LASH],
    verify: ["filter", "drainTorque", "fuelFilter", "fuelFilterMi"] }),

  // ---------- 3rd gen HD (2003-2009) ----------
  ENG({ id: "hd57_g3", models: HD, name: "5.7L HEMI V8 Gas", family: "HEMI V8 (Gen III)", years: [2003, 2008],
    oilCap: "7.0 qt (6.6 L) with filter", oilVisc: "SAE 5W-20 (5W-30 on 2003-04 - check oil-fill cap)", oilSpec: "Chrysler MS-6395",
    filter: "Mopar MO-090 (4105409)", drainTorque: "≈ 25 lb-ft (34 N·m)",
    trans: ["nv5600", "g56", "545rfe"], transYears: { nv5600: [2003, 2005], g56: [2006, 2008] },
    fuel: HEMI_FUEL, plug: PN + " - qty 16 (2 per cylinder)", gap: "0.043 in (1.1 mm)", plugMi: 30000,
    notes: [HEMI_NOTE],
    verify: ["oilVisc", "filter", "drainTorque", "gap", "plugMi"] }),
  ENG({ id: "hd59c_cr", models: HD, name: "5.9L Cummins Common-Rail Turbo Diesel", family: "Cummins ISB I6 Diesel (common rail)", years: [2003, 2007],
    oilCap: "12.0 qt (11.4 L) with filter", oilVisc: "SAE 15W-40 (5W-40 synthetic in cold climates)", oilSpec: "API CI-4 or later diesel oil",
    filter: "Mopar 5083285AA or Fleetguard LF3894 equivalent", drainTorque: "≈ 60 lb-ft (81 N·m)",
    trans: ["nv5600", "g56", "48re"], transYears: { nv5600: [2003, 2005], g56: [2005, 2007] },
    fuel: ULSD + " (2007: ULSD required)", plug: "N/A - diesel (intake grid heater)", gap: "N/A", plugMi: null,
    fuelFilter: "Mopar 5083285AA family / Fleetguard FS-19 series (engine-mounted)", fuelFilterMi: 15000,
    notes: ["Common-rail injectors are sensitive to water - drain the separator when the 'water in fuel' light comes on.", VALVE_LASH],
    verify: ["filter", "drainTorque", "fuelFilter", "fuelFilterMi"] }),
  ENG({ id: "hd67c_g1", models: HD, name: "6.7L Cummins Turbo Diesel (2007.5-2012)", family: "Cummins ISB 6.7 I6 Diesel", years: [2007, 2012],
    oilCap: "12.0 qt (11.4 L) with filter", oilVisc: "SAE 15W-40 (5W-40 synthetic in cold climates)", oilSpec: "API CJ-4 (low-ash, DPF-safe) - Chrysler MS-10902",
    filter: "Mopar 68032172AA (MO-285) family or Fleetguard LF16035 equivalent", drainTorque: "≈ 60 lb-ft (81 N·m)",
    trans: ["g56", "68rfe"],
    fuel: ULSD, plug: "N/A - diesel (intake grid heater)", gap: "N/A", plugMi: null,
    fuelFilter: PN + " (engine filter / separator)", fuelFilterMi: 30000,
    notes: [
      "6.7L has a DPF and (on 2007.5-2012) no DEF. Long idling and short trips load the DPF - let regenerations finish.",
      "Replace the crankcase vent (CCV) filter every 67,500 mi or so - check your manual.",
      "The 5.9L stayed available early in 2007 MY - pick by engine label if unsure.", VALVE_LASH
    ],
    verify: ["filter", "drainTorque", "fuelFilterMi"] }),

  // ---------- 4th gen HD (2010-2018) ----------
  ENG({ id: "hd57_g4", models: HD, name: "5.7L HEMI V8 VVT Gas", family: "HEMI V8 (Eagle)", years: [2009, 2018],
    oilCap: "7.0 qt (6.6 L) with filter", oilVisc: "SAE 5W-20", oilSpec: "Chrysler MS-6395",
    filter: "2009-12: Mopar MO-090 · 2013+: Mopar MO-349 (68191349AA)", drainTorque: "≈ 25 lb-ft (34 N·m)",
    trans: ["g56", "545rfe", "66rfe"], transYears: { g56: [2009, 2014], "545rfe": [2009, 2010], "66rfe": [2011, 2018] },
    fuel: HEMI_FUEL, plug: PN + " - qty 16 (2 per cylinder)", gap: "0.043 in (1.1 mm)", plugMi: 100000,
    notes: [HEMI_NOTE],
    verify: ["filter", "drainTorque", "gap"] }),
  ENG({ id: "hd64_g4", models: HD, name: "6.4L HEMI V8 Gas (\"392\" truck)", family: "HEMI V8 6.4L (Apache)", years: [2014, 2018],
    oilCap: "7.0 qt (6.6 L) with filter", oilVisc: "SAE 5W-20 (5W-30 in some markets - check oil-fill cap)", oilSpec: "Chrysler MS-6395",
    filter: "Mopar MO-349 (68191349AA)", drainTorque: "≈ 25 lb-ft (34 N·m)",
    trans: ["66rfe"], fuel: HEMI_FUEL, plug: PN + " - qty 16 (2 per cylinder)", gap: "0.043 in (1.1 mm)", plugMi: 100000,
    notes: ["6.4L truck engine has MDS. " + MDS_NOTE],
    verify: ["oilVisc", "drainTorque", "gap"] }),
  ENG({ id: "hd67c_g2", models: HD, name: "6.7L Cummins Turbo Diesel (2013-2018, DEF)", family: "Cummins ISB 6.7 I6 Diesel", years: [2013, 2018],
    oilCap: "12.0 qt (11.4 L) with filter", oilVisc: "SAE 15W-40 (5W-40 synthetic in cold climates)", oilSpec: "API CJ-4 (2013-16) / CK-4 (2017+) - Chrysler MS-10902",
    filter: "Mopar 68032172AA (MO-285) family or Fleetguard LF16035 equivalent", drainTorque: "≈ 60 lb-ft (81 N·m)",
    trans: ["g56", "68rfe"],
    fuel: ULSD_DEF, plug: "N/A - diesel (intake grid heater)", gap: "N/A", plugMi: null,
    fuelFilter: PN + " (chassis + engine filters)", fuelFilterMi: 30000,
    notes: [
      "SCR with DEF from 2013 - keep the DEF tank topped up; the DEF filter is a scheduled item on later trucks.",
      "Replace the crankcase vent (CCV) filter at the interval in your manual (≈ 67,500 mi).", VALVE_LASH
    ],
    verify: ["filter", "drainTorque", "fuelFilterMi"] }),
  ENG({ id: "hd67cho_g2", models: ["Ram 3500"], name: "6.7L Cummins High Output (3500, Aisin)", family: "Cummins ISB 6.7 I6 Diesel HO", years: [2013, 2018],
    oilCap: "12.0 qt (11.4 L) with filter", oilVisc: "SAE 15W-40 (5W-40 synthetic in cold climates)", oilSpec: "API CJ-4 / CK-4 - Chrysler MS-10902",
    filter: "Mopar 68032172AA (MO-285) family or Fleetguard LF16035 equivalent", drainTorque: "≈ 60 lb-ft (81 N·m)",
    trans: ["as68rc"],
    fuel: ULSD_DEF, plug: "N/A - diesel (intake grid heater)", gap: "N/A", plugMi: null,
    fuelFilter: PN + " (chassis + engine filters)", fuelFilterMi: 30000,
    notes: ["High Output 6.7L (3500 only) pairs with the Aisin AS68RC.", VALVE_LASH],
    verify: ["filter", "drainTorque", "fuelFilterMi"] }),

  // ---------- 5th gen HD (2019+) ----------
  ENG({ id: "hd64_g5", models: HD, name: "6.4L HEMI V8 Gas", family: "HEMI V8 6.4L (Apache)", years: [2019, 2099],
    oilCap: "7.0 qt (6.6 L) with filter", oilVisc: "SAE 5W-20 (check oil-fill cap)", oilSpec: "Chrysler MS-6395",
    filter: "Mopar MO-349 (68191349AA)", drainTorque: "≈ 25 lb-ft (34 N·m)",
    trans: ["8hp75hd"], fuel: HEMI_FUEL, plug: PN + " - qty 16 (2 per cylinder)", gap: "0.043 in (1.1 mm)", plugMi: 100000,
    notes: ["8-speed automatic (8HP75-LCV) replaced the 66RFE in 2019 for the 6.4L.", MDS_NOTE],
    verify: ["oilVisc", "drainTorque", "gap"] }),
  ENG({ id: "hd67c_g3", models: HD, name: "6.7L Cummins Turbo Diesel (Standard Output)", family: "Cummins ISB 6.7 I6 Diesel", years: [2019, 2099],
    oilCap: "12.0 qt (11.4 L) with filter", oilVisc: "SAE 15W-40 (5W-40 synthetic in cold climates)", oilSpec: "API CK-4 - Chrysler MS-10902",
    filter: PN, drainTorque: "≈ 60 lb-ft (81 N·m)",
    trans: ["68rfe"], fuel: ULSD_DEF, plug: "N/A - diesel (intake grid heater)", gap: "N/A", plugMi: null,
    fuelFilter: PN + " (chassis filter / water separator)", fuelFilterMi: 30000,
    notes: ["Replace the crankcase vent filter and DEF filter at your manual's intervals.", VALVE_LASH],
    verify: ["drainTorque", "fuelFilterMi"] }),
  ENG({ id: "hd67cho_g3", models: ["Ram 3500"], name: "6.7L Cummins High Output (Aisin)", family: "Cummins ISB 6.7 I6 Diesel HO", years: [2019, 2099],
    oilCap: "12.0 qt (11.4 L) with filter", oilVisc: "SAE 15W-40 (5W-40 synthetic in cold climates)", oilSpec: "API CK-4 - Chrysler MS-10902",
    filter: PN, drainTorque: "≈ 60 lb-ft (81 N·m)",
    trans: ["as69rc"], fuel: ULSD_DEF, plug: "N/A - diesel (intake grid heater)", gap: "N/A", plugMi: null,
    fuelFilter: PN + " (chassis filter / water separator)", fuelFilterMi: 30000,
    notes: ["High Output 6.7L pairs with the Aisin AS69RC (3500 only).", VALVE_LASH],
    verify: ["drainTorque", "fuelFilterMi"] }),

  // ---------- Chassis Cab ----------
  ENG({ id: "cc67c_g1", models: CC, name: "6.7L Cummins Turbo Diesel", family: "Cummins ISB 6.7 I6 Diesel", years: [2008, 2018],
    oilCap: "12.0 qt (11.4 L) with filter", oilVisc: "SAE 15W-40 (5W-40 synthetic in cold climates)", oilSpec: "API CJ-4 / CK-4 - Chrysler MS-10902",
    filter: "Mopar 68032172AA (MO-285) family or Fleetguard LF16035 equivalent", drainTorque: "≈ 60 lb-ft (81 N·m)",
    trans: ["g56", "68rfe", "as68rc"], fuel: ULSD + " · DEF on 2013+ (ISO 22241)", plug: "N/A - diesel", gap: "N/A", plugMi: null,
    fuelFilter: PN + " (chassis + engine filters)", fuelFilterMi: 30000,
    notes: [VALVE_LASH], verify: ["filter", "drainTorque", "fuelFilterMi"] }),
  ENG({ id: "cc57", models: CC, name: "5.7L HEMI V8 Gas (3500)", family: "HEMI V8 (Eagle)", years: [2011, 2018],
    oilCap: "7.0 qt (6.6 L) with filter", oilVisc: "SAE 5W-20", oilSpec: "Chrysler MS-6395",
    filter: "Mopar MO-349 (68191349AA)", drainTorque: "≈ 25 lb-ft (34 N·m)",
    trans: ["66rfe"], fuel: HEMI_FUEL, plug: PN + " - qty 16", gap: "0.043 in (1.1 mm)", plugMi: 100000,
    notes: [HEMI_NOTE], verify: ["filter", "drainTorque", "gap"] }),
  ENG({ id: "cc64_g1", models: CC, name: "6.4L HEMI V8 Gas", family: "HEMI V8 6.4L (Apache)", years: [2014, 2018],
    oilCap: "7.0 qt (6.6 L) with filter", oilVisc: "SAE 5W-20 (check oil-fill cap)", oilSpec: "Chrysler MS-6395",
    filter: "Mopar MO-349 (68191349AA)", drainTorque: "≈ 25 lb-ft (34 N·m)",
    trans: ["66rfe"], fuel: HEMI_FUEL, plug: PN + " - qty 16", gap: "0.043 in (1.1 mm)", plugMi: 100000,
    verify: ["oilVisc", "drainTorque", "gap"] }),
  ENG({ id: "cc67c_g2", models: CC, name: "6.7L Cummins Turbo Diesel", family: "Cummins ISB 6.7 I6 Diesel", years: [2019, 2099],
    oilCap: "12.0 qt (11.4 L) with filter", oilVisc: "SAE 15W-40 (5W-40 synthetic in cold climates)", oilSpec: "API CK-4 - Chrysler MS-10902",
    filter: PN, drainTorque: "≈ 60 lb-ft (81 N·m)",
    trans: ["as69rc"], fuel: ULSD_DEF, plug: "N/A - diesel", gap: "N/A", plugMi: null,
    fuelFilter: PN + " (chassis filter / water separator)", fuelFilterMi: 30000,
    notes: [VALVE_LASH], verify: ["drainTorque", "fuelFilterMi"] }),
  ENG({ id: "cc64_g2", models: CC, name: "6.4L HEMI V8 Gas", family: "HEMI V8 6.4L (Apache)", years: [2019, 2099],
    oilCap: "7.0 qt (6.6 L) with filter", oilVisc: "SAE 5W-20 (check oil-fill cap)", oilSpec: "Chrysler MS-6395",
    filter: "Mopar MO-349 (68191349AA)", drainTorque: "≈ 25 lb-ft (34 N·m)",
    trans: ["66rfe", "8hp75hd"], transYears: { "66rfe": [2019, 2019], "8hp75hd": [2020, 2099] },
    fuel: HEMI_FUEL, plug: PN + " - qty 16", gap: "0.043 in (1.1 mm)", plugMi: 100000,
    verify: ["oilVisc", "drainTorque", "gap"] })
);
