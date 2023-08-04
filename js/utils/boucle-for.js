import { recipes } from '../data/recipes.js';



// Fonction pour effectuer la recherche en fonction de la saisie de l'utilisateur
export function searchRecipes(keyword) {
  const filteredRecipes = [];
  for (const recipe of recipes) {
    if (recipe.name.toLowerCase().includes(keyword.toLowerCase())) {
      filteredRecipes.push(recipe);
    }
  }
  return filteredRecipes;
}

// Fonction pour afficher les recettes filtrées dans la console (remplacez ceci par votre propre logique d'affichage)
export function displayFilteredRecipes(filteredRecipes) {
  console.log(filteredRecipes);
  
  const allRecipeItems = document.querySelectorAll('.recipe-article');

  for (const recipeItem of allRecipeItems) {
    const recipeName = recipeItem.querySelector('.reciepe-name').textContent.trim();
    const isRecipeIncluded = filteredRecipes.some(recipe => recipe.name.toLowerCase() === recipeName.toLowerCase());

    if (isRecipeIncluded) {
      recipeItem.style.display = 'block'; // Afficher la recette
    } else {
      recipeItem.style.display = 'none'; // Masquer la recette
    }
  }
}


