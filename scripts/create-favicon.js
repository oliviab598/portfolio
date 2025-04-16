const sharp = require('sharp');
const path = require('path');

const inputPath = path.join(__dirname, '../public/profile.jpg');
const outputPath = path.join(__dirname, '../public/favicon.png');

async function createCircularFavicon() {
  try {
    // Create a circular mask
    const size = 256; // larger size for better quality
    const circle = Buffer.from(`<svg><circle cx="${size/2}" cy="${size/2}" r="${size/2}" /></svg>`);

    await sharp(inputPath)
      .resize(size, size)
      .composite([{
        input: circle,
        blend: 'dest-in'
      }])
      .png()
      .toFile(outputPath);

    console.log('Circular favicon created successfully!');
  } catch (error) {
    console.error('Error creating favicon:', error);
  }
}

createCircularFavicon();
