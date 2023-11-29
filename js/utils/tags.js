import { updateTagsArray } from "./getvalues.js";
import { filterRecipesByTags, mySearch } from "./boucle-for.js";
import { fetchData, displaySuggestions } from "./suggestions.js";
import {
  displayDataReciepes,
  allRecipes,
  getRecipe,
  init,
} from "../script/index.js";
import { recipes } from "../data/recipes.js";

export async function addTag(tagText) {
  const suggestionActive = document.querySelector(".suggestion-active");
  const tagsContainer = document.getElementById("selected-tags");

  // Vérifie si la suggestion a la classe "suggestion-active"
  if (suggestionActive) {
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
        removeTag(tag.textContent, suggestionActive);
      });

      // ou ajoute le bouton x au tag
      tag.appendChild(removeButton);
      // on ajoute le tag a cet élément
      tagsContainer.appendChild(tag);
    }
  }
}

export async function removeTag(tagText, suggestion) {
  const tags = document.querySelectorAll(".tag");
  tags.forEach((tag) => {
    if (tag.textContent === tagText) {
      if (tag && tag.parentNode) {
        tag.parentNode.removeChild(tag);
      }
    }
  });

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
    location.reload();
  } else {
    mySearch(recipes, inputText);
    displaySuggestions(recipes);
    filterRecipesByTags(recipes);

    // displayDataReciepes(recipes);
  }
}

function addSuggest(tagText) {
  const suggest = document.querySelectorAll(".suggestion");

  suggest.forEach((element) => {
    if (element.textContent === tagText) {
      let img = document.createElement("img");
      img.src = "./asset/croix-suggestion.png";
      img.alt = "fermer la suggestion";
      img.classList.add("close-suggestion");
      element.appendChild(img);
    }
  });
}
