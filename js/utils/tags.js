import { recipes } from "../data/recipes.js";
import { displayDataReciepes } from "../script/index.js";

// Tableaux pour stocker les tags et les suggestions sélectionnées
const tags = [];
const selectedSuggestions = [];
const uniqueIngredients = [];
const uniqueAppareils = [];
const uniqueUstensiles = [];

// Fonction pour retirer les pluriels si une forme singulière existe
export function removePluralIfSingularExists(ingredients, appareils, ustensiles) {
  uniqueIngredients.length = 0;
  uniqueAppareils.length = 0;
  uniqueUstensiles.length = 0;

  ingredients.forEach(ingredient => {
    const ingredientLowerCase = ingredient.toLowerCase().trim();
    const singularFormIngredient = ingredientLowerCase.endsWith('s')
      ? ingredientLowerCase.slice(0, -1) // Retire le "s" final
      : ingredientLowerCase;

    // Vérifie si la forme singulière existe déjà dans le tableau 
    if (!uniqueIngredients.includes(singularFormIngredient)) {
      uniqueIngredients.push(singularFormIngredient);
    }

  });
      appareils.forEach(appareil => {
        const appareilLowerCase = appareil.toLowerCase().trim();
        const singularFormAppareil = appareilLowerCase.endsWith('s')
          ? appareilLowerCase.slice(0, -1) // Retire le "s" final
          : appareilLowerCase;
    
          if (!uniqueAppareils.includes(singularFormAppareil)) {
            uniqueAppareils.push(singularFormAppareil);
          }
        });


          ustensiles.forEach(ustensil => {
            const ustensilLowerCase = ustensil.toLowerCase().trim();
            const singularFormUstensil = ustensilLowerCase.endsWith('s')
              ? ustensilLowerCase.slice(0, -1) // Retire le "s" final
              : ustensilLowerCase;
      

  if (!uniqueUstensiles.includes(singularFormUstensil)) {
    uniqueUstensiles.push(singularFormUstensil);
  }
});
  return uniqueIngredients;
}

export function displaySuggestions() {
  // Sélection de tous les éléments 
  const ingredientsElements = document.querySelectorAll(".ingredient-Item-name");
  const appareilsElements = document.querySelectorAll(".appliance-info");
  const istensilesElements = document.querySelectorAll(".ustensile-info");


  // Mise en place d'un tableau pour stocker les éléments uniques
  const ingredients = [];
  const appareils = [];
  const ustensiles = [];



  // Parcourir les éléments et les filtrer
  ingredientsElements.forEach(element => {
    const ingredient = element.textContent.toLowerCase().trim();
    ingredients.push(ingredient);
  });
  appareilsElements.forEach(element => {
    const appareil = element.textContent.toLowerCase().trim();
    appareils.push(appareil);
  });
  istensilesElements.forEach(element => {
    const ustensile = element.textContent.toLowerCase().trim();
    ustensiles.push(ustensile);
  });

  // Mise a jour des suggestions unique
  removePluralIfSingularExists(ingredients,appareils,ustensiles); 

  // Liste HTML avec les éléments filtrés
  const suggestionsHTMLingredient =
  
  uniqueIngredients.map(ingredient => `
    <li class="suggestion" data-ingredient="${ingredient}">${ingredient}</li>
  `).join("");

  const suggestionsHTMLappareil =

  uniqueAppareils.map(appareil => `
    <li class="suggestion" data-ingredient="${appareil}">${appareil}</li>
  `).join("");

  // const suggestionsHTMLustensile =
  uniqueUstensiles.map(ustensile => `
    <li class="suggestion" data-ingredient="${ustensile}">${ustensile}</li>
  `).join("");

  const suggestionsHTMLustensile = uniqueUstensiles.map(ustensile =>
    ustensile.split(',').map(item => item.trim()))
  .map(ustensilList => ustensilList.map(item => `
  <li class="suggestion" data-ingredient="${item}">${item}</li>
  `).join(""));
  


  // Insertion de la liste dans un élément HTML 
  const suggestionsContainerIngredient = document.querySelector(".suggestions-ingredients");
  suggestionsContainerIngredient.innerHTML = `<ul>${suggestionsHTMLingredient}</ul>`;

  const suggestionsContainerAppareil = document.querySelector(".suggestions-appareils");
  suggestionsContainerAppareil.innerHTML = `<ul>${suggestionsHTMLappareil}</ul>`;

  const suggestionsContainerUstensile = document.querySelector(".suggestions-ustensiles");
  suggestionsContainerUstensile.innerHTML = `<ul>${suggestionsHTMLustensile}</ul>`;


  // Ajout du gestionnaire d'événement pour l'autocomplétion
  const inputSuggestion = document.getElementById("ingredientSearch");
  inputSuggestion.addEventListener("input", function () {
    const searchTerm = inputSuggestion.value.toLowerCase().trim();
    const filteredIngredients = uniqueIngredients.filter(ingredient =>
      ingredient.includes(searchTerm)
    );

    // Affiche les ingrédients filtrés en tant qu'autocomplétion
    updateSuggestionsList(filteredIngredients);
  });
}

export function createTag(tagText) {
  const tagElement = document.createElement('div');
  tagElement.className = 'tag';

  const tagTextElement = document.createElement('span');
  tagTextElement.setAttribute("class", "tag-name");
  tagTextElement.textContent = tagText;

  // Ajout du texte au tag
  tagElement.appendChild(tagTextElement);

  const tagContainer = document.querySelector(".selected-tags");

  // Ajout de tag au conteneur de tags
  tagContainer.appendChild(tagElement);

  const closeTag = document.createElement('i');
  closeTag.setAttribute("class", "fa-solid fa-xmark close-tag");
  tagElement.appendChild(closeTag);

  // Ajout du tag au tableau de tags
  tags.push(tagText);

  closeTag.addEventListener('click', function () {
    // Supprimez le tag du tableau de tags
    const index = tags.indexOf(tagText);
    if (index !== -1) {
      tags.splice(index, 1);
    }

    // Suppression du tag visuellement
    tagContainer.removeChild(tagElement);

    // Retirez l'ingrédient des suggestions sélectionnées
    const selectedIdx = selectedSuggestions.indexOf(tagText);
    if (selectedIdx !== -1) {
      selectedSuggestions.splice(selectedIdx, 1);
    }

    // Mise à jour la liste des suggestions visibles
    updateSuggestionsList(uniqueIngredients.filter(ingredient =>
      !selectedSuggestions.includes(ingredient)
    ));
  });
}

export function newTags() {
  const suggestions = document.querySelectorAll(".suggestion");

  suggestions.forEach(function (suggestion) {
    suggestion.addEventListener('click', function () {
      console.log("je clic sur une suggestion")
      // Récupération de la valeur de l'attribut "data-ingredient"
      const ingredientName = suggestion.getAttribute("data-ingredient");

      // Vérifiez si l'ingrédient est déjà sélectionné
      if (!selectedSuggestions.includes(ingredientName)) {
        createTag(ingredientName);

        // Ajoutez l'ingrédient aux suggestions sélectionnées
        selectedSuggestions.push(ingredientName);

        // Mise à jour de la liste des suggestions visibles
        updateSuggestionsList(uniqueIngredients.filter(ingredient =>
          !selectedSuggestions.includes(ingredient)
        ));
      }
    });
  });
}

function updateSuggestionsList(updatedSuggestions) {
  const autocompleteList = document.querySelector(".all-suggestions");
  autocompleteList.innerHTML = "";

  updatedSuggestions.forEach(ingredient => {
    const listItem = document.createElement("li");
    listItem.textContent = ingredient;
    listItem.classList.add("suggestion");
    listItem.dataset.ingredient = ingredient;
    autocompleteList.appendChild(listItem);

    listItem.addEventListener('click', function () {
      const ingredientName = listItem.getAttribute("data-ingredient");

      // Vérifiez si l'ingrédient est déjà sélectionné
      if (!selectedSuggestions.includes(ingredientName)) {
        createTag(ingredientName);

        // Ajoutez l'ingrédient aux suggestions sélectionnées
        selectedSuggestions.push(ingredientName);

        // Mise à jour de la liste des suggestions visibles
        updateSuggestionsList(updatedSuggestions.filter(ingredient =>
          !selectedSuggestions.includes(ingredient)
        ));
      }
    });
  });
}

// Appel initial pour afficher les suggestions
// displaySuggestions();

// // Fonction pour filtrer les recettes en fonction des tags
// export function filterRecipesByTags(selectedTags, recipes) {
//   return recipes.filter(recipe => {
//     // Vérifie si la recette contient tous les tags sélectionnés
//     return selectedTags.every(tag => recipe.ingredients.includes(tag));
//   });
// }

// // Cette fonction mettra à jour l'affichage des recettes filtrées
// export function updateFilteredRecipes() {
//   const selectedTags = tags; // Récupérez les tags sélectionnés depuis votre tableau tags
//   console.log(selectedTags)

//   // Filtrer les recettes en fonction des tags sélectionnés
//   const filteredRecipes = filterRecipesByTags(selectedTags, recipes);

//   // Mettez à jour l'affichage des recettes
//   displayDataReciepes(filteredRecipes); // Utilisez votre fonction pour afficher les recettes
// }

// Appel initial pour afficher les recettes non filtrées