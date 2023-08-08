import { recipes } from '../data/recipes.js';



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

// Fonction pour afficher les recettes filtrées dans la console (remplacez ceci par votre propre logique d'affichage)
export function displayFilteredRecipes(filteredRecipes) {
  console.log(filteredRecipes);

  const allRecipeItems = document.querySelectorAll('.recipe-article');

  for (const recipeItem of allRecipeItems) {

  const recipeCount = document.querySelector("#recipeCount")
  recipeCount.textContent = `${filteredRecipes.length} recettes`;


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


// // importe le tableau  des recettes
// import { recipes } from '../data/recipes.js';

// // Fonction pour effectuer la recherche en fonction de la saisie de l'utilisateur

// // Champ de saisie avec l'ID 'searchInput' où l'utilisateur entre le mot-clé.
// export const searchInput = document.getElementById('searchInput');


//  searchInput.addEventListener('input', () => {
//   const keyword = searchInput.value; // Récupération la valeur saisie par l'utilisateur.
  
//   function searchRecipes(keyword) {
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


// // Fonction pour afficher les recettes filtrées dans la console (remplacez ceci par votre propre logique d'affichage)
//  export function displayFilteredRecipes(filteredRecipes) {
//   console.log(filteredRecipes);

//   const allRecipeItems = document.querySelectorAll('.recipe-article');

//   for (const recipeItem of allRecipeItems) {

//   const recipeCount = document.querySelector("#recipeCount")
//   recipeCount.textContent = `${filteredRecipes.length} recettes`;

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


// })