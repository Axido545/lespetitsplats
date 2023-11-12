
export function addTag(tagText) {
    // Ajout un élément de tag
    const tag = document.createElement("div");
    tag.className = "tag";
    tag.textContent = tagText;
  
    // pour supprimer tag 
    //Ajoute la x
    const removeButton = document.createElement("i");
    removeButton.className = "fa-solid fa-xmark close-tag";

    // écoute clic x
    removeButton.addEventListener("click", function () {
//
      removeTag(tag);
    });
  
// ou ajoute le bouton x au tag
    tag.appendChild(removeButton);
  
    // On récupère l élément on l'on veut que le tag soit
    const tagsContainer = document.getElementById("selected-tags");
    // on ajoute le tag a cet élément
    tagsContainer.appendChild(tag);
  }
  
  // Ajoutez une fonction pour supprimer un tag
  function removeTag(tag) {
    // Supprime le tag de l'interface utilisateur
    tag.parentNode.removeChild(tag);
  }