import { searchRecipes} from '../utils/boucle-for.js';
import {recipes}  from '../data/recipes.js';
import { displayBtnSearch } from '../layouts/btn-search.js';
import { displayReciepes, maskReciepe } from '../layouts/display-reciepes.js';
import {setupClearableInput} from '../layouts/btn-close.js';
import { updateAllSuggestions,searchRecipesTag, filterRecipesByTags, 
  handleSearch,filterRecipeIdsByAllTags,displayFilteredRecipes,displayedRecipes } from '../utils/tags.js';

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

  // Gestionnaire d'événement pour le formulaire de recherche
  searchInput.addEventListener('input', function (event) {
    event.preventDefault();
    const inputValue = searchInput.value.trim();

    if (inputValue.length < 3) {
      console.log('veuillez entrer 3 caractères')
      messageError.style.display ="block";
      recipeCount.style.display ="block"
      messageError.textContent = "Veuillez entrer trois caractères minimum";
      // maskReciepe() 
    } else {
      messageError.textContent = "";
      // maskReciepe() 
  
      const filteredRecipes = searchRecipes(inputValue);
  
      if (filteredRecipes.length === 0) {

        messageError.textContent = `Aucune recette ne contient ‘${inputValue} ’ vous pouvez chercher « tarte aux pommes », « poisson », etc.`;
      } else {

         // Affiche uniquement les recettes filtrées
         const searchBar = document.getElementById("ingredientSearch");
         const searchInput = searchBar.value.toLowerCase();
         const ingredientTags = searchInput.split(" ");
         const searchBarAppliance = document.getElementById("applianceSearch");
         const searchInputAppliance = searchBarAppliance.value.toLowerCase();
         const applianceTags = searchInputAppliance.split(" ");
         const searchBarUstensiles = document.getElementById("ustensilSearch");
         const searchInputUstensiles = searchBarUstensiles.value.toLowerCase();
         const ustensileTags = searchInputUstensiles.split(" ");


         const filteredRecipeIds = filterRecipeIdsByAllTags(ingredientTags, applianceTags, ustensileTags);
         const recipesToShow = filteredRecipeIds.filter(id => displayedRecipes.includes(id));
     
         displayFilteredRecipes(recipesToShow);

    filteredRecipes.forEach(recipe => {
      const recipeItem = document.getElementById(recipe.id);
      if (recipeItem) {

        recipeItem.style.display = "block";
        // recipeItem.classList.remove('hidden');

      }filteredRecipes
    });
    recipeCount.style.display = "block";

    recipeCount.textContent = `${filteredRecipes.length} recettes`;


    filterRecipesByTags()
    searchRecipesTag()
    updateAllSuggestions()
    handleSearch()
    displayFilteredRecipes(filteredRecipeIds)
  }
    }
  });

// Réinitialiser les valeurs des champs d'entrée lors du chargement de la page
window.addEventListener("load", function() {
  searchInput.value = ''; // Réinitialiser la valeur du champ de recherche principal
  inputTwo.value = ''; // Réinitialiser la valeur du champ de recherche d'ingrédients
  updateAllSuggestions()

});