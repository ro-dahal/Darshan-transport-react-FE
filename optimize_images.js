import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputDir = path.join(__dirname, 'public/img');
const outputDir = path.join(__dirname, 'public/img/optimized');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const images = [
  'about-bg.jpg',
  'services-bg.jpg',
  'logistic-hero.jpg',
  'track-bg.jpg'
];

async function optimizeImages() {
  for (const image of images) {
    const inputPath = path.join(inputDir, image);
    const outputPath = path.join(outputDir, image.replace(/\.(jpg|jpeg|png)$/i, '.webp'));

    if (fs.existsSync(inputPath)) {
      console.log(`Optimizing ${image}...`);
      await sharp(inputPath)
        .webp({ quality: 80 })
        .toFile(outputPath);
      console.log(`Saved to ${outputPath}`);
    } else {
      console.warn(`File not found: ${inputPath}`);
    }
  }
}

optimizeImages().catch(err => console.error(err));
