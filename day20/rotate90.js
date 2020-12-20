const reverseString = require('./reverseString');
function rotate90(tileImage, times = 1, counter = 1) {
  let colLines = [];
  tileImage.forEach((line, lineIndex) => {
    line.split('').forEach((char, charIndex) => {
      if (colLines[charIndex] === undefined) {
        colLines[charIndex] = '';
      }
      colLines[charIndex] = colLines[charIndex] + char;
    });
  });
  const rotated = colLines.map(reverseString);

  if (times === counter) {
    return rotated;
  } else {
    return rotate90(rotated, times, counter + 1);
  }
}

module.exports = rotate90;
