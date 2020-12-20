const reverseString = require('./reverseString');

function flip(tileImage, axis = 'x') {
  // switch the opposite borders and reverse other two borders
  let flipped;
  if (axis === 'x') {
    flipped = [...tileImage].reverse();
  }

  if (axis === 'y') {
    flipped = tileImage.map(reverseString);
  }
  return flipped;
}

module.exports = flip;
