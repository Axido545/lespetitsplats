import { recipes } from '../Data/recipes.js';
import { displayDataReciepes, messageError, numberOfRecipes } from '../Layout/index.js';
// import { displaySuggestions } from './tags.js';
import { firstInputValue, IngredientInputValue } from "./getvalues.js";
export const myInput =   document.getElementById('searchInput')

// Fonction pour effectuer la recherche en fonction de la saisie de l'utilisateur
// export function searchRecipes(keyword) {
//   const filteredRecipes = [];
//   for (const recipe of recipes) {
//     const lowerCaseKeyword = keyword.toLowerCase();
//     const lowerCaseName = recipe.name.toLowerCase();
//     const lowerCaseIngredients = recipe.ingredients.join(' ').toLowerCase();
//     const lowerCaseDescription = recipe.description.toLowerCase();

//     if (
//       lowerCaseName.includes(lowerCaseKeyword) ||
//       lowerCaseIngredients.includes(lowerCaseKeyword) ||
//       lowerCaseDescription.includes(lowerCaseKeyword)
//     ) {
//       filteredRecipes.push(recipe);
//     }
//   }
//   return filteredRecipes;
// }

export function bigSearchBar(myrecipesdata) {
  const myInput = document.getElementById('searchInput');
  const clearIcon = document.querySelector('.clear-icon');
  const recicontainer = document.getElementById("recipeContainer")

  myInput.addEventListener('input', function () {
    const inputValue = myInput.value.trim().toLowerCase()
    clearIcon.style.display = "none";
mySearch(myrecipesdata)

    if (inputValue.length === 0) {
      messageError.textContent = "";
      clearIcon.style.display = "none";
      mySearch(myrecipesdata);
    } else if (inputValue.length < 3) {
      messageError.textContent = "Veuillez entrer trois caractères minimum";
      clearIcon.style.display = "block";
    } else {
      clearIcon.style.display = "block";
      messageError.textContent = "";

       if(recicontainer.textContent === ""){
        messageError.textContent = `« Aucune recette ne contient ${inputValue}  vous pouvez chercher «
        tarte aux pommes », « poisson », etc.`;
       }
      mySearch(myrecipesdata)
    }
  });


}

export function mySearch(myrecipesdata) {
  const filteredRecipes = [];
  const keywords = firstInputValue();

  for (let i = 0; i < myrecipesdata.length; i++) {
    const recipe = myrecipesdata[i];
    const recipeName = recipe.name.toLowerCase();
    const recipeIngredients = recipe.ingredients.map(ingredient => ingredient.ingredient.toLowerCase());
    const recipeDescription = recipe.description.toLowerCase();

    // Filtrer par inputKeywords
    const containsKeywords = keywords.every(keyword => {
      const keywordLowerCase = keyword.toLowerCase();
      return recipeName.includes(keywordLowerCase) ||
        recipeIngredients.some(ingredient => ingredient.includes(keywordLowerCase)) ||
        recipeDescription.includes(keywordLowerCase);
    });

    if (containsKeywords) {
      // Stocker la recette filtrée
      filteredRecipes.push(recipe);
    }
  }
  displayDataReciepes(filteredRecipes);
}


// Réinitialise les valeurs des champs d'entrée lors du chargement de la page
window.addEventListener("load", function() {
  const myInput = document.getElementById('searchInput');
  myInput.value = ""; 
  });