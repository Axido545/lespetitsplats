import { recipes } from "../data/recipes.js";
import { firstInputValue } from "./getvalues.js";
import { messageError } from "../script/index.js";

export function mySearch() {
  // Récupération de la valeur du champ de recherche à partir de firstInputValue
  const inputValue = firstInputValue();
  console.log(inputValue);



  // Division la chaîne inputValue en mots-clés en utilisant un espace comme séparateur
  const inputKeywords = inputValue.split(' ');

  // Tableau pour stocker les recettes filtrées
  const filteredRecipes = [];

  // Parcourir chaque recette dans le tableau 'recipes'
  for (const recipe of recipes) {
    // Vérification si la recette contient au moins un des mots-clés
    const containsKeywords = inputKeywords.some(keyword => {
      const keywordLowerCase = keyword.toLowerCase();
      const recipeName = recipe.name.toLowerCase();
      const recipeDescription = recipe.description.toLowerCase();

      const containsKeywordInIngredients = recipe.ingredients.some(ingredient =>
        ingredient.ingredient.toLowerCase().includes(keywordLowerCase)
      );

      return (
        recipeName.includes(keywordLowerCase) ||
        recipeDescription.includes(keywordLowerCase) ||
        containsKeywordInIngredients
      );
    });

    // Si la recette répond à au moins un critère de filtrage, l'ajouter au tableau filtré
    if (containsKeywords) {
      filteredRecipes.push(recipe);
    }
  }

  // Le tableau 'filteredRecipes' contient maintenant les recettes filtrées
  console.log(filteredRecipes);

  if (filteredRecipes.length === 0) {
    messageError.textContent = `Aucune recette ne contient ‘${inputValue} ’ vous pouvez chercher « tarte aux pommes », « poisson », etc.`;
  // numberOfRecipes(filteredRecipes.length)
  } else {
    messageError.textContent = "";
  }
}
