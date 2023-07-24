// Fonction pour afficher les recettes dans l'élément avec l'ID "recipeContainer"
function displayRecipes() {

  const recipeContainer = document.getElementById("recipeContainer");
recipeContainer.setAttribute("class","gallery-recipes")

  // Vérification si l'élément "recipeContainer" existe dans la page
  if (!recipeContainer) {
    console.error("L'élément recipeContainer n'existe pas dans la page.");
    return;
  }

  // Parcour toutes les recettes et générer le code HTML pour les afficher
  let recipeHTML = "";
  for (const recipe of recipes) {
    recipeHTML += `



      <article class="recipe-article">
        <img class="img-recette" src="asset/imgs_recettes/${recipe.image}" alt="${recipe.name}" />
        <h2 class="reciepe-name">${recipe.name}</h2>
        <p>Servings: ${recipe.servings}</p>
        <p>Time: ${recipe.time} minutes</p>
        <h3>Ingrédients:</h3>
        <ul>
    `;

    for (const ingredient of recipe.ingredients) {
      const { ingredient: name, quantity, unit = "" } = ingredient;
      recipeHTML += `
        <li>${name}: ${quantity} ${unit}</li>
      `;
    }

    recipeHTML += `
        </ul>
        <p>${recipe.description}</p>
        <p>Appareil: ${recipe.appliance}</p>
        <p>Ustensils: ${recipe.ustensils.join(", ")}</p>
      </article>
    `;
  }

  // Ajout de code HTML généré dans l'élément "recipeContainer"
  recipeContainer.innerHTML = recipeHTML;


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
