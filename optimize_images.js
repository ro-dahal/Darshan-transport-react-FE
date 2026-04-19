import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const optimizationProfiles = {
  teamPortrait: {
    maxWidth: 400,
    maxHeight: 400,
    quality: 80,
  },
  profileCard: {
    maxWidth: 400,
    maxHeight: 400,
    quality: 80,
  },
  hero: {
    maxWidth: 1920,
    quality: 60,
  },
  sectionHeader: {
    maxWidth: 1200,
    quality: 80,
  },
};

const optimizationJobs = [
  {
    input: 'src/assets/marketing/about/service-page-hari-bahadur-shrestha.jpg',
    output:
      'src/assets/generated/marketing/about/service-page-hari-bahadur-shrestha.webp',
    profile: 'profileCard',
  },
  {
    input: 'src/assets/marketing/about/service-page-arun-shrestha.jpg',
    output: 'src/assets/generated/marketing/about/service-page-arun-shrestha.webp',
    profile: 'profileCard',
  },
  {
    input: 'src/assets/marketing/services/services-hero-desktop.jpeg',
    output:
      'src/assets/generated/marketing/services/services-hero-desktop.webp',
    profile: 'hero',
  },
  {
    input: 'src/assets/marketing/services/services-hero-mobile.jpeg',
    output: 'src/assets/generated/marketing/services/services-hero-mobile.webp',
    profile: 'hero',
  },
  {
    input: 'src/assets/marketing/team/team-demo-member-1.jpg',
    output: 'src/assets/generated/marketing/team/team-demo-member-1.webp',
    profile: 'teamPortrait',
  },
  {
    input: 'src/assets/marketing/team/team-demo-member-2.jpg',
    output: 'src/assets/generated/marketing/team/team-demo-member-2.webp',
    profile: 'teamPortrait',
  },
  {
    input: 'src/assets/marketing/team/team-finance-department-header.jpg',
    output:
      'src/assets/generated/marketing/team/team-finance-department-header.webp',
    profile: 'sectionHeader',
  },
  {
    input: 'src/assets/marketing/team/team-founder-hari-bahadur-shrestha.jpg',
    output:
      'src/assets/generated/marketing/team/team-founder-hari-bahadur-shrestha.webp',
    profile: 'sectionHeader',
  },
];

async function optimizeImage(job) {
  const inputPath = path.join(__dirname, job.input);
  const outputPath = path.join(__dirname, job.output);

  if (!fs.existsSync(inputPath)) {
    console.warn(`⚠️  File not found: ${job.input}`);
    return;
  }

  const { maxWidth, maxHeight, quality } = optimizationProfiles[job.profile];
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });

  try {
    let pipeline = sharp(inputPath);
    const meta = await pipeline.metadata();
    const resizeOpts = {};

    if (maxWidth && meta.width && meta.width > maxWidth) {
      resizeOpts.width = maxWidth;
    }
    if (maxHeight && meta.height && meta.height > maxHeight) {
      resizeOpts.height = maxHeight;
    }

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
      `✅ ${job.input} → ${job.output} | ${(inputSize / 1024).toFixed(0)}KB → ${(outputSize / 1024).toFixed(0)}KB (${reduction}% smaller)`
    );
  } catch (err) {
    console.error(`❌ Error processing ${job.input}:`, err.message);
  }
}

async function main() {
  console.log(
    `\n🔧 Optimizing ${optimizationJobs.length} files into src/assets/generated/\n`
  );

  for (const job of optimizationJobs) {
    await optimizeImage(job);
  }

  console.log('\n✨ Done! Optimized images saved to src/assets/generated/\n');
}

main().catch((err) => console.error(err));
