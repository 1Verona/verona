import { cp, mkdir, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const output = path.join(root, 'dist');
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
// Keep existing video URLs and other public assets available.
await cp(path.join(root, 'public'), output, { recursive: true });
for (const file of ['index.html', 'style.css', 'app.js', 'language.js', 'contact.js', 'project-map.js', 'tool-strip.js', 'blobs.js', 'assets']) {
  await cp(path.join(root, file), path.join(output, file), { recursive: true });
}
console.log('Built portfolio in dist/');
