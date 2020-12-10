const AocSuite = require('../util/AocSuite');

function solver(data) {
  const input = data.toString().trim().split('\r\n')
    .map(item => parseInt(item))
    .sort((a, b) => a - b);

  const pathCounts = input.reduce((acc, cur) => {
    const pathCountAt1Before = acc[cur - 1] || 0;
    const pathCountAt2Before = acc[cur - 2] || 0;
    const pathCountAt3Before = acc[cur - 3] || 0;
    acc[cur] = pathCountAt1Before + pathCountAt2Before + pathCountAt3Before;
    return acc;
  }, [1]);

  return pathCounts[pathCounts.length - 1];

  // multiplying the adapter group variations would have probably worked too
  // the adapter groups have to be in ascending order and
  // since the groups are spaced 2 jolts apart, we can't omit the first and last adapter from the group
  // since the first and last ones need to connect to the previous and next group (can't leave more than 3 jolts between groups),
  // so, this means, that we will not have many group variations
  // e.g. group [4, 5, 6, 7] would have only the following variations:
  // [4, 6, 7] [4, 5, 7] [4, 7] 
}

const suite = new AocSuite({
  solver,
  testInputsDir: 'testInputs2',
  expectedTestAnswers: [8],
});

//suite.test();
suite.solve();
//suite.performance();
