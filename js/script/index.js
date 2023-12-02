import { recipes } from "../data/recipes.js";
import { displayReciepes } from "./display-reciepes.js";
import { displayBtnBigSearch } from "./btn-search.js";
import {
  bigSearchBar,
  filterRecipesByTags,
  mySearch,
} from "../utils/boucle-for.js";
import { displaySuggestions, filterSuggestions } from "../utils/suggestions.js";
import {
  recipeCountElement,
  recipeContainer,
  inputAppliance,
  inputIngredient,
  inputUstensils,
  inputSuggestion,
} from "../utils/getvalues.js";
export let allRecipes = [];

export async function getRecipe() {
  let newDataReciepes = recipes;
  return newDataReciepes;
}

allRecipes = await getRecipe();
displayDataReciepes(allRecipes); // on affiche les recettes
updateSuggestions(allRecipes);
bigSearchBar(allRecipes);
numberOfRecipes(allRecipes.length);
displayBtnBigSearch();
export function displayDataReciepes(dataReciepes) {
  recipeContainer.classList.add("gallery-recipes");
  recipeContainer.innerHTML = null;
  dataReciepes.forEach((elt) => {
    recipeContainer.appendChild(displayReciepes(elt));
  });
}

export function numberOfRecipes(elt) {
  if (elt === undefined) {
    recipeCountElement.textContent = `50 recettes`;
  } else {
    recipeCountElement.innerHTML = `<span id="NumberRecip">${elt}</span> recettes`;
  }
}

export function updateSuggestions(allRecipes) {
  const ingredients = filterSuggestions(
    allRecipes
      .map((recipe) => recipe.ingredients.map((ing) => ing.ingredient))
      .flat()
  );
  const appliances = filterSuggestions(
    allRecipes.map((recipe) => recipe.appliance)
  );
  const ustensils = filterSuggestions(
    allRecipes.map((recipe) => recipe.ustensils).flat()
  );

  return (
    displaySuggestions(
      ingredients,
      "suggestions-ingredients",
      inputIngredient,
      "ingredient"
    ) ||
    displaySuggestions(
      appliances,
      "suggestions-appareils",
      inputAppliance,
      "appareil"
    ) ||
    displaySuggestions(
      ustensils,
      "suggestions-ustensiles",
      inputUstensils,
      "ustensil"
    )
  );
}
