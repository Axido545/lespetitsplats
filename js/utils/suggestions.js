import { filterRecipesByTags, mySearch } from "./boucle-for.js";
import { recipes } from "../data/recipes.js";
import {
  allRecipes,
  numberOfRecipes,
  updateSuggestions,
} from "../script/index.js";

// stock tous (ingredient/ustensils/appareils) selectionnés ss forme tableau
export const selectedTags = [];
export const selectedIngredients = [];
export const selectedUstensils = [];
export const selectedAppareils = [];

/**
 * @description permet d'afficher les ingredients, ustensils et appareils
 * @param {*} elements // Listes d'éléments à afficher en tant que suggestion
 * @param {*} containerId // l'id de la div ou s'affiche chaque suggestion
 */

export function displaySuggestions(
  elements,
  containerId,
  inputElement,
  elementType
) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";
  const inputValue = inputElement.value.trim().toLowerCase();
  // Filtrage les éléments en fonction de la saisie de l'utilisateur
  const autocompletionElements =
    inputValue === ""
      ? elements // affiche toutes suggestion avant de taper une lettre
      : elements.filter((element) =>
          element.toLowerCase().includes(inputValue)
        );

  autocompletionElements.forEach((element) => {
    const newSuggestion = document.createElement("li");
    newSuggestion.setAttribute("class", "suggestion");
    newSuggestion.setAttribute("data-type", elementType);
    newSuggestion.innerText = element;
    if (selectedTags.includes(element)) {
      newSuggestion.classList.add("suggestion-active");
    }
    container.appendChild(newSuggestion);
    newSuggestion.addEventListener("click", () =>
      onSuggestion(newSuggestion, elementType)
    );
  });
}

/**
 * @description Ajout/Suppr Tag/suggestion-active | click>>suggestion
 * @param {*} newSuggestion // Listes d'éléments à afficher en tant que suggestion
 */

function onSuggestion(newSuggestion, elementType) {
  const isSelected = selectedTags.findIndex(
    (selectedTag) => selectedTag === newSuggestion.innerText
  );

  if (isSelected > -1) {
    newSuggestion.classList.remove("suggestion-active");
    selectedTags.splice(isSelected, 1);
    if (elementType === "ingredient") {
      const index = selectedIngredients.indexOf(newSuggestion.innerText);
      if (index > -1) {
        selectedIngredients.splice(index, 1);
      }
    }
    if (elementType === "appareil") {
      const index = selectedAppareils.indexOf(newSuggestion.innerText);
      if (index > -1) {
        selectedAppareils.splice(index, 1);
      }
    }
    if (elementType === "ustensil") {
      const index = selectedUstensils.indexOf(newSuggestion.innerText);
      if (index > -1) {
        selectedUstensils.splice(index, 1);
      }
    }
    console.log(selectedIngredients);
    console.log(selectedAppareils);
    console.log(selectedUstensils);
  } else {
    newSuggestion.classList.add("suggestion-active");
    selectedTags.push(newSuggestion.innerText);

    if (elementType === "ingredient") {
      selectedIngredients.push(newSuggestion.innerText);
    }
    if (elementType === "appareil") {
      selectedAppareils.push(newSuggestion.innerText);
    }
    if (elementType === "ustensil") {
      selectedUstensils.push(newSuggestion.innerText);
    }

    console.log(selectedIngredients);
    console.log(selectedAppareils);
    console.log(selectedUstensils);
  }
  displayTags(newSuggestion.innerText);
  const inputValue = document
    .getElementById("searchInput")
    .value.trim()
    .toLowerCase();
}

/**
 * @description pour retirer les doublons
 * @param {*} suggestions
 * @returns
 */
export function filterSuggestions(suggestions) {
  return [...new Set(suggestions)];
}

/**
 * @description affichage des tags
 *  @param {*} tagText // le tag selectionné
 */
function displayTags(tagText) {
  const tagsContainer = document.querySelector("#selected-tags");
  tagsContainer.innerHTML = "";
  // on parcours ts les tags affichés
  for (let i = 0; i < selectedTags.length; i++) {
    const selectedTag = selectedTags[i];

    // Pour chaque tag selectionné on l'affiche avec le btnX
    const tag = document.createElement("div");
    tag.className = "tag";
    tag.textContent = selectedTag;
    const btnX = document.createElement("i");
    btnX.className = "fa-solid fa-xmark close-tag";

    //Action suppr Tag
    btnX.addEventListener(
      "click",
      ((btnX_TagText) => {
        return () => {
          // on recupp l'index du tag cliqué
          const btnX_TagIndex = selectedTags.indexOf(btnX_TagText);
          // S'il existe on le suppr et on affiche les tags
          if (btnX_TagIndex > -1) {
            selectedTags.splice(btnX_TagIndex, 1);

            const suggestions = document.querySelectorAll(".suggestion");
            suggestions.forEach((suggestion) => {
              const type = suggestion.getAttribute("data-type");
              if (type === "ingredient") {
                const index = selectedIngredients.indexOf(btnX_TagText);
                if (index > -1) {
                  selectedIngredients.splice(index, 1);
                }
              }
              if (type === "appareil") {
                const index = selectedAppareils.indexOf(btnX_TagText);
                if (index > -1) {
                  selectedAppareils.splice(index, 1);
                }
              }
              if (type === "ustensil") {
                const index = selectedUstensils.indexOf(btnX_TagText);
                if (index > -1) {
                  selectedUstensils.splice(index, 1);
                }
              }

              console.log(selectedIngredients);
              console.log(selectedAppareils);
              console.log(selectedUstensils);
            });

            displayTags(tagText);
          }
          const input = document
            .getElementById("searchInput")
            .value.trim()
            .toLowerCase();

          filterRecipesByTags(allRecipes);
          // updateSuggestions(allRecipes);
          const filterRecipes = filterRecipesByTags(allRecipes);
          mySearch(filterRecipes, input);
          numberOfRecipes(filterRecipes.length);
          //On desactive la classe suggestion active qui correspond à ce tag
          const suggestions = document.querySelectorAll(".suggestion");
          suggestions.forEach((suggestion) => {
            if (suggestion.innerText === btnX_TagText) {
              suggestion.classList.remove("suggestion-active");
            }
          });
        };
      })(selectedTag)
    );
    tag.appendChild(btnX);
    tagsContainer.appendChild(tag);
  }
}
