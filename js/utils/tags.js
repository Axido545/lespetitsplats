
import { updateTagsArray } from "./getvalues.js";

import { getRecipe } from "../script/index.js";
const myrecipesdata = getRecipe()
export function addTag(tagText) {
    // Ajout un élément de tag
    const tag = document.createElement("div");
    tag.className = "tag";
    tag.textContent = tagText;
  
    // pour supprimer tag 
    //Ajoute la x
    const removeButton = document.createElement("i");
    removeButton.className = "fa-solid fa-xmark close-tag";

    // écoute clic x
    removeButton.addEventListener("click", function () {
      removeTag(tag);
      updateTagsArray()
    });
  
// ou ajoute le bouton x au tag
    tag.appendChild(removeButton);
  
    // On récupère l élément on l'on veut que le tag soit
    const tagsContainer = document.getElementById("selected-tags");
    // on ajoute le tag a cet élément
    tagsContainer.appendChild(tag);
  }
  
  // Ajoutez une fonction pour supprimer un tag
  function removeTag(tag) {
    // Supprime le tag de l'interface utilisateur
    tag.parentNode.removeChild(tag);
  }

//   // Fonction pour filtrer les recettes par les tags actuels
// export function filterRecipesByTags() {
//   const selectedTags = Array.from(document.querySelectorAll('.tag')).map(tag => tag.textContent);
//   console.log(selectedTags)
//   const filteredRecipes = [];
//   // const firstInputValues = firstInputValue();
//   // const ingredientInputValues = IngredientInputValue();// faire une recherche par tag avec le tag selectionné
// for (let i = 0; i < myrecipesdata.length; i++) {
//   const recipe = myrecipesdata[i];
//   const recipeIngredients = recipe.ingredients.map(ingredient => ingredient.ingredient.toLowerCase());



//   // selectedTags = selectedTags.every(selectedTag => {
//   //   const keywordLowerCase = selectedTag.toLowerCase();
//   //   return recipeIngredients.some(ingredient => ingredient.includes(keywordLowerCase)) 
//   // })
//   // const containsIngredientsInput = ingredientInputValues.length === 0 || ingredientInputValues.every(ingredient => {
//   //   return recipe.ingredients.some(recipeIngredient => recipeIngredient.ingredient.toLowerCase().includes(ingredient.toLowerCase()));
//   // });

//   const containsAllSelectedTags = selectedTags.every(selectedTag => {
//     const keywordLowerCase = selectedTag.toLowerCase();
//     return recipeIngredients.some(ingredient => ingredient.includes(keywordLowerCase));
//   });


//   if (containsAllSelectedTags) {
//     // Stocker la recette filtrée
//     filteredRecipes.push(recipe);
//   }
// }

//   console.log('Recettes filtrées par tags :', filteredRecipes);
//   return filteredRecipes;

// }




