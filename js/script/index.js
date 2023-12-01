import { recipes } from "../data/recipes.js";
import { displayReciepes } from "./display-reciepes.js";
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
} from "../utils/getvalues.js";
export let allRecipes = [];

export async function getRecipe() {
  let newDataReciepes = recipes;
  return newDataReciepes;
}

// Chargez toutes les recettes au démarrage de la page
window.addEventListener("load", async function () {
  allRecipes = await getRecipe();
  displayDataReciepes(allRecipes); // on affiche les recettes
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
  inputIngredient.addEventListener("input", function () {
    displaySuggestions(ingredients, "suggestions-ingredients", inputIngredient);
  });
  inputAppliance.addEventListener("input", function () {
    displaySuggestions(appliances, "suggestions-appareils", inputAppliance);
  });
  inputUstensils.addEventListener("input", function () {
    displaySuggestions(ustensils, "suggestions-ustensiles", inputUstensils);
  });

  bigSearchBar(allRecipes);
  numberOfRecipes(allRecipes.length);
});

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
