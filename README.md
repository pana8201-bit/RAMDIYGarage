# RAM DIY Garage - Truck Spec Reference

A quick-reference app for doing your own work on **1994-present Ram / Dodge Ram trucks and Ram vans**. You choose the model, year, engine, transmission and driveline, and it shows:

- **Engine oil:** capacity, viscosity, Chrysler / Mopar spec (MS-6395, MS-10902, MS-12633), oil filter P/N and drain plug torque
- **Transmission:** fluid type (ATF+4, ZF 8 & 9 Speed ATF, Aisin AS68RC / AS69RC), capacity, drain and pan torque
- **Fuel and ignition:** fuel type (gas, E85, diesel, DEF), tank capacity, spark plug P/N, gap and interval (16 plugs on a HEMI)
- **Filters:** engine air, cabin air and fuel filter / water separator
- **Driveline:** front and rear axles (Chrysler 9.25", AAM 11.5" / 11.8", Dana 44 / 60 / 70 / 80) and the transfer case
- **Chassis:** lug nut torque, bolt pattern, washer fluid, coolant (green / HOAT / OAT), brake fluid
- **Wiper blades:** sizes, arm connector type and the blade styles that fit
- **Maintenance schedule:** normal and severe-duty intervals, including diesel items: fuel/water separator, crankcase vent filter, DEF filter and Cummins valve lash. HD 4x4s also get front-end lubrication.

## Coverage
| Model | Years | Engines |
|---|---|---|
| Ram 1500 | 1994-present | 3.9 V6, 5.2 / 5.9 Magnum, 3.7 / 4.7 PowerTech, 5.7 HEMI (all versions), 8.3 V10 SRT-10, 3.6 Pentastar (+ eTorque), 3.0 EcoDiesel Gen 2 / 3, 6.2 Supercharged TRX, 3.0 Hurricane SO / HO |
| Ram 1500 Classic | 2019-2024 | 3.6 Pentastar, 5.7 HEMI |
| Ram 2500 / 3500 | 1994-present | 5.9 Magnum, 8.0 V10, 5.7 / 6.4 HEMI, 5.9 Cummins 12-valve / 24-valve / common-rail, 6.7 Cummins (standard and high output) |
| Ram Chassis Cab 3500 / 4500 / 5500 | 2008-present | 6.7 Cummins, 5.7 / 6.4 HEMI |
| ProMaster | 2014-present | 3.6 Pentastar, 3.0 EcoDiesel I4, ProMaster EV |
| ProMaster City | 2015-2022 | 2.4 Tigershark |

Transmissions: NV3500, NV4500, NV5600, G56, T56, 42RE / 46RE / 47RE / 48RE, 42RLE, 45RFE / 545RFE, 65RFE / 66RFE / 68RFE, Aisin AS68RC / AS69RC, TorqueFlite 8 (8HP70 / 75 / 95), 62TE, 948TE and the ProMaster AMT.

Van data is thinner than the pickup data and the app marks it **PRELIMINARY**.

## VIN decoder and camera scan
- Type a VIN, or tap **📷 SCAN VIN WITH CAMERA** to read the door-jamb barcode or the windshield VIN plate.
- The app checks the format, check digit and model year on the phone, then decodes the VIN with NHTSA's free public vPIC API. The VIN is sent only to NHTSA.
- It handles both naming styles NHTSA uses:
  - **DODGE "Ram" + series 1500** (to 2010).
  - **RAM "2500"** (2011+).
- **1500 Classic vs. the new DT:** told apart from the VIN (1C6**R**R… vs. 1C6**S**R…).
- **Chassis cabs:** recognized from the 4500 / 5500 series or NHTSA's "Incomplete - Chassis Cab" body type.
- **Tested** against NHTSA's results for 30 real VIN patterns, from a 1995 Dodge Ram 1500 to a 2025 Hurricane Ram 1500. All 30 picked the correct model, year and engine.

## Trackers
- **Service log:** next-oil-change gauges (miles and days), status for every schedule item, reminder notifications and calendar (`.ics`) alerts.
- **Custom intervals:** switch between **Normal** and **Severe duty**, or type your own miles and months for any item. Tap **DEFAULT** to go back to the default.
- **Expense tracker:** mods, maintenance, repairs, parts, tools and more, with totals by period, cost per mile and CSV export.
- **Backup:** JSON export / import of the truck, service history and expenses.

All data stays on the phone in `localStorage` under the key `ramgarage.v1`, separate from the Ford DIY Garage app, so both can be installed on one phone.

**Live app:** https://pana8201-bit.github.io/RAMDIYGarage/

## Install on your phone
Open the live link, then:
- **iPhone (Safari):** Share → *Add to Home Screen*
- **Android (Chrome):** ⋮ menu → *Install app* / *Add to Home screen*

## Run locally
```
python -m http.server 8150
```
Then open http://localhost:8150 (the camera only works on the https site).

## Files
| File | Purpose |
|---|---|
| `index.html` | Layout / tabs |
| `styles.css` | Graphite / black / red theme (light and dark mode) |
| `data.js` | Model catalog, transmissions, shared fluids, service types |
| `data-1500.js` | Ram 1500 and 1500 Classic generations and engines |
| `data-hd.js` | Ram 2500 / 3500 and Chassis Cab |
| `data-van.js` | ProMaster / ProMaster City / ProMaster EV |
| `schedule.js` | Maintenance schedule (normal / severe) and wiper blade data |
| `app.js` | Selector, VIN decoder, spec sheet, service tracker, expenses, reminders |
| `vin-scan.js` | Camera / photo VIN scanner (barcode and text recognition) |
| `zxing.min.js` | ZXing barcode library (Apache-2.0) - see `THIRD-PARTY-NOTICES.md` |
| `sw.js` | Offline cache (network-first). **Bump `CACHE` on each release.** |
| `manifest.webmanifest`, `icon.svg` | PWA install metadata |

## Data accuracy - please read
These specs are compiled reference data and **have not been checked against official Ram / Mopar service information**.
- **VERIFY tags:** values that are less certain, or vary by build date, axle or calibration, carry a **VERIFY** tag.
- **Part numbers:** where we weren't confident, part numbers read "confirm P/N by VIN" instead of being guessed.
- **Maintenance intervals:** every interval is labelled **UNVERIFIED** until it's checked against the Owner's Manual for that year. On 2009+ trucks, follow the Oil Change Indicator.
- **Heavy-duty trucks:** HD and chassis-cab specs vary a lot by SRW / DRW, axle and wheelbase, so read the axle tag.

Before final torque, always confirm against the Owner's Manual, the oil-fill cap and axle tag, a Mopar parts lookup by VIN, or a Ram dealer.

To correct a value, edit the data file, then bump `DATA_VERSION` in `data.js` and `CACHE` in `sw.js`.

## Disclaimer
This is an independent project. It is **not affiliated with, endorsed by, or sponsored by Stellantis N.V., FCA US LLC, Ram Trucks, Dodge or Cummins Inc.** Ram, Dodge, Mopar, HEMI, ProMaster, ProMaster City, TorqueFlite, EcoDiesel, Pentastar, Hurricane, eTorque, TRX, Power Wagon and Cummins are trademarks of their respective owners and appear here only to identify compatible vehicles and parts. The software is provided "as is" with no warranty, and you perform all work at your own risk.
