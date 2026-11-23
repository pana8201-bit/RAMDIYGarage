/* =====================================================================
   F-150 FIELD SERVICE REFERENCE - SPEC DATABASE (1990 - present)
   ---------------------------------------------------------------------
   Values compiled from Ford Owner's Manuals / Workshop Manual data and
   Motorcraft application guides. Any field listed in an item's
   `verify` array is flagged in the UI as "VERIFY" - the value is the
   best-known figure but varies by build date / calibration or is
   published inconsistently. ALWAYS confirm against the Owner's Manual,
   Ford Workshop Manual, or motorcraftservice.com before final torque.
   ===================================================================== */

const DATA_VERSION = "2026.11h";

/* ---------------------------------------------------------------------
   GENERATIONS - chassis-level specs shared by every engine in the range
   --------------------------------------------------------------------- */
const GENERATIONS = [
  {
    id: "g8", code: "8th Gen", platform: "Bullnose->Brick (FN)", years: [1990, 1991],
    lugTorque: "100 lb-ft (135 N·m)", lugPattern: "5 x 5.5 in (5 x 139.7 mm)", lugThread: "1/2-20",
    washer: "≈ 3.0 qt (2.8 L)",
    coolant: "Motorcraft Premium (Green) Ethylene Glycol, 50/50",
    rearAxle: "Ford 8.8\" - SAE 80W-90 Hypoid (+4 oz Friction Modifier XL-3 for Traction-Lok)",
    rearAxleCap: "≈ 5.5 pt (2.6 L)",
    transferCase: "Motorcraft MERCON ATF - ≈ 2.0 qt (1.9 L)",
    notes: ["1990-91 trucks use the same powertrain family as 1992-96 (pushrod I6/V8)."],
    verify: ["washer", "rearAxleCap", "transferCase"]
  },
  {
    id: "g9", code: "9th Gen", platform: "OBS (FN)", years: [1992, 1996],
    lugTorque: "100 lb-ft (135 N·m)", lugPattern: "5 x 5.5 in (5 x 139.7 mm)", lugThread: "1/2-20",
    washer: "≈ 3.0 qt (2.8 L)",
    coolant: "Motorcraft Premium (Green) Ethylene Glycol, 50/50",
    rearAxle: "Ford 8.8\" - SAE 80W-90 Hypoid (+4 oz Friction Modifier XL-3 for Traction-Lok)",
    rearAxleCap: "≈ 5.5 pt (2.6 L)",
    transferCase: "Motorcraft MERCON ATF - ≈ 2.0 qt (1.9 L)",
    notes: ["SVT Lightning (1993-95) shares these chassis values."],
    verify: ["washer", "rearAxleCap", "transferCase"]
  },
  {
    id: "g10", code: "10th Gen", platform: "PN96", years: [1997, 2003],
    lugTorque: "100 lb-ft (135 N·m)", lugPattern: "5 x 135 mm (7-lug on 7700 HD)", lugThread: "14 x 2.0 mm",
    washer: "≈ 4.0 qt (3.8 L)",
    coolant: "Motorcraft Premium (Green) - 2002-03 some builds Premium Gold (check cap/tag)",
    rearAxle: "Ford 8.8\" / 9.75\" - SAE 75W-140 Synthetic (+ XL-3 Friction Modifier for Traction-Lok)",
    rearAxleCap: "8.8\": ≈ 5.5 pt (2.6 L) · 9.75\": ≈ 6.5 pt (3.0 L)",
    transferCase: "Motorcraft MERCON ATF (MERCON V) - ≈ 2.0 qt (1.9 L)",
    notes: ["2004 'Heritage' F-150 is a carry-over 10th Gen truck - select 2003 for its specs."],
    verify: ["washer", "rearAxleCap", "transferCase"]
  },
  {
    id: "g11", code: "11th Gen", platform: "P221", years: [2004, 2008],
    lugTorque: "150 lb-ft (204 N·m)", lugPattern: "6 x 135 mm (7-lug on HD Payload)", lugThread: "14 x 2.0 mm",
    washer: "≈ 4.5 qt (4.3 L)",
    coolant: "Motorcraft Premium Gold (yellow), 50/50",
    rearAxle: "Ford 8.8\" / 9.75\" - SAE 75W-140 Synthetic (+ XL-3 Friction Modifier for Traction-Lok)",
    rearAxleCap: "8.8\": ≈ 5.5 pt (2.6 L) · 9.75\": ≈ 6.5 pt (3.0 L)",
    transferCase: "Motorcraft MERCON V - ≈ 1.5 qt (1.4 L)",
    notes: ["Retorque wheel nuts after first 100 mi (160 km) following a wheel change."],
    verify: ["washer", "rearAxleCap", "transferCase"]
  },
  {
    id: "g12", code: "12th Gen", platform: "P415", years: [2009, 2014],
    lugTorque: "150 lb-ft (204 N·m)", lugPattern: "6 x 135 mm", lugThread: "14 x 1.5 mm",
    washer: "≈ 4.5 qt (4.3 L)",
    coolant: "2009-10: Motorcraft Premium Gold · 2011-14: Motorcraft Orange (VC-3DIL-B)",
    rearAxle: "Ford 8.8\" / 9.75\" - 2009-10: SAE 75W-140 Synth · 2011-14: SAE 75W-85 Synth (WSL-M2C192-A)",
    rearAxleCap: "8.8\": ≈ 5.5 pt (2.6 L) · 9.75\": ≈ 6.5 pt (3.0 L)",
    transferCase: "Motorcraft MERCON LV - ≈ 1.5 qt (1.4 L)",
    notes: ["Do NOT mix Gold and Orange coolant - flush when switching."],
    verify: ["washer", "rearAxleCap", "transferCase"]
  },
  {
    id: "g13", code: "13th Gen", platform: "P552 (aluminum body)", years: [2015, 2020],
    lugTorque: "150 lb-ft (204 N·m)", lugPattern: "6 x 135 mm", lugThread: "14 x 1.5 mm",
    washer: "≈ 5.3 qt (5.0 L)",
    coolant: "Motorcraft Orange (VC-3DIL-B / WSS-M97B44-D), 50/50",
    rearAxle: "Ford 8.8\" / 9.75\" - SAE 75W-85 Synthetic (WSL-M2C192-A)",
    rearAxleCap: "8.8\": ≈ 5.5 pt (2.6 L) · 9.75\": ≈ 6.5 pt (3.0 L)",
    transferCase: "Motorcraft MERCON LV - ≈ 1.5 qt (1.4 L)",
    notes: ["Aluminum body: use isolating anti-seize on steel fasteners into aluminum."],
    verify: ["washer", "rearAxleCap", "transferCase"]
  },
  {
    id: "g14", code: "14th Gen", platform: "P702", years: [2021, 2099],
    lugTorque: "150 lb-ft (204 N·m)", lugPattern: "6 x 135 mm", lugThread: "14 x 1.5 mm",
    washer: "≈ 4.5 qt (4.3 L)",
    coolant: "Motorcraft Orange (VC-3DIL-B / WSS-M97B44-D), 50/50",
    rearAxle: "Ford 8.8\" / 9.75\" - SAE 75W-85 Synthetic (WSL-M2C192-A)",
    rearAxleCap: "8.8\": ≈ 5.5 pt (2.6 L) · 9.75\": ≈ 6.5 pt (3.0 L)",
    transferCase: "Motorcraft MERCON LV - ≈ 1.5 qt (1.4 L)",
    notes: ["2024+ refresh: 3.3L V6 dropped; 2.7L EcoBoost becomes base engine."],
    verify: ["washer", "rearAxleCap", "transferCase"]
  }
];

