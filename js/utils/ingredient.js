import { recipes } from '../data/recipes.js';
import { recipeCount  } from '../script/index.js';
import { searchRecipes} from '../utils/boucle-for.js';
import { displayReciepes, maskReciepe } from '../layouts/display-reciepes.js';

const suggestionsContainer = document.querySelector(".all-suggestions");
const tagContainer = document.querySelector(".selected-tags");
const filteredRecipes = searchRecipes(document.getElementById('searchInput').value);
const displayedRecipeIds = []; // Tableau pour stocker les IDs des recettes affichées
export let displayedRecipes = searchRecipes(document.getElementById('searchInput').value); 
const selectedIngredientsSet = new Set();

export function updateIngredientSuggestions() {
  
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
  console.log(lowerCaseMyIngredient)

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

    return displayedRecipeIds;
  }

  // Fonction pour effectuer la recherche en fonction de la saisie de l'utilisateur dals le cjhamp ingredient
 export  function searchRecipesTag() {
  const keyword = document.getElementById('ingredientSearch').value;
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
  updateIngredientSuggestions()
  console.log( updateIngredientSuggestions())
}

// Tableau pour stocker les noms des tags
const tagNamesArray = [];

// export function createTag(tagText) {
    
//     const tagElement = document.createElement('div');
//     tagElement.className = 'tag';
    
//     const tagTextElement = document.createElement('span');
//     tagTextElement.textContent = tagText;
    
//     const closeTag = document.createElement('i');
//     closeTag.setAttribute("class", "fa-solid fa-xmark close-tag")
    
//     tagElement.appendChild(tagTextElement);
//     tagElement.appendChild(closeTag);
//     tagContainer.appendChild(tagElement);

//       // Ajouter le nom du tag au tableau
//   tagNamesArray.push(tagText);


// }

// Fonction pour mettre à jour le tableau après la suppression d'un tag
function updateTagNamesArray(tagText) {
  const index = tagNamesArray.indexOf(tagText);
  if (index !== -1) {
    tagNamesArray.splice(index, 1); // Supprimer le tag du tableau
  }
}
    const closeTag = document.querySelector("close-tag")

     export function createTag(tagText) {
    const tagElement = document.createElement('div');
    tagElement.className = 'tag';
    
    const tagTextElement = document.createElement('span');
    tagTextElement.setAttribute("class", "tag-name");
    tagTextElement.textContent = tagText;
    
    const closeTag = document.createElement('i');
    closeTag.setAttribute("class", "fa-solid fa-xmark close-tag");
    
    tagElement.appendChild(tagTextElement);
    tagElement.appendChild(closeTag);
    tagContainer.appendChild(tagElement);
    
    closeTag.addEventListener('click', function() {
        tagElement.style.display = "none";
        selectedIngredientsSet.delete(tagText);



        updateIngredientSuggestions();
        ///////////////////////////////////////////////////////
        const elementsArray = numberOfRecipes() 
        console.log(elementsArray)
        // if (elementsArray) {
            if (elementsArray && elementsArray.length === 0) {
              numberOfRecipes()
                let newfilteredRecipeIds = [];
                filteredRecipes.forEach(recipe => {
                    newfilteredRecipeIds.push(recipe.id);
                });
                
                const allRecipeItems = document.querySelectorAll("article"); 
                allRecipeItems.forEach(recipeItem => {
                    const recipeId = parseInt(recipeItem.getAttribute("id"));
                    if (newfilteredRecipeIds.includes(recipeId)) {
                        recipeItem.style.display = "block";
                    } else {
                        recipeItem.style.display = "none";
                    }
                });
            }

            // else {
        //       numberOfRecipes()
        //         alert('C\'est bon !');
        //     }
        // }
    });
}



    

    function numberOfRecipes() {
      const allRecipeItems = document.querySelectorAll("article"); 
    
      const visibleRecipeItems = Array.from(allRecipeItems).filter(recipeItem => {
        return getComputedStyle(recipeItem).display === "block";
      });
    
      const numberOfVisibleRecipes = visibleRecipeItems.length; // Compter le nombre d'éléments recettes visibles
    
      const recipeIdsArray = visibleRecipeItems.map(recipeItem => {
        return parseInt(recipeItem.getAttribute("id"));
      }); // Créer un tableau des IDs des éléments recettes visibles
    
      console.log("Nombre de recettes visibles :", numberOfVisibleRecipes);
      console.log("Tableau des IDs des recettes visibles :", recipeIdsArray);
      const recipeCount = document.getElementById("recipeCount")
      recipeCount.textContent = recipeIdsArray.length +" recettes";
    
      return recipeIdsArray; // Retourner le tableau des IDs des recettes visibles
      
    }
    
    const visibleRecipeIds = numberOfRecipes();
    console.log(visibleRecipeIds)
    


