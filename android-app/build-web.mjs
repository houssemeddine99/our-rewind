import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import sharp from 'sharp';
import {build} from 'esbuild';
const root=path.dirname(fileURLToPath(import.meta.url));
const source=path.resolve(root,'../pocket-yuki');
const out=path.join(root,'www');
await fs.mkdir(out,{recursive:true});
for(const name of ['index.html','app.css','app.js'])await fs.copyFile(path.join(source,name),path.join(out,name));
let html=await fs.readFile(path.join(out,'index.html'),'utf8');
html=html.replaceAll('../assets/','assets/').replaceAll('href="../"','href="https://houssemeddine99.github.io/our-rewind/"');
html=html.replace(/<link[^>]+(?:manifest|icon)[^>]*>/g,'').replace('viewport-fit=cover','viewport-fit=contain').replace(/app.css\?v=\d+/,'app.css').replace(/app.js\?v=\d+/,'app.js').replace('</body>','<script src="native.js"></script></body>');
await fs.writeFile(path.join(out,'index.html'),html);
let js=await fs.readFile(path.join(out,'app.js'),'utf8');
js=js.replaceAll('../assets/','assets/').split('\n').filter(line=>!line.startsWith("if('serviceWorker' in navigator)")).join('\n');
await fs.writeFile(path.join(out,'app.js'),js);
await fs.mkdir(path.join(out,'assets/photos'),{recursive:true});
await fs.mkdir(path.join(out,'assets/videos'),{recursive:true});
for(const id of [2,24,64,65,77,79,101,110,115,120,121,122,123,124,125,126,127,128,129,130]){
 const file=`memory-${String(id).padStart(3,'0')}.jpg`;
 await fs.copyFile(path.resolve(root,'../assets/photos',file),path.join(out,'assets/photos',file));
}
for(const id of [4,8,13,26,27])for(const [prefix,ext]of [['clip','mp4'],['poster','jpg']]){
 const file=`${prefix}-${id}.${ext}`;await fs.copyFile(path.resolve(root,'../assets/videos',file),path.join(out,'assets/videos',file));
}
await sharp(path.join(root,'character-source.png')).resize(600,600,{fit:'contain',background:'#f8f6ef'}).png().toFile(path.join(out,'mascot.png'));
let css=await fs.readFile(path.join(out,'app.css'),'utf8');
css=css.replace(/^@import[^;]+;/,'');
// Bundle fonts so the first launch is also complete in airplane mode.
const fontUrl='https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Serif+Display:ital@0;1&family=Caveat:wght@400;500&display=swap';
const response=await fetch(fontUrl);if(!response.ok)throw Error('Font download failed.');
let fonts=await response.text();
await fs.mkdir(path.join(out,'fonts'),{recursive:true});
const urls=[...new Set([...fonts.matchAll(/url\((https:[^)]+)\)/g)].map(match=>match[1]))];
for(let i=0;i<urls.length;i++){const font=await fetch(urls[i]);if(!font.ok)throw Error('Font asset download failed.');const name=`font-${i}.woff2`;await fs.writeFile(path.join(out,'fonts',name),Buffer.from(await font.arrayBuffer()));fonts=fonts.replaceAll(urls[i],`fonts/${name}`);}
css=fonts+'\n'+css+'\n.app-shell{padding-top:env(safe-area-inset-top)} .install-button{max-width:160px}';
await fs.writeFile(path.join(out,'app.css'),css);
await build({entryPoints:[path.join(root,'native-entry.js')],bundle:true,format:'iife',outfile:path.join(out,'native.js'),minify:true});
console.log('Bundled the app, fonts, 20 photos and 5 video memories for offline use.');