/* ---------------------------------------------------------------------
   ENGINES
   oilCap = with filter change. intervalMi / intervalMo = default
   reminder interval (user can override in tracker).
   --------------------------------------------------------------------- */
const ENGINES = [
  // ---------- 1990-1996 pushrod ----------
  { id: "49i6", name: "4.9L I6 (300 CID)", family: "Ford Inline-Six", years: [1990, 1996],
    oilCap: "6.0 qt (5.7 L)", oilVisc: "SAE 10W-30 (5W-30 cold climates)", oilSpec: "API SG/SH · Ford ESE-M2C153",
    filter: "Motorcraft FL-1A", drainTorque: "15-25 lb-ft (20-34 N·m)",
    trans: ["m5od", "aod", "aode", "e4od"], intervalMi: 5000, intervalMo: 6,
    notes: ["Legendary 300 six. Drain plug is on driver side of pan."] },
  { id: "50v8", name: "5.0L V8 (302 CID) EFI", family: "Windsor V8", years: [1990, 1996],
    oilCap: "6.0 qt (5.7 L)", oilVisc: "SAE 10W-30 (5W-30 cold climates)", oilSpec: "API SG/SH · Ford ESE-M2C153",
    filter: "Motorcraft FL-1A", drainTorque: "15-25 lb-ft (20-34 N·m)",
    trans: ["m5od", "aod", "aode", "e4od"], intervalMi: 5000, intervalMo: 6,
    notes: ["Dual-sump pan on 4x4 - single drain plug at rear sump."] },
  { id: "58v8", name: "5.8L V8 (351W CID) EFI", family: "Windsor V8", years: [1990, 1996],
    oilCap: "6.0 qt (5.7 L)", oilVisc: "SAE 10W-30 (5W-30 cold climates)", oilSpec: "API SG/SH · Ford ESE-M2C153",
    filter: "Motorcraft FL-1A", drainTorque: "15-25 lb-ft (20-34 N·m)",
    trans: ["m5od", "e4od"], intervalMi: 5000, intervalMo: 6, notes: [] },
  { id: "58lt", name: "5.8L V8 SVT Lightning (240 hp)", family: "Windsor V8 (GT40 heads)", years: [1993, 1995],
    oilCap: "6.0 qt (5.7 L)", oilVisc: "SAE 10W-30", oilSpec: "API SH · Ford ESE-M2C153",
    filter: "Motorcraft FL-1A", drainTorque: "15-25 lb-ft (20-34 N·m)",
    trans: ["e4od"], intervalMi: 5000, intervalMo: 6, notes: ["SVT Lightning - 4x2 only."] },

  // ---------- 1997-2010 modular / Essex ----------
  { id: "42v6", name: "4.2L V6 (Essex)", family: "Essex V6", years: [1997, 2008],
    oilCap: "6.0 qt (5.7 L)", oilVisc: "SAE 5W-30 (1997-2000) · SAE 5W-20 (2001+)", oilSpec: "Ford WSS-M2C930-A (5W-20)",
    filter: "Motorcraft FL-820S", drainTorque: "15-21 lb-ft (20-28 N·m)",
    trans: ["m5od", "4r70w", "4r7xe"], intervalMi: 5000, intervalMo: 6,
    notes: ["Not offered 2004 MY; returns 2005-08 on Regular Cab 4x2."], verify: ["drainTorque"] },
  { id: "46v8_2v", name: "4.6L V8 2-Valve (Triton)", family: "Modular V8", years: [1997, 2009],
    oilCap: "6.0 qt (5.7 L)", oilVisc: "SAE 5W-30 (1997-2000) · SAE 5W-20 (2001+)", oilSpec: "Ford WSS-M2C930-A (5W-20)",
    filter: "Motorcraft FL-820S", drainTorque: "8-12 lb-ft (11-16 N·m)",
    trans: ["m5od", "4r70w", "4r7xe"], intervalMi: 5000, intervalMo: 6,
    notes: ["2009: carry-over 2V on XL/STX with 4-speed auto."], verify: ["drainTorque"] },
  { id: "54v8_2v", name: "5.4L V8 2-Valve (Triton)", family: "Modular V8", years: [1997, 2003],
    oilCap: "6.0 qt (5.7 L)", oilVisc: "SAE 5W-30 (1997-2000) · SAE 5W-20 (2001+)", oilSpec: "Ford WSS-M2C930-A (5W-20)",
    filter: "Motorcraft FL-820S", drainTorque: "8-12 lb-ft (11-16 N·m)",
    trans: ["4r70w", "4r100"], intervalMi: 5000, intervalMo: 6,
    notes: ["4R100 behind 5.4 on F-150 7700 / HD applications."], verify: ["drainTorque"] },
  { id: "54sc", name: "5.4L V8 Supercharged (SVT Lightning / Harley-Davidson)", family: "Modular V8 SC", years: [1999, 2004],
    oilCap: "6.0 qt (5.7 L)", oilVisc: "SAE 5W-30", oilSpec: "Ford WSS-M2C929-A",
    filter: "Motorcraft FL-820S", drainTorque: "8-12 lb-ft (11-16 N·m)",
    trans: ["4r100"], intervalMi: 5000, intervalMo: 6,
    notes: ["Eaton M112 supercharger has its own sealed lifetime oil - not part of an engine oil change."],
    verify: ["drainTorque"] },
  { id: "46v8_3v", name: "4.6L V8 3-Valve", family: "Modular V8", years: [2009, 2010],
    oilCap: "6.0 qt (5.7 L)", oilVisc: "SAE 5W-20", oilSpec: "Ford WSS-M2C930-A",
    filter: "Motorcraft FL-820S", drainTorque: "≈ 21 lb-ft (28 N·m)",
    trans: ["6r80"], intervalMi: 5000, intervalMo: 6, notes: [], verify: ["drainTorque"] },
  { id: "54v8_3v", name: "5.4L V8 3-Valve (Triton)", family: "Modular V8", years: [2004, 2010],
    oilCap: "7.0 qt (6.6 L)", oilVisc: "SAE 5W-20", oilSpec: "Ford WSS-M2C930-A",
    filter: "Motorcraft FL-820S", drainTorque: "≈ 21 lb-ft (28 N·m)",
    trans: ["4r7xe", "6r80"], transYears: { "4r7xe": [2004, 2008], "6r80": [2009, 2010] }, intervalMi: 5000, intervalMo: 6,
    notes: ["Cam phaser / VCT health depends on clean oil at correct level - don't stretch intervals.", "Flex-fuel version 2006+."],
    verify: ["drainTorque"] },

  // ---------- 2010-2020 ----------
  { id: "62v8", name: "6.2L V8 (Boss) - Raptor / Harley / Limited", family: "Boss V8 (SOHC 2V)", years: [2010, 2014],
    oilCap: "7.0 qt (6.6 L)", oilVisc: "SAE 5W-20", oilSpec: "Ford WSS-M2C945-A",
    filter: "Motorcraft FL-820S", drainTorque: "≈ 20 lb-ft (27 N·m)",
    trans: ["6r80"], intervalMi: 7500, intervalMo: 6, notes: ["Raptor 2010-14; also SVT, Harley, Platinum/Limited 2011-14."], verify: ["drainTorque"] },
  { id: "37v6", name: "3.7L V6 Ti-VCT (Cyclone)", family: "Cyclone V6", years: [2011, 2014],
    oilCap: "6.0 qt (5.7 L)", oilVisc: "SAE 5W-20", oilSpec: "Ford WSS-M2C945-A",
    filter: "Motorcraft FL-500S", drainTorque: "≈ 20 lb-ft (27 N·m)",
    trans: ["6r80"], intervalMi: 7500, intervalMo: 6, notes: [], verify: ["drainTorque"] },
  { id: "50v8_g1", name: "5.0L V8 Ti-VCT (Coyote Gen 1)", family: "Coyote V8", years: [2011, 2014],
    oilCap: "7.7 qt (7.3 L)", oilVisc: "SAE 5W-20", oilSpec: "Ford WSS-M2C945-A",
    filter: "Motorcraft FL-500S", drainTorque: "20 lb-ft (27 N·m)",
    trans: ["6r80"], intervalMi: 7500, intervalMo: 6, notes: ["Intelligent Oil-Life Monitor (IOLM) - follow message center, max 1 yr."] },
  { id: "35eb_g1", name: "3.5L V6 EcoBoost (Gen 1)", family: "EcoBoost V6 Twin-Turbo", years: [2011, 2016],
    oilCap: "6.0 qt (5.7 L)", oilVisc: "SAE 5W-30", oilSpec: "Ford WSS-M2C946-A",
    filter: "Motorcraft FL-820S", drainTorque: "20 lb-ft (27 N·m)",
    trans: ["6r80"], intervalMi: 5000, intervalMo: 6,
    notes: ["Turbo engine: 5,000 mi / 6 mo recommended for DIY intervals, especially when towing.", "Timing chain stretch sensitive to oil quality."] },
  { id: "35v6", name: "3.5L V6 Ti-VCT (naturally aspirated)", family: "Cyclone V6", years: [2015, 2017],
    oilCap: "6.0 qt (5.7 L)", oilVisc: "SAE 5W-20", oilSpec: "Ford WSS-M2C945-A",
    filter: "Motorcraft FL-500S", drainTorque: "≈ 20 lb-ft (27 N·m)",
    trans: ["6r80"], intervalMi: 7500, intervalMo: 6, notes: [], verify: ["drainTorque"] },
  { id: "27eb_g1", name: "2.7L V6 EcoBoost (Gen 1)", family: "Nano EcoBoost V6", years: [2015, 2017],
    oilCap: "6.0 qt (5.7 L)", oilVisc: "SAE 5W-30", oilSpec: "Ford WSS-M2C946-A",
    filter: "Motorcraft FL-910S", drainTorque: "≈ 20 lb-ft (27 N·m) - composite pan, do not overtighten",
    trans: ["6r80"], intervalMi: 5000, intervalMo: 6,
    notes: ["Composite (plastic) oil pan - replace drain plug O-ring each change; never use impact."], verify: ["drainTorque"] },
  { id: "50v8_g2", name: "5.0L V8 Ti-VCT (Coyote Gen 2)", family: "Coyote V8", years: [2015, 2017],
    oilCap: "7.7 qt (7.3 L)", oilVisc: "SAE 5W-20", oilSpec: "Ford WSS-M2C945-A",
    filter: "Motorcraft FL-500S", drainTorque: "20 lb-ft (27 N·m)",
    trans: ["6r80"], intervalMi: 7500, intervalMo: 6, notes: [] },
  { id: "35eb_g2", name: "3.5L V6 EcoBoost (Gen 2, port+DI)", family: "EcoBoost V6 Twin-Turbo", years: [2017, 2020],
    oilCap: "6.0 qt (5.7 L)", oilVisc: "SAE 5W-30", oilSpec: "Ford WSS-M2C946-B1",
    filter: "Motorcraft FL-500S", drainTorque: "20 lb-ft (27 N·m)",
    trans: ["10r80"], intervalMi: 5000, intervalMo: 6, notes: ["Filter changes from FL-820S (Gen 1) to FL-500S (Gen 2)."] },
  { id: "35eb_ho_g2", name: "3.5L V6 EcoBoost H.O. (Raptor, 450 hp)", family: "EcoBoost V6 Twin-Turbo HO", years: [2017, 2020],
    oilCap: "6.0 qt (5.7 L)", oilVisc: "SAE 5W-30", oilSpec: "Ford WSS-M2C946-B1",
    filter: "Motorcraft FL-500S", drainTorque: "20 lb-ft (27 N·m)",
    trans: ["10r80"], intervalMi: 5000, intervalMo: 6, notes: ["Raptor / Limited 2019-20."] },
  { id: "27eb_g2", name: "2.7L V6 EcoBoost (Gen 2)", family: "Nano EcoBoost V6", years: [2018, 2020],
    oilCap: "6.0 qt (5.7 L)", oilVisc: "SAE 5W-30", oilSpec: "Ford WSS-M2C946-B1",
    filter: "Motorcraft FL-910S", drainTorque: "≈ 20 lb-ft (27 N·m) - composite pan",
    trans: ["10r80"], intervalMi: 5000, intervalMo: 6,
    notes: ["Composite oil pan - hand-start plug, replace O-ring."], verify: ["drainTorque"] },
  { id: "50v8_g3", name: "5.0L V8 Ti-VCT (Coyote Gen 3, PFDI)", family: "Coyote V8", years: [2018, 2020],
    oilCap: "8.8 qt (8.3 L)", oilVisc: "SAE 5W-20", oilSpec: "Ford WSS-M2C945-B1",
    filter: "Motorcraft FL-500S", drainTorque: "20 lb-ft (27 N·m)",
    trans: ["10r80"], intervalMi: 7500, intervalMo: 6, notes: ["Gen 3 capacity increased to 8.8 qt - don't under-fill."] },
  { id: "33v6", name: "3.3L V6 Ti-VCT (PFDI)", family: "Cyclone V6", years: [2018, 2023],
    oilCap: "6.0 qt (5.7 L)", oilVisc: "SAE 5W-20", oilSpec: "Ford WSS-M2C945-B1",
    filter: "Motorcraft FL-500S", drainTorque: "≈ 20 lb-ft (27 N·m)",
    trans: ["6r80", "10r80"], transYears: { "6r80": [2018, 2020], "10r80": [2021, 2023] }, intervalMi: 7500, intervalMo: 6,
    notes: ["2018-20: 6R80 6-speed · 2021-23: 10R80 10-speed."], verify: ["drainTorque"] },
  { id: "30psd", name: "3.0L V6 Power Stroke Turbo Diesel", family: "Lion V6 Diesel", years: [2018, 2021],
    oilCap: "≈ 6.3 qt (6.0 L)", oilVisc: "SAE 5W-30 Diesel", oilSpec: "Ford WSS-M2C171-F1 (Motorcraft 5W-30 Diesel)",
    filter: "Motorcraft FL-2087 (verify by VIN)", drainTorque: "≈ 18 lb-ft (25 N·m)",
    trans: ["10r80"], intervalMi: 7500, intervalMo: 6,
    notes: ["Diesel Exhaust Fluid (DEF) - API certified, ISO 22241.", "Fuel filter / water separator service per IOLM."],
    verify: ["oilCap", "filter", "drainTorque"] },

  // ---------- 2021-present ----------
  { id: "27eb_g3", name: "2.7L V6 EcoBoost", family: "Nano EcoBoost V6", years: [2021, 2026],
    oilCap: "6.0 qt (5.7 L)", oilVisc: "SAE 5W-30", oilSpec: "Ford WSS-M2C961-A1",
    filter: "Motorcraft FL-910S", drainTorque: "≈ 20 lb-ft (27 N·m) - composite pan",
    trans: ["10r80"], intervalMi: 5000, intervalMo: 6, notes: ["Base engine from 2024 MY."], verify: ["drainTorque"] },
  { id: "50v8_g4", name: "5.0L V8 Ti-VCT (Coyote Gen 4)", family: "Coyote V8", years: [2021, 2099],
    oilCap: "8.0 qt (7.6 L)", oilVisc: "SAE 5W-30", oilSpec: "Ford WSS-M2C961-A1",
    filter: "Motorcraft FL-500S", drainTorque: "20 lb-ft (27 N·m)",
    trans: ["10r80"], intervalMi: 7500, intervalMo: 6,
    notes: ["2021+ moved to 5W-30 - check oil fill cap marking."], verify: ["oilCap", "oilVisc"] },
  { id: "35eb_g3", name: "3.5L V6 EcoBoost", family: "EcoBoost V6 Twin-Turbo", years: [2021, 2099],
    oilCap: "6.0 qt (5.7 L)", oilVisc: "SAE 5W-30", oilSpec: "Ford WSS-M2C961-A1",
    filter: "Motorcraft FL-500S", drainTorque: "20 lb-ft (27 N·m)",
    trans: ["10r80"], intervalMi: 5000, intervalMo: 6, notes: [] },
  { id: "35pb", name: "3.5L V6 PowerBoost Full Hybrid", family: "EcoBoost V6 Hybrid", years: [2021, 2099],
    oilCap: "6.0 qt (5.7 L)", oilVisc: "SAE 5W-30", oilSpec: "Ford WSS-M2C961-A1",
    filter: "Motorcraft FL-500S", drainTorque: "20 lb-ft (27 N·m)",
    trans: ["10r80mht"], intervalMi: 5000, intervalMo: 6,
    notes: ["High-voltage system - orange cables. Do not service HV components.", "Pro Power Onboard generator use counts toward engine hours."] },
  { id: "35eb_ho_g3", name: "3.5L V6 EcoBoost H.O. (Raptor)", family: "EcoBoost V6 Twin-Turbo HO", years: [2021, 2099],
    oilCap: "6.0 qt (5.7 L)", oilVisc: "SAE 5W-30", oilSpec: "Ford WSS-M2C961-A1",
    filter: "Motorcraft FL-500S", drainTorque: "20 lb-ft (27 N·m)",
    trans: ["10r80"], intervalMi: 5000, intervalMo: 6, notes: [] },
  { id: "52sc", name: "5.2L V8 Supercharged (Raptor R, 720 hp)", family: "Predator V8", years: [2023, 2099],
    oilCap: "≈ 10.0 qt (9.5 L)", oilVisc: "SAE 5W-50 Full Synthetic", oilSpec: "Ford WSS-M2C931-C",
    filter: "Motorcraft FL-2062 (verify by VIN)", drainTorque: "≈ 20 lb-ft (27 N·m)",
    trans: ["10r80"], intervalMi: 5000, intervalMo: 6,
    notes: ["Supercharger intercooler has its own low-temp coolant loop."],
    verify: ["oilCap", "oilVisc", "filter", "drainTorque"] },
  { id: "ev", name: "Electric - F-150 Lightning (Dual eMotor)", family: "Battery Electric", years: [2022, 2025],
    oilCap: "N/A - no engine oil", oilVisc: "N/A", oilSpec: "N/A",
    filter: "N/A (cabin air filter only)", drainTorque: "N/A",
    trans: ["edu"], intervalMi: 10000, intervalMo: 12,
    notes: ["Tracker defaults to tire rotation / inspection every 10,000 mi.", "HV battery coolant & e-drive fluid are dealer service items."], isEV: true }
];

