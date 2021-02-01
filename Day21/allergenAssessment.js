const fs = require('fs')
const lines = fs.readFileSync('input.txt', {encoding: 'utf-8'}).split('\n');

// contains allergens as key, set of possible words they correspond to as the value
const possibleAllergens = {};
// ingredient counter
const ingredientCounter = {};
// ingredient set
const allIngredients = new Set();

lines.forEach(line => {
  const [ingredients, allergens] = line.replace(')', '').split(' (contains ').map(x => x.split(/[ ,]+/g));
  for (const a of allergens) {
    if (a in possibleAllergens) {
      // gives us list of ingredients present in current allergen and previous lines with this allergen
      let intersection = ingredients.filter(i => possibleAllergens[a].has(i));
      possibleAllergens[a] = new Set(intersection);
    } else {
      possibleAllergens[a] = new Set(ingredients);
    }
  }
  for (const ingredient of ingredients) {
    if (ingredient in ingredientCounter) {
      ingredientCounter[ingredient]++;
    } else {
      ingredientCounter[ingredient] = 1;
    }
    allIngredients.add(ingredient);
  }
})

const definedAllergens = {};
const definedIngredients = {};

let keys = Object.keys(possibleAllergens);
while (keys.length > 0) {
  // find allergen with size one set
  const allergen = keys.find(k => possibleAllergens[k].size === 1);
  // save the single ingredient
  const ingredient = possibleAllergens[allergen].values().next().value;
  // save it as a key to definedAllergens with ingredient as the key
  definedAllergens[allergen] = ingredient;
  // delete key from possibleAllergens
  delete possibleAllergens[allergen];

  // remove ingredient from all other sets in possibleAllergens
  for (const a in possibleAllergens) {
    possibleAllergens[a].delete(ingredient);
  }

  // redefine keys array
  keys = Object.keys(possibleAllergens);
}

// create inversion of definedAllergens
for (const a in definedAllergens) {
  definedIngredients[definedAllergens[a]] = a;
}

// make an array of set allIngredients
// return a list of ingredients not associated with an allergen
const okIngredients = [...allIngredients].filter(ingredient => !(ingredient in definedIngredients));

const sum = okIngredients.map(i => ingredientCounter[i]).reduce((a, b) => a + b, 0)

console.log({sum});

// part 2

const ingredientsList = Object.keys(definedAllergens).sort().map(allergen => definedAllergens[allergen]).join(',');

console.log({ingredientsList});