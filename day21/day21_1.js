const _ = require('lodash');
const AocSuite = require('../util/AocSuite');
const parseInput = require('./parseInput');

function solver(data) {
  let input = parseInput(data);

  const allAllergens = new Set(
    _.flatten(input.map(food => food.allergens))
  );

  let allAllergenicIngredients = [];
  allAllergens.forEach((allergen) => {
    const foods = input.filter(food => food.allergens.includes(allergen));

    const allergenicIngredients = _.intersection(...foods.map(food => food.ingredients));
    allAllergenicIngredients.push(allergenicIngredients);
  });
  allAllergenicIngredients = new Set(_.flatten(allAllergenicIngredients));

  let allIngredients = input.reduce((acc, food) => {
    return [...acc, ...food.ingredients];
  }, []);

  const answer = allIngredients.filter(ingredient => {
    return !allAllergenicIngredients.has(ingredient);
  }).length;


  return answer;
}

const suite = new AocSuite({
  solver,
  testInputsDir: 'testInputs1',
  expectedTestAnswers: [5],
});

//suite.test();
suite.solve();
//suite.performance();
