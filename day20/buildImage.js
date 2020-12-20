const parseInput = require('./parseInput');
const flip = require('./flip');
const rotate90 = require('./rotate90');


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

function parseTile(tile) {

  const id = tile[0].split('Tile ').join('').split(':').join('');
  const fullImage = tile.slice(1);
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

function buildImage(data) {
  const tiles = expandVariations(parseInput(data).map(parseTile));

  // find tiles that have only 2 matching borders
  const cornerTileCandidates = [];
  tiles.forEach((tileA) => {
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
    if (borders.length === 2) {
      cornerTileCandidates.push({
        borders,
        tile: tileA,
      });
    }
  });

  let topLeftCornerTileCandidates = cornerTileCandidates.filter(candidate => {
    return candidate.borders.indexOf(1) !== -1 && candidate.borders.indexOf(2) !== -1;
  });
  
  const topLeftCornerTile = topLeftCornerTileCandidates[0].tile;

  function buildFirstCol(tiles) {
    let image = [];
    let i = 1;
    let keepBuildingFirstCol = true;
    let usedTiles = [];
    image.push([topLeftCornerTile]);
    usedTiles.push(topLeftCornerTile.id)
    while (keepBuildingFirstCol) {
      const prevTile = image[i - 1][0];
      const prevBorderBot = getBorders(prevTile.tileImage)[2];
      const match = tiles.find(tile => {
        if (usedTiles.find(usedTile => usedTile === tile.id)) {
          return false;
        }

        const nextBorderTop = getBorders(tile.tileImage)[0];
        return prevBorderBot === nextBorderTop;
      });

      if (match) {
        usedTiles.push(match.id);
        image[i] = [match];
      } else {
        keepBuildingFirstCol = false;
      }
      i++;
    }
    return image;
  }

  let usedTiles = [];
  const image = buildFirstCol(tiles)
    .map(row => {
      return buildRow(row, usedTiles, tiles)
    });


  function buildRow(row, usedTiles, tiles) {
    let newRow = [...row];
    let keepBuilding = true;
    let i = 1;
    usedTiles.push(row[0].id);
    while (keepBuilding) {
      const prevTile = newRow[i - 1];
      const prevBorderRight = getBorders(prevTile.tileImage)[1];
      const match = tiles.find(tile => {
        if (usedTiles.find(usedTile => usedTile === tile.id)) {
          return false;
        }

        const nextBorderLeft = getBorders(tile.tileImage)[3];
        return prevBorderRight === nextBorderLeft;
      });


      if (match) {
        usedTiles.push(match.id);
        newRow.push(match);
      } else {
        keepBuilding = false;
      }

      i++;
    }
    return newRow;
  }

  const croppedImage = image.map(row => {
    return row.map(tile => {
      let croppedImage = tile.tileImage.slice(1, tile.tileImage.length - 1);
      croppedImage = croppedImage.map(line => line.slice(1, line.length - 1));
      return croppedImage;
    });
  });

  let mergedImage = [];

  let rowMod = 0;
  croppedImage.forEach(row => {
    row.forEach(tileImage => {
      tileImage.forEach((line, lineIndex) => {
        let rowIndex = rowMod * tileImage.length + lineIndex;
        if (!mergedImage[rowIndex]) {
          mergedImage[rowIndex] = '';
        }
        mergedImage[rowIndex] = mergedImage[rowIndex] + line;
      });

    });
    rowMod++;
  });

  return mergedImage;
}

module.exports = buildImage;
