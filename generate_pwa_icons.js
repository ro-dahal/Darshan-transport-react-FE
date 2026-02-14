import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputPath = path.join(__dirname, 'src/assets/img/LogoTab.png');
const outputDir = path.join(__dirname, 'public');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function generateIcons() {
  if (!fs.existsSync(inputPath)) {
    console.error('❌ Source image not found:', inputPath);
    return;
  }

  try {
    await sharp(inputPath)
      .resize(192, 192)
      .toFile(path.join(outputDir, 'pwa-192x192.png'));
    console.log('✅ Generated pwa-192x192.png');

    await sharp(inputPath)
      .resize(512, 512)
      .toFile(path.join(outputDir, 'pwa-512x512.png'));
    console.log('✅ Generated pwa-512x512.png');
  } catch (err) {
    console.error('❌ Error generating icons:', err);
  }
}

generateIcons();
