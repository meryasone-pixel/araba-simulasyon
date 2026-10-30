// Draws the app icon and splash into assets/; then run: npx capacitor-assets generate --android
import sharp from 'sharp';
const sky=`<defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2f3466"/><stop offset=".55" stop-color="#b9648a"/><stop offset=".85" stop-color="#f2a56b"/><stop offset="1" stop-color="#f7c58a"/></linearGradient></defs><rect width="1024" height="1024" fill="url(#g)"/>`;
const sun=`<circle cx="700" cy="560" r="120" fill="#ffd9a0" opacity=".55"/>`;
// skyline: dome + minarets + tower, in deep plum
const skyline=`<g fill="#3a2747" opacity=".85">
<rect x="0" y="600" width="1024" height="424"/>
<path d="M300 600 a110 110 0 0 1 220 0z"/><rect x="290" y="590" width="240" height="20"/>
<rect x="250" y="440" width="16" height="170"/><path d="M246 444 l12 -50 l12 50z"/>
<rect x="554" y="440" width="16" height="170"/><path d="M550 444 l12 -50 l12 50z"/>
<rect x="720" y="470" width="56" height="140"/><path d="M712 474 l36 -70 l36 70z"/></g>`;
// car (rear view) — teal like the game's player car
const car=(dy=0)=>`<g transform="translate(0 ${dy})">
<rect x="292" y="640" width="440" height="170" rx="36" fill="#19b3a6"/>
<path d="M352 650 L392 548 Q400 532 420 532 L604 532 Q624 532 632 548 L672 650z" fill="#19b3a6"/>
<path d="M382 640 L414 566 Q418 556 430 556 L594 556 Q606 556 610 566 L642 640z" fill="#1c2a35"/>
<rect x="472" y="512" width="80" height="22" rx="6" fill="#ffd54a"/>
<rect x="318" y="684" width="96" height="36" rx="10" fill="#ff3b30"/><rect x="610" y="684" width="96" height="36" rx="10" fill="#ff3b30"/>
<rect x="280" y="780" width="464" height="44" rx="14" fill="#15151a"/>
<rect x="312" y="800" width="80" height="70" rx="16" fill="#15151a"/><rect x="632" y="800" width="80" height="70" rx="16" fill="#15151a"/></g>`;
const svg=(body,bg=true)=>Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024">${bg?sky+sun+skyline:''}${body}</svg>`);
const out='assets/';
await sharp(svg(car(-80))).png().toFile(out+'icon-only.png');
await sharp(svg(sky+sun+skyline,false)).png().toFile(out+'icon-background.png');
// foreground for adaptive icon: car scaled into the 66% safe zone
await sharp(Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024"><g transform="translate(512 512) scale(.72) translate(-512 -600)">${car(0)}</g></svg>`)).png().toFile(out+'icon-foreground.png');
// splash: 2732 square, dusk gradient with centered car
const splash=Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="2732" height="2732" viewBox="0 0 1024 1024">${sky}<g transform="translate(512 512) scale(.45) translate(-512 -640)">${car(0)}</g></svg>`);
await sharp(splash).png().toFile(out+'splash.png');
await sharp(splash).png().toFile(out+'splash-dark.png');
console.log('ok');
