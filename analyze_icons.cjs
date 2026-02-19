const sharp = require('sharp');
const path = require('path');

const imgDir = path.join(__dirname, 'src', 'assets', 'img');
const icons = ['facebook.png', 'instagram.png', 'whatsapp.png', 'linkedin.png'];

async function analyze() {
  for (const icon of icons) {
    const stats = await sharp(path.join(imgDir, icon)).metadata();
    console.log(
      `${icon}: ${stats.width}x${stats.height}, format: ${stats.format}, hasAlpha: ${stats.hasAlpha}`
    );
  }
}

analyze();
