import { recipes } from "../data/recipes.js";
import { displayReciepes } from "./display-reciepes.js";
import { bigSearchBar, filterRecipesByTags } from "../utils/boucle-for.js";
import { displaySuggestions } from "../utils/suggestions.js";
import { setupClearableInput } from "./btn-close.js";
import { recipeCountElement, recipeContainer } from "../utils/getvalues.js";
export let allRecipes = [];

export async function getRecipe() {
  let newDataReciepes = recipes;
  return newDataReciepes;
}

// Chargez toutes les recettes au démarrage de la page
window.addEventListener("load", async function () {
  allRecipes = await getRecipe();
});

export async function init() {
  var dataReciepes = await getRecipe();
  allRecipes.length = 0;
  allRecipes.push(...dataReciepes);
  console.log(allRecipes);
  filterRecipesByTags(allRecipes);
  displayDataReciepes(allRecipes);
  numberOfRecipes(allRecipes.length);
  bigSearchBar(allRecipes);
  setupClearableInput();
}

export function displayDataReciepes(dataReciepes) {
  displaySuggestions(dataReciepes);

  recipeContainer.classList.add("gallery-recipes");
  while (recipeContainer.firstChild) {
    recipeContainer.removeChild(recipeContainer.firstChild);
  }
  numberOfRecipes(dataReciepes.length);
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
init();
