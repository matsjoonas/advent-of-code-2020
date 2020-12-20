const AocSuite = require('../util/AocSuite');
const parseInput = require('./parseInput');

function reverseString(str) {
  return [...str].reverse().join('');
}

function getBorders(fullImage) {
  const borders = new Array(4); // [0: top , 1: right, 2: bottom, 3: left]

  let leftBorder = '';
  let rightBorder = '';
  fullImage.forEach((line) => {
    const chars = line.split('');
    leftBorder += chars[0];
    rightBorder += chars[chars.length - 1];
  });
  borders[0] = fullImage[0];
  borders[2] = fullImage[fullImage.length - 1];
  borders[1] = rightBorder;
  borders[3] = leftBorder;

  return borders;
}

function flip(tileImage, axis = 'x') {
  // switch the opposite borders and reverse other two borders
  let flipped;
  if (axis === 'x') {
    flipped = tileImage.reverse();
  }
  if (axis === 'y') {
    flipped = tileImage.map(reverseString);
  }
  return flipped;
}

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

function parseTile(tile) {

  const id = tile[0].split('Tile ').join('').split(':').join('');
  const fullImage = tile.slice(1);
  const variations = [];

  variations.push(fullImage);
  variations.push(flip(fullImage, 'x'));
  variations.push(flip(fullImage, 'y'));
  variations.push(rotate90(fullImage, 1));
  variations.push(rotate90(fullImage, 2));
  variations.push(rotate90(fullImage, 3));

  return {
    id,
    variations,
  }
}

function expandVariations(tiles) {
  const expanded = [];
  tiles.forEach(tile => {
    const id = tile.id;

    tile.variations.forEach(variation => {
      expanded.push({
        id,
        tileImage: variation,
      })
    });
  });
  return expanded;
}

function findMatchingBorder(tileImageA, tileImageB) {
  const bordersA = getBorders(tileImageA);
  const bordersB = getBorders(tileImageB);

  const matchingBorder = {};

  matchingBorder.a = bordersA.findIndex(borderA => {
    matchingBorder.b = bordersB.indexOf(borderA);
    return matchingBorder.b !== -1;
  });

  return matchingBorder;
}

// we don't need to actually generate all the rotation variations at this point
// because we can just compare any borders
// and if any one of the borders matches, we'll know that rotating
// either of the tiles would align the borders eventually


function solver(data) {
  const tiles = expandVariations(parseInput(data).map(parseTile));

  // find tiles that have only 2 matching borders
  const cornerTileCandidates = tiles.filter((tileA) => {
    let borders = [];
    let visitedBs = new Set();

    tiles.forEach(tileB => {
      // we don't want to match a tile with itself
      if (tileB.id === tileA.id) {
        return;
      }

      if (visitedBs.has(tileB.id)) {
        return;
      }

      const matchingBorder = findMatchingBorder(tileA.tileImage, tileB.tileImage);
      if (matchingBorder.a !== -1 && matchingBorder.b !== -1) {
        visitedBs.add(tileB.id);
        borders.push(matchingBorder.a);
      }
    });

    return borders.length === 2;
  });

  let cornerTiles = [];
  cornerTileCandidates.forEach(candidate => {
    if (!cornerTiles.find(tile => candidate.id === tile.id)) {
      cornerTiles.push(candidate);
    }
  });

  console.log(cornerTiles);
  return cornerTiles.reduce((acc, tile) => acc * parseInt(tile.id, 10), 1);
}

const suite = new AocSuite({
  solver,
  testInputsDir: 'testInputs2',
  expectedTestAnswers: [null],
});

//suite.test();
suite.solve();
//suite.performance();
