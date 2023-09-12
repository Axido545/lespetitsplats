import { recipes } from '../data/recipes.js';

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

// Fonction pour afficher les recettes filtrées
export function displayFirstFilteredRecipes(filteredRecipes) {

  const allRecipeItems = document.querySelectorAll('.recipe-article');

  for (const recipeItem of allRecipeItems) {
    const recipeName = recipeItem.querySelector('.reciepe-name').textContent.trim();
    const recipeIngredients = recipeItem.querySelector('.ingredient-Item-name').textContent.trim();
    const recipeDescription = recipeItem.querySelector('.recipe-desc').textContent.trim();

    const isRecipeIncluded = filteredRecipes.some(recipe => {
      const lowerCaseName = recipe.name.toLowerCase();
      const lowerCaseIngredients = recipe.ingredients.join(' ').toLowerCase();
      const lowerCaseDescription = recipe.description.toLowerCase();

      return (
        lowerCaseName === recipeName.toLowerCase() ||
        lowerCaseIngredients.includes(recipeIngredients.toLowerCase()) ||
        lowerCaseDescription.includes(recipeDescription.toLowerCase())
      );
    });

    if (isRecipeIncluded) {
      recipeItem.style.display = 'block';
    } else {
      recipeItem.style.display = 'none';
    }
  }
}
