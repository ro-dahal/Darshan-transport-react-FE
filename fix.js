import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dir = path.join(__dirname, 'src/assets/marketing/team/');
const genDir = path.join(__dirname, 'src/assets/generated/marketing/team/');

async function fixDir(d) {
  if (!fs.existsSync(d)) return;
  const files = fs.readdirSync(d);
  for (const f of files) {
    if (!f.endsWith('.jpg') && !f.endsWith('.webp')) continue;
    const p = path.join(d, f);
    const meta = await sharp(p).metadata();
    if (meta.width > 1600 || meta.height > 1600) {
      console.log(`Resizing ${f} from ${meta.width}x${meta.height}...`);
      const transformer = sharp(p).resize({ width: 1600, height: 1600, fit: 'inside', withoutEnlargement: true });
      const buf = await (f.endsWith('.webp') ? transformer.webp({ quality: 85 }) : transformer.jpeg({ quality: 85 })).toBuffer();
      fs.writeFileSync(p, buf);
    }
  }
}
async function main() {
  await fixDir(dir);
  await fixDir(genDir);
}
main().catch(console.error);
