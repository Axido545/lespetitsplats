import {recipes}  from '../data/recipes.js';



const myInput =   document.getElementById('searchInput')
export const searchInput = myInput.value.trim(); // Obtenir la valeur du champ de recherche

// Fonction pour effectuer la recherche en fonction de la saisie de l'utilisateur
export function searchRecipes(myInput) {
  const lowerCaseKeyword = myInput.toLowerCase();

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


  

// Gestionnaire d'événement pour le champ de recherche en temps réeldocument.getElementById('searchInput').addEventListener('input', function (event) {
  myInput.addEventListener('change', function (event) {
    // event.preventDefault(); // Empêche le rafraîchissement de la page
  
    const recipeContainer = document.getElementById("recipeContainer");
    if (searchInput.length >= 3) {
      const filteredRecipes = searchRecipes(searchInput);
  
      if (filteredRecipes.length === 0) {
        recipeContainer.textContent = `« Aucune recette ne contient « ${searchInput} » vous pouvez chercher « tarte aux pommes », « poisson », etc.`;
      } 
    } 
    
    if(searchInput.length < 3){
      recipeContainer.textContent = "Veuillez saisir au moins 3 caractères.";
    }
  });
  

