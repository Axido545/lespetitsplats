import { searchRecipes} from '../utils/boucle-for.js';
import {recipes}  from '../data/recipes.js';
import { displayBtnSearch } from '../layouts/btn-search.js';
import { displayReciepes, maskReciepe } from '../layouts/display-reciepes.js';
import {setupClearableInput} from '../layouts/btn-close.js';
import { updateIngredientSuggestions, filterRecipesByTags, handleSearch, displayFilteredRecipes,filterRecipeIdsByIngredients, filterRecipesByTagAndDisplayRecipes } from '../utils/ingredient.js';

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

filterRecipesByTags()

// updateIngredientSuggestions()
// handleSearch()

};

  // Gestionnaire d'événement pour le formulaire de recherche
  searchInput.addEventListener('input', function (event) {
    event.preventDefault();
    const inputValue = searchInput.value.trim();
    console.log("L'élément a changé :", inputValue);

    if (inputValue.length < 3) {
      console.log("moins de 3 caractères");
  
      messageError.textContent = "Veuillez entrer trois caractères minimum";
      // maskReciepe() 
    } else {
      messageError.textContent = "";
      // maskReciepe() 
  
      const filteredRecipes = searchRecipes(inputValue);
  
      if (filteredRecipes.length === 0) {

        // recipeCount.style.display ="none"

        messageError.textContent = `Aucune recette ne contient ‘${inputValue} ’ vous pouvez chercher « tarte aux pommes », « poisson », etc.`;
      } else {
        // messageError.style.display ="none"

         // Affiche uniquement les recettes filtrées
         const searchBar = document.getElementById("ingredientSearch");
         const searchInput = searchBar.value.toLowerCase();
         const ingredientTags = searchInput.split(" ");
         const filteredRecipeIds = filterRecipeIdsByIngredients(ingredientTags);
         const recipesToShow = filteredRecipeIds.filter(id => displayedRecipes.includes(id));         console.log("IDs des recettes à afficher après recherche d'ingrédients :", recipesToShow);
     
         displayFilteredRecipes(recipesToShow);

    filteredRecipes.forEach(recipe => {
      const recipeItem = document.getElementById(recipe.id);
      if (recipeItem) {

        recipeItem.style.display = "block";
      }filteredRecipes
    });
    recipeCount.style.display = "block";

    recipeCount.textContent = `${filteredRecipes.length} recettes`;

    const suggestionsContainer = document.querySelector(".all-suggestions");



    filterRecipesByTags()

    updateIngredientSuggestions()
    handleSearch()
    displayFilteredRecipes(filteredRecipeIds)
  }

    }
  });



// Réinitialiser les valeurs des champs d'entrée lors du chargement de la page
window.addEventListener("load", function() {
  searchInput.value = ''; // Réinitialiser la valeur du champ de recherche principal
  inputTwo.value = ''; // Réinitialiser la valeur du champ de recherche d'ingrédients
  updateIngredientSuggestions()

});