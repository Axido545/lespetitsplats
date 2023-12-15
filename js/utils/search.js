import { recipes } from "../data/recipes.js";
import {
  displayDataReciepes,
  numberOfRecipes,
  updateSuggestions,
} from "../script/index.js";
import { clearInput, messageError, myInput } from "./getvalues.js";
import { selectedTags } from "./suggestions.js";

export function searchBar(myrecipesdata) {
  if (myInput) {
    myInput.addEventListener("input", function () {
      const inputValue = myInput.value.trim().toLowerCase();
      clearInput.classList.add("hidden");

      const regex = /^[a-zA-ZÀ-ÖØ-öø-ÿ]+$/;

      if (!regex.test(inputValue) && inputValue != "") {
        messageError.textContent =
          "Le champ doit contenir uniquement des lettres.";
      } else {
        if (inputValue.length === 0) {
          messageError.textContent = "";
          clearInput.classList.add("hidden");
          mySearch(filterRecipesByTags(myrecipesdata));
        } else if (inputValue.length < 3) {
          messageError.textContent = "Veuillez entrer trois caractères minimum";
          clearInput.classList.remove("hidden");
        } else {
          clearInput.classList.remove("hidden");
          mySearch(filterRecipesByTags(myrecipesdata), inputValue);
          updateSuggestions(
            mySearch(filterRecipesByTags(myrecipesdata), inputValue)
          );
          const recipesAfterSearch = mySearch(
            filterRecipesByTags(myrecipesdata),
            inputValue
          );
          if (recipesAfterSearch.length === 0) {
            messageError.textContent = `« Aucune recette ne contient « ${inputValue} »  vous pouvez chercher «
              tarte aux pommes », « poisson », etc.`;
          } else {
            messageError.textContent = "";
          }
        }
      }
    });
  }
}
export function mySearch(myrecipesdata, inputText) {
  /************************boucle filter*/
  const filteredRecipes = myrecipesdata.filter((recipe) => {
    if (recipe.name.toLowerCase().indexOf(inputText) > 0) {
      return true;
    } else if (recipe.description.toLowerCase().indexOf(inputText) > 0) {
      return true;
    } else {
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
  numberOfRecipes(filteredRecipes.length);
  return filteredRecipes;
}
export function filterRecipesByTags(data) {
  const filteredRecipes = [];
  const globalSelectedTags = selectedTags;

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
  numberOfRecipes(filteredRecipes.length);

  return filteredRecipes;
}