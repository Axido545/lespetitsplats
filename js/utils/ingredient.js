import { recipes } from '../data/recipes.js';
import { displayRecipes, maskRecipe } from '../script/index.js';

export function displayIngredient() {

  const searchIngredient = document.getElementById("ingredientSearch");
  const tagContainer = document.querySelector(".selected-tags");
  const selectedIngredientsSet = new Set(); // Utiliser un ensemble pour stocker les ingrédients sélectionnés
  const uniqueIngredientsSet = new Set(); // Utiliser un ensemble pour stocker les ingrédients uniques
  const suggestionsContainer = document.querySelector(".all-suggestions");
  const recipeContainer = document.querySelector("#recipeContainer"); // Ajoutez un conteneur pour les recettes

// Fonction pour effectuer la recherche en fonction de la saisie de l'utilisateur
function searchRecipesTag(keyword) {
  const lowerCaseKeyword = keyword.toLowerCase();
  const filteredRecipes = recipes.filter(recipe => {
    const lowerCaseIngredients = recipe.ingredients.map(ingredient => ingredient.ingredient.toLowerCase()).join(' ');
    return (
      lowerCaseIngredients.includes(lowerCaseKeyword) 
    );
  });
  return filteredRecipes;
}

// Fonction pour filtrer les recettes en fonction des tags sélectionnés
function filterRecipesByTags() {
  const selectedIngredientsArray = Array.from(selectedIngredientsSet);
  const filteredRecipes = searchRecipesTag(selectedIngredientsArray.join(' '));
  displayFilteredRecipes(filteredRecipes);
}

// // Fonction pour afficher les recettes filtrées
 function displayFilteredRecipes(filteredRecipes) {
  maskRecipe();

 // Affiche uniquement les recettes filtrées
 if (filteredRecipes.length === 0) {
  recipeContainer.style.display = "none"; // Masquer le conteneur de recettes
  recipeCount.style.display = "none"; // Masquer le compteur de recettes
} else {
  recipeContainer.style.display = "flex"; // Afficher le conteneur de recettes
  recipeCount.style.display = "block"; // Afficher le compteur de recettes
  filteredRecipes.forEach(recipe => {
    const recipeItem = document.getElementById(recipe.id);
    if (recipeItem) {
      recipeItem.style.display = "block";
    }
  });
  recipeCount.textContent = `${filteredRecipes.length} recettes`;
}

  displayRecipes();

  // Affiche uniquement les recettes filtrées
  filteredRecipes.forEach(recipe => {
    const recipeItem = document.getElementById(recipe.id);
    if (recipeItem) {
      recipeItem.style.display = "block";
    }
  });

  recipeCount.style.display = "block";
  recipeCount.textContent = `${filteredRecipes.length} recettes`;
}

  searchIngredient.addEventListener('keyup', function() {
    const myIngredient = searchIngredient.value.trim();
    const lowerCaseMyIngredient = myIngredient.toLowerCase();

    // Code gestion des suggestions
    const result = recipes.filter(recipe => {
      const lowerCaseIngredients = recipe.ingredients.map(ingredient => ingredient.ingredient.toLowerCase()).join(' ');
      return lowerCaseIngredients.includes(lowerCaseMyIngredient);
    });

    let suggestionsHTML = "";
    uniqueIngredientsSet.clear();

    result.forEach(recipe => {
      recipe.ingredients.forEach(ingredient => {
        if (
          ingredient.ingredient.toLowerCase().includes(lowerCaseMyIngredient) &&
          !selectedIngredientsSet.has(ingredient.ingredient) &&
          !uniqueIngredientsSet.has(ingredient.ingredient) // Vérifier si l'ingrédient n'est pas déjà dans l'ensemble

        ) {
          uniqueIngredientsSet.add(ingredient.ingredient.toLowerCase());        }
      });
    });

    uniqueIngredientsSet.forEach(ingredient => {
      const suggestionText = ingredient.toLowerCase(); // Convertir en minuscules
      suggestionsHTML += `
        <div class="suggestion" data-ingredient="${ingredient}">${suggestionText}</div><br/>
      `;
    });

    suggestionsContainer.innerHTML = suggestionsHTML;

    const suggestionElements = document.querySelectorAll(".suggestion");
    suggestionElements.forEach(suggestionElement => {
      suggestionElement.addEventListener("click", function(event) {
        const selectedIngredient = event.target.getAttribute('data-ingredient');

        if (!selectedIngredientsSet.has(selectedIngredient)) {
          selectedIngredientsSet.add(selectedIngredient);
          createTag(selectedIngredient);

              // Ajoutez l'appel à la fonction de filtrage ici
    filterRecipesByTags();
        }
      });
    });

    // Filtrer les recettes en fonction des tags sélectionnés
    const selectedIngredientsArray = Array.from(selectedIngredientsSet);
    const filteredRecipes = recipes.filter(recipe => {
      return selectedIngredientsArray.every(selectedIngredient => {
        return recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase() === selectedIngredient);
      });
    });
    
    // Afficher les recettes filtrées
    displayRecipes(filteredRecipes);
  });

  function createTag(tagText) {
    // ... Votre code de création de tag ...
    
    const tagElement = document.createElement('div');
    tagElement.className = 'tag';
    
    const tagTextElement = document.createElement('span');
    tagTextElement.textContent = tagText;
    
    const closeTag = document.createElement('i');
    closeTag.setAttribute("class", "fa-solid fa-xmark close-tag")
    
    tagElement.appendChild(tagTextElement);
    tagElement.appendChild(closeTag);
    tagContainer.appendChild(tagElement);
    
    closeTag.addEventListener('click', function() {
      tagElement.style.display = "none";
      selectedIngredientsSet.delete(tagText);
      filterRecipesByTags(); // Appel à la fonction de filtrage après la suppression d'un tag
    });
  }
}
