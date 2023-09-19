

// Fonction pour retirer les pluriels si une forme singulière existe
function removePluralIfSingularExists(ingredients) {
  const uniqueIngredients = [];

  ingredients.forEach(ingredient => {
    const ingredientLowerCase = ingredient.toLowerCase().trim();
    const singularForm = ingredientLowerCase.endsWith('s')
      ? ingredientLowerCase.slice(0, -1) // Retire le "s" final
      : ingredientLowerCase;

          // Vérifie si la forme singulière existe déjà dans le tableau uniqueIngredients
    if (!uniqueIngredients.includes(singularForm)) {
      uniqueIngredients.push(singularForm);
    }
  });

  return uniqueIngredients;
}



export function displaySuggestions() {
  // Sélection tous les éléments avec la classe "ingredient-Item-name"
  const ingredientsElements = document.querySelectorAll(".ingredient-Item-name");

  // Créez un tableau pour stocker les ingrédients uniques
  const ingredients  = [];

  // Parcourez les éléments et filtrez les ingrédients
  ingredientsElements.forEach(element => {
    const ingredient = element.textContent.toLowerCase().trim();
    ingredients.push(ingredient);
  });

  const uniqueIngredients = removePluralIfSingularExists(ingredients);

  // liste HTML avec les ingrédients filtrerés
  const suggestionsHTML = uniqueIngredients.map(ingredient => `
    <li class="suggestion" data-ingredient="${ingredient}">${ingredient}</li>
  `).join("");

  // Insétion la liste dans un élément HTML 
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

// Réinitialise les valeurs des champs d'entrée lors du chargement de la page
window.addEventListener("load", function() {
  const inputSuggestion = document.getElementById("ingredientSearch");

  inputSuggestion.value = ''; // Réinitialise la valeur du champ de recherche principal
  
  });