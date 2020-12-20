function countMonsters(image) {
  function matchPattern(strChars, pattern) {
    const patternChars = pattern.split('');
    let isMatch = true;
    let idx = 0;
    for (const char of patternChars) {
      if (char === '#') {
        if (strChars[idx] !== '#') {
          isMatch = false;
          break;
        }
      }
      idx++;
    }
    return isMatch;
  }

  function findPatternIndexes(str, pattern) {
    const indexes = [];
    const stringChars = str.split('');
    for (let i = 0; i < stringChars.length; i++) {
      const subChars = stringChars.slice(i, i + pattern.length);
      if (subChars.length < pattern.length) {
        break;
      }
      if (matchPattern(subChars, pattern)) {
        indexes.push(i);
      }
    }
    return indexes;
  }

  const pattern1 = '                  # ';
  const pattern2 = '#    ##    ##    ###';
  const pattern3 = ' #  #  #  #  #  #   ';

  let monsterCount = 0;
  image.forEach((line, lineIdx) => {
    const prevLine = image[lineIdx - 1];
    const nextLine = image[lineIdx + 1];
    const indexes2 = findPatternIndexes(line, pattern2);
    let indexes3 = [];
    let indexes1 = [];
    if (indexes2.length) {
      indexes3 = findPatternIndexes(nextLine, pattern3);
    }
    if (indexes3.length) {
      indexes1 = findPatternIndexes(prevLine, pattern1);
    }

    let count = 0;
    if (indexes2.length && indexes3.length && indexes1.length) {
      indexes2.forEach(idx2 => {
        indexes3.forEach(idx3 => {
          indexes1.forEach(idx1 => {
            if (idx2 === idx3 && idx2 === idx1) {
              count++;
            }
          })
        })
      })
    }

    monsterCount = monsterCount + count;
  });

  return monsterCount;
}
module.exports = countMonsters;
