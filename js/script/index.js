import { searchRecipes} from '../utils/boucle-for.js';
import {recipes}  from '../data/recipes.js';
import { displayBtnSearch } from '../layouts/btn-search.js';
import { displayReciepes } from '../layouts/display-reciepes.js';
import {setupClearableInput} from '../layouts/btn-close.js';
import { updateAllSuggestions,searchRecipesTag, filterRecipesByTags, 
  handleSearch,filterRecipeIdsByAllTags,displayedRecipes } from '../utils/tags.js';

export const recipeContainer = document.getElementById("recipeContainer");
const inputTwo = document.getElementById('ingredientSearch')
recipeContainer.classList.add("gallery-recipes");
export const selectedIngredientsSet = new Set(); // Utiliser un ensemble pour stocker les ingrédients sélectionnés

const searchInput = document.getElementById('searchInput');
export const messageError = document.querySelector(".message-error");
export const recipeCount = document.querySelector("#recipeCount")


displayReciepes(recipes);

document.addEventListener('keydown',function(event){
  if(event.key === 'Enter'){
    event.preventDefault();

  }
})

// Chargement initial des recettes
window.onload = function () {
  displayReciepes(recipes);
  displayBtnSearch()
setupClearableInput(searchInput);
setupClearableInput(inputTwo);

};

// Réinitialiser les valeurs des champs d'entrée lors du chargement de la page
window.addEventListener("load", function() {
  searchInput.value = ''; // Réinitialiser la valeur du champ de recherche principal
  inputTwo.value = ''; // Réinitialiser la valeur du champ de recherche d'ingrédients
  updateAllSuggestions()

});


// // Fonction pour afficher les recettes filtrées
// export function displayFirstFilteredRecipes(filteredRecipes) {

//   const allRecipeItems = document.querySelectorAll('.recipe-article');

//   for (const recipeItem of allRecipeItems) {
//     const recipeName = recipeItem.querySelector('.reciepe-name').textContent.trim();
//     const recipeIngredients = recipeItem.querySelector('.ingredient-Item-name').textContent.trim();
//     const recipeDescription = recipeItem.querySelector('.recipe-desc').textContent.trim();

//     const isRecipeIncluded = filteredRecipes.some(recipe => {
//       const lowerCaseName = recipe.name.toLowerCase();
//       const lowerCaseIngredients = recipe.ingredients.join(' ').toLowerCase();
//       const lowerCaseDescription = recipe.description.toLowerCase();

//       return (
//         lowerCaseName === recipeName.toLowerCase() ||
//         lowerCaseIngredients.includes(recipeIngredients.toLowerCase()) ||
//         lowerCaseDescription.includes(recipeDescription.toLowerCase())
//       );
//     });

//     if (isRecipeIncluded) {
//       recipeItem.style.display = 'block';
//     } else {
//       recipeItem.style.display = 'none';
//     }
//   }
// }



// export function displayFilteredRecipes(filteredRecipeIds) {
//   const allRecipeItems = document.querySelectorAll("article"); 

//   const visibleRecipeItems = Array.from(allRecipeItems).filter(recipeItem => {
//     return getComputedStyle(recipeItem).display === "block";
//   });

//   visibleRecipeItems.forEach(recipeItem => {
//     const recipeId = parseInt(recipeItem.getAttribute("id"));

//     if (filteredRecipeIds.includes(recipeId)) {
//       recipeItem.style.display = "block"
//     } else {
//       recipeItem.style.display = "none"
//     }
//   });
// }

// // Chargement initial des recettes
// window.onload = function () {
//   displayFilteredRecipes(displayedRecipes); // Afficher les recettes correspondant aux IDs filtrés
//   // ...
// };

export function displayFilteredRecipes(filteredRecipes, filteredRecipeIds) {

  const allRecipeItems = document.querySelectorAll('article');

  allRecipeItems.forEach(recipeItem => {
    const recipeId = parseInt(recipeItem.getAttribute('id'));

    const recipeName = recipeItem.querySelector('.reciepe-name').textContent.trim();
    const recipeIngredients = recipeItem.querySelector('.ingredient-Item-name').textContent.trim();
    const recipeDescription = recipeItem.querySelector('.recipe-desc').textContent.trim();

    const isRecipeIncluded = filteredRecipes.includes(recipeId); // Utilisation de includes() pour vérifier l'inclusion

    let result = false; // Initialisez la variable à false
    console.log(filteredRecipes  +  "  <======version3 de filyertedrecipes")

    const myfilteredRecipes = filteredRecipes.includes(recipeId)
    console.log(myfilteredRecipes)

   myfilteredRecipes.forEach(recipe => {
      const lowerCaseName = recipe.name.toLowerCase();
      const lowerCaseIngredients = recipe.ingredients.join(' ').toLowerCase();
      const lowerCaseDescription = recipe.description.toLowerCase();

      if (
        (lowerCaseName === recipeName.toLowerCase() ||
          lowerCaseIngredients.includes(recipeIngredients.toLowerCase()) ||
          lowerCaseDescription.includes(recipeDescription.toLowerCase())) &&
        filteredRecipeIds.includes(recipeId)
      ) {
        result = true; // Mettez la variable à true si une correspondance est trouvée
      }
    });

    if (result) {
      recipeItem.style.display = 'block';
    } else {
      recipeItem.style.display = 'none';
    }
  });
}


function numberOfRecipes() {
  const allRecipeItems = document.querySelectorAll("article"); 

  const visibleRecipeItems = Array.from(allRecipeItems).filter(recipeItem => {
    return getComputedStyle(recipeItem).display === "block";
  });

  const numberOfVisibleRecipes = visibleRecipeItems.length; // Compte le nombre d'éléments recettes visibles

  const recipeIdsArray = visibleRecipeItems.map(recipeItem => {
    return parseInt(recipeItem.getAttribute("id"));
  }); // Création un tableau des IDs des éléments recettes visibles
  const recipeCount = document.getElementById("recipeCount")
  recipeCount.textContent = recipeIdsArray.length +" recettes";

  return recipeIdsArray; // Retourne le tableau des IDs des recettes visibles
  
}


// const filteredRecipes = searchRecipes(document.getElementById('searchInput').value);

// const filteredRecipeIds = filterRecipeIdsByAllTags(selectedIngredientsArray,selectedApplianceArray,selectedUstensilesArray );

// export function displayFilteredRecipes(filyertedrecipes, filteredRecipeIds) {
//   const allRecipeItems = document.querySelectorAll('article');

//   allRecipeItems.forEach(recipeItem => {
//     const recipeId = parseInt(recipeItem.getAttribute('id'));

//     if (filteredRecipeIds.includes(recipeId)) {
//       recipeItem.style.display = 'block';
//     } else {
//       recipeItem.style.display = 'none';
//     }
//   });
// }