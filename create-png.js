const fs = require('fs');
const { createCanvas, loadImage } = require('canvas');

// Install canvas: npm install canvas

async function createSocialImage() {
  try {
    // Create canvas with social media dimensions
    const width = 1200;
    const height = 630;
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    // Create gradient background (dark blue to purple)
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#1a1a2e');
    gradient.addColorStop(0.5, '#16213e');
    gradient.addColorStop(1, '#0f3460');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Add OrbitX text
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 80px Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('OrbitX', width / 2, height / 2 - 50);

    // Add tagline
    ctx.fillStyle = '#e0e0e0';
    ctx.font = '36px Arial, sans-serif';
    ctx.fillText('Direct Drive LED Lighting Solutions', width / 2, height / 2 + 20);

    // Add website URL
    ctx.fillStyle = '#3534FE';
    ctx.font = '28px Arial, sans-serif';
    ctx.fillText('orbitx.co.za', width / 2, height / 2 + 80);

    // Save as PNG
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync('./public/images/orbitx-social.png', buffer);
    console.log('Created orbitx-social.png successfully!');

  } catch (error) {
    console.error('Error creating PNG:', error);
  }
}

createSocialImage();
