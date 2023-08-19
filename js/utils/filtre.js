import {recipes}  from '../data/recipes.js';

export const myInput =   document.getElementById('searchInput')
const searchInput = myInput.value.trim(); 
const allRecipeItems = document.querySelectorAll('.recipe-article');
const recipeCount = document.querySelector("#recipeCount")



// Fonction pour effectuer la recherche en fonction de la saisie de l'utilisateur
export function searchRecipes(searchInput) {
  const lowerCaseKeyword = searchInput.toLowerCase();

  const filteredRecipes = recipes.filter(recipe => {
    const lowerCaseName = recipe.name.toLowerCase();
    const lowerCaseIngredients = recipe.ingredients.map(ingredient => ingredient.ingredient.toLowerCase()).join(' ');
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

    for (const recipeItem of allRecipeItems) {

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
      });


      recipeItem.style.display = isRecipeIncluded ? 'block' : 'none';
    }
  
    recipeCount.textContent = `${filteredRecipes.length} recettes`;
  }


  
