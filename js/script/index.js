import {recipes}  from '../data/recipes.js';
import { displayReciepes } from './display-reciepes.js';
import {bigSearchBar, 
  // filterRecipesByTags 
} from '../utils/boucle-for.js';
import { displaySuggestions } from '../utils/suggestions.js';
import { setupClearableInput } from './btn-close.js';

export const messageError = document.querySelector(".message-error");

export async function getRecipe(){
let newDataReciepes = recipes;
return newDataReciepes;
}

export async function init(){
  var dataReciepes = await getRecipe();
  displayDataReciepes(dataReciepes)
  numberOfRecipes()
  // displaySuggestions()
    bigSearchBar(dataReciepes);

  setupClearableInput()
  // newTagsActive()



 }

export function displayDataReciepes(dataReciepes) {
displaySuggestions(dataReciepes)

  const recipeContainer = document.getElementById("recipeContainer");
  recipeContainer.classList.add("gallery-recipes");
  while(recipeContainer.firstChild){
    recipeContainer.removeChild(recipeContainer.firstChild)
  }
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
      recipeCountElement.innerHTML = `<span id="NumberRecip">${elt}</span> recettes`;
    } 
}
init()



