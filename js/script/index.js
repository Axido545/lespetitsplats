import {recipes}  from '../data/recipes.js';
import { displayReciepes } from '../layouts/display-reciepes.js';
import {FilteredReciepesFirstInput } from '../utils/boucle-for.js';

// import {filterRecipeIdsByAllTags, selectedAppliancesSet, selectedUstensilesSet, selectedIngredientsSet } from '../utils/tags.js';

export const recipeContainer = document.getElementById("recipeContainer");
recipeContainer.classList.add("gallery-recipes");

export const messageError = document.querySelector(".message-error");

export async function getRecipe(){
let newDataReciepes = recipes;
return newDataReciepes;
}

export async function init(){
  let dataReciepes = await getRecipe();
  FilteredReciepesFirstInput()

  displayDataReciepes(dataReciepes)
  numberOfRecipes()
}

export function displayDataReciepes(dataReciepes) {

  dataReciepes.forEach(elt => {
displayReciepes(elt)
    
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



