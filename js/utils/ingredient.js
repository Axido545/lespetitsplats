import { recipes } from '../data/recipes.js';
import { selectedIngredientsSet  } from '../script/index.js';
import { searchRecipes} from '../utils/boucle-for.js';
import { displayReciepes, maskReciepe } from '../layouts/display-reciepes.js';

const suggestionsContainer = document.querySelector(".all-suggestions");
const tagContainer = document.querySelector(".selected-tags");
const filteredRecipes = searchRecipes(document.getElementById('searchInput').value);
const displayedRecipeIds = []; // Tableau pour stocker les IDs des recettes affichées
export let displayedRecipes = searchRecipes(document.getElementById('searchInput').value); // Initialisation de displayedRecipes avec les recettes correspondant à la recherche initiale

    // Fonction pour mettre à jour les suggestions d'ingrédients en fonction des recettes filtrées
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

  const filteredSuggestions = Array.from(ingredientsFromFilteredRecipes)
    .filter(ingredient => !selectedIngredientsSet.has(ingredient));

    console.log("Suggestions filtrées :", filteredSuggestions);

  let suggestionsHTML = "";
  filteredSuggestions.forEach(ingredient => {
    suggestionsHTML += `
      <li class="suggestion" data-ingredient="${ingredient}">${ingredient}</li>
    `;
  });

  suggestionsContainer.innerHTML = suggestionsHTML;

}
  // Filtrer les recettes en fonction des recettes actuellement affichées
  function getDisplayedRecipeIds() {
    const displayedRecipeItems = document.querySelectorAll("article[style='display: block;']");
    const displayedRecipeIds = Array.from(displayedRecipeItems).map(item => parseInt(item.getAttribute("id"), 10));
    console.log("IDs des recettes actuellement affichées :", displayedRecipeIds);
    return displayedRecipeIds;
  }

  // Fonction pour effectuer la recherche en fonction de la saisie de l'utilisateur dals le cjhamp ingredient
  function searchRecipesTag(keyword) {
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
  // const displayedRecipeItems = document.querySelectorAll("article"); // Supposons que chaque recette a une classe "recipe-item"
  displayedRecipeItems.forEach(recipeItem => {
    const recipeIngredients = Array.from(recipeItem.querySelectorAll(".suggestion")); // Supposons que chaque ingrédient a une classe "ingredient"
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
  displayFilteredRecipes(filteredRecipeIds); // Mettre à jour l'affichage des recettes
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

    });
  }


// Fonction pour ajouter un tag d'ingrédient
export function addIngredientTag(tagText) {
  selectedIngredientsSet.add(tagText);
  createTag(tagText);
  filterRecipesByTags(); // Mettre à jour le filtrage après avoir ajouté un tag
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


// Fonction pour filtrer les recettes par tag (ingrédient) et afficher les recettes correspondantes
export function filterRecipesByTagAndDisplayRecipes(tag) {
  const displayedRecipeItems = document.querySelectorAll("article");
  displayedRecipeItems.forEach(recipeItem => {
    const recipeId = parseInt(recipeItem.id, 10);
    const recipe = recipes.find(recipe => recipe.id === recipeId);
    console.log(displayedRecipeItems + "<========== yep")

    if (recipe) {
      const hasTag = recipe.ingredients.some(item => item.ingredient.toLowerCase() === tag.toLowerCase());

      recipeItem.style.display = hasTag ? "block" : "none";
    }
  });
}

export function displayFilteredRecipes(filteredRecipeIds) {
  console.log("Affichage des recettes filtrées :", filteredRecipeIds);

  const allRecipeItems = document.querySelectorAll("article"); 

  allRecipeItems.forEach(recipeItem => {
    const recipeId = recipeItem.getAttribute("id"); 
    if (filteredRecipeIds.includes(recipeId)) {
      recipeItem.style.display = "block"; 
    } else {
      recipeItem.style.display = "none"; 
    }
  });

}

// Chargement initial des recettes
window.onload = function () {
  console.log("Chargement initial des recettes");
  displayFilteredRecipes(displayedRecipes); // Afficher les recettes correspondant aux IDs filtrés
  // ...
};


