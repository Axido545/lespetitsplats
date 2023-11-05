// import { recipes } from "../data/recipes.js";
// import { firstInputValue, IngredientInputValue } from "./getvalues.js";
// import { messageError } from "../script/index.js";

// export function mySearch() {
//   // Tableau des recettes trouvées
//   const mySearchReciepes = [];
//   // Récupération de la valeur du champ de recherche pour les mots-clés et les ingrédients
//   const inputValue = firstInputValue();
//   const ingredientInputValue = IngredientInputValue();
//   console.log(inputValue);
//   console.log(ingredientInputValue);
//   console.log(mySearchReciepes)

//   // Fonction pour diviser la chaîne de caractères en un tableau de mots-clés
//   const splitinputValues = inputValue.split(" ");

//   // Parcours de chaque recette dans le tableau 'recipes'
//   for (const recipe of recipes) {
//     // Vérification si la recette contient au moins un des mots-clés
//     const containsKeywords = splitinputValues.some(splitinputValue => {
//       const inputValueLowerCase = splitinputValue.toLowerCase();
//       const recipeName = recipe.name.toLowerCase();
//       const recipeDescription = recipe.description.toLowerCase();

//       const containsKeywordInIngredients = recipe.ingredients.some(ingredient =>
//         ingredient.ingredient.toLowerCase().includes(inputValueLowerCase)
//       );

//       return (
//         recipeName.includes(inputValueLowerCase) ||
//         recipeDescription.includes(inputValueLowerCase) ||
//         containsKeywordInIngredients
//       );
//     });

//     // Vérification si la recette contient au moins un des ingrédients
//     const containsIngredients = ingredientInputValue.every(ingredient => {
//       const ingredientLowerCase = ingredient.toLowerCase();
//       return recipe.ingredients.some(ingredient =>
//         ingredient.ingredient.toLowerCase().includes(ingredientLowerCase)
//       );
//     });

//     // Si la recette répond à au moins un critère de filtrage (mots-clés ou ingrédients), l'ajouter au tableau filtré
//     if (containsKeywords || containsIngredients) {
//       mySearchReciepes.push(recipe);
//     }
//   }



  ////////////////////

  // Le tableau 'filteredRecipes' contient maintenant les recettes filtrées

  // if (filteredRecipes.length === 0) {
  //   messageError.textContent = `Aucune recette ne contient ‘${inputValue} ’ ou ‘${ingredientInputValue}’. Vous pouvez chercher « tarte aux pommes », « poisson », etc.`;
  // } else {
  //   messageError.textContent = "";
  // }




// export function filterRecipesByKeyword(data) {
//   const filteredRecipes = [];
//   var keywords = getInputValue();
//   var ingredients = getIngredientsListValue();
//   var appareils = getAppareilsList();
//   var ustencils = getUstencilsListValue();
//   console.log(keywords);
//   console.log(ingredients);
//   console.log(appareils);
//   console.log(ustencils);
  
//   data.forEach(recipe => {
//     // Filtrer par inputKeywords
//     const containsKeywords = keywords.every(keyword => {
//     const recipeName = recipe.name.toLowerCase();
//     const recipeIngredients = recipe.ingredients.map(ingredient => ingredient.ingredient.toLowerCase());
//     const recipeDescription = recipe.description.toLowerCase();
    
//     const keywordLowerCase = keyword.toLowerCase();
//     return recipeName.includes(keywordLowerCase) ||
//       recipeIngredients.some(ingredient => ingredient.includes(keywordLowerCase)) ||
//       recipeDescription.includes(keywordLowerCase);
//   });
    
//     // Filtrer par listAppareils
//     const hasAppliance = appareils.length === 0 || appareils.includes(recipe.appliance);
//     console.log(appareils.length);
    
//     // Filtrer par utensils
//     const hasUtensils = ustencils.length === 0 || ustencils.every(utensil => recipe.ustensils.includes(utensil));
    
//     // Filtrer par ingredients
//     const hasIngredients = ingredients.length === 0 || ingredients.every(ingredient => {
//       return recipe.ingredients.some(recipeIngredient => recipeIngredient.ingredient.toLowerCase().includes(ingredient.toLowerCase()));
//     });
    
//     // Vérifier si la recette correspond à tous les critères de filtrage
//     if (containsKeywords && hasAppliance && hasUtensils && hasIngredients) {
//       filteredRecipes.push(recipe);
//     }
//   });
//   console.log(filteredRecipes);
//   manageData(filteredRecipes);    
// }


// export function filterRecipesByKeyword(data) {
//   const filteredRecipes = data.filter((recipe) => {
//     const keywords = getInputValue().map((keyword) => keyword.toLowerCase());
//     const ingredients = getIngredientsListValue().map((ingredient) => ingredient.toLowerCase());
//     const appareils = getAppareilsList();
//     const ustensils = getUstencilsListValue().map((utensil) => utensil.toLowerCase());
//     const keywordFilter = keywords.every((keyword) => {
//       const recipeName = recipe.name.toLowerCase();
//       const recipeIngredients = recipe.ingredients.map((ingredient) =>
//         ingredient.ingredient.toLowerCase()
//       );
//       const recipeDescription = recipe.description.toLowerCase();
//       return (
//         recipeName.includes(keyword) ||
//         recipeIngredients.some((ingredient) => ingredient.includes(keyword)) ||
//         recipeDescription.includes(keyword)
//       );
//     });
//     // const applianceFilter =
//     //   appareils.length === 0 || appareils.includes(recipe.appliance);
//     // const utensilsFilter =
//     //   ustensils.length === 0 ||
//     //   ustensils.every((utensil) => recipe.ustensils.includes(utensil));
//     const ingredientsFilter =
//       ingredients.length === 0 ||
//       ingredients.every((ingredient) =>
//         recipe.ingredients.some((recipeIngredient) =>
//           recipeIngredient.ingredient.toLowerCase().includes(ingredient)
//         )
//       );
//     return keywordFilter && applianceFilter && utensilsFilter && ingredientsFilter;
//   });

//   console.log(filteredRecipes);
//   manageData(filteredRecipes);
// }
