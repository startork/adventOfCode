const fs = require("fs");
const text = fs.readFileSync("input.txt", { encoding: "utf-8" });
const lines = text
  .replace(/\r\n/g, "")
  .split(")")
  .filter((line) => line !== "");
let allergens = {};
let allIngredients = [];

lines.forEach((line) => {
  const [ingredients, allergen] = line.split("(contains ");
  const allergenList = allergen.split(", ");
  const ingredientList = ingredients.split(" ").filter((ing) => ing !== "");
  allIngredients = [...allIngredients, ...ingredientList];
  allergenList.forEach((all) => {
    if (allergens[all]) {
      allergens[all] = ingredientList.filter((ing) =>
        allergens[all].includes(ing)
      );
    } else {
      allergens[all] = ingredientList;
    }
  });
});

let uniqueAllergens = {};
// Filter allergens so that each is related to one ingredient
while (Object.keys(allergens).length > 0) {
  const values = Object.keys(allergens).filter(
    (r) => allergens[r].length === 1
  );

  values.forEach((x) => {
    const newValue = allergens[x][0];
    uniqueAllergens[x] = newValue;
    delete allergens[x];
    Object.keys(allergens).forEach((key) => {
      allergens[key] = allergens[key].filter((t) => t !== newValue);
    });
  });
}

const nonAllergenIngredients = allIngredients.filter(
  (ing) => !Object.values(uniqueAllergens).includes(ing)
);
//part 1
console.log(nonAllergenIngredients.length);

//part 2
let answerArray = [];
Object.keys(uniqueAllergens)
  .sort()
  .forEach(function (v) {
    answerArray.push(uniqueAllergens[v]);
  });

const answerString = answerArray.join(",");
console.log(answerString);
