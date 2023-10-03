import { recipes } from "../data/recipes.js";
import { firstInputValue, IngredientInputValue } from "./getvalues.js";
import { messageError } from "../script/index.js";

export function mySearch() {
  // Récupération de la valeur du champ de recherche pour les mots-clés et les ingrédients
  const inputValue = firstInputValue();
  const ingredientInputValue = IngredientInputValue();
  console.log(inputValue);
  console.log(ingredientInputValue);
  // Tableau pour stocker les recettes filtrées
  const filteredRecipes = [];

  // Fonction pour diviser la chaîne de caractères en un tableau de mots-clés
  const splitinputValues = inputValue.split(" ");

  // Parcours de chaque recette dans le tableau 'recipes'
  for (const recipe of recipes) {
    // Vérification si la recette contient au moins un des mots-clés
    const containsKeywords = splitinputValues.some(splitinputValue => {
      const inputValueLowerCase = splitinputValue.toLowerCase();
      const recipeName = recipe.name.toLowerCase();
      const recipeDescription = recipe.description.toLowerCase();

      const containsKeywordInIngredients = recipe.ingredients.some(ingredient =>
        ingredient.ingredient.toLowerCase().includes(inputValueLowerCase)
      );

      return (
        recipeName.includes(inputValueLowerCase) ||
        recipeDescription.includes(inputValueLowerCase) ||
        containsKeywordInIngredients
      );
    });

    // Vérification si la recette contient au moins un des ingrédients
    const containsIngredients = ingredientInputValue.every(ingredient => {
      const ingredientLowerCase = ingredient.toLowerCase();
      return recipe.ingredients.some(ingredient =>
        ingredient.ingredient.toLowerCase().includes(ingredientLowerCase)
      );
    });

    // Si la recette répond à au moins un critère de filtrage (mots-clés ou ingrédients), l'ajouter au tableau filtré
    if (containsKeywords || containsIngredients) {
      filteredRecipes.push(recipe);
    }
  }

  // Le tableau 'filteredRecipes' contient maintenant les recettes filtrées
  console.log(filteredRecipes);

  // if (filteredRecipes.length === 0) {
  //   messageError.textContent = `Aucune recette ne contient ‘${inputValue} ’ ou ‘${ingredientInputValue}’. Vous pouvez chercher « tarte aux pommes », « poisson », etc.`;
  // } else {
  //   messageError.textContent = "";
  // }
}

