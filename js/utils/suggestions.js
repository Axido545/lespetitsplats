import { filterRecipesByTags, mySearch } from "./boucle-for.js";
import { recipes } from "../data/recipes.js";
import { allRecipes, updateSuggestions } from "../script/index.js";
// variable globale qui récup tous (ingredient/ustensils/appareils) selectionnés ss forme tableau
const selectedTags = [];

/**
 * @description permet d'afficher les ingredients, ustensils et appareils
 * @param {*} elements // Listes d'éléments à afficher en tant que suggestion
 * @param {*} containerId // l'id de la div ou s'affiche chaque suggestion
 */

export function displaySuggestions(elements, containerId, inputElement) {
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
    newSuggestion.innerText = element;

    if (selectedTags.includes(element)) {
      newSuggestion.classList.add("suggestion-active");
    }
    container.appendChild(newSuggestion);
    newSuggestion.addEventListener("click", () => onSuggestion(newSuggestion));
  });
}

/**
 * @description Ajout/Suppr Tag/suggestion-active | click>>suggestion
 * @param {*} newSuggestion // Listes d'éléments à afficher en tant que suggestion
 */

function onSuggestion(newSuggestion) {
  const isSelected = selectedTags.findIndex(
    (selectedTag) => selectedTag === newSuggestion.innerText
  );

  if (isSelected > -1) {
    newSuggestion.classList.remove("suggestion-active");
    selectedTags.splice(isSelected, 1);
  } else {
    newSuggestion.classList.add("suggestion-active");
    selectedTags.push(newSuggestion.innerText);
  }
  displayTags(newSuggestion.innerText);
  const inputValue = document
    .getElementById("searchInput")
    .value.trim()
    .toLowerCase();
  mySearch(allRecipes, inputValue);
  const filteredRecipes = mySearch(allRecipes, inputValue);
  const filteredRecipes2 = filterRecipesByTags(allRecipes);

  console.log(filteredRecipes2);
  filterRecipesByTags(allRecipes);
  updateSuggestions(filteredRecipes2);
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
            displayTags(tagText);
          }
          const input = document
            .getElementById("searchInput")
            .value.trim()
            .toLowerCase();

          mySearch(allRecipes, input);
          filterRecipesByTags(allRecipes);
          updateSuggestions(allRecipes);

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