/* ---------------------------------------------------------------------
   TRANSMISSIONS
   --------------------------------------------------------------------- */
const TRANSMISSIONS = [
  { id: "m5od", name: "M5OD-R2 5-Speed Manual", type: "Manual", years: [1990, 2008],
    fluid: "Motorcraft MERCON ATF (MERCON V on later builds)",
    capacity: "4x2: ≈ 3.0 qt (2.8 L) · 4x4: ≈ 3.6 qt (3.4 L)",
    drain: "Drain & fill plugs: 29-43 lb-ft (39-59 N·m)", pan: "No pan - fill to bottom of fill-plug hole",
    verify: ["capacity"] },
  { id: "aod", name: "AOD 4-Speed Automatic (overdrive)", type: "Automatic", years: [1990, 1993],
    fluid: "Motorcraft MERCON ATF",
    capacity: "Total: ≈ 12.3 qt (11.6 L) · Pan drop refill: ≈ 5 qt",
    drain: "No drain plug - pan drop service", pan: "Pan bolts: 107-119 lb-in (12-13 N·m)",
    verify: ["capacity", "pan"] },
  { id: "aode", name: "AODE / 4R70W 4-Speed Automatic (electronic)", type: "Automatic", years: [1994, 1996],
    fluid: "Motorcraft MERCON ATF",
    capacity: "Total: ≈ 13.9 qt (13.2 L) · Pan drop refill: ≈ 5-6 qt",
    drain: "No drain plug - pan drop service", pan: "Pan bolts: 9-11 lb-ft (12-15 N·m)",
    verify: ["capacity"] },
  { id: "e4od", name: "E4OD 4-Speed Automatic (heavy duty)", type: "Automatic", years: [1990, 1996],
    fluid: "Motorcraft MERCON ATF",
    capacity: "Total: ≈ 16.5 qt (15.6 L) · Pan drop refill: ≈ 7 qt",
    drain: "Some pans have drain plug: 8-12 lb-ft", pan: "Pan bolts: 12-16 lb-ft (16-22 N·m)",
    verify: ["capacity", "drain"] },
  { id: "4r70w", name: "4R70W 4-Speed Automatic", type: "Automatic", years: [1997, 2003],
    fluid: "Motorcraft MERCON V",
    capacity: "Total: ≈ 13.9 qt (13.2 L) · Pan drop refill: ≈ 5-6 qt",
    drain: "No drain plug - pan drop service", pan: "Pan bolts: 9-11 lb-ft (12-15 N·m)",
    verify: ["capacity"] },
  { id: "4r100", name: "4R100 4-Speed Automatic (heavy duty)", type: "Automatic", years: [1998, 2004],
    fluid: "Motorcraft MERCON V",
    capacity: "Total: ≈ 16.5 qt (15.6 L) · Pan drop refill: ≈ 7 qt",
    drain: "Most pans have no drain plug - pan drop service", pan: "Pan bolts: 12-16 lb-ft (16-22 N·m)",
    verify: ["capacity", "pan"] },
  { id: "4r7xe", name: "4R70E / 4R75E 4-Speed Automatic", type: "Automatic", years: [2004, 2009],
    fluid: "Motorcraft MERCON V",
    capacity: "Total: ≈ 14.0 qt (13.3 L) · Pan drop refill: ≈ 5-6 qt",
    drain: "No drain plug - pan drop service", pan: "Pan bolts: 9-11 lb-ft (12-15 N·m)",
    verify: ["capacity"] },
  { id: "6r80", name: "6R80 6-Speed Automatic", type: "Automatic", years: [2009, 2020],
    fluid: "Motorcraft MERCON LV (XT-10-QLVC)",
    capacity: "Total: ≈ 13.1 qt (12.4 L) · Drain & fill: ≈ 5-6 qt",
    drain: "Pan drain plug: ≈ 106 lb-in (12 N·m)", pan: "Pan bolts: 106 lb-in (12 N·m) · Level check: hot (~176-212 °F), engine idling",
    verify: ["capacity", "drain"] },
  { id: "10r80", name: "10R80 10-Speed Automatic", type: "Automatic", years: [2017, 2099],
    fluid: "Motorcraft MERCON ULV (XT-12-QULV) - NOT compatible with MERCON LV",
    capacity: "Total: ≈ 13.1 qt (12.4 L) · Drain & fill: ≈ 4-5 qt",
    drain: "Drain / level-check plug: ≈ 106 lb-in (12 N·m) - verify", pan: "Pan bolts: 106 lb-in (12 N·m) · Level check at 95-113 °F per WSM procedure",
    verify: ["capacity", "drain"] },
  { id: "10r80mht", name: "10R80 MHT 10-Speed (Modular Hybrid Transmission)", type: "Automatic Hybrid", years: [2021, 2099],
    fluid: "Motorcraft MERCON ULV (XT-12-QULV)",
    capacity: "Total: ≈ 13.4 qt (12.7 L)",
    drain: "Drain / level-check plug: ≈ 106 lb-in (12 N·m)", pan: "Dealer service recommended (integrated e-motor)",
    verify: ["capacity", "drain"] },
  { id: "edu", name: "Single-Speed Electric Drive Units (front & rear)", type: "EV", years: [2022, 2025],
    fluid: "Ford-specified e-drive fluid - dealer service", capacity: "N/A for DIY", drain: "N/A", pan: "N/A", verify: [] }
];

