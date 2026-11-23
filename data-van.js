/* =====================================================================
   RAM PROMASTER / PROMASTER CITY / ProMaster EV - SPEC DATA
   ---------------------------------------------------------------------
   Loaded after data-hd.js. Calls finalizeData() at the end.
   ProMaster (2014+, Fiat Ducato based, FWD)
   ProMaster City (2015-2022, Fiat Doblo based, FWD)
   ProMaster EV (2024+, battery electric)
   Reference values only - see the header of data.js. Van data is
   thinner than the pickup data and is marked PRELIMINARY in the app.
   ===================================================================== */

const PM = ["ProMaster"];
const PMC = ["ProMaster City"];

GENERATIONS.push(
  {
    id: "pm1", models: PM, code: "ProMaster (VF)", platform: "VF (Ducato X250/X290)", years: [2014, 2099], preliminary: true,
    lugTorque: "≈ 133 lb-ft (180 N·m) - check manual", lugPattern: "5 x 130 mm", lugThread: "M16 x 1.5 bolts",
    washer: CONFIRM,
    coolant: COOL_OAT,
    rearAxle: "N/A (front-wheel drive)", rearAxleCap: "N/A", frontDiff: "N/A - shares the transaxle fluid", frontDiffCap: "N/A", transferCase: "N/A",
    fuelTank: "24 gal (91 L)",
    airFilter: PN, cabinFilter: PN,
    fuelFilter: "Gas: in-tank - lifetime · EcoDiesel: chassis fuel filter / separator", fuelFilterMi: null,
    brakeFluid: "Mopar DOT 4 Brake Fluid (check the reservoir cap)", brakeMo: 24,
    coolantMi: 150000, coolantMo: 120, coolantNote: "OAT: 10 yr / 150,000 mi",
    notes: ["Lug bolts (not studs and nuts) - use a guide pin to hang the wheel.", "Fleet / delivery use is severe duty - use the SEVERE DUTY schedule."],
    verify: ["lugTorque", "fuelTank", "brakeFluid"]
  },
  {
    id: "pmc1", models: PMC, code: "ProMaster City", platform: "Fiat Doblo (263)", years: [2015, 2022], preliminary: true,
    lugTorque: "≈ 63-76 lb-ft (85-103 N·m) - check manual", lugPattern: "5 x 110 mm", lugThread: "M12 x 1.25 bolts",
    washer: CONFIRM,
    coolant: COOL_OAT,
    rearAxle: "N/A (front-wheel drive)", rearAxleCap: "N/A", frontDiff: "N/A - shares the transaxle fluid", frontDiffCap: "N/A", transferCase: "N/A",
    fuelTank: "16 gal (60 L)",
    airFilter: PN, cabinFilter: PN,
    fuelFilter: "In-tank - lifetime", fuelFilterMi: null,
    brakeFluid: "Mopar DOT 3 / DOT 4 Brake Fluid (check the reservoir cap)", brakeMo: 24,
    coolantMi: 150000, coolantMo: 120, coolantNote: "OAT: 10 yr / 150,000 mi",
    notes: ["Lug bolts (not studs and nuts) - use a guide pin to hang the wheel."],
    verify: ["lugTorque", "lugPattern", "fuelTank", "brakeFluid"]
  }
);

ENGINES.push(
  ENG({ id: "pm36", models: PM, name: "3.6L V6 Pentastar", family: "Pentastar V6", years: [2014, 2099],
    oilCap: "6.0 qt (5.7 L) with filter", oilVisc: "SAE 5W-20 (0W-20 on later builds - check oil-fill cap)", oilSpec: "Chrysler MS-6395",
    filter: PN + " (cartridge)", drainTorque: "≈ 20 lb-ft (27 N·m)",
    trans: ["62te", "948te"], transYears: { "62te": [2014, 2019], "948te": [2020, 2099] },
    fuel: R87, plug: PN, gap: "0.043 in (1.1 mm)", plugMi: 100000,
    notes: ["2020 refresh: the 9-speed 948TE replaced the 62TE."],
    verify: ["oilVisc", "drainTorque", "gap"] }),
  ENG({ id: "pm30ed", models: PM, name: "3.0L I4 EcoDiesel (Fiat)", family: "Fiat EcoDiesel I4 Turbo Diesel", years: [2014, 2017],
    oilCap: CONFIRM, oilVisc: "SAE 5W-30 full synthetic (low ash)", oilSpec: "Chrysler MS-10902 / ACEA C3",
    filter: PN, drainTorque: CONFIRM,
    trans: ["amt"], fuel: ULSD_DEF, plug: "N/A - diesel", gap: "N/A", plugMi: null,
    fuelFilter: PN + " (filter / water separator)", fuelFilterMi: 30000,
    notes: ["Automated manual (AMT) - dealer service for clutch calibration."],
    verify: ["oilVisc", "fuelFilterMi"] }),
  Object.assign(ENG({ id: "pmev", models: PM, name: "ProMaster EV (battery electric)", family: "Battery Electric", years: [2024, 2099],
    oilCap: "N/A - no engine oil", oilVisc: "N/A", oilSpec: "N/A", filter: "N/A (cabin air filter only)", drainTorque: "N/A",
    trans: ["edu_pm"], fuel: "Electricity - ≈ 110 kWh battery (usable less) - " + CONFIRM.toLowerCase(), plug: "N/A", gap: "N/A", plugMi: null,
    airFilter: "N/A - no engine", fuelFilter: "N/A", fuelFilterMi: null, fuelTank: "N/A - battery electric (no fuel tank)",
    notes: ["High-voltage system - battery coolant and drive-unit service are dealer items."],
    verify: ["fuel"] }), { isEV: true }),
  ENG({ id: "pmc24", models: PMC, name: "2.4L I4 Tigershark MultiAir", family: "Tigershark I4", years: [2015, 2022],
    oilCap: "5.5 qt (5.2 L) with filter", oilVisc: "SAE 0W-20", oilSpec: "Chrysler MS-6395",
    filter: "Mopar MO-899 (68102241AA) family - " + CONFIRM.toLowerCase(), drainTorque: "≈ 20 lb-ft (27 N·m)",
    trans: ["948te"], fuel: R87, plug: PN, gap: "0.043 in (1.1 mm)", plugMi: 100000,
    notes: ["MultiAir engines are sensitive to oil level and grade - check the level at every fill-up; some burn oil."],
    verify: ["filter", "drainTorque", "gap"] })
);

finalizeData();
