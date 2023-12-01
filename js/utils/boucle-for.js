import { recipes } from "../data/recipes.js";
import {
  displayDataReciepes,
  allRecipes,
  numberOfRecipes,
} from "../script/index.js";
import {
  updateTagsArray,
  clearIcon,
  messageError,
  inputAppliance,
  inputIngredient,
  inputUstensils,
} from "./getvalues.js";
import { displaySuggestions, filterSuggestions } from "./suggestions.js";
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
        filterRecipesByTags(myrecipesdata);
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
        filterRecipesByTags(allRecipes);
        numberOfRecipes(recipes.length);
        const ingredients = filterSuggestions(
          allRecipes
            .map((recipe) => recipe.ingredients.map((ing) => ing.ingredient))
            .flat()
        );
        const appliances = filterSuggestions(
          allRecipes.map((recipe) => recipe.appliance)
        );
        const ustensils = filterSuggestions(
          allRecipes.map((recipe) => recipe.ustensils).flat()
        );
        inputIngredient.addEventListener("input", function () {
          displaySuggestions(
            ingredients,
            "suggestions-ingredients",
            inputIngredient
          );
        });
        inputAppliance.addEventListener("input", function () {
          displaySuggestions(
            appliances,
            "suggestions-appareils",
            inputAppliance
          );
        });
        inputUstensils.addEventListener("input", function () {
          displaySuggestions(
            ustensils,
            "suggestions-ustensiles",
            inputUstensils
          );
        });
      }
    });
  }

  clearIcon.addEventListener("click", async function () {
    myInput.value = "";
    clearIcon.style.display = "none";
    // mySearch(myrecipesdata, "");
    const filteredRecipes = mySearch(myrecipesdata, "");
    filterRecipesByTags(myrecipesdata);
    const ingredients = filterSuggestions(
      myrecipesdata
        .map((recipe) => recipe.ingredients.map((ing) => ing.ingredient))
        .flat()
    );
    const appliances = filterSuggestions(
      myrecipesdata.map((recipe) => recipe.appliance)
    );
    const ustensils = filterSuggestions(
      myrecipesdata.map((recipe) => recipe.ustensils).flat()
    );
    inputIngredient.addEventListener("input", function () {
      displaySuggestions(
        ingredients,
        "suggestions-ingredients",
        inputIngredient
      );
    });
    inputAppliance.addEventListener("input", function () {
      displaySuggestions(appliances, "suggestions-appareils", inputAppliance);
    });
    inputUstensils.addEventListener("input", function () {
      displaySuggestions(ustensils, "suggestions-ustensiles", inputUstensils);
    });
  });
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
    }
  }

  /************************ fin boucle for */
  displayDataReciepes(filteredRecipes);
  numberOfRecipes(filteredRecipes.length);

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
  numberOfRecipes(filteredRecipes.length);

  updateTagsArray();
  return filteredRecipes;
}
