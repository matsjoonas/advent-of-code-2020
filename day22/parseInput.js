
function parseInput(data) {
  return  data.toString().trim().split('\r\n\r\n')
    .map(line => {
      return line.split('\r\n');
    }).map(item => item.slice(1));
}

module.exports = parseInput;