/* =====================================================================
   EXTENSION DATA (rev 2026.11b)
   Fuel, ignition, filters, differentials, brake fluid & intervals.
   Merged into GENERATIONS / ENGINES below. Keys in `verify` are
   appended so the UI flags them.
   ===================================================================== */
const GEN_EXT = {
  g8: {
    fuelTank: "Single tank ≈ 34.7 gal (131 L) · Dual-tank option ≈ 37 gal total (by wheelbase)",
    airFilter: "Motorcraft FA-1034", cabinFilter: "Not equipped",
    fuelFilter: "Motorcraft FG-800A (inline, frame rail)", fuelFilterMi: 30000,
    frontDiff: "Dana 44 TTB - SAE 80W-90 Hypoid", frontDiffCap: "≈ 3.5-3.8 pt (1.7-1.8 L)",
    brakeFluid: "Motorcraft High Performance DOT 3 (PM-1-C)", brakeMo: 36,
    coolantMi: 36000, coolantMo: 36, coolantNote: "Green coolant: every 3 yr / 36,000 mi",
    verify: ["fuelTank", "airFilter", "fuelFilter", "frontDiffCap"]
  },
  g9: {
    fuelTank: "Single tank ≈ 34.7 gal (131 L) · Dual-tank option ≈ 37 gal total (by wheelbase)",
    airFilter: "Motorcraft FA-1034", cabinFilter: "Not equipped",
    fuelFilter: "Motorcraft FG-800A (inline, frame rail)", fuelFilterMi: 30000,
    frontDiff: "Dana 44 TTB - SAE 80W-90 Hypoid", frontDiffCap: "≈ 3.5-3.8 pt (1.7-1.8 L)",
    brakeFluid: "Motorcraft High Performance DOT 3 (PM-1-C)", brakeMo: 36,
    coolantMi: 36000, coolantMo: 36, coolantNote: "Green coolant: every 3 yr / 36,000 mi",
    verify: ["fuelTank", "airFilter", "fuelFilter", "frontDiffCap"]
  },
  g10: {
    fuelTank: "Short WB ≈ 25.0 gal (95 L) · Long WB ≈ 30.0 gal (114 L)",
    airFilter: "Motorcraft FA-1632", cabinFilter: "Not equipped",
    fuelFilter: "Motorcraft FG-872 (inline, frame rail)", fuelFilterMi: 30000,
    frontDiff: "Ford 8.8\" IFS - SAE 80W-90 Hypoid", frontDiffCap: "≈ 3.5 pt (1.7 L)",
    brakeFluid: "Motorcraft High Performance DOT 3 (PM-1-C)", brakeMo: 36,
    coolantMi: 45000, coolantMo: 36, coolantNote: "Green: 3 yr / 45,000 mi · Gold (some 2002-03): 6 yr / 100,000 mi first",
    verify: ["fuelTank", "airFilter", "fuelFilter", "frontDiffCap"]
  },
  g11: {
    fuelTank: "Short WB ≈ 26.0 gal (98 L) · Long WB ≈ 30.0 gal (114 L)",
    airFilter: "Motorcraft FA-1754", cabinFilter: "Not equipped (most builds)",
    fuelFilter: "In-tank, integrated with fuel pump module - lifetime", fuelFilterMi: null,
    frontDiff: "Ford 8.8\" IFS - SAE 80W-90 Hypoid", frontDiffCap: "≈ 3.0-3.5 pt (1.4-1.7 L)",
    brakeFluid: "Motorcraft High Performance DOT 3 (PM-1-C)", brakeMo: 36,
    coolantMi: 100000, coolantMo: 72, coolantNote: "Gold: first at 6 yr / 100,000 mi, then every 3 yr / 50,000 mi",
    verify: ["fuelTank", "airFilter", "cabinFilter", "fuelFilter", "frontDiffCap"]
  },
  g12: {
    fuelTank: "Standard 26.0 gal (98 L) · Extended range 36.0 gal (136 L)",
    airFilter: "Motorcraft FA-1883", cabinFilter: "Motorcraft FP-67",
    fuelFilter: "In-tank, integrated with fuel pump module - lifetime", fuelFilterMi: null,
    frontDiff: "Ford 8.8\" IFS - SAE 80W-90 Premium Hypoid", frontDiffCap: "≈ 3.0-3.5 pt (1.4-1.7 L)",
    brakeFluid: "Motorcraft High Performance DOT 3 (PM-1-C)", brakeMo: 36,
    coolantMi: 150000, coolantMo: 120, coolantNote: "Orange (2011+): first at 10 yr / 150,000 mi, then every 5 yr / 75,000 mi · Gold (2009-10): 6 yr / 100,000 mi",
    verify: ["cabinFilter", "frontDiffCap"]
  },
  g13: {
    fuelTank: "Standard 23.0 gal (87 L) or 26.0 gal (98 L) · Extended range 36.0 gal (136 L)",
    airFilter: "Motorcraft FA-1927", cabinFilter: "Motorcraft FP-79",
    fuelFilter: "In-tank, integrated with fuel pump module - lifetime", fuelFilterMi: null,
    frontDiff: "Ford 8.8\" IFS - SAE 75W-85 Synthetic (WSL-M2C192-A)", frontDiffCap: "≈ 3.0-3.5 pt (1.4-1.7 L)",
    brakeFluid: "Motorcraft DOT 4 LV High Performance (PM-20)", brakeMo: 36,
    coolantMi: 150000, coolantMo: 120, coolantNote: "Orange: first at 10 yr / 150,000 mi, then every 5 yr / 75,000 mi",
    verify: ["fuelTank", "airFilter", "cabinFilter", "frontDiffCap"]
  },
  g14: {
    fuelTank: "Standard 23.0 gal (87 L) or 26.0 gal (98 L) · Extended range 36.0 gal (136 L)",
    airFilter: "Motorcraft FA-1927", cabinFilter: "Motorcraft FP-89",
    fuelFilter: "In-tank, integrated with fuel pump module - lifetime", fuelFilterMi: null,
    frontDiff: "Ford 8.8\" IFS - SAE 75W-85 Synthetic (WSL-M2C192-A)", frontDiffCap: "≈ 3.0-3.5 pt (1.4-1.7 L)",
    brakeFluid: "Motorcraft DOT 4 LV High Performance (PM-20)", brakeMo: 36,
    coolantMi: 150000, coolantMo: 120, coolantNote: "Orange: first at 10 yr / 150,000 mi, then every 5 yr / 75,000 mi",
    verify: ["fuelTank", "airFilter", "cabinFilter", "frontDiffCap"]
  }
};

