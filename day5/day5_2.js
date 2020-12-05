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

  const missingSeatCodes = input
    .map(item => getSeatProps(item).id)
    .sort((a, b) => a - b)
    .reduce((acc, cur) => {
      let prevSeatCode = acc.prevSeatCode || cur - 1;
      let newAcc = {
        missingSeatCodes: acc.missingSeatCodes || [],
        prevSeatCode: cur,
      };
      if (prevSeatCode + 1 !== cur) {
        newAcc.missingSeatCodes.push(cur - 1)
      }
      return newAcc;
    }, {});

  console.log(missingSeatCodes);
});
