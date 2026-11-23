# Third-party notices

## ZXing for JavaScript (`zxing.min.js`)
- Package: `@zxing/library` 0.21.3 (UMD build), https://github.com/zxing-js/library
- License: Apache License 2.0, https://www.apache.org/licenses/LICENSE-2.0
- Used for: reading VIN barcodes (Code 39 / Code 128 / Data Matrix / QR / PDF417) from the camera or photos, entirely on the device.

## Tesseract.js (loaded on demand from jsDelivr)
- Package: `tesseract.js` 5.1.1, https://github.com/naptha/tesseract.js
- License: Apache License 2.0
- Used for: reading VIN text from windshield VIN plates when there's no barcode. It downloads only the first time "Read VIN text" is used, and the image is processed on the device.

## NHTSA vPIC API
- https://vpic.nhtsa.dot.gov/api/ - a free public US government service. The app sends a VIN only when you tap Decode or after a successful scan.
