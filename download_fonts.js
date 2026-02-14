import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cssUrl =
  'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap';
const userAgent =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

const outputDir = path.join(__dirname, 'src/assets/fonts');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

function downloadFile(url, filename) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(path.join(outputDir, filename));
    https
      .get(url, (response) => {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          console.log(`✅ Downloaded ${filename}`);
          resolve();
        });
      })
      .on('error', (err) => {
        fs.unlink(path.join(outputDir, filename), () => {});
        reject(err);
      });
  });
}

https
  .get(cssUrl, { headers: { 'User-Agent': userAgent } }, (res) => {
    let data = '';
    res.on('data', (chunk) => (data += chunk));
    res.on('end', async () => {
      // console.log('Fetched CSS:', data); // Debug if needed

      // Filter for Latin subset
      // Google fonts structure is often:
      // /* latin */
      // @font-face { ... }

      // We will look for valid WOFF2 links.
      // Assuming the API returns them in the requested order (400, 600, 700)
      // AND that "latin" is usually the last or most prominent subset if we don't specify subset.
      // Actually, asking for &subset=latin might be safer, but default usually includes it.

      // Let's match all standard WOFF2 links.
      const matches = [
        ...data.matchAll(/src: url\((https:\/\/[^)]+\.woff2)\)/g),
      ];

      // We expect multiple subsets (cyrillic, ext-latin, latin, etc).
      // The "Latin" ones are usually valid subsets.
      // To be safe, let's just download the LAST 3 occurrences, as Latin is typically listed last in the CSS.
      // Or we can try to parse the comment `/* latin */`.

      // Simple approach: Check adjacent comments.
      // A better approach for this script without complex parsing:
      // Download the files that correspond to the "latin" section.

      // Let's use a regex that looks for /* latin */ section
      const latinRegex =
        /\/\* latin \*\/[\s\S]*?@font-face[\s\S]*?font-weight:\s*(\d+);[\s\S]*?src:\s*url\(([^)]+)\)/g;

      const latinMatches = [...data.matchAll(latinRegex)];

      if (latinMatches.length > 0) {
        console.log(`Found ${latinMatches.length} latin font references.`);
        for (const match of latinMatches) {
          const weight = match[1];
          const url = match[2];
          let filename = `Montserrat-Regular.woff2`;
          if (weight === '600') filename = `Montserrat-SemiBold.woff2`;
          if (weight === '700') filename = `Montserrat-Bold.woff2`;
          if (weight === '400') filename = `Montserrat-Regular.woff2`;

          await downloadFile(url, filename);
        }
        console.log('✨ Fonts downloaded.');
      } else {
        console.log(
          "Could not strictly match 'latin' subset headers, trying fallback to last 3 woff2 links..."
        );
        // Fallback
        if (matches.length >= 3) {
          // usually the last ones are latin
          const last3 = matches.slice(-3);
          await downloadFile(last3[0][1], 'Montserrat-Regular.woff2');
          await downloadFile(last3[1][1], 'Montserrat-SemiBold.woff2');
          await downloadFile(last3[2][1], 'Montserrat-Bold.woff2');
        }
      }
    });
  })
  .on('error', (err) => {
    console.error('Error fetching CSS:', err);
  });
