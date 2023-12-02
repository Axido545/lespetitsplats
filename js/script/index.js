import { recipes } from "../data/recipes.js";
import { displayReciepes } from "./display-reciepes.js";
import { displayBtnBigSearch } from "./btn-search.js";
import { bigSearchBar } from "../utils/boucle-for.js";
import { displaySuggestions, filterSuggestions } from "../utils/suggestions.js";
import {
  recipeCountElement,
  recipeContainer,
  inputAppliance,
  inputIngredient,
  inputUstensils,
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
//autocompletion
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

  displaySuggestions(ingredients, "suggestions-ingredients", inputIngredient);
  displaySuggestions(appliances, "suggestions-appareils", inputAppliance);
  displaySuggestions(ustensils, "suggestions-ustensiles", inputUstensils);

  // on stock affichage suggestions dans fonction
  const updateIngredients = function () {
    displaySuggestions(ingredients, "suggestions-ingredients", inputIngredient);
  };

  const uptdateAppliances = function () {
    displaySuggestions(appliances, "suggestions-appareils", inputAppliance);
  };

  const updateUstensils = function () {
    displaySuggestions(ustensils, "suggestions-ustensiles", inputUstensils);
  };

  if (inputIngredient.length != 0) {
    inputIngredient.addEventListener("input", updateIngredients);
  } else {
    displaySuggestions(ingredients, "suggestions-ingredients", inputIngredient);
  }

  if (inputAppliance.length != 0) {
    inputAppliance.addEventListener("input", uptdateAppliances);
  } else {
    displaySuggestions(appliances, "suggestions-appareils", inputAppliance);
  }

  if (inputUstensils.length != 0) {
    inputUstensils.addEventListener("input", updateUstensils);
  } else {
    displaySuggestions(ustensils, "suggestions-ustensiles", inputUstensils);
  }

  return updateIngredients || uptdateAppliances || updateUstensils;
}
