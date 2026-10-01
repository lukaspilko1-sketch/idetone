// Vygeneruje PNG favicony z public/favicon.svg (npm run favicons). Spustit po změně favicon.svg.
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const pub = (name) => fileURLToPath(new URL(`../public/${name}`, import.meta.url));
const sizes = [
  ['favicon-32.png', 32],
  ['apple-touch-icon.png', 180],
  ['icon-192.png', 192],
];

for (const [name, size] of sizes) {
  await sharp(pub('favicon.svg'), { density: (72 * size) / 32 })
    .resize(size, size)
    .png()
    .toFile(pub(name));
  console.log(`public/${name} (${size}×${size})`);
}
