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

const adapterCode = `
import server from './index.js';

export default async function(req, res) {
  const url = new URL(req.url, 'http://' + (req.headers.host || 'localhost'));
  
  const headers = new Headers();
  for (const key in req.headers) {
    if (req.headers[key]) {
      if (Array.isArray(req.headers[key])) {
        req.headers[key].forEach(v => headers.append(key, v));
      } else {
        headers.append(key, req.headers[key]);
      }
    }
  }

  const init = {
    method: req.method,
    headers,
  };

  if (req.method !== 'GET' && req.method !== 'HEAD') {
    const chunks = [];
    for await (const chunk of req) {
      chunks.push(chunk);
    }
    init.body = Buffer.concat(chunks);
  }

  const webReq = new Request(url.href, init);
  
  const webRes = await server.fetch(webReq, {}, { waitUntil: () => {} });

  res.statusCode = webRes.status;
  webRes.headers.forEach((value, key) => {
    res.setHeader(key, value);
  });

  if (webRes.body) {
    const reader = webRes.body.getReader();
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      res.write(value);
    }
    res.end();
  } else {
    res.end();
  }
}
`;

fs.writeFileSync('.vercel/output/functions/index.func/vercel-adapter.js', adapterCode, 'utf8');

fs.writeFileSync('.vercel/output/functions/index.func/.vc-config.json', JSON.stringify({
  runtime: 'nodejs22.x',
  handler: 'vercel-adapter.js',
  launcherType: 'Nodejs'
}));

console.log('Vercel Build Output API generated successfully.');
