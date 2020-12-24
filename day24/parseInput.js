//e, se, sw, w, nw, and ne
const placeholders = {
  se: 'x',
  sw: 'y',
  nw: 'z',
  ne: 'q',
  x: 'se',
  y: 'sw',
  z: 'nw',
  q: 'ne',
}

function parseInput(data) {
  return  data.toString().trim().split('\r\n')
    .map(line => {
      line = line.split('se').join(placeholders.se)
        .split('sw').join(placeholders.sw)
        .split('nw').join(placeholders.nw)
        .split('ne').join(placeholders.ne)
        .split('').map(char => {
          if (placeholders[char]) {
            return placeholders[char];
          } else {
            return char;
          }
        });

      return line;

    });
}

module.exports = parseInput;
