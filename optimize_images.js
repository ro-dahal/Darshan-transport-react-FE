import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputDir = path.join(__dirname, 'src/assets/img');
const outputDir = path.join(__dirname, 'src/assets/img/optimized');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Images that need specific sizing
const HERO_BACKGROUNDS = [
  'background.jpg',
  'background1.jpg',
  'background2.jpg',
  'bg.jpg',
];
const PERSON_PHOTOS = ['person1.jpg', 'person2.png', 'person3.jpg'];
const LOGOS = [
  'logo-bar.png',
  'logo.png',
  'logo1.png',
  'Logo-01.png',
  'Logo-02.png',
  'Logo-03.png',
  'Logo-04.png',
  'LogoTab.png',
];
const SMALL_ICONS = [
  'right-arrow.png',
  'button.png',
  'cargo-truck.png',
  'working-factory.png',
];
const SKIP_EXTENSIONS = ['.pdf', '.psd', '.mp4', '.svg'];

// Social media icons - will be replaced with SVGs, but optimize anyway
const SOCIAL_ICONS = [
  'facebook.png',
  'instagram.png',
  'whatsapp.png',
  'linkedin.png',
  'tiktok.png',
];

async function optimizeImage(filename) {
  const ext = path.extname(filename).toLowerCase();
  if (SKIP_EXTENSIONS.includes(ext)) {
    console.log(`⏭️  Skipping ${filename} (${ext})`);
    return;
  }

  const inputPath = path.join(inputDir, filename);
  const outputName = filename.replace(
    /\.(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)$/i,
    '.webp'
  );
  const outputPath = path.join(outputDir, outputName);

  if (!fs.existsSync(inputPath)) {
    console.warn(`⚠️  File not found: ${filename}`);
    return;
  }

  try {
    const isGif = ext === '.gif';
    let pipeline = sharp(inputPath, { animated: isGif });
    const meta = await pipeline.metadata();

    let maxWidth, maxHeight, quality;

    if (HERO_BACKGROUNDS.includes(filename)) {
      // Hero backgrounds: cap at 1920px wide, quality 60
      maxWidth = 1920;
      quality = 60;
    } else if (PERSON_PHOTOS.includes(filename)) {
      // Person photos: resize to 400x400 (used as small thumbnails and founder cards)
      maxWidth = 400;
      maxHeight = 400;
      quality = 80;
    } else if (LOGOS.includes(filename)) {
      // Logos: cap at 400px wide
      maxWidth = 400;
      quality = 85;
    } else if (SMALL_ICONS.includes(filename)) {
      // Small icons: cap at 64px
      maxWidth = 64;
      quality = 80;
    } else if (filename === 'gif2.gif') {
      // Aggressive optimization for the large animation
      maxWidth = 480;
      quality = 45;
    } else if (SOCIAL_ICONS.includes(filename)) {
      // Social icons: cap at 64px
      maxWidth = 64;
      quality = 80;
    } else {
      // Everything else: cap at 1200px
      maxWidth = 1200;
      quality = 80;
    }

    // Only resize if larger than target
    const resizeOpts = {};
    if (maxWidth && meta.width > maxWidth) resizeOpts.width = maxWidth;
    if (maxHeight && meta.height > maxHeight) resizeOpts.height = maxHeight;
    if (Object.keys(resizeOpts).length > 0) {
      resizeOpts.fit = 'inside';
      resizeOpts.withoutEnlargement = true;
      pipeline = pipeline.resize(resizeOpts);
    }

    await pipeline.webp({ quality }).toFile(outputPath);

    const inputSize = fs.statSync(inputPath).size;
    const outputSize = fs.statSync(outputPath).size;
    const reduction = ((1 - outputSize / inputSize) * 100).toFixed(1);
    console.log(
      `✅ ${filename} → ${outputName} | ${(inputSize / 1024).toFixed(0)}KB → ${(outputSize / 1024).toFixed(0)}KB (${reduction}% smaller)`
    );
  } catch (err) {
    console.error(`❌ Error processing ${filename}:`, err.message);
  }
}

async function main() {
  const files = fs.readdirSync(inputDir).filter((f) => {
    const stat = fs.statSync(path.join(inputDir, f));
    return stat.isFile();
  });

  console.log(`\n🔧 Optimizing ${files.length} files from src/assets/img/\n`);

  for (const file of files) {
    await optimizeImage(file);
  }

  console.log(
    '\n✨ Done! Optimized images saved to src/assets/img/optimized/\n'
  );
}

main().catch((err) => console.error(err));
