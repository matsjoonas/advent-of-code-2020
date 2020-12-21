
function parseInput(data) {
  return  data.toString().trim().split('\r\n')
    .map(line => {
      let ingredients = line.split('(')[0].trim().split(' ').sort();
      let allergens = line.split('(contains')[1]
        .split(')').join('').trim().split(', ')
        .sort();

      return {
        ingredients,
        allergens,
      }
    }).sort((a, b) => a.allergens.length - b.allergens.length);
}

module.exports = parseInput;
