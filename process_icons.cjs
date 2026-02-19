const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const imgDir = path.join(__dirname, 'src', 'assets', 'img');
const icons = ['facebook.png', 'instagram.png', 'whatsapp.png', 'linkedin.png'];

async function processIcons() {
  for (const icon of icons) {
    const iconPath = path.join(imgDir, icon);
    console.log(`Normalizing ${icon}...`);

    try {
      // 1. Initial processing: Black -> Transparent, Transparent -> #ccc
      const { data, info } = await sharp(iconPath)
        .ensureAlpha()
        .raw()
        .toBuffer({ resolveWithObject: true });

      const { width, height, channels } = info;
      const processed = Buffer.alloc(data.length);

      for (let i = 0; i < data.length; i += channels) {
        let r = data[i];
        let g = data[i + 1];
        let b = data[i + 2];
        let a = data[i + 3];

        // The original icons had black circles and transparent logos.
        // We want the logo to be #ccc and the rest transparent.
        const isBlack = r < 90 && g < 90 && b < 90 && a > 100;
        const isEmpty = a < 100;

        if (isBlack) {
          // Background - make fully transparent
          processed[i] = 0;
          processed[i + 1] = 0;
          processed[i + 2] = 0;
          processed[i + 3] = 0;
        } else if (isEmpty) {
          // Logo area - make #ccc
          processed[i] = 204;
          processed[i + 1] = 204;
          processed[i + 2] = 204;
          processed[i + 3] = 255;
        } else {
          // Any remaining artifacts - transparent
          processed[i] = 0;
          processed[i + 1] = 0;
          processed[i + 2] = 0;
          processed[i + 3] = 0;
        }
      }

      // 2. Trim, Resize to 400px, and Extend to 512px
      // This ensures consistent visual weight and centering.
      await sharp(processed, { raw: { width, height, channels } })
        .trim() // Remove all exterior transparency
        .resize({
          width: 400,
          height: 400,
          fit: 'contain',
          background: { r: 0, g: 0, b: 0, alpha: 0 },
        })
        .extend({
          top: 56,
          bottom: 56,
          left: 56,
          right: 56, // (512 - 400) / 2 = 56
          background: { r: 0, g: 0, b: 0, alpha: 0 },
        })
        .png()
        .toFile(path.join(imgDir, `norm_${icon}`));

      fs.renameSync(path.join(imgDir, `norm_${icon}`), iconPath);
      console.log(`Successfully normalized ${icon}`);
    } catch (err) {
      console.error(`Error normalizing ${icon}:`, err);
    }
  }
}

processIcons();
