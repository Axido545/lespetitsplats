import { updateTagsArray } from "./getvalues.js";
import { filterRecipesByTags, mySearch } from "./boucle-for.js";
import { fetchData, displaySuggestions } from "./suggestions.js";
import { displayDataReciepes } from "../script/index.js";
import { recipes } from "../data/recipes.js";

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
      updateTagsArray();
      const data = await fetchData();
      filterRecipesByTags(data);
      displaySuggestions(data);
    } else {
      const suggest = document.querySelectorAll("suggestion");
      addSuggest(tagText);
      // if ((suggest.textContent = tagText)) {
      //   let img = document.createElement("img");
      //   img.src = "./asset/croix-suggestion.png";
      //   img.alt = "fermer la suggestion";
      //   img.classList.add("close-suggestion");
      //   suggest.appendChild(img);

      // }

      const tag = document.createElement("div");
      tag.className = "tag";
      tag.textContent = tagText;

      // pour supprimer tag
      //Ajoute la x
      const removeButton = document.createElement("i");
      removeButton.className = "fa-solid fa-xmark close-tag";

      // écoute clic x
      removeButton.addEventListener("click", async function (event) {
        event.stopPropagation();
        // console.log("Remove button a ete cliqué:", tagText);
        removeTag(tag.textContent, suggestionActive);
        // updateTagsArray();
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
    // location.reload();
    displayDataReciepes(recipes);
    // Aucun tag restant et aucun texte dans l'input, affiche toutes les recettes
    // const data = await fetchData();
    // displaySuggestions(data);
    // // filterRecipesByTags(data);
    // displayDataReciepes(data);
    // console.log(data);
    // console.log(displayDataReciepes(data));
    // console.log(mySearch(data, inputText));

    // mySearch(data, inputText);
  } else {
    // Des tags restants ou un texte dans l'input, filtre les recettes avec mySearch
    const data = await fetchData();
    const filteredRecipes = filterRecipesByTags(data, inputText);
    // displayDataReciepes(filteredRecipes);
    mySearch(filteredRecipes, inputText);
    displaySuggestions(data);
  }
}

function addSuggest(tagText) {
  const suggest = document.querySelectorAll(".suggestion");

  suggest.forEach((element) => {
    // Access each suggestion element in this loop
    // For example, you can check and add an image for each suggestion

    // Assuming tagText is a variable containing the text you're comparing
    if (element.textContent === tagText) {
      let img = document.createElement("img");
      img.src = "./asset/croix-suggestion.png";
      img.alt = "fermer la suggestion";
      img.classList.add("close-suggestion");
      element.appendChild(img);
    }
  });
}
