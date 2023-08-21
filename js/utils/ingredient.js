import { recipes } from '../data/recipes.js';
import { selectedIngredientsSet  } from '../script/index.js';
import { searchRecipes} from '../utils/boucle-for.js';

const filteredRecipes = searchRecipes(document.getElementById('searchInput').value);
console.log(filteredRecipes)
const displayedRecipeIds = []; // Tableau pour stocker les IDs des recettes affichées

let displayedRecipes = [];
  const suggestionsContainer = document.querySelector(".all-suggestions");
  const tagContainer = document.querySelector(".selected-tags");


    // Fonction pour mettre à jour les suggestions d'ingrédients en fonction des recettes filtrées
    export function updateIngredientSuggestions() {
      const ingredientsFromFilteredRecipes = new Set();
          let myreciep = filteredRecipes;

      myreciep.forEach(recipe => {
        recipe.ingredients.forEach(ingredient => {
          ingredientsFromFilteredRecipes.add(ingredient.ingredient.toLowerCase());
        });
      });
  
      const filteredSuggestions = Array.from(ingredientsFromFilteredRecipes)
        .filter(ingredient => !selectedIngredientsSet.has(ingredient));
  
      let suggestionsHTML = "";
      filteredSuggestions.forEach(ingredient => {
        suggestionsHTML += `
          <li class="suggestion" data-ingredient="${ingredient}">${ingredient}</li>
        `;
      });
  
      suggestionsContainer.innerHTML = suggestionsHTML;
    }   


// Fonction pour récupérer les IDs des recettes actuellement affichées
function getDisplayedRecipeIds() {
  const displayedRecipeItems = document.querySelectorAll("article[style='display: block;']");
  const displayedRecipeIds = Array.from(displayedRecipeItems).map(item => parseInt(item.getAttribute("id"), 10));
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

  export function filterRecipesByTags() {
    const selectedIngredientsArray = Array.from(selectedIngredientsSet);
    const filteredRecipeIds = filterRecipeIdsByIngredients(selectedIngredientsArray);
    displayedRecipes = filteredRecipeIds; // Mettre à jour les recettes affichées
    displayFilteredRecipes(filteredRecipeIds); // Afficher les recettes filtrées
    updateIngredientSuggestions(); // Mettre à jour les suggestions d'ingrédients
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

// Fonction de gestion de la barre de recherche
export function handleSearch() {
  const searchBar = document.getElementById("ingredientSearch");
  const searchInput = searchBar.value.toLowerCase();
  const ingredientTags = searchInput.split(" ");

  const filteredRecipeItems = filterRecipesByIngredients(ingredientTags);
  displayFilteredRecipes(filteredRecipeItems);
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
      // displayFilteredRecipes(filterRecipesByTags())
      // displayFilteredRecipes(displayedRecipes); // Afficher les recettes filtrées actualisées
    });
  }




// Fonction pour ajouter un tag d'ingrédient
 export function addIngredientTag(tagText) {
  selectedIngredientsSet.add(tagText);
  createTag(tagText);
  filterRecipesByTags();
}


suggestionsContainer.addEventListener('click', function(event) {
  if (event.target.classList.contains('suggestion')) {
    const selectedIngredient = event.target.getAttribute('data-ingredient');
    if (!selectedIngredientsSet.has(selectedIngredient)) {
      addIngredientTag(selectedIngredient);

      // Filtrer les recettes en fonction des recettes actuellement affichées
      const displayedRecipeIds = getDisplayedRecipeIds();
      const filteredRecipeIds = filterRecipeIdsByIngredients(Array.from(selectedIngredientsSet));
      const recipesToShow = filteredRecipeIds.filter(id => displayedRecipeIds.includes(id));
      displayFilteredRecipes(recipesToShow);

      // Mettre à jour les suggestions d'ingrédients
      updateIngredientSuggestions();
    }
  }
});


export function filterRecipeIdsByIngredients(ingredientTags) {
  const filteredRecipeIds = [];

  const displayedRecipeItems = document.querySelectorAll("article[style='display: block;']");
  displayedRecipeItems.forEach(recipeItem => {
    const recipeId = parseInt(recipeItem.id, 10);
    const recipeIngredients = Array.from(recipeItem.querySelectorAll(".suggestion"));
    const hasAllIngredients = ingredientTags.every(tag =>
      recipeIngredients.some(ingredient => ingredient.textContent.toLowerCase().includes(tag))
    );

    if (hasAllIngredients) {
      filteredRecipeIds.push(recipeId);
    }
  });

  return filteredRecipeIds;
}


// Fonction pour afficher les recettes filtrées
export function displayFilteredRecipes() {
  let filteredRecipeIds = [];

  const displayedRecipeIds = getDisplayedRecipeIds();
  filteredRecipeIds.forEach(recipeId => {
    if (displayedRecipeIds.includes(recipeId)) {
      const recipeItem = document.querySelector(`article[id="${recipeId}"]`);
      if (recipeItem) {
        recipeItem.style.display = "block";
      }
    }
  });
}
console.log(displayFilteredRecipes())