import { recipes } from "../data/recipes.js";
import { displayDataReciepes, messageError } from "../script/index.js";
import { firstInputValue, updateTagsArray } from "./getvalues.js";
import { afficheListeSuggestions } from "./suggestions.js";

export const myInput = document.getElementById("searchInput");

export function bigSearchBar(myrecipesdata) {
  const clearIcon = document.querySelector(".clear-icon");
  const recicontainer = document.getElementById("recipeContainer");

  myInput.addEventListener("input", function () {
    const inputValue = myInput.value.trim().toLowerCase();
    console.log(inputValue);
    clearIcon.style.display = "none";
    if (inputValue.length === 0) {
      messageError.textContent = "";
      clearIcon.style.display = "none";
      mySearch(myrecipesdata);
    } else if (inputValue.length < 3) {
      messageError.textContent = "Veuillez entrer trois caractères minimum";
      clearIcon.style.display = "block";
    } else {
      clearIcon.style.display = "block";
      messageError.textContent = "";

      if (recicontainer.textContent === "") {
        messageError.textContent = `« Aucune recette ne contient « ${inputValue} »  vous pouvez chercher «
        tarte aux pommes », « poisson », etc.`;
      }
      const filteredRecipes = mySearch(myrecipesdata, inputValue);
      const filteredIngredient = getIngredientFromRecipes(filteredRecipes);
      afficheListeSuggestions(filteredIngredient, "suggestions-ingredients");
    }
  });
}

export function mySearch(myrecipesdata, inputText) {
  console.log(myrecipesdata);
  /************************boucle filter TODO*/
  const filteredRecipes = myrecipesdata.filter((recipe) => {
    if (recipe.name.toLowerCase().indexOf(inputText) > 0) {
      return true;
    } else if (recipe.description.toLowerCase().indexOf(inputText) > 0) {
      return true;
    } else {
      // trouver les ingredient
      // Input text present
      // map find
      const ingredients = recipe.ingredients.map(
        (ingredient) => ingredient.ingredient
      );
      return ingredients.find(
        (ingredient) => ingredient.toLowerCase().indexOf(inputText) > 0
      );
    }
  });
  /************************ fin boucle filter */

  displayDataReciepes(filteredRecipes);

  console.log("Recettes filtrés :", filteredRecipes);
  return filteredRecipes;
}

// Réinitialise les valeurs des champs d'entrée lors du chargement de la page
window.addEventListener("load", function () {
  // const myInput = document.getElementById('searchInput');
  myInput.value = "";
});

export function filterRecipesByTags(data) {
  console.log(JSON.stringify(data, null, 2) + "=== c l element dont on parle");
  const filteredRecipes = [];
  const globalSelectedTags = updateTagsArray();
  console.log("Tag selectionné:", globalSelectedTags);

  // Vérifie si le tableau qui contient les tags est vide: renvoie les recettes sans filtrage
  if (globalSelectedTags.length === 0) {
    return recipes;
  }

  data.forEach((recipe) => {
    const recipeIngredients = recipe.ingredients.map((ingredient) =>
      ingredient.ingredient.toLowerCase()
    );
    console.log("Ingredients:", recipeIngredients);
    const containsAllTags = globalSelectedTags.every((selectedTag) => {
      const tagLowerCase = selectedTag.toLowerCase();
      return recipeIngredients.some((ingredient) =>
        ingredient.includes(tagLowerCase)
      );
    });

    console.log("contient tous les tags:", containsAllTags);
    if (containsAllTags) {
      filteredRecipes.push(recipe);
    }
  });

  displayDataReciepes(filteredRecipes);
  console.log("Recettes filtrées :", filteredRecipes);
  return filteredRecipes;
}

export function getIngredientFromRecipes(filteredRecipes) {
  const filteredIngredients = [];
  filteredRecipes.forEach((recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      const ingredientName = ingredient.ingredient.toLowerCase();
      if (!filteredIngredients.includes(ingredientName)) {
        filteredIngredients.push(ingredientName);
      }
    });
  });
  console.log(filteredIngredients);
  return filteredIngredients;
}
