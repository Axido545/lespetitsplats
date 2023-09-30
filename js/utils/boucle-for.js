import { recipes } from '../data/recipes.js';
import { displayDataReciepes, messageError, numberOfRecipes } from '../script/index.js';
import { displaySuggestions } from './tags.js';

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
      numberOfRecipes(filteredRecipes.length)
    } else if (inputValue.length < 3) {
      clearIcon.style.display ="block"
      messageError.textContent = "Veuillez entrer trois caractères minimum";
    } else {
      clearIcon.style.display ="block"
      numberOfRecipes(filteredRecipes.length)
      for (const recipe of recipes) {
        const lowerCaseName = recipe.name.toLowerCase();
        const lowerCaseIngredients = recipe.ingredients.join(' ').toLowerCase();
        const lowerCaseDescription = recipe.description.toLowerCase();

        if (
          lowerCaseName.includes(inputValue) ||
          lowerCaseIngredients.includes(inputValue) ||
          lowerCaseDescription.includes(inputValue)
        ) {
          filteredRecipes.push(recipe);
        }
      }

      if (filteredRecipes.length === 0) {
        messageError.textContent = `Aucune recette ne contient ‘${inputValue} ’ vous pouvez chercher « tarte aux pommes », « poisson », etc.`;
      numberOfRecipes(filteredRecipes.length)
      } else {
        messageError.textContent = "";
      }
    }
displayDataReciepes(filteredRecipes)
numberOfRecipes(filteredRecipes.length)
displaySuggestions(filteredRecipes)




  });

}

if(myInput.value !== ""){
  console.log("ya du contenu dans l'input")
}

// Réinitialise les valeurs des champs d'entrée lors du chargement de la page
window.addEventListener("load", function() {
const myInput = document.getElementById('searchInput');
myInput.value = ""; // Réinitialise la valeur du champ de recherche principal

});