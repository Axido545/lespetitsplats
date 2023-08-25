import { recipes } from '../data/recipes.js';
import { selectedIngredientsSet  } from '../script/index.js';
import { searchRecipes} from '../utils/boucle-for.js';
import { displayReciepes, maskReciepe } from '../layouts/display-reciepes.js';

const suggestionsContainer = document.querySelector(".all-suggestions");
const tagContainer = document.querySelector(".selected-tags");
const filteredRecipes = searchRecipes(document.getElementById('searchInput').value);
const displayedRecipeIds = []; // Tableau pour stocker les IDs des recettes affichées
export let displayedRecipes = searchRecipes(document.getElementById('searchInput').value); 

export function updateIngredientSuggestions() {
  console.log("Mise à jour des suggestions d'ingrédients");
  
  const ingredientsFromFilteredRecipes = new Set();

  displayedRecipes.forEach(recipeId => {
    const recipe = recipes.find(recipe => recipe.id === recipeId);
    if (recipe) {
      recipe.ingredients.forEach(ingredient => {
        ingredientsFromFilteredRecipes.add(ingredient.ingredient.toLowerCase());
      });
    }
  });

  const selectedIngredientsSet = new Set(); 
  
  const filteredSuggestions = Array.from(ingredientsFromFilteredRecipes)
    .filter(ingredient => !selectedIngredientsSet.has(ingredient));
  
  console.log("Suggestions filtrées :", filteredSuggestions);
  
  let suggestionsHTML = "";
  filteredSuggestions.forEach(ingredient => {
    suggestionsHTML += `
      <li class="suggestion" data-ingredient="${ingredient}">${ingredient}</li>
    `;
  });

  const suggestionsContainer = document.querySelector(".all-suggestions"); // Ajout de cette ligne pour obtenir le conteneur des suggestions
  
  suggestionsContainer.innerHTML = suggestionsHTML;

}

// pour l autocompletion de la barre ingredient
const searchIngredient = document.getElementById("ingredientSearch");
searchIngredient.addEventListener('input', function() { 
  const myIngredient = searchIngredient.value.trim();
  const lowerCaseMyIngredient = myIngredient.toLowerCase();
  
  const suggestions = document.querySelectorAll(".suggestion"); 

  for (const suggestion of suggestions) {
    const suggestionText = suggestion.textContent.toLowerCase();

    if (suggestionText.includes(lowerCaseMyIngredient)) {  
      suggestion.style.display = 'block';
    } else {
      suggestion.style.display = 'none';
    }
  }
});


  // Filtrer les recettes en fonction des recettes actuellement affichées
  function getDisplayedRecipeIds() {
    const displayedRecipeItems = document.querySelectorAll("article[style='display: block;']");
    const displayedRecipeIds = Array.from(displayedRecipeItems).map(item => parseInt(item.getAttribute("id"), 10));
    console.log("IDs des recettes actuellement affichées :", displayedRecipeIds);
    return displayedRecipeIds;
  }

  // Fonction pour effectuer la recherche en fonction de la saisie de l'utilisateur dals le cjhamp ingredient
 export  function searchRecipesTag() {
  const keyword = document.getElementById('ingredientSearch').value;
console.log(keyword)
    const lowerCaseKeyword = keyword.toLowerCase();
    const filteredRecipes = recipes.filter(recipe => {
      const lowerCaseIngredients = recipe.ingredients.map(ingredient => ingredient.ingredient.toLowerCase()).join(' ');
      return lowerCaseIngredients.includes(lowerCaseKeyword);
    });
    return filteredRecipes;
  }

// Fonction pour filtrer les recettes en fonction des ingrédients
export function filterRecipesByIngredients(ingredientTags) {
  const filteredRecipes = [];

  const displayedRecipeItems = document.querySelectorAll("article[style='display: block;']");
  displayedRecipeItems.forEach(recipeItem => {
    const recipeIngredients = Array.from(recipeItem.querySelectorAll(".suggestion")); 
    const hasAllIngredients = ingredientTags.every(tag =>
      recipeIngredients.some(ingredient => ingredient.textContent.toLowerCase().includes(tag))
    );

    if (hasAllIngredients) {
      filteredRecipes.push(recipeItem);
    }
  });

  return filteredRecipes;
}

export function filterRecipesByTags() {
  const selectedIngredientsArray = Array.from(selectedIngredientsSet);
  const filteredRecipeIds = filterRecipeIdsByIngredients(selectedIngredientsArray);
  displayedRecipes = filteredRecipeIds; // Mettre à jour les recettes affichées
  displayFilteredRecipes(displayedRecipes); // Mettre à jour l'affichage des recettes
}

// Fonction de gestion de la barre de recherche
export function handleSearch() {
  const searchBar = document.getElementById("ingredientSearch");
  const searchInput = searchBar.value.toLowerCase();
  const ingredientTags = searchInput.split(" ");

  // Filtrer les recettes en fonction des balises et afficher les recettes correspondantes
  filterRecipesByTags();
  const filteredRecipeIds = filterRecipeIdsByIngredients(ingredientTags);
  displayFilteredRecipes(filteredRecipeIds);
}

export function createTag(tagText) {
    
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
      updateIngredientSuggestions(); // Met à jour les suggestions d'ingrédients
    });
  }


// Fonction pour ajouter un tag d'ingrédient
export function addIngredientTag(tagText) {
  selectedIngredientsSet.add(tagText);
  createTag(tagText);
  filterRecipesByTags(); // Mise à jour le filtrage après avoir ajouté un tag
}
  suggestionsContainer.addEventListener('click', function(event) {
    if (event.target.classList.contains('suggestion')) {
      const selectedIngredient = event.target.getAttribute('data-ingredient');
      if (!selectedIngredientsSet.has(selectedIngredient)) {
        addIngredientTag(selectedIngredient);
        filterRecipesByTags();
        updateIngredientSuggestions();
        filterRecipesByTagAndDisplayRecipes(selectedIngredient);
      }
    }
  });

export function filterRecipeIdsByIngredients(ingredientTags) {
  const filteredRecipeIds = [];

  const displayedRecipeItems = document.querySelectorAll("article[style='display: block;']");
  displayedRecipeItems.forEach(recipeItem => {
    const recipeId = parseInt(recipeItem.id, 10);
    const recipeIngredientNames = Array.from(recipeItem.querySelectorAll(".ingredient-Item-name"))
      .map(ingredientElement => ingredientElement.textContent.toLowerCase());

    const hasAllIngredients = ingredientTags.every(tag =>
      recipeIngredientNames.includes(tag)
    );

    console.log(`Recette ${recipeId} - Ingrédients :`, recipeIngredientNames);
    console.log(`Recette ${recipeId} - Correspondance d'ingrédients :`, hasAllIngredients);

    if (hasAllIngredients) {
      filteredRecipeIds.push(recipeId);
    }
  });
  console.log("IDs des recettes filtrées par ingrédients :", filteredRecipeIds);
  return filteredRecipeIds;


  
}

export function filterRecipesByTagAndDisplayRecipes(tag, filteredRecipeIds) {
  const displayedRecipeItems = document.querySelectorAll("article");

  displayedRecipeItems.forEach(recipeItem => {
    const recipeId = parseInt(recipeItem.id, 10);
    const recipe = recipes.find(recipe => recipe.id === recipeId);
    
    });


}

export function displayFilteredRecipes(filteredRecipeIds) {
  const allRecipeItems = document.querySelectorAll("article"); 

  const visibleRecipeItems = Array.from(allRecipeItems).filter(recipeItem => {
    return getComputedStyle(recipeItem).display === "block";
  });

  console.log("list des IDS affichées :", filteredRecipeIds);

  visibleRecipeItems.forEach(recipeItem => {
    const recipeId = parseInt(recipeItem.getAttribute("id"));

    if (filteredRecipeIds.includes(recipeId)) {
      recipeItem.style.display = "block"
    } else {
      recipeItem.style.display = "none"
    }
  });
}

// Chargement initial des recettes
window.onload = function () {
  console.log("Chargement initial des recettes");
  displayFilteredRecipes(displayedRecipes); // Afficher les recettes correspondant aux IDs filtrés
  // ...
};
