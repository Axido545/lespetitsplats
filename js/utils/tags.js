
import { updateTagsArray } from "./getvalues.js";

import { getRecipe } from "../script/index.js";
const myrecipesdata = getRecipe()


export function addTag(tagText) {
  // Vérifier si la suggestion a la classe "suggestion-active"
  const suggestion = document.querySelector(".suggestion-active");
  const tagsContainer = document.getElementById("selected-tags");
  
  if (suggestion) {
 // Vérifier si la suggestion active a déjà un tag associé
 const existingTag = tagsContainer.querySelector(".tag");
 if (existingTag) {

   // Supprimer le tag existant
   removeTag(existingTag);
   updateTagsArray();
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
      removeTag(tag);
      updateTagsArray()
    });
  
// ou ajoute le bouton x au tag
    tag.appendChild(removeButton);
  
    // On récupère l élément on l'on veut que le tag soit
    const tagsContainer = document.getElementById("selected-tags");
    // on ajoute le tag a cet élément
    
    tagsContainer.appendChild(tag);
  }
  }
}
  // Ajoutez une fonction pour supprimer un tag
  function removeTag(tag) {
    // Supprime le tag de l'interface utilisateur
    tag.parentNode.removeChild(tag);
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

