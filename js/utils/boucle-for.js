import { recipes } from '../data/recipes.js';
import { displayDataReciepes, messageError, getRecipe } from '../script/index.js';
const myrecipesdata = getRecipe();
// import { displaySuggestions } from './tags.js';
import { firstInputValue, IngredientInputValue, updateTagsArray } from "./getvalues.js";
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
  console.log(myrecipesdata)
  const filteredRecipes = [];
  const firstInputValues = firstInputValue();
  const tagValues = updateTagsArray();

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



    const containsTags = tagValues.length === 0 || tagValues.every(tagValue => {
      // Vérifiez si le tag est présent dans les ingrédients
      const tagLowerCase = tagValue.toLowerCase();
      return recipeIngredients.some(ingredient => ingredient.includes(tagLowerCase))


    });

if (containsFirstInputValues
  && containsTags) {
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


  export function filterRecipesByTags(data) {
    console.log(data + '=== c l element dont on parle')
    
      console.log('Filtering recipes by tags...'); 
      const filteredRecipes = [];
      const globalSelectedTags = updateTagsArray();  
      console.log('Selected Tags:', globalSelectedTags);
    
      // Vérifie si le tableau qui contient les tags est vide: renvoie les recettes sans filtrage
      if (globalSelectedTags.length === 0) {
        return recipes;
      }
    
      data.forEach(recipe => {
        const recipeIngredients = recipe.ingredients.map(ingredient => ingredient.ingredient.toLowerCase());
        console.log('Recipe Ingredients:', recipeIngredients);
        const containsAllTags = globalSelectedTags.every(selectedTag => {
          const tagLowerCase = selectedTag.toLowerCase();
          return recipeIngredients.some(ingredient => ingredient.includes(tagLowerCase));
        });
    
        console.log('Contains All Tags:', containsAllTags);
    
        if (containsAllTags) {
          filteredRecipes.push(recipe);
        }
    
    
      });
    
    
    
      displayDataReciepes(filteredRecipes);
      console.log('Recettes filtrées :', filteredRecipes);
      return filteredRecipes;
    }
    
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