// import {
//   updateTagsArray,
//   inputValue,
//   ingredientSearch,
//   tagsContainer,
//   suggestionActive,
// } from "./getvalues.js";
// import { filterRecipesByTags, mySearch } from "./boucle-for.js";
// import { fetchData, displaySuggestions } from "./suggestions.js";

// export async function addTag(tagText) {
//   const suggestionActive = document.querySelector(".suggestion-active");

//   if (suggestionActive) {
//     const existingTags = updateTagsArray();

//     if (existingTags.includes(tagText)) {
//       // Supprime le tag existant
//       removeTag(tagText, suggestionActive);
//       updateTagsArray();
//       // const data = await fetchData();
//       // filterRecipesByTags(data);
//       // displaySuggestions(data);
//     }
//   } else {
//     // Ajoute tag
//     const tag = document.createElement("div");
//     tag.className = "tag";
//     tag.textContent = tagText;
//     //Ajoute la x
//     const removeButton = document.createElement("i");
//     removeButton.className = "fa-solid fa-xmark close-tag";
//     // ou ajoute le bouton x au tag
//     tag.appendChild(removeButton);
//     // on ajoute le tag a cet élément
//     tagsContainer.appendChild(tag);

//     removeButton.addEventListener("click", function () {
//       removeTag(tagText, suggestionActive);
//     });
//   }
// }

// export async function removeTag(tagText, suggestionActive) {
//   const suggestionActives = document.querySelector(".suggestion-active");

//   console.log(suggestionActives.textContent);
//   const tags = document.querySelectorAll(".tag");
//   // recup element
//   tags.forEach((tag) => {
//     if (tag.textContent === tagText) {
//       // Vérifie si l'élément tag et son parent existent
//       if (tag && tag.parentNode) {
//         tag.parentNode.removeChild(tag);
//       }
//     }
//   });

//   // Supprime la suggestion-active et l'image si la suggestion est présente
//   if (
//     suggestionActive &&
//     suggestionActive.classList &&
//     suggestionActive.classList.contains("suggestion-active")
//   ) {
//     suggestionActive.classList.remove("suggestion-active");
//     const existingImage = suggestionActive.querySelector(".close-suggestion");
//     if (existingImage && existingImage.parentNode) {
//       existingImage.parentNode.removeChild(existingImage);
//     }
//   }
//   // // Supprime la suggestion-active et l'image si la suggestion est présente
//   // if (
//   //   // suggestion
//   //   // suggestion.classList &&
//   //   suggestion.classList.contains("suggestion-active")
//   // ) {
//   //   suggestion.classList.remove("suggestion-active");
//   //   const existingImage = suggestion.querySelector(".close-suggestion");
//   //   if (existingImage && existingImage.parentNode) {
//   //     existingImage.parentNode.removeChild(existingImage);
//   //   }
//   // }

//   // vérifif pour afficher toutes les recettes si aucun tag et aucun texte dans l'input

//   // const remainingTags = tagsContainer.querySelectorAll(".tag");
//   // if (remainingTags.length === 0 && ingredientSearch.value.trim() === "") {
//   // Aucun tag restant et aucun texte dans l'input, affiche toutes les recettes
//   // const data = await fetchData();
//   // displaySuggestions(data);
//   // filterRecipesByTags(data);
//   // mySearch(data, inputValue);
//   // }
// }

import { updateTagsArray } from "./getvalues.js";
import { filterRecipesByTags, mySearch } from "./boucle-for.js";
import { fetchData, displaySuggestions } from "./suggestions.js";
import { displayDataReciepes } from "../script/index.js";

export async function addTag(tagText) {
  const suggestionActive = document.querySelector(".suggestion-active");
  const tagsContainer = document.getElementById("selected-tags");

  // Vérifie si la suggestion a la classe "suggestion-active"
  if (suggestionActive) {
    //  const existingTag = findTagByName(tagText);
    const existingTags = updateTagsArray();

    if (existingTags.includes(tagText)) {
      // Supprime le tag existant
      removeTag(tagText, suggestionActive);
      // updateTagsArray();
      // const data = await fetchData();
      // filterRecipesByTags(data);
      // displaySuggestions(data);
    } else {
      // Ajouter un élément de tag
      const tag = document.createElement("div");
      tag.className = "tag";
      tag.textContent = tagText;

      // pour supprimer tag
      //Ajoute la x
      const removeButton = document.createElement("i");
      removeButton.className = "fa-solid fa-xmark close-tag";

      // écoute clic x
      removeButton.addEventListener("click", async function () {
        removeTag(tag.textContent, suggestionActive);
        // updateTagsArray();
        const data = await fetchData();
        filterRecipesByTags(data);
        displaySuggestions(data);
        const inputSearch = document.getElementById("searchInput");
        const inputText = inputSearch.value.trim().toLowerCase();

        inputText = document
          .getElementById("searchInput")
          .value.trim()
          .toLowerCase();
        mySearch(data, inputText);
      });

      // ou ajoute le bouton x au tag
      tag.appendChild(removeButton);
      // on ajoute le tag a cet élément
      tagsContainer.appendChild(tag);
    }
  }
}

export async function removeTag(tagText, suggestion) {
  // recup element
  const tags = document.querySelectorAll(".tag");
  tags.forEach((tag) => {
    if (tag.textContent === tagText) {
      // Vérifie si l'élément tag et son parent existent
      if (tag && tag.parentNode) {
        tag.parentNode.removeChild(tag);
      }
    }
  });

  // Supprime la suggestion-active et l'image si la suggestion est présente
  if (
    suggestion &&
    suggestion.classList &&
    suggestion.classList.contains("suggestion-active")
  ) {
    suggestion.classList.remove("suggestion-active");
    const existingImage = suggestion.querySelector(".close-suggestion");
    if (existingImage && existingImage.parentNode) {
      existingImage.parentNode.removeChild(existingImage);
    }
  }

  const tagsContainer = document.getElementById("selected-tags");
  const inputSearch = document.getElementById("searchInput");

  const remainingTags = tagsContainer.querySelectorAll(".tag");
  const inputText = inputSearch.value.trim().toLowerCase();

  if (remainingTags.length === 0 && inputText === "") {
    // Aucun tag restant et aucun texte dans l'input, affiche toutes les recettes
    const data = await fetchData();
    displaySuggestions(data);
    filterRecipesByTags(data);
    displayDataReciepes(data);
  } else {
    // Des tags restants ou un texte dans l'input, filtre les recettes avec mySearch
    const data = await fetchData();
    const filteredRecipes = mySearch(data, inputText);
    displayDataReciepes(filteredRecipes);
  }
}
