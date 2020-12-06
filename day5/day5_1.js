const fs = require('fs');
fs.readFile('./input.txt', (e, data) => {

  const input = data.toString().trim().split('\r\n');

  function convertToDecimal(string, [zeroChar, oneChar]) {
    return parseInt(string
      .split(zeroChar)
      .join('0')
      .split(oneChar)
      .join('1'), 2);
  }

  function getSeatProps(seatCode) {
    const row = convertToDecimal(seatCode.substr(0, 7), ['F', 'B'])
    const col = convertToDecimal(seatCode.substr(7), ['L', 'R'])
    return {
      row,
      col,
      id: (row * 8) + col,
    }
  }

  const highestId = input
    .map(getSeatProps)
    .reduce((acc, cur) => {
      return (acc > cur.id) ? acc : cur.id
    }, 0);

  console.log(highestId);
});
