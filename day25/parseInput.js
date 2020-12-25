
function parseInput(data) {
  return  data.toString().trim().split('\r\n').map(Number);
}

module.exports = parseInput;
