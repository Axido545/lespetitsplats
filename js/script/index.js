

// Fonction pour afficher les recettes dans l'élément avec l'ID "recipeContainer"
function displayRecipes() {
  const recipeContainer = document.getElementById("recipeContainer");
  recipeContainer.classList.add("gallery-recipes");

  // Vérification si l'élément "recipeContainer" existe dans la page
  if (!recipeContainer) {
    console.error("L'élément recipeContainer n'existe pas dans la page.");
    return;
  }

  for (let recipe of recipes) {
    const articleRecipe = document.createElement('article');
    articleRecipe.classList.add("recipe-article", "position-relative", "col-4"); // Ajout des classes Bootstrap pour la mise en forme
    recipeContainer.appendChild(articleRecipe);

    const imgRecipe = document.createElement("img");
    imgRecipe.classList.add("img-recette", "img-fluid"); // Ajout des classes Bootstrap pour la mise en forme
    imgRecipe.setAttribute("src", `asset/imgs_recettes/${recipe.image}`);
    imgRecipe.setAttribute("alt", recipe.name);
    articleRecipe.appendChild(imgRecipe);

    const wrapTextRecipe = document.createElement("section");
    wrapTextRecipe.classList.add("text-container", "p-3"); // Ajout des classes Bootstrap pour la mise en forme
    articleRecipe.appendChild(wrapTextRecipe);

    const titleRecipe = document.createElement("h2");
    titleRecipe.classList.add("reciepe-name", "mb-3"); // Ajout des classes Bootstrap pour la mise en forme
    titleRecipe.textContent = recipe.name;
    wrapTextRecipe.appendChild(titleRecipe);

    const subTitlRecipeIng = document.createElement("h3");
    subTitlRecipeIng.classList.add("reciepe-subtitle", "mb-2"); // Ajout des classes Bootstrap pour la mise en forme
    subTitlRecipeIng.textContent = "INGREDIENTS";
    wrapTextRecipe.appendChild(subTitlRecipeIng);

    const recipeDesc = document.createElement("p");
    recipeDesc.textContent = recipe.description;
    wrapTextRecipe.appendChild(recipeDesc);

    const ingredientsList = document.createElement("ul");
    wrapTextRecipe.appendChild(ingredientsList);

    for (const ingredient of recipe.ingredients) {
      const { ingredient: name, quantity, unit = "" } = ingredient;
      const ingredientItem = document.createElement("li");
      ingredientItem.textContent = `${name}: ${quantity} ${unit}`;
      ingredientsList.appendChild(ingredientItem);
    }

    const servingsParagraph = document.createElement("p");
    servingsParagraph.textContent = `Servings: ${recipe.servings}`;
    wrapTextRecipe.appendChild(servingsParagraph);

    const timeParagraph = document.createElement("p");
    timeParagraph.classList.add("reciepe-time");
    timeParagraph.textContent = `${recipe.time} min`;
    wrapTextRecipe.appendChild(timeParagraph);

    const applianceParagraph = document.createElement("p");
    applianceParagraph.textContent = `Appareil: ${recipe.appliance}`;
    wrapTextRecipe.appendChild(applianceParagraph);

    const ustensilsParagraph = document.createElement("p");
    ustensilsParagraph.textContent = `Ustensils: ${recipe.ustensils.join(", ")}`;
    wrapTextRecipe.appendChild(ustensilsParagraph);
  }

  // Calcule du nombre de recettes
  const numberOfRecipes = recipes.length;

  // Affichage le nombre de recettes dans un élément HTML avec l'ID "recipeCount"
  const recipeCountElement = document.getElementById("recipeCount");
  if (recipeCountElement) {
    recipeCountElement.textContent = `${numberOfRecipes} recettes`;
  }
}

// Appeler la fonction pour afficher les recettes lorsque la page est chargée
window.onload = displayRecipes;
