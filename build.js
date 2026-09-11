const fs = require('fs');
const path = require('path');

const root = __dirname;
const dist = path.join(root, 'dist');
const skip = new Set(['dist', 'outputs', 'node_modules', '.git', 'work', 'legacy-css', '.vercel']);

fs.rmSync(dist, { recursive: true, force: true });
fs.mkdirSync(dist, { recursive: true });

function copy(source, destination) {
  const stat = fs.statSync(source);
  if (stat.isDirectory()) {
    fs.mkdirSync(destination, { recursive: true });
    for (const entry of fs.readdirSync(source)) {
      if (!skip.has(entry)) copy(path.join(source, entry), path.join(destination, entry));
    }
  } else {
    fs.copyFileSync(source, destination);
  }
}

for (const entry of fs.readdirSync(root)) {
  if (!skip.has(entry)) copy(path.join(root, entry), path.join(dist, entry));
}
console.log('Built portable frontend to dist/.');
