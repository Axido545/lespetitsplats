import { recipes } from "../data/recipes.js";
import {
  displayDataReciepes,
  allRecipes,
  numberOfRecipes,
} from "../script/index.js";
import {
  updateTagsArray,
  clearIcon,
  clearInput,
  messageError,
  inputAppliance,
  inputIngredient,
  inputUstensils,
  myInput,
  recipeContainer,
} from "./getvalues.js";
import {
  displaySuggestions,
  filterSuggestions,
  selectedTags,
} from "./suggestions.js";

export function bigSearchBar(myrecipesdata) {
  if (myInput) {
    myInput.addEventListener("input", function () {
      const inputValue = myInput.value.trim().toLowerCase();
      clearInput.classList.add("hidden");

      if (inputValue.length === 0) {
        messageError.textContent = "";
        clearInput.classList.add("hidden");
      } else if (inputValue.length < 3) {
        messageError.textContent = "Veuillez entrer trois caractères minimum";
        clearInput.classList.remove("hidden");
      } else {
        displayDataReciepes(mySearch(myrecipesdata, inputValue));
        clearInput.classList.remove("hidden");
        messageError.textContent = "";
      }
    });
  }

  // clearIcon.addEventListener("click", async function () {
  //   myInput.value = "";
  //   clearIcon.style.display = "none";
  //   // mySearch(myrecipesdata, "");
  //   const filteredRecipes = mySearch(myrecipesdata, "");
  //   filterRecipesByTags(myrecipesdata);
  //   const ingredients = filterSuggestions(
  //     myrecipesdata
  //       .map((recipe) => recipe.ingredients.map((ing) => ing.ingredient))
  //       .flat()
  //   );
  //   const appliances = filterSuggestions(
  //     myrecipesdata.map((recipe) => recipe.appliance)
  //   );
  //   const ustensils = filterSuggestions(
  //     myrecipesdata.map((recipe) => recipe.ustensils).flat()
  //   );
  //   inputIngredient.addEventListener("input", function () {
  //     displaySuggestions(
  //       ingredients,
  //       "suggestions-ingredients",
  //       inputIngredient
  //     );
  //   });
  //   inputAppliance.addEventListener("input", function () {
  //     displaySuggestions(appliances, "suggestions-appareils", inputAppliance);
  //   });
  //   inputUstensils.addEventListener("input", function () {
  //     displaySuggestions(ustensils, "suggestions-ustensiles", inputUstensils);
  //   });
  // });
}

export function mySearch(myrecipesdata, inputText) {
  /************************boucle for */
  const filteredRecipes = [];
  for (let i = 0; i < myrecipesdata.length; i++) {
    const recipe = myrecipesdata[i];

    if (inputText === "") {
      numberOfRecipes(myrecipesdata.length);
    } else {
      numberOfRecipes(filteredRecipes.length);
    }
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

      if (filteredRecipes.length === 0) {
        messageError.textContent = `« Aucune recette ne contient « ${inputText} »  vous pouvez chercher «
            tarte aux pommes », « poisson », etc.`;
        recipeContainer.innerHTML = "";
      }
    }
  }
  /************************ fin boucle for */
  filterRecipesByTags(filteredRecipes);

  return filteredRecipes;
}
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
  const inputValue = myInput.value.trim().toLowerCase();

  mySearch(filteredRecipes, inputValue);
  return filteredRecipes;
}

window.addEventListener("load", function () {
  myInput.value = "";
  inputIngredient.value = "";
  inputAppliance.value = "";
  inputUstensils.value = "";
});
