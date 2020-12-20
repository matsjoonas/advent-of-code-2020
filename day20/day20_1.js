const AocSuite = require('../util/AocSuite');
const parseInput = require('./parseInput');

function reverseString(str) {
  return [...str].reverse().join('');
}

function flip(borders, axis = 'x') {
  // switch the opposite borders and reverse other two borders
  const flipped = new Array(4);
  if (axis === 'x') {
    flipped[0] = borders[2];
    flipped[2] = borders[1];
    flipped[1] = reverseString(borders[1]);
    flipped[3] = reverseString(borders[3]);
  }
  if (axis === 'y') {
    flipped[0] = reverseString(borders[0]);
    flipped[2] = reverseString(borders[2]);
    flipped[1] = borders[3];
    flipped[3] = borders[1];
  }
  return flipped;
}

function rotate90(borders, times = 1, counter = 1) {
  const rotated = [
    borders[3],
    borders[0],
    borders[1],
    borders[2],
  ];
  if (times === counter) {
    return rotated;
  } else {
    return rotate90(rotated, times, counter + 1);
  }
}

function parseTile(tile) {
  const id = tile[0].split('Tile ').join('').split(':').join('');
  const fullImage = tile.slice(1);
  const borders = new Array(4); // [0: top , 1: right, 2: bottom, 3: left]


  let leftBorder = '';
  let rightBorder = '';
  fullImage.forEach((line, idx) => {
    const chars = line.split('');
    leftBorder += chars[0];
    rightBorder += chars[chars.length - 1];
  });
  borders[0] = fullImage[0];
  borders[2] = fullImage[fullImage.length - 1];
  borders[1] = rightBorder;
  borders[3] = leftBorder;

  const variations = [];
  variations.push(borders);
  variations.push(flip(borders, 'x'));
  variations.push(flip(borders, 'y'));
  //variations.push(rotate90(borders, 1));
  //variations.push(rotate90(borders, 2));
  //variations.push(rotate90(borders, 3));

  return {
    id,
    variations,
  }
}

function atLeastOneBorderMatches(bordersA, bordersB, log = false) {
  const concatenated = bordersA.concat(bordersB);
  return new Set(concatenated).size < concatenated.length;
}

function tilesHaveAMatchingBorder(tileA, tileB) {
  let match = false;
  let log = false;
  for (const bordersA of tileA.variations) {
    if (tileA.id === '3079' && tileB.id === '2311') {
      log = false;
    }
    const found = tileB.variations.find(bordersB => atLeastOneBorderMatches(bordersA, bordersB, log));
    if (found) {
      match = true;
      break;
    }
  }

  return match;
}

// we don't need to actually generate all the rotation variations at this point
// because we can just compare any borders
// and if any one of the borders matches, we'll know that rotating
// either of the tiles would align the borders eventually


function solver(data) {
  const tiles = parseInput(data).map(parseTile);

  // find tiles that have only 2 matching borders
  const cornerTiles = tiles.filter((tileA) => {
    let matchesCount = 0;

    tiles.forEach(tileB => {
      // we don't want to match a tile with itself
      if (tileB.id === tileA.id) {
        return;
      }

      if (tilesHaveAMatchingBorder(tileA, tileB)) {
        matchesCount++;
      }
    });


    return matchesCount === 2;
  });

  return cornerTiles.reduce((acc, tile) => acc * parseInt(tile.id, 10), 1);
}

const suite = new AocSuite({
  solver,
  testInputsDir: 'testInputs1',
  expectedTestAnswers: [null],
});

//suite.test();
suite.solve();
//suite.performance();
