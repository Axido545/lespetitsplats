import { recipes } from '../data/recipes.js';
import { messageError, displayFilteredRecipes } from '../script/index.js';
import { filterRecipeIdsByAllTags, filterRecipesByTags, searchRecipesTag, updateAllSuggestions, handleSearch } from './tags.js';

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


  
document.addEventListener('keydown',function(event){
  if(event.key === 'Enter'){
    event.preventDefault();

  }
})