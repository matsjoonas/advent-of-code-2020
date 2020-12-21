const _ = require('lodash');
const AocSuite = require('../util/AocSuite');
const parseInput = require('./parseInput');

function solver(data) {
  let input = parseInput(data);

  const allAllergens = new Set(
    _.flatten(input.map(food => food.allergens))
  );


  let allergenicIngredients = [];
  allAllergens.forEach((allergen) => {
    const foods = input.filter(food => food.allergens.includes(allergen));
    allergenicIngredients.push({
      allergen,
      ingredients: _.intersection(...foods.map(food => food.ingredients)).sort(),
    });
  });

  function sortingAlgorithm(a, b) {
    let diff = a.ingredients.length - b.ingredients.length;
    if (diff === 0) {
      return a.ingredients[0] > b.ingredients[0] ? 1 : -1;
    } else {
      return diff;
    }
  }

  function findAllergenIngredient(items, idx = 0) {
    const sortedItems = items.sort(sortingAlgorithm);

    const thisIngredient = sortedItems[idx].ingredients[0];

    const newItems = sortedItems.map(item => {
      if (item.ingredients.length === 1) {
        return item;
      } else {
        item.ingredients = item.ingredients.filter(ingredient => ingredient !== thisIngredient);
        return item;
      }
    });
    if (idx + 1 === items.length) {
      return newItems;
    } else {
      return findAllergenIngredient(newItems, idx + 1);
    }
  }

  return findAllergenIngredient(allergenicIngredients)
    .sort((a, b) => a.allergen > b.allergen ? 1 : -1)
    .map(item => item.ingredients[0])
    .join(',');
}

const suite = new AocSuite({
  solver,
  testInputsDir: 'testInputs2',
  expectedTestAnswers: ['mxmxvkd,sqjhc,fvjkl'],
});

//suite.test();
suite.solve();
//suite.performance();
