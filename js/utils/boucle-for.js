import { recipes } from "../data/recipes.js";
import { displayDataReciepes, allRecipes } from "../script/index.js";
import {
  updateTagsArray,
  clearIcon,
  recipeContainer,
  messageError,
} from "./getvalues.js";
import { displaySuggestions } from "./suggestions.js";
const myInput = document.getElementById("searchInput");
export function bigSearchBar(myrecipesdata) {
  if (myInput) {
    myInput.addEventListener("input", function () {
      const inputValue = myInput.value.trim().toLowerCase();

      clearIcon.style.display = "none";
      if (inputValue.length === 0) {
        allRecipes.length = 0;
        allRecipes.push(...myrecipesdata);
        messageError.textContent = "";
        clearIcon.style.display = "none";
        mySearch(myrecipesdata, inputValue);
      } else if (inputValue.length < 3) {
        messageError.textContent = "Veuillez entrer trois caractères minimum";
        clearIcon.style.display = "block";
      } else {
        clearIcon.style.display = "block";
        messageError.textContent = "";

        const filteredRecipes = mySearch(myrecipesdata, inputValue);

        if (filteredRecipes.length === 0) {
          messageError.textContent = `« Aucune recette ne contient « ${inputValue} »  vous pouvez chercher «
          tarte aux pommes », « poisson », etc.`;
        }
        allRecipes.length = 0;
        allRecipes.push(...filteredRecipes);
        filterRecipesByTags(filteredRecipes);
        displaySuggestions(filteredRecipes);
      }
    });
  }

  clearIcon.addEventListener("click", async function () {
    myInput.value = "";
    clearIcon.style.display = "none";
    mySearch(myrecipesdata, "");
    const filteredRecipes = mySearch(myrecipesdata, "");

    filterRecipesByTags(filteredRecipes);
    displaySuggestions(filteredRecipes);
  });
}

export function mySearch(myrecipesdata, inputText) {
  /************************boucle for */

  const filteredRecipes = [];

  for (let i = 0; i < myrecipesdata.length; i++) {
    const recipe = myrecipesdata[i];

    if (recipe.name.toLowerCase().includes(inputText)) {
      filteredRecipes.push(recipe);
      continue;
    } else if (recipe.description.toLowerCase().includes(inputText)) {
      filteredRecipes.push(recipe);
      continue;
    } else {
      for (let j = 0; j < recipe.ingredients.length; j++) {
        if (
          recipe.ingredients[j].ingredient.toLowerCase().includes(inputText)
        ) {
          filteredRecipes.push(recipe);
          break;
        }
      }
    }
  }

  /************************ fin boucle for */
  displayDataReciepes(filteredRecipes);

  return filteredRecipes;
}

window.addEventListener("load", function () {
  myInput.value = "";
});

/****************Recherche par tag */
export function filterRecipesByTags(data) {
  const filteredRecipes = [];
  const globalSelectedTags = updateTagsArray();

  if (globalSelectedTags.length === 0) {
    return recipes;
  }
  data.forEach((recipe) => {
    const recipeIngredients = recipe.ingredients.map((ingredient) =>
      ingredient.ingredient.toLowerCase()
    );
    const recipeUstensils = recipe.ustensils.map((ustensil) =>
      ustensil.toLowerCase()
    );
    const recipeAppliance = recipe.appliance.toLowerCase();

    const containsAllTags = globalSelectedTags.every((selectedTag) => {
      const tagLowerCase = selectedTag.toLowerCase();

      return (
        recipeIngredients.some((ingredient) =>
          ingredient.includes(tagLowerCase)
        ) ||
        recipeUstensils.some((ustensil) => ustensil.includes(tagLowerCase)) ||
        recipeAppliance.includes(tagLowerCase)
      );
    });

    if (containsAllTags) {
      filteredRecipes.push(recipe);
    }
  });

  displayDataReciepes(filteredRecipes);
  updateTagsArray();
  return filteredRecipes;
}
