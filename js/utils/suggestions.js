import { filterRecipesByTags, mySearch } from "./search.js";
import { allRecipes, updateSuggestions } from "../script/index.js";
import { messageError, myInput } from "./getvalues.js";

export const selectedTags = [];

/**
 * @description
 * @param {*} elements
 * @param {*} containerId
 */

export function displaySuggestions(elements, containerId, inputElement) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";
  const inputValue = inputElement.value.trim().toLowerCase();
  const regex = /^[a-zA-ZÀ-ÖØ-öø-ÿ]+$/;

  if (!regex.test(inputValue) && inputValue) {
    messageError.textContent = "Le champ doit contenir uniquement des lettres.";
  } else {
    messageError.textContent = "";

    // Filtrage les éléments en fonction de la saisie de l'utilisateur
    const autocompletionElements =
      inputValue === ""
        ? elements // affiche toutes suggestion avant de taper une lettre
        : elements.filter((element) =>
            element.toLowerCase().includes(inputValue)
          );

    // Set on suit tt élément
    const displayedSuggestions = new Set();

    autocompletionElements.forEach((element) => {
      //minuscule sans s
      const normalizedElement = element.toLowerCase().replace(/s$/, "");
      if (!displayedSuggestions.has(normalizedElement)) {
        const newSuggestion = document.createElement("li");
        newSuggestion.setAttribute("class", "suggestion");
        newSuggestion.innerText = capitalizeFirstLetter(element);
        if (selectedTags.includes(element)) {
          newSuggestion.classList.add("suggestion-active");
        }
        container.appendChild(newSuggestion);
        newSuggestion.addEventListener("click", () =>
          onSuggestion(newSuggestion)
        );

        // On ajoute la version normalisée (sans "s") à l'ensemble des suggestions déjà affichées
        // pour 1 version de chaque mot (avec et sans s)
        displayedSuggestions.add(normalizedElement);
      }
    });
  }
}

function capitalizeFirstLetter(element) {
  return element.charAt(0).toUpperCase() + element.slice(1);
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
  updateSearchTags();
}

function updateSearchTags() {
  const inputValue = myInput.value.trim().toLowerCase();

  // si il ya des tag recherch basé sur le tag mise a jour des suggestions
  if (selectedTags.length > 0) {
    const filteredRecipes = filterRecipesByTags(allRecipes);
    mySearch(filteredRecipes, inputValue);
    updateSuggestions(mySearch(filteredRecipes, inputValue));
  } else {
    // si pas de tag mise a jour uniquement sur input
    const filteredRecipes = mySearch(allRecipes, inputValue);
    updateSuggestions(filteredRecipes);
  }
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
          updateSearchTags();

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