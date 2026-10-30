# Building İstanbul’da Sürüş for Google Play

The game lives at the repo root (`index.html`, `three.min.js`, `fonts/`). Capacitor wraps it into the Android app in `android/`.

App ID: `com.meryasone.istanbulsurus` (permanent once published on Google Play).

## Every time you change the game

```bash
npm install          # first time only
npm run sync         # copies the game into the app
npm run open         # opens the android/ folder in Android Studio
```

Run it on a phone or emulator with the green ▶ button in Android Studio.

## Build the file for Google Play (.aab)

1. In Android Studio: **Build → Generate Signed App Bundle or APK… → Android App Bundle**.
2. The first time, choose **Create new…** to make an upload key (`.jks` file).
   - Store it outside this repo and back it up, with its passwords, somewhere safe.
   - Never commit it to GitHub.
3. Choose the **release** build. The file appears in `android/app/release/app-release.aab`.

## Releasing an update

Before each new upload, raise the numbers in `android/app/build.gradle`:

```gradle
versionCode 2        // must go up by at least 1 on every upload
versionName "1.1"    // what players see
```

Then `npm run sync` and build the signed bundle again with the same key.

## Changing the icon or splash

Edit `scripts/make-icons.mjs` (or replace the PNGs in `assets/`), then run:

```bash
node scripts/make-icons.mjs
npx capacitor-assets generate --android --iconBackgroundColor '#2b2d5b' --splashBackgroundColor '#2b2d5b'
```
