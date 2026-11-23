# DIY Garage - Truck Spec Reference

A quick-reference app for doing your own work on **current US Ford vehicles**, plus **1990-present F-150, F-250 and F-350** pickups. You choose the category, model, year, engine, transmission and driveline, and it shows:

- **Engine oil:** capacity, viscosity, Ford spec, oil filter P/N, drain plug torque
- **Transmission:** fluid type, capacity, drain plug and pan bolt torque
- **Fuel and ignition:** fuel type (gas / diesel / DEF), tank capacity, spark plug P/N, gap and replacement interval
- **Filters:** engine air, cabin air and fuel filter P/Ns (including diesel filter / water separator)
- **Driveline:** front and rear differentials, transfer case, and the power transfer unit (PTU) / rear drive unit (RDU) on AWD crossovers
- **Chassis:** lug nut torque, bolt pattern, washer fluid, coolant, brake fluid
- **Wiper blades:** driver, passenger and rear sizes, the arm connector type, the blade styles that fit, and how confident the data is
- **Maintenance schedule:** Ford's **normal** and **severe-duty** intervals for each owner-serviceable item, including Ford's "first change, then every …" coolant rule. Each item is labelled with its Ford source and how sure it is (see below)

Coverage:
- **F-150:** 1990-present, gas, hybrid, 3.0L diesel and Lightning EV
- **F-250 / F-350:** OBS (1990-97) and Super Duty (1999-present), including the 4.9L I6, 5.8L, 7.5L, 5.4L, 6.8L V10, 6.2L, 7.3L and 6.8L gas engines, and the 7.3L IDI, 7.3L, 6.0L, 6.4L and 6.7L Power Stroke diesels
- **Current US lineup (current generation only, PRELIMINARY data):** Ranger (2024+), Maverick (2022+), Bronco (2021+), Bronco Sport (2021+), Explorer (2020+), Expedition (2025+), Mustang (2024+), Mustang Mach-E (2021+), Transit / E-Transit (2015+) and E-Series cutaway (2021+)
- Not included because production has ended: Escape (final MY2026), Edge (2024), F-150 Lightning (2022-2025 is covered under F-150)

VIN decoder:
- Enter a 17-character VIN and the app works out the model, year, engine, transmission and drive type, then shows the matching specs. "Save as mine" stores the VIN along with the trim, body, GVWR and assembly plant.
- It checks the format, the check digit (9th character) and the model year offline, then decodes with NHTSA's free public vPIC API (`vpic.nhtsa.dot.gov`, no key needed). The VIN is sent only to NHTSA.
- NHTSA data can be incomplete, especially for older trucks. When more than one engine fits, or details are missing, the app flags the match as **CHECK ENGINE** or **PARTIAL MATCH** so you can confirm the selections.

Camera VIN scan (📷 **SCAN VIN WITH CAMERA**):
- **Door-jamb barcode:** point the phone at the VIN barcode on the driver door-jamb sticker and it scans automatically. Uses the phone's built-in barcode detector when there is one, otherwise ZXing (`zxing.min.js`, bundled). Decoding happens on the phone.
- **Windshield VIN plate (no barcode):** tap **READ VIN TEXT** and text recognition (Tesseract.js, downloaded once the first time, about 3 MB) reads the VIN. Using the check digit and VIN rules, it fixes common misreads such as O→0, I→1, S→5 and B→8, then tells you to compare the result with the vehicle.
- **PHOTO:** take or choose a photo instead of using the live camera. Works when camera access is blocked.
- **LIGHT:** turns on the flashlight on phones that support it.
- The scanned VIN goes straight into the decoder, which selects the matching vehicle.
- The camera needs https (GitHub Pages is fine). On iPhone, use Safari or the Home Screen app and allow camera access.

Maintenance intervals - sources and customizing (`schedule.js`):
- Intervals come from these Ford documents (fordservicecontent.com):
  - **F-Series:** the 2021, 2018 and 2012 F-150 owner's manuals, the 2004/2007 and 2009/2010 Scheduled Maintenance Guides, and the 2020 Super Duty owner's manual.
  - **Other models:** the 2022 Maverick, 2023 Bronco, 2023/2024 Bronco Sport, 2023/2024 Explorer, 2024 Mustang, 2023 Mustang Mach-E, 2024 Transit / E-Transit and 2024 E-Series owner's manuals.
  - **Older generation only:** the Ranger and Expedition use their previous-generation manuals (2023 Ranger, 2023/2024 Expedition), because the current-generation 2024+ manuals no longer print the schedule. Ford now points to ford.com/support/maintenance-schedule. The 2024 Ranger manual is used for its oil rule.
