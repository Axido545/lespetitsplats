export function displaySuggestions() {
  // Sélection tous les éléments avec la classe "ingredient-Item-name"
  const ingredientsElements = document.querySelectorAll(".ingredient-Item-name");

  // Créez un tableau pour stocker les ingrédients uniques
  const uniqueIngredients = [];

  // Parcourez les éléments et filtrez les ingrédients
  ingredientsElements.forEach(element => {
    const ingredient = element.textContent.toLowerCase().trim();
    const singularIngredient = removePlural(ingredient); // Fonction pour retirer les pluriels
    if (!uniqueIngredients.includes(singularIngredient)) {
      uniqueIngredients.push(singularIngredient);
    }
  });

  // On retire les pluriels
  function removePlural(ingredient) {
    // Vous pouvez implémenter votre propre logique pour retirer les pluriels ici
    // Par exemple, vous pouvez utiliser des expressions régulières
    // Pour cet exemple, nous supposons que les pluriels se terminent par "s"
    if (ingredient.endsWith("s")) {
      return ingredient.slice(0, -1); // Retirer le "s" final
    }
    return ingredient;
  }

  // liste HTML avec les ingrédients filtrés
  const suggestionsHTML = uniqueIngredients.map(ingredient => `
    <li class="suggestion" data-ingredient="${ingredient}">${ingredient}</li>
  `).join("");

  // Insétion la liste dans un élément HTML de votre choix (par exemple, un élément avec l'id "suggestions-container")
  const suggestionsContainer = document.querySelector(".all-suggestions");
  suggestionsContainer.innerHTML = `<ul>${suggestionsHTML}</ul>`;


//auto completion
  // Ajout du gestionnaire d'événement pour l'autocomplétion
  const inputSuggestion = document.getElementById("ingredientSearch");
  inputSuggestion.addEventListener("input", function() {
    const searchTerm = inputSuggestion.value.toLowerCase().trim();
    const filteredIngredients = uniqueIngredients.filter(ingredient =>
      ingredient.includes(searchTerm)
    );

    // Affichez les ingrédients filtrés en tant qu'autocomplétion
    const autocompleteList = document.querySelector(".all-suggestions");
    autocompleteList.innerHTML = "";

    filteredIngredients.forEach(ingredient => {
      const listItem = document.createElement("li");
      listItem.textContent = ingredient;
      listItem.classList.add("suggestion");
      listItem.dataset.ingredient = ingredient;
      autocompleteList.appendChild(listItem);
    });
  });
}
