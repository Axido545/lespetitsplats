
import { updateTagsArray } from "./getvalues.js";


export function addTag(tagText) {
  const suggestionActive = document.querySelector(".suggestion-active");
  const tagsContainer = document.getElementById("selected-tags");


  // Vérifie si la suggestion a la classe "suggestion-active"
  if (suggestionActive) {
 
 const existingTag = findTagByName(tagText);

  if (existingTag) {

// Supprime le tag existant
removeTag(existingTag,suggestionActive);
updateTagsArray();

// Retire la class suggestion active de la suggestion
suggestionActive.classList.remove("suggestion-active")

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
    removeButton.addEventListener("click", function () {
            removeTag(tag.textContent, suggestionActive);
      updateTagsArray()

    });
  
// ou ajoute le bouton x au tag
    tag.appendChild(removeButton);
   // on ajoute le tag a cet élément
   tagsContainer.appendChild(tag);
  }
  }
}
// Ajoutez une fonction pour supprimer un tag
export function removeTag(tagText, suggestion) {
  // Trouver et supprimer le tag associé
  const tags = document.querySelectorAll('.tag');
  tags.forEach(tag => {
    if (tag.textContent === tagText) {
      // Vérifier si l'élément tag et son parent existent
      if (tag && tag.parentNode) {
        tag.parentNode.removeChild(tag);
      }
    }
  });

  // Supprime la suggestion-active et l'image si la suggestion est présente
  if (suggestion && suggestion.classList && suggestion.classList.contains("suggestion-active")) {
    suggestion.classList.remove("suggestion-active");
    const existingImage = suggestion.querySelector('.close-suggestion');
    if (existingImage && existingImage.parentNode) {
      existingImage.parentNode.removeChild(existingImage);
    }
  }
}



// Fonction pour vérifier si le tag existe déjà dans le conteneur
function tagExists(tagText) {
  const tagsContainer = document.getElementById("selected-tags");
  const existingTags = tagsContainer.querySelectorAll(".tag");

  // Vérifie si le tag existe déjà
  for (const tag of existingTags) {
    if (tag.textContent === tagText) {
      return true;
    }
  }

  return false;
}


// Fonction pour trouver le tag s'il existe déjà
function findTagByName(tagText) {
  const tagsContainer = document.getElementById("selected-tags");
  const existingTags = tagsContainer.querySelectorAll(".tag");

  // Vérifier si le tag existe déjà
  for (const tag of existingTags) {
    if (tag.textContent === tagText) {
      return tag;
    }
  }

  return null;
}