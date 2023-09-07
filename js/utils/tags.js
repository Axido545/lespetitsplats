import { recipes } from '../data/recipes.js';
import { searchRecipes} from './boucle-for.js';
import { displayFilteredRecipes } from '../script/index.js';

const suggestionsContainer = document.querySelector(".all-suggestions");
const suggestionsContainerAppliance = document.querySelector(".all-suggestions-appliance");
const suggestionsContainerUstensiles = document.querySelector(".all-suggestions-ustensiles");
const tagContainer = document.querySelector(".selected-tags");
const filteredRecipes = searchRecipes(document.getElementById('searchInput').value);
const displayedRecipeIds = []; // Tableau pour stocker les IDs des recettes affichées
export let displayedRecipes = searchRecipes(document.getElementById('searchInput').value); 
const selectedIngredientsSet = new Set();
export const selectedAppliancesSet = new Set();
export const selectedUstensilesSet = new Set();
const ingredientsFromFilteredRecipes = new Set();
const appareilsFromFilteredRecipes = new Set();
const ustensilFromFilteredRecipes = new Set();

export function updateAllSuggestions() {

  displayedRecipes.forEach(recipeId => {
    const recipe = recipes.find(recipe => recipe.id === recipeId);
    if (recipe) {
      recipe.ingredients.forEach(ingredient => {
        ingredientsFromFilteredRecipes.add(ingredient.ingredient.toLowerCase());
      });
      appareilsFromFilteredRecipes.add(recipe.appliance.toLowerCase());
      recipe.ustensils.forEach(ustensil => {
        ustensilFromFilteredRecipes.add(ustensil.toLowerCase());
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
  const suggestionsContainer = document.querySelector(".all-suggestions");
  suggestionsContainer.innerHTML = suggestionsHTML;

  const filteredSuggestionsAppliance = Array.from(appareilsFromFilteredRecipes)
    .filter(appliance => !selectedAppliancesSet.has(appliance));
  let suggestionsHTMLAppliance = "";
  filteredSuggestionsAppliance.forEach(appliance => {
    suggestionsHTMLAppliance += `
      <li class="suggestion-appliance" data-appliance="${appliance}">${appliance}</li>
    `;
  });
  const suggestionsContainerAppliance = document.querySelector(".all-suggestions-appliance");
  suggestionsContainerAppliance.innerHTML = suggestionsHTMLAppliance;

const filteredSuggestionsUstensiles = Array.from(ustensilFromFilteredRecipes)
  .filter(ustensil => !selectedUstensilesSet.has(ustensil));
  let suggestionsHTMLUstensiles = "";
  filteredSuggestionsUstensiles.forEach(ustensil => {
    suggestionsHTMLUstensiles+= `
    <li class="suggestion-ustensiles" data-ustensiles="${ustensil}">${ustensil}</li>
    `
  })
  const suggestionsContainerUstensiles = document.querySelector(".all-suggestions-ustensiles")
  suggestionsContainerUstensiles.innerHTML = suggestionsHTMLUstensiles;
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
// Écouter les changements de sélection d'appareils
const searchAppliance = document.getElementById("applianceSearch");
searchAppliance.addEventListener('input', function() {
  const selectedAppliance = searchAppliance.value.trim().toLowerCase();
  // Filtrer et afficher les recettes en fonction de l'appareil sélectionné
  const filteredRecipes = recipes.filter(recipe => {
    return recipe.appliance.toLowerCase().includes(selectedAppliance);
  });
  displayFilteredRecipes(filteredRecipes);
});
// Écouter les changements de sélection d'ustensiles
const searchUstensil = document.getElementById("ustensilSearch");
searchUstensil.addEventListener('input', function() {
  const selectedUstensil = searchUstensil.value.trim().toLowerCase();
  // Filtrer et afficher les recettes en fonction de l'ustensile sélectionné
  const filteredRecipes = recipes.filter(recipe => {
    return recipe.ustensils.some(ustensil => ustensil.toLowerCase().includes(selectedUstensil));
  });
  displayFilteredRecipes(filteredRecipes);
});
  // Filtre les recettes en fonction des recettes actuellement affichées
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
export function filterRecipesByIngredients(ingredientTags , applianceTags, ustensileTags) {
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
    const recipeAppliances = Array.from(recipeItem.querySelectorAll(".suggestion-appliance")); 
    const hasAllAppliances = applianceTags.every(tag =>
      recipeAppliances.some(appliance => appliance.textContent.toLowerCase().includes(tag))
    );
    if (hasAllAppliances) {
      filteredRecipes.push(recipeItem);
    }
    const recipeUstensiles = Array.from(recipeItem.querySelectorAll(".suggestion-appliance")); 
    const hasAllUstensiles = ustensileTags.every(tag =>
      recipeUstensiles.some(ustensil => ustensil.textContent.toLowerCase().includes(tag))
    );

    if (hasAllUstensiles) {
      filteredRecipes.push(recipeItem);
    }
  });
  return filteredRecipes;
}
export function filterRecipesByTags() {
  const selectedIngredientsArray = Array.from(selectedIngredientsSet);
  const selectedApplianceArray = Array.from(selectedAppliancesSet);
  const selectedUstensilesArray = Array.from(selectedUstensilesSet);
  const filteredRecipeIds = filterRecipeIdsByAllTags(selectedIngredientsArray,selectedApplianceArray,selectedUstensilesArray );
  displayedRecipes = filteredRecipeIds; // Mettre à jour les recettes affichées
  displayFilteredRecipes(displayedRecipes); // Mettre à jour l'affichage des recettes
}

// Fonction de gestion de la barre de recherche
export function handleSearch() {
  const searchBar = document.getElementById("ingredientSearch");
  const searchInput = searchBar.value.toLowerCase();
  const ingredientTags = searchInput.split(" ");
  const searchBarAppliance = document.getElementById("applianceSearch");
  const searchInputAppliance = searchBarAppliance.value.toLowerCase();
  const applianceTags = searchInputAppliance.split(" ");
  const searchBarUstensiles = document.getElementById("ustensilSearch");
  const searchInputUstensiles = searchBarUstensiles.value.toLowerCase();
  const ustensileTags = searchInputUstensiles.split(" ");

  // Filtrer les recettes en fonction des balises et afficher les recettes correspondantes
  filterRecipesByTags();
  // const filteredRecipeIds = filterRecipeIdsByAllTags(ingredientTags, applianceTags, ustensileTags);
  displayFilteredRecipes();
  updateAllSuggestions()
}

// Tableau pour stocker les noms des tags
const tagNamesArray = [];


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
        selectedAppliancesSet.delete(tagText);
        selectedUstensilesSet.delete(tagText);

        updateAllSuggestions();
        ///////////////////////////////////////////////////////
        const elementsArray = numberOfRecipes() 
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
    });
}

  
// Fonction pour ajouter un tag d'ingrédient
export function addIngredientTag(tagText) {
  selectedIngredientsSet.add(tagText);
  selectedAppliancesSet.add(tagText);
  selectedUstensilesSet.add(tagText);
  createTag(tagText);
  filterRecipesByTags(); // Mes à jour le filtrage après avoir ajouté un tag
  numberOfRecipes()
  updateAllSuggestions() 
}

  suggestionsContainer.addEventListener('click', function(event) {
    if (event.target.classList.contains('suggestion')) {
      const selectedIngredient = event.target.getAttribute('data-ingredient');
      if (!selectedIngredientsSet.has(selectedIngredient)) {
         // Ajouter l'ingrédient aux ingrédients sélectionnés
      selectedIngredientsSet.add(selectedIngredient);
      
        addIngredientTag(selectedIngredient);
        filterRecipesByTags();
        updateAllSuggestions();
        filterRecipesByTagAndDisplayRecipes(selectedIngredient);

 // Filtre des suggestions en excluant les ingrédients déjà sélectionnés
 const filteredSuggestions = Array.from(ingredientsFromFilteredRecipes)
 .filter(ingredient => !selectedIngredientsSet.has(ingredient));

// HTML mis à jour pour les suggestions
let suggestionsHTML = "";
filteredSuggestions.forEach(ingredient => {
 suggestionsHTML += `
   <li class="suggestion" data-ingredient="${ingredient}">${ingredient}</li>
 `;
});

// Mise à jour le contenu des suggestions dans le DOM
suggestionsContainer.innerHTML = suggestionsHTML;
      }
    }
  });

suggestionsContainerAppliance.addEventListener('click', function(event){
  if(event.target.classList.contains('suggestion-appliance')){
    const selectedAppliance = event.target.getAttribute('data-appliance');
    if (!selectedAppliancesSet.has(selectedAppliance)){
               // Ajouter l'appareil aux appareilss sélectionnés
      selectedAppliancesSet.add(selectedAppliance);
      
      addIngredientTag(selectedAppliance);
      filterRecipesByTags();
      updateAllSuggestions();
      filterRecipesByTagAndDisplayRecipes(selectedAppliance);

       // Filtre des suggestions-appliance  en excluant les appareils déjà sélectionnés
       const filteredSuggestionsAppliance = Array.from(appareilsFromFilteredRecipes)
       .filter(appliance => !selectedAppliancesSet.has(appliance));

       // HTML mis a jour pour les suggestions-appliance
       let suggestionsHTMLAppliance = "";
       filteredSuggestionsAppliance.forEach(appliance =>{
        suggestionsHTMLAppliance += `
        <li class="suggestion-appliance" data-appliance="${appliance}">${appliance}</li>

        `;
       });
       //Mise à jour du contenu des suggestions-appliance dans le DOM
       suggestionsContainerAppliance.innerHTML = suggestionsHTMLAppliance;
    }
  }
});

suggestionsContainerUstensiles.addEventListener('click', function(event){
  if(event.target.classList.contains('suggestion-ustensiles')){
    const selectedUstensil = event.target.getAttribute('data-ustensiles');
    if(!selectedUstensilesSet.has(selectedUstensil)){
        // Ajouter l'ustensile aux ustensiles sélectionnés
        selectedUstensilesSet.add(selectedUstensil);

        addIngredientTag(selectedUstensil);
        filterRecipesByTags();
        updateAllSuggestions();
        filterRecipesByTagAndDisplayRecipes(selectedUstensil);
        


       // Filtre des suggestions-ustensiles  en excluant les appareils déjà sélectionnés
       const filteredSuggestionsUstensiles = Array.from(ustensilFromFilteredRecipes)
       .filter(ustensil => !selectedUstensilesSet.has(ustensil));

       // HTML mis a jour pour les suggestions-ustensiles
       let suggestionsHTMLUstensiles = "";
       filteredSuggestionsUstensiles.forEach(ustensil =>{
        suggestionsHTMLUstensiles += `
        <li class="suggestion-ustensiles" data-ustensiles="${ustensil}">${ustensil}</li>

        `;
       });
       //Mise à jour du contenu des suggestions-ustensiles dans le DOM
       suggestionsContainerUstensiles.innerHTML = suggestionsHTMLUstensiles;
    }
  }
});

  // Écouter le clic sur le tag et gérer la suppression
tagContainer.addEventListener('click', function(event) {
  if (event.target.classList.contains('close-tag')) {
    const tagText = event.target.previousElementSibling.textContent;
    
    // Supprime le tag des ingrédients sélectionnés
    selectedIngredientsSet.delete(tagText);
       // Supprime le tag des appareils sélectionnés
       selectedAppliancesSet.delete(tagText);
         // Supprime le tag des ustensiles sélectionnés
         selectedUstensilesSet.delete(tagText);


    
    // Filtre les suggestions en excluant les ingrédients déjà sélectionnés
    const filteredSuggestions = Array.from(ingredientsFromFilteredRecipes)
      .filter(ingredient => !selectedIngredientsSet.has(ingredient));
        // Filtre les suggestions en excluant les appreils déjà sélectionnés
        const filteredSuggestionsAppliance = Array.from(appareilsFromFilteredRecipes)
        .filter(appliance => !selectedAppliancesSet.has(appliance));
       // Filtre les suggestions en excluant les ustensiles déjà sélectionnés
       const filteredSuggestionsUstensiles = Array.from(ustensilFromFilteredRecipes)
       .filter(ustensil => !selectedUstensilesSet.has(ustensil));

    // Génère le HTML mis à jour pour les suggestions d'ingredient
    let suggestionsHTML = "";
    filteredSuggestions.forEach(ingredient => {
      suggestionsHTML += `
        <li class="suggestion" data-ingredient="${ingredient}">${ingredient}</li>
      `;
    });
    // Génère le HTML mis à jour pour les suggestions des appareils
    let suggestionsHTMLAppliance = "";
    filteredSuggestionsAppliance.forEach(appliance => {
      suggestionsHTMLAppliance += `
        <li class="suggestion-appliance" data-appliance="${appliance}">${appliance}</li>
      `;
    });
   // Génère le HTML mis à jour pour les suggestions des ustensiles
   let suggestionsHTMLUstensiles = "";
   filteredSuggestionsUstensiles.forEach(ustensil => {
     suggestionsHTMLUstensiles += `
       <li class="suggestion-ustensiles" data-ustensiles="${ustensil}">${ustensil}</li>
     `;
   });

    // Mise à jour le contenu des suggestions ingredients dans le DOM
    suggestionsContainer.innerHTML = suggestionsHTML;
  // Mise à jour le contenu des suggestions apparels dans le DOM
  suggestionsContainerAppliance.innerHTML = suggestionsHTMLAppliance;
    // Mise à jour le contenu des suggestions ustensiles dans le DOM
    suggestionsContainerUstensiles.innerHTML = suggestionsHTMLUstensiles;

    updateTagNamesArray(tagText); // Mettre à jour le tableau
    event.target.closest('.tag').remove(); // Supprimer le tag de l'interface
  }

});

export function filterRecipeIdsByAllTags(ingredientTags, applianceTags, ustensileTags) {
  const filteredRecipeIds = [];

  const displayedRecipeItems = document.querySelectorAll("article[style='display: block;']");
  displayedRecipeItems.forEach(recipeItem => {
    const recipeId = parseInt(recipeItem.id, 10);
    const recipeIngredientNames = Array.from(recipeItem.querySelectorAll(".ingredient-Item-name"))
      .map(ingredientElement => ingredientElement.textContent.toLowerCase());
    const recipeApplianceNames = Array.from(recipeItem.querySelectorAll(".appliance-info"))
      .map(applianceElement => applianceElement.textContent.toLowerCase());
    const recipeUstensilesNames = Array.from(recipeItem.querySelectorAll(".ustensile-info"))
      .map(ustensileElement => ustensileElement.textContent.toLowerCase());

    const hasAllIngredients = ingredientTags.every(tag =>
      recipeIngredientNames.includes(tag)
    );
    const hasAllAppliances = applianceTags.every(tag =>
      recipeApplianceNames.includes(tag)
    );
    const hasAllUstensiles = ustensileTags.every(tag =>
      recipeUstensilesNames.includes(tag)
    );

    // Ajoutez le recipeId une seule fois si l'une des conditions est vraie
    if (hasAllIngredients || hasAllAppliances || hasAllUstensiles) {
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