// Fonction pour ajouter un tag d'ingrédient
export function addIngredientTag(tagText) {
  selectedIngredientsSet.add(tagText);
  createTag(tagText);
  filterRecipesByTags(); // Mise à jour le filtrage après avoir ajouté un tag
  numberOfRecipes()
  updateIngredientSuggestions() 
}

  suggestionsContainer.addEventListener('click', function(event) {
    if (event.target.classList.contains('suggestion')) {
      const selectedIngredient = event.target.getAttribute('data-ingredient');
      if (!selectedIngredientsSet.has(selectedIngredient)) {
         // Ajouter l'ingrédient aux ingrédients sélectionnés
      selectedIngredientsSet.add(selectedIngredient);
      

        addIngredientTag(selectedIngredient);
        filterRecipesByTags();
        updateIngredientSuggestions();
        filterRecipesByTagAndDisplayRecipes(selectedIngredient);


 // Filtrer les suggestions en excluant les ingrédients déjà sélectionnés
 const filteredSuggestions = Array.from(ingredientsFromFilteredRecipes)
 .filter(ingredient => !selectedIngredientsSet.has(ingredient));

// Générer le HTML mis à jour pour les suggestions
let suggestionsHTML = "";
filteredSuggestions.forEach(ingredient => {
 suggestionsHTML += `
   <li class="suggestion" data-ingredient="${ingredient}">${ingredient}</li>
 `;
});

// Mettre à jour le contenu des suggestions dans le DOM
suggestionsContainer.innerHTML = suggestionsHTML;

      }


      
    }
  });

  // Écouter le clic sur le tag et gérer la suppression
tagContainer.addEventListener('click', function(event) {
  if (event.target.classList.contains('close-tag')) {
    const tagText = event.target.previousElementSibling.textContent;
    
    // Supprimer le tag des ingrédients sélectionnés
    selectedIngredientsSet.delete(tagText);

    
    // Filtrer les suggestions en excluant les ingrédients déjà sélectionnés
    const filteredSuggestions = Array.from(ingredientsFromFilteredRecipes)
      .filter(ingredient => !selectedIngredientsSet.has(ingredient));

    // Générer le HTML mis à jour pour les suggestions
    let suggestionsHTML = "";
    filteredSuggestions.forEach(ingredient => {
      suggestionsHTML += `
        <li class="suggestion" data-ingredient="${ingredient}">${ingredient}</li>
      `;
    });

    // Mettre à jour le contenu des suggestions dans le DOM
    suggestionsContainer.innerHTML = suggestionsHTML;

    updateTagNamesArray(tagText); // Mettre à jour le tableau
    event.target.closest('.tag').remove(); // Supprimer le tag de l'interface
  }

});

// // Écouter le clic sur un ingrédient pour ajouter un tag
// ingredientContainer.addEventListener('click', function(event) {
//   if (event.target.classList.contains('ingredient')) {
//     const ingredientText = event.target.textContent;
//     addTag(ingredientText); // Ajouter un tag
//   }
// });

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


    if (hasAllIngredients) {
      filteredRecipeIds.push(recipeId);
    }
  });
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
  displayFilteredRecipes(displayedRecipes); // Afficher les recettes correspondant aux IDs filtrés
  // ...
};