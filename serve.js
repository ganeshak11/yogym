const http = require('http');
const fs = require('fs');
const path = require('path');

const root = __dirname;
const port = Number(process.env.PORT || 4174);
const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon'
};

http.createServer((request, response) => {
  const pathname = decodeURIComponent((request.url || '/').split('?')[0]);
  const relative = pathname === '/' ? 'index.html' : pathname.replace(/^[/\\]+/, '');
  const target = path.resolve(root, relative);
  if (!target.startsWith(root + path.sep) && target !== path.join(root, 'index.html')) {
    response.writeHead(403); return response.end('Forbidden');
  }
  fs.readFile(target, (error, data) => {
    if (error) { response.writeHead(404); return response.end('Not found'); }
    response.writeHead(200, { 'Content-Type': types[path.extname(target).toLowerCase()] || 'application/octet-stream' });
    response.end(data);
  });
}).listen(port, '127.0.0.1', () => console.log(`YOGYM running at http://localhost:${port}`));
