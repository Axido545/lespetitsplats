import {recipes}  from '../data/recipes.js';
import { displayReciepes } from '../layouts/display-reciepes.js';
import {displayFirstFilteredRecipes } from '../utils/boucle-for.js';

// import {filterRecipeIdsByAllTags, selectedAppliancesSet, selectedUstensilesSet, selectedIngredientsSet } from '../utils/tags.js';



export const messageError = document.querySelector(".message-error");

export async function getRecipe(){
let newDataReciepes = recipes;
return newDataReciepes;
}

export async function init(){
  var dataReciepes = await getRecipe();
  displayDataReciepes(dataReciepes)
  // numberOfRecipes()
}

export function displayDataReciepes(dataReciepes) {
  displayFirstFilteredRecipes(dataReciepes);
  const recipeContainer = document.getElementById("recipeContainer");
  recipeContainer.classList.add("gallery-recipes");
  while(recipeContainer.firstChild){
    recipeContainer.removeChild(recipeContainer.firstChild)
  }
  console.log(dataReciepes)
  numberOfRecipes(dataReciepes.length);
  dataReciepes.forEach(elt => {
recipeContainer.appendChild(displayReciepes(elt));

  });
}

export function numberOfRecipes(){
    // Calcule du nombre de recettes
    const numberOfRecipes = recipes.length;
    const recipeCountElement = document.getElementById("recipeCount");

    // Affichage le nombre de recettes dans un élément HTML avec l'ID "recipeCount"
    if (recipeCountElement) {
      recipeCountElement.textContent = `${numberOfRecipes} recettes`;
    }
}
init()



