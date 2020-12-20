
function parseInput(data) {
  return data.toString().trim()
    .split('\r\n\r\n')
    .map(line => line.split('\r\n'));
}

module.exports = parseInput;
