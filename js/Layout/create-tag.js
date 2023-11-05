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

    // // Mise à jour la liste des suggestions visibles
    // updateSuggestionsList(uniqueIngredients.filter(ingredient =>
    //   !selectedSuggestions.includes(ingredient)
    // ));
  });
}