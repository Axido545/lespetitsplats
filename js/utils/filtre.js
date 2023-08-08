import {recipes}  from '../data/recipes.js';



// // Afficher les recettes filtrées dans la console
// displayFilteredRecipes(filteredRecipes);

// Fonction pour effectuer la recherche en fonction de la saisie de l'utilisateur
export function searchRecipes(keyword) {
  const lowerCaseKeyword = keyword.toLowerCase();

  const filteredRecipes = recipes.filter(recipe => {
    const lowerCaseName = recipe.name.toLowerCase();
    const lowerCaseIngredients = recipe.ingredients.join(' ').toLowerCase();
    const lowerCaseDescription = recipe.description.toLowerCase();

    return (
      lowerCaseName.includes(lowerCaseKeyword) ||
      lowerCaseIngredients.includes(lowerCaseKeyword) ||
      lowerCaseDescription.includes(lowerCaseKeyword)
    );
  });

  return filteredRecipes;
}


export function displayFilteredRecipes(filteredRecipes) {
    console.log(filteredRecipes);
  
    const allRecipeItems = document.querySelectorAll('.recipe-article');
  
    for (const recipeItem of allRecipeItems) {


      const recipeCount = document.querySelector("#recipeCount")
      recipeCount.textContent = `${filteredRecipes.length} recettes`;


      const recipeName = recipeItem.querySelector('.reciepe-name').textContent.trim();
      const recipeIngredients = recipeItem.querySelector('.ingredient-Item-name').textContent.trim();
      const recipeDescription = recipeItem.querySelector('.recipe-desc').textContent.trim();
  
      const isRecipeIncluded = filteredRecipes.filter(recipe => {
        const lowerCaseName = recipe.name.toLowerCase();
        const lowerCaseIngredients = recipe.ingredients.join(' ').toLowerCase();
        const lowerCaseDescription = recipe.description.toLowerCase();
  
        return (
          lowerCaseName === recipeName.toLowerCase() ||
          lowerCaseIngredients.includes(recipeIngredients.toLowerCase()) ||
          lowerCaseDescription.includes(recipeDescription.toLowerCase())
        );
      }).length > 0;
  
      if (isRecipeIncluded) {
        recipeItem.style.display = 'block';
      } else {
        recipeItem.style.display = 'none';
      }
    }
  
  }