const flip = require('./flip');
const rotate90 = require('./rotate90');

function createVariations(fullImage) {
  const variations = [];
  variations.push(fullImage);
  let flippedImages = [flip(fullImage, 'x'), flip(fullImage, 'y')];
  flippedImages.forEach(image => {
    variations.push(image);
    for (let i = 1; i < 4; i++) {
      variations.push(rotate90(image, i));
    }
  });

  let rotatedImages = [rotate90(fullImage, 1), rotate90(fullImage, 2), rotate90(fullImage, 3)];
  rotatedImages.forEach(image => {
    variations.push(image);
    variations.push(flip(image, 'x'));
    variations.push(flip(image, 'y'));
  });

  return variations;
}

module.exports = createVariations;
