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

fs.writeFileSync('.vercel/output/functions/index.func/package.json', JSON.stringify({ type: 'module' }));

const adapterCode = `
import server from './index.js';

export default async function(req, res) {
  try {
    const protocol = req.headers['x-forwarded-proto'] || 'https';
    const host = req.headers['x-forwarded-host'] || req.headers.host || 'localhost';
    const url = new URL(req.url, protocol + '://' + host);
    
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
    
    // Cloudflare fetch signature
    const webRes = await server.fetch(webReq, process.env, { waitUntil: () => {} });

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
  } catch (err) {
    console.error('VERCEL ADAPTER ERROR:', err);
    res.statusCode = 500;
    res.end('Server Error: ' + (err.stack || String(err)));
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
