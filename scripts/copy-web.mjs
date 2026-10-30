// Copies the game files from the repo root into www/, which Capacitor packages into the app.
import { cpSync, rmSync, mkdirSync } from 'node:fs';
rmSync('www', { recursive: true, force: true });
mkdirSync('www');
for (const f of ['index.html', 'three.min.js', 'fonts']) cpSync(f, `www/${f}`, { recursive: true });
console.log('Copied game into www/');
