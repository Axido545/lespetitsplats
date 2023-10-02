import { recipes } from '../data/recipes.js';
import { displayDataReciepes, messageError, numberOfRecipes } from '../script/index.js';
import { displaySuggestions } from './tags.js';
import {mySearch} from './searchreciepes.js';

export const myInput =   document.getElementById('searchInput')

// Fonction pour effectuer la recherche en fonction de la saisie de l'utilisateur
export function searchRecipes(keyword) {
  const filteredRecipes = [];
  for (const recipe of recipes) {
    const lowerCaseKeyword = keyword.toLowerCase();
    const lowerCaseName = recipe.name.toLowerCase();
    const lowerCaseIngredients = recipe.ingredients.join(' ').toLowerCase();
    const lowerCaseDescription = recipe.description.toLowerCase();

    if (
      lowerCaseName.includes(lowerCaseKeyword) ||
      lowerCaseIngredients.includes(lowerCaseKeyword) ||
      lowerCaseDescription.includes(lowerCaseKeyword)
    ) {
      filteredRecipes.push(recipe);
    }
  }
  return filteredRecipes;
}

export function bigSearchBar() {
  const filteredRecipes = [];

  const myInput =   document.getElementById('searchInput')
  myInput.addEventListener('input', function () {
    const clearIcon = document.querySelector('.clear-icon');
const inputValue = myInput.value.trim().toLowerCase();
    filteredRecipes.length = 0; // Réinitialise la liste des recettes filtrées

    if (inputValue.length === 0) {
      messageError.textContent = "";
      clearIcon.style.display ="none";
      // numberOfRecipes(filteredRecipes.length)
    } else if (inputValue.length < 3) {
      clearIcon.style.display ="block"
      messageError.textContent = "Veuillez entrer trois caractères minimum";
    } else {
      mySearch()
      clearIcon.style.display ="block"
          messageError.textContent = "";
          console.log(mySearch(filteredRecipes))
    }
  });

}

// Réinitialise les valeurs des champs d'entrée lors du chargement de la page
window.addEventListener("load", function() {
const myInput = document.getElementById('searchInput');
myInput.value = ""; 
});


