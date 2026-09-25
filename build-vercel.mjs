import fs from 'fs';
import path from 'path';

function cp(src, dest) {
  if (!fs.existsSync(src)) return;
  if (fs.statSync(src).isDirectory()) {
    fs.mkdirSync(dest, { recursive: true });
    fs.readdirSync(src).forEach(child => cp(path.join(src, child), path.join(dest, child)));
  } else {
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(src, dest);
  }
}

fs.rmSync('.vercel', { recursive: true, force: true });
fs.mkdirSync('.vercel/output/static', { recursive: true });
fs.mkdirSync('.vercel/output/functions/index.func', { recursive: true });

fs.writeFileSync('.vercel/output/config.json', JSON.stringify({
  version: 3,
  routes: [{ handle: 'filesystem' }, { src: '/.*', dest: '/index' }]
}));

cp('dist/client', '.vercel/output/static');

cp('dist/server', '.vercel/output/functions/index.func');

fs.writeFileSync('.vercel/output/functions/index.func/.vc-config.json', JSON.stringify({
  runtime: 'edge',
  entrypoint: 'index.js'
}));

console.log('Vercel Build Output API generated successfully.');
