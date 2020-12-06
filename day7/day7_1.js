const context = require('../util/context');
context('./input.txt', solve);

function solve(data) {
  const input = data.toString().trim().split('\r\n');

  return input;
}
