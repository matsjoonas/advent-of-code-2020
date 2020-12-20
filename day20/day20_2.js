const AocSuite = require('../util/AocSuite');
const buildImage = require('./buildImage');
const countMonsters = require('./countMonsters');
const createVariations = require('./createVariations');

function solver(data) {
  let image = buildImage(data);

  const variations = createVariations(image);
  let monsterCount = 0;
  for (image of variations) {
    monsterCount = countMonsters(image);
    if (monsterCount) {

      break;
    }
  }

  const poundsInMonsterPattern = 15;
  const poundsInImage = image.join('').split('').filter(char => char === '#').length;

  return poundsInImage - (monsterCount * poundsInMonsterPattern);
}

const suite = new AocSuite({
  solver,
  testInputsDir: 'testInputs2',
  expectedTestAnswers: [null],
});

//suite.test();
suite.solve();
//suite.performance();
