const AocSuite = require('../util/AocSuite');
const buildImage = require('./buildImage');


// we don't need to actually generate all the rotation variations at this point
// because we can just compare any borders
// and if any one of the borders matches, we'll know that rotating
// either of the tiles would align the borders eventually


function solver(data) {
  const image = buildImage(data);

  console.log(image);


  return null;
}

const suite = new AocSuite({
  solver,
  testInputsDir: 'testInputs2',
  expectedTestAnswers: [null],
});

suite.test();
//suite.solve();
//suite.performance();
