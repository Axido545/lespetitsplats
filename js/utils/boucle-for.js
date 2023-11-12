import { recipes } from '../data/recipes.js';
import { displayDataReciepes, messageError, numberOfRecipes } from '../script/index.js';

// import { displaySuggestions } from './tags.js';
import { firstInputValue, IngredientInputValue } from "./getvalues.js";
import {  afficheListeSuggestions } from './suggestions.js';


export const myInput =   document.getElementById('searchInput')

export function bigSearchBar(myrecipesdata) {
  const myInput = document.getElementById('searchInput');
  const clearIcon = document.querySelector('.clear-icon');
  const recicontainer = document.getElementById("recipeContainer")
  const ingredientSearch = document.getElementById("ingredientSearch")

  myInput.addEventListener('input', function () {
    const inputValue = myInput.value.trim().toLowerCase()
    console.log(inputValue)
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

       if(recicontainer.textContent === ""){
        messageError.textContent = `« Aucune recette ne contient « ${inputValue} »  vous pouvez chercher «
        tarte aux pommes », « poisson », etc.`;
       }
   const filteredRecipes = mySearch(myrecipesdata)
   const filteredIngredient = getIngredientFromRecipes(filteredRecipes)
   afficheListeSuggestions(filteredIngredient, "suggestions-ingredients");

    }
  });
}




export function mySearch(myrecipesdata) {
  const filteredRecipes = [];
  const firstInputValues = firstInputValue();
  const ingredientInputValues = IngredientInputValue();

  for (let i = 0; i < myrecipesdata.length; i++) {
    const recipe = myrecipesdata[i];
    const recipeName = recipe.name.toLowerCase();
    const recipeIngredients = recipe.ingredients.map(ingredient => ingredient.ingredient.toLowerCase());
    const recipeDescription = recipe.description.toLowerCase();


    // // Filtrer par firstInputValues
    const containsFirstInputValues = firstInputValues.every(firstInputValue => {
      const keywordLowerCase = firstInputValue.toLowerCase();
      return recipeName.includes(keywordLowerCase) ||
        recipeIngredients.some(ingredient => ingredient.includes(keywordLowerCase)) ||
        recipeDescription.includes(keywordLowerCase);
    })
    const containsIngredientsInput = ingredientInputValues.length === 0 || ingredientInputValues.every(ingredient => {
      return recipe.ingredients.some(recipeIngredient => recipeIngredient.ingredient.toLowerCase().includes(ingredient.toLowerCase()));
    });

    if (containsFirstInputValues 
      // && containsIngredientsInput
      ) {
      // Stocker la recette filtrée
      filteredRecipes.push(recipe);
    }
  }
  displayDataReciepes(filteredRecipes);

  console.log('Recettes filtrés :', filteredRecipes); 
  return filteredRecipes;
}



// Réinitialise les valeurs des champs d'entrée lors du chargement de la page
window.addEventListener("load", function() {
  const myInput = document.getElementById('searchInput');
  myInput.value = ""; 
  });

  export function getIngredientFromRecipes(filteredRecipes) {

    const filteredIngredients = [];
    filteredRecipes.forEach(recipe => {
      recipe.ingredients.forEach(ingredient => {
        const ingredientName = ingredient.ingredient.toLowerCase();
        if (!filteredIngredients.includes(ingredientName)) {
          filteredIngredients.push(ingredientName);
        }
      });
    });
    return filteredIngredients;
  }