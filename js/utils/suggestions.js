// variable globale qui récup tous (ingredient/ustensils/appareils) selectionnés ss forme tableau
const selectedTags = [];

/**
 * @description permet d'afficher les ingredients, ustensils et appareils
 * @param {*} elements // Listes d'éléments à afficher en tant que suggestion
 * @param {*} containerId // l'id de la div ou s'affiche chaque suggestion
 */

export function displaySuggestions(elements, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";

  elements.forEach((element) => {
    const newSuggestion = document.createElement("li");
    newSuggestion.setAttribute("class", "suggestion");
    newSuggestion.innerText = element;

    if (selectedTags.includes(element)) {
      newSuggestion.classList.add("suggestion-active");
    }
    container.appendChild(newSuggestion);
  });
}

export function afficheListeSuggestions(elements, containerId) {
  const container = document.getElementById(containerId);

  container.innerHTML = "";

  elements.forEach(async (element) => {
    const newSuggestion = document.createElement("li");
    newSuggestion.setAttribute("class", "suggestion");
    newSuggestion.innerHTML = element;

    newSuggestion.addEventListener("click", function (event) {
      event.stopPropagation();
      newSuggestion.classList.add("suggestion-active");
      const existingImage = newSuggestion.querySelector("img");
      if (!existingImage) {
        console.log(newSuggestion.textContent);
        let img = document.createElement("img");
        img.src = "./asset/croix-suggestion.png";
        img.alt = "fermer la suggestion";
        img.classList.add("close-suggestion");
        newSuggestion.appendChild(img);
        addTag(element);
        // // addTag(element);
        updateTagsArray();
        // const data = await fetchData();
        filterRecipesByTags(recipes);
        displaySuggestions(recipes);
      } else {
        //   DeletTag(element);
        addTag(element);
        updateTagsArray();
        // const data = await fetchData();
        filterRecipesByTags(recipes);
        displaySuggestions(recipes);
      }

      // addTag(element);
      // updateTagsArray();
      // // const data = await fetchData();
      // filterRecipesByTags(recipes);
      // displaySuggestions(recipes);
    });

    // container.appendChild(newSuggestion);
  });
}
