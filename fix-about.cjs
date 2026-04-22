const sharp = require('sharp');
const fs = require('fs');

async function fix() {
  const dir = 'src/assets/marketing/about';
  const files = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.jpg') || f.endsWith('.png'));

  for (const file of files) {
    const inputPath = `${dir}/${file}`;
    const tmpPath = `${dir}/${file}.tmp`;

    console.log(`Processing ${inputPath}...`);

    await sharp(inputPath)
      .resize(1600, 1600, {
        fit: 'inside',
        withoutEnlargement: true,
      })
      .toFile(tmpPath);

    fs.renameSync(tmpPath, inputPath);
  }
}

fix().catch(console.error);