/* Low-confidence part numbers are written as "confirm by VIN" rather than guessed. */
const VIN_PN = "Motorcraft - confirm P/N by VIN";
const R87 = "Regular unleaded 87 AKI";
const R87FFV = "Regular unleaded 87 AKI · E85 OK on Flex-Fuel builds (yellow fuel cap / FFV badge)";
const R87EB = "Regular unleaded 87 AKI · 91+ AKI recommended for heavy towing / max performance";

const ENGINE_EXT = {
  "49i6":     { fuel: R87, plug: "Motorcraft ASF-42C", gap: "0.044 in (1.1 mm)", plugMi: 30000, verify: ["plug", "gap"] },
  "50v8":     { fuel: R87, plug: "Motorcraft ASF-42C", gap: "0.044 in (1.1 mm)", plugMi: 30000, verify: ["plug", "gap"] },
  "58v8":     { fuel: R87, plug: "Motorcraft ASF-42C", gap: "0.044 in (1.1 mm)", plugMi: 30000, verify: ["plug", "gap"] },
  "58lt":     { fuel: "Premium unleaded 91 AKI recommended", plug: "Motorcraft ASF-42C", gap: "0.044 in (1.1 mm)", plugMi: 30000, verify: ["fuel", "plug", "gap"] },
  "42v6":     { fuel: R87, plug: VIN_PN + " (platinum)", gap: "0.052-0.056 in (1.3-1.4 mm)", plugMi: 100000, verify: ["plug", "gap"] },
  "46v8_2v":  { fuel: R87, plug: "Motorcraft SP-493 (AGSF-32PM) platinum", gap: "0.052-0.056 in (1.3-1.4 mm)", plugMi: 100000, verify: ["plug"],
                note: "1997-2002 2-valve heads have few spark plug threads - plugs can eject. Hand-start, never over-torque." },
  "54v8_2v":  { fuel: R87, plug: "Motorcraft SP-493 (AGSF-32PM) platinum", gap: "0.052-0.056 in (1.3-1.4 mm)", plugMi: 100000, verify: ["plug"],
                note: "1997-2002 2-valve heads have few spark plug threads - plugs can eject. Hand-start, never over-torque." },
  "54sc":     { fuel: "Premium unleaded 91 AKI minimum", plug: VIN_PN + " (colder heat range)", gap: "0.035-0.040 in (0.9-1.0 mm)", plugMi: 60000,
                fuelTank: "≈ 25.0 gal (95 L)", verify: ["plug", "gap", "plugMi", "fuelTank"] },
  "46v8_3v":  { fuel: R87, plug: "Motorcraft SP-546 (PZT14F)", gap: "0.052-0.056 in (1.3-1.4 mm) - pre-gapped", plugMi: 100000, verify: ["plug", "gap"] },
  "54v8_3v":  { fuel: R87FFV, plug: "Early (≈2004-07 build): Motorcraft SP-515 (PZT2FE) 2-piece · Later: SP-546 (PZT14F) 1-piece",
                gap: "0.052-0.056 in (1.3-1.4 mm) - pre-gapped", plugMi: 100000, verify: ["gap"],
                note: "Early 3V 2-piece plugs are known to break off in the head. Remove with the engine warm, follow Ford TSB 08-7-6, and have an extractor tool (e.g., Lisle 65600) on hand." },
  "62v8":     { fuel: "Regular unleaded 87 AKI · 91 AKI recommended for max performance / towing", plug: VIN_PN + " - qty 16 (2 per cylinder)", gap: "≈ 0.050 in (1.3 mm)", plugMi: 100000,
                fuelTank: "Raptor: 26.0 gal (98 L) · Others: 26.0 / 36.0 gal", verify: ["plug", "gap"] },
  "37v6":     { fuel: R87FFV, plug: VIN_PN, gap: "0.049-0.053 in (1.25-1.35 mm)", plugMi: 100000, verify: ["plug", "gap"] },
  "50v8_g1":  { fuel: R87FFV, plug: "Motorcraft SP-537 (CYFS-12Y-3)", gap: "0.049-0.053 in (1.25-1.35 mm)", plugMi: 100000, verify: ["plug", "gap"] },
  "35eb_g1":  { fuel: R87EB, plug: "Motorcraft SP-534 (CYFS-12Y-2)", gap: "0.028-0.031 in (0.71-0.79 mm)", plugMi: 60000, verify: ["gap", "plugMi"],
                note: "Turbo engines are hard on plugs. Many owners replace them at 40,000-60,000 mi, sooner if they tow." },
  "35v6":     { fuel: R87FFV, plug: VIN_PN, gap: "0.049-0.053 in (1.25-1.35 mm)", plugMi: 100000, verify: ["plug", "gap"] },
  "27eb_g1":  { fuel: R87EB, plug: VIN_PN, gap: "0.028-0.031 in (0.71-0.79 mm)", plugMi: 60000, verify: ["plug", "gap", "plugMi"] },
  "50v8_g2":  { fuel: R87FFV, plug: "Motorcraft SP-537 (CYFS-12Y-3)", gap: "0.049-0.053 in (1.25-1.35 mm)", plugMi: 100000, verify: ["plug", "gap"] },
  "35eb_g2":  { fuel: R87EB, plug: VIN_PN, gap: "0.028-0.031 in (0.71-0.79 mm)", plugMi: 60000, verify: ["plug", "gap", "plugMi"] },
  "35eb_ho_g2": { fuel: "Premium unleaded 91 AKI recommended (87 minimum)", plug: VIN_PN, gap: "0.028-0.031 in (0.71-0.79 mm)", plugMi: 60000,
                fuelTank: "SuperCab: 26.0 gal (98 L) · SuperCrew: 36.0 gal (136 L)", verify: ["plug", "gap", "plugMi"] },
  "27eb_g2":  { fuel: R87EB, plug: VIN_PN, gap: "0.028-0.031 in (0.71-0.79 mm)", plugMi: 60000, verify: ["plug", "gap", "plugMi"] },
  "50v8_g3":  { fuel: R87FFV, plug: VIN_PN, gap: "0.049-0.053 in (1.25-1.35 mm)", plugMi: 100000, verify: ["plug", "gap"] },
  "33v6":     { fuel: R87FFV, plug: VIN_PN, gap: "0.049-0.053 in (1.25-1.35 mm)", plugMi: 100000, verify: ["plug", "gap"] },
  "30psd":    { fuel: "Ultra-Low Sulfur Diesel (ULSD) only - up to B20 biodiesel · DEF: API-certified, ISO 22241",
                plug: "N/A - diesel (glow plugs are a dealer item)", gap: "N/A", plugMi: null,
                fuelFilter: VIN_PN + " (fuel filter / water separator)", fuelFilterMi: 22500,
                verify: ["fuelFilter", "fuelFilterMi"],
                note: "Drain the water separator when the message center tells you to. Replace the fuel filter at the IOLM prompt or about every 22,500 mi." },
  "27eb_g3":  { fuel: R87EB, plug: VIN_PN, gap: "0.028-0.031 in (0.71-0.79 mm)", plugMi: 60000, verify: ["plug", "gap", "plugMi"] },
  "50v8_g4":  { fuel: R87FFV, plug: VIN_PN, gap: "0.049-0.053 in (1.25-1.35 mm)", plugMi: 100000, verify: ["plug", "gap"] },
  "35eb_g3":  { fuel: R87EB, plug: VIN_PN, gap: "0.028-0.031 in (0.71-0.79 mm)", plugMi: 60000, verify: ["plug", "gap", "plugMi"] },
  "35pb":     { fuel: R87, plug: VIN_PN, gap: "0.028-0.031 in (0.71-0.79 mm)", plugMi: 60000,
                fuelTank: "30.6 gal (116 L)", verify: ["plug", "gap", "plugMi"] },
  "35eb_ho_g3": { fuel: "Premium unleaded 91 AKI recommended (87 minimum)", plug: VIN_PN, gap: "0.028-0.031 in (0.71-0.79 mm)", plugMi: 60000,
                fuelTank: "36.0 gal (136 L)", verify: ["plug", "gap", "plugMi"] },
  "52sc":     { fuel: "Premium unleaded 91 AKI minimum (93 recommended)", plug: VIN_PN, gap: VIN_PN, plugMi: 60000,
                fuelTank: "36.0 gal (136 L)", verify: ["fuel", "plug", "plugMi"] },
  "ev":       { fuel: "Electricity - Standard Range ≈ 98 kWh / Extended Range ≈ 131 kWh usable",
                fuelTank: "N/A - battery electric (no fuel tank)", plug: "N/A", gap: "N/A", plugMi: null,
                airFilter: "N/A - no engine", fuelFilter: "N/A", fuelFilterMi: null, verify: ["fuel"] }
};

