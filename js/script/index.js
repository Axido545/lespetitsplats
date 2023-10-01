import {recipes}  from '../data/recipes.js';
import { displayReciepes } from '../layouts/display-reciepes.js';
import {bigSearchBar } from '../utils/boucle-for.js';
// import {filterRecipeIdsByAllTags, selectedAppliancesSet, selectedUstensilesSet, selectedIngredientsSet } from '../utils/tags.js';
import { newTags, displaySuggestions } from '../utils/tags.js';
import { setupClearableInput } from '../layouts/btn-close.js';

export const messageError = document.querySelector(".message-error");

export async function getRecipe(){
let newDataReciepes = recipes;
return newDataReciepes;
}

export async function init(){
  var dataReciepes = await getRecipe();
  displayDataReciepes(dataReciepes)
  numberOfRecipes()
  displaySuggestions()
  setupClearableInput()
  newTags()

 }

export function displayDataReciepes(dataReciepes) {
  bigSearchBar(dataReciepes);

  const recipeContainer = document.getElementById("recipeContainer");
  recipeContainer.classList.add("gallery-recipes");
  while(recipeContainer.firstChild){
    recipeContainer.removeChild(recipeContainer.firstChild)
  }
  // console.log(dataReciepes)
  numberOfRecipes(dataReciepes.length);
  dataReciepes.forEach(elt => {
recipeContainer.appendChild(displayReciepes(elt));

  });
}

export function numberOfRecipes(elt){


  const recipeCountElement = document.getElementById("recipeCount");

if(elt===undefined){
  recipeCountElement.textContent = `50 recettes`;

} else {
      recipeCountElement.textContent = `${elt} recettes`;
    } 
}
init()