- Model-specific Ford rules are included:
  - Bronco off-road: front axle and transfer case every 30k / 2 yr.
  - Bronco Sport: 12,500-mile maximum oil interval in 2023, 10,000 in 2024, and transmission fluid every 30k under severe use.
  - Explorer: the rear axle and PTU are changed only when the message center asks.
  - Mustang: track-use oil and rear-axle rules, and the manual-transmission severe interval.
  - Transit 3.5L PFDi: up to 15,000 miles between oil changes.
  - E-Series: fixed 10k / 12 month / 700-hour oil changes, rotation every 7,500 mi, plugs and rear axle at 97,500.
  - Mach-E and E-Transit: rotation every 12 months / 10k, battery coolant and electric-drive fluid.
- Every item shows how sure it is:
  - **FORD MANUAL:** read from the Ford document for that exact model and year.
  - **FORD · NEARBY YEAR:** from the same model's manual for an adjacent year.
  - **FORD · RELATED MANUAL:** from a related Ford manual (previous generation or another model) because this vehicle's own manual has no schedule table.
  - **NOT A FORD ITEM:** Ford doesn't schedule it (e.g. a yearly battery test), or no Ford value was found (e.g. pre-1997 trucks).
- Oil on 2011+ vehicles follows Ford's Intelligent Oil-Life Monitor rule: change when the monitor says so, never more than 1 year / 10,000 mi. The tracker reminds you at that maximum unless you set your own interval.
- **MY RIDE → Maintenance intervals:** switch between Ford's **Normal** and **Severe duty** schedules. Type your own miles and/or months for any item, or tap **FORD** to go back to Ford's value. Custom intervals drive the reminders, the Service tab and the spec sheet. Saving a different vehicle resets them.
- The Service tab lists **other maintenance** that is overdue or due soon, based on your log.

Trackers:
- **Service log:** counts down to the next oil change, shows schedule status for every item, sends reminder notifications and creates calendar (`.ics`) alerts
- **Expense tracker:** logs mods, maintenance, repairs, parts, tools, tires, accessories and more. Shows totals by period, a category breakdown, mods vs. maintenance spend and lifetime cost per mile, with CSV export. Costs entered on service records are included automatically.
- **Backup:** JSON export/import of the truck, service history and expenses

It is a static Progressive Web App (plain HTML/CSS/JS, no build step, works offline). All user data stays on the device in `localStorage`.

**Live app:** https://pana8201-bit.github.io/FordDIYGarage/

## Install on your phone
Open the live link, then:
- **iPhone (Safari):** Share → *Add to Home Screen*
- **Android (Chrome):** ⋮ menu → *Install app* / *Add to Home screen*

## Run locally
```
python -m http.server 8150
```
Then open http://localhost:8150

## Files
| File | Purpose |
|---|---|
| `index.html` | Layout / tabs |
| `styles.css` | Theme |
| `data.js` | F-150 spec database + maintenance schedule |
| `data-hd.js` | F-250 / F-350 spec database (loaded after `data.js`) |
| `data-ford.js` | Current US Ford lineup + vehicle catalog (loaded last) |
| `app.js` | Selector, VIN decoder, spec sheet, service tracker, expenses, reminders |
| `schedule.js` | Ford maintenance schedule (normal/severe, sources, confidence) + wiper blade data |
| `vin-scan.js` | Camera / photo VIN scanner (barcode + text recognition) |
| `zxing.min.js` | ZXing barcode library (Apache-2.0) - see `THIRD-PARTY-NOTICES.md` |
| `sw.js` | Offline cache (network-first). **Bump `CACHE` on each release.** |
| `manifest.webmanifest`, `icon.svg` | PWA install metadata |

## Data accuracy
Values were compiled as reference data and have **not** been checked against official sources. Fields that vary by build date, axle or calibration appear with a **VERIFY** tag. Part numbers we're not confident about read "confirm P/N by VIN" instead of being guessed. Super Duty specs vary a lot by SRW/DRW, axle and wheelbase, so check the axle tag and Owner's Manual. Before final torque, always confirm against the Owner's Manual, oil-fill cap, a VIN lookup on motorcraftservice.com, or a dealer. Everything in `data-ford.js` is marked **preliminary** in the app: many values deliberately say "confirm" and are waiting to be filled in from Owner's Manuals. To correct a value, edit `data.js` / `data-hd.js` / `data-ford.js` and bump `DATA_VERSION` and the `CACHE` name in `sw.js`.

## Disclaimer
This is an independent project. It is **not affiliated with, endorsed by, or sponsored by Ford Motor Company.** Ford, F-150, F-250, F-350, Super Duty, Ranger, Maverick, Bronco, Bronco Sport, Explorer, Expedition, Mustang, Mustang Mach-E, Transit, E-Transit, E-Series, Motorcraft, EcoBoost, PowerBoost, Power Stroke, TorqShift, Raptor, Tremor and Lightning are trademarks of their respective owners and appear here only to identify compatible vehicles and parts. The software is provided "as is" with no warranty, and you perform all work at your own risk.