// ---- merge extension data ----
GENERATIONS.forEach((g) => {
  const x = GEN_EXT[g.id] || {};
  const v = x.verify || [];
  Object.assign(g, x, { verify: [...(g.verify || []), ...v] });
});
ENGINES.forEach((e) => {
  const x = ENGINE_EXT[e.id] || {};
  const v = x.verify || [];
  const note = x.note;
  Object.assign(e, x, { verify: [...(e.verify || []), ...v] });
  if (note) e.notes = [...(e.notes || []), note];
  delete e.note;
});

/* ---------------------------------------------------------------------
   DIY MAINTENANCE SCHEDULE
   Each item: type (matches service-log type), interval miles / months
   (whichever first), and `when(ctx)` -> false to hide for this config.
   ctx = { year, gen, eng, trans, drive }
   Intervals = Ford "normal" schedule; see `severe` for towing/
   off-road/dusty/extreme-temp/heavy idling use.
   --------------------------------------------------------------------- */
/* Driveline components present for a given drive type.
   rear = rear differential/axle, front = front differential, tcase = transfer case,
   ptu = power transfer unit (FWD-based AWD), rdu = rear drive unit (FWD-based AWD).
   A generation can override with `components: { AWD: [...] }`. */
const DEFAULT_COMPONENTS = {
  "4x2": ["rear"], "4x4": ["rear", "front", "tcase"],
  "RWD": ["rear"], "FWD": [], "AWD": ["ptu", "rdu"]
};
function driveComps(c) {
  if (c.eng.isEV) return [];
  const o = c.gen.components || {};
  return o[c.drive] || DEFAULT_COMPONENTS[c.drive] || [];
}

/* The maintenance schedule (SCHEDULE / fordItem) lives in schedule.js. */

/* Service types for the tracker */
const SERVICE_TYPES = [
  "Oil & Filter Change", "Tire Rotation", "Engine Air Filter", "Cabin Air Filter",
  "Fuel Filter", "Spark Plugs", "Transmission Fluid", "Rear Differential Fluid",
  "Front Differential Fluid", "Transfer Case Fluid", "PTU Fluid", "Rear Drive Unit Fluid", "Coolant Flush", "Brake Fluid",
  "EV Battery Coolant", "Electric Drive Fluid",
  "Brake Pads / Rotors", "Drive Belt", "Battery Test", "Battery Replacement",
  "Wiper Blades", "Other"
];
/* Old log names -> current names */
const SERVICE_ALIASES = { "Rear Axle Fluid": "Rear Differential Fluid", "Front Axle Fluid": "Front Differential Fluid", "Battery": "Battery Replacement" };
