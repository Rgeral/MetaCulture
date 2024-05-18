const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');

// Function to generate a random color
function randomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgba(${r},${g},${b},${Math.random()})`;  // Include alpha for transparency
}

// Route GET for the root
async function sketch() {
    const width = 800;
    const height = 600;
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    // Draw gradient background
    const grd = ctx.createLinearGradient(0, 0, width, height);
    grd.addColorStop(0, randomColor());
    grd.addColorStop(1, randomColor());
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, width, height);

    // Draw random circles
    for (let i = 0; i < 50; i++) {
        ctx.fillStyle = randomColor();
        ctx.beginPath();
        ctx.arc(
            Math.random() * width,    // x position
            Math.random() * height,   // y position
            Math.random() * 50 + 10,  // radius
            0,                        // start angle
            Math.PI * 2               // end angle
        );
        ctx.fill();
    }

    // Draw random rectangles
    for (let i = 0; i < 20; i++) {
        ctx.fillStyle = randomColor();
        ctx.fillRect(
            Math.random() * width,    // x position
            Math.random() * height,   // y position
            Math.random() * 100 + 20, // width
            Math.random() * 60 + 15   // height
        );
    }

    // Draw random lines
    for (let i = 0; i < 15; i++) {
        ctx.strokeStyle = randomColor();
        ctx.lineWidth = Math.random() * 5;
        ctx.beginPath();
        ctx.moveTo(Math.random() * width, Math.random() * height);
        ctx.lineTo(Math.random() * width, Math.random() * height);
        ctx.stroke();
    }
    // Convert canvas to image buffer
    const buffer = canvas.toBuffer('image/jpeg');

    // Save image to file
    const fileName = `./tmp/${Date.now()}.jpg`;
    const filePath = path.join(fileName);
    fs.writeFileSync(filePath, buffer);
    // Respond with image data
    return filePath;
};

module.exports = sketch;