const fs = require('fs');
const { createCanvas } = require('canvas');
function snapshot(layout, config = {}) {
  const fileName = config.fileName || './image';
  const color = {
    bg: '#333333',
    emptySeat: '#939ba6',
    takenSeat: '#1272c5',
  }
  const canvasPadding = 10;
  const unitSize = 9;
  const unitMargin = 2;
  const totalSize = unitSize + (2 * unitMargin);
  const canvasWidth = layout[0].length * totalSize + (2 * canvasPadding);
  const canvasHeight = layout.length * totalSize + (2 * canvasPadding);
  const canvas = createCanvas(canvasWidth, canvasHeight);
  const context = canvas.getContext('2d');
  context.fillStyle = color.bg;
  context.fillRect(0, 0, canvas.width, canvas.height);

  layout.forEach((row, rowIdx) => {
    row.forEach((unit, unitIdx) => {
      if (unit === 'L') {
        context.fillStyle = color.emptySeat;
      } else if (unit === '#') {
        context.fillStyle = color.takenSeat;
      } else {
        context.fillStyle = color.bg;
      }
      let y = rowIdx * totalSize + unitMargin + canvasPadding;
      let x = unitIdx * totalSize + unitMargin + canvasPadding;
      context.fillRect(x, y, unitSize, unitSize);
    });
  });

  const buffer = canvas.toBuffer('image/png')
  fs.writeFileSync( fileName + '.png', buffer)
}

module.exports = snapshot;
