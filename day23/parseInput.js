
function parseInput(data) {
  return  data.toString().trim().split('').map(value => parseInt(value, 10));
}

module.exports = parseInput;
