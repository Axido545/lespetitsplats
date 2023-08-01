import {hello, SearchFor} from "../utils/boucle-for.js"
hello();
SearchFor();


const searchBtn = document.querySelector(".search-btn");
const whiteGlass = document.querySelector(".glass-white")
const blackGlass = document.querySelector(".glass-black")
whiteGlass.style.display ="block"
blackGlass.style.display ="none"

searchBtn.addEventListener("mouseover", function(){
whiteGlass.style.display ="none"
blackGlass.style.display ="block"


})
searchBtn.addEventListener("mouseout", function(){
  whiteGlass.style.display ="block"
  blackGlass.style.display ="none"
  
  
  })

// Fonction pour afficher les recettes dans l'élément avec l'ID "recipeContainer"
 export function displayRecipes() {
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

    const subTitlRecipeRec = document.createElement("h3");
    subTitlRecipeRec.classList.add("reciepe-subtitle", "mb-2"); // Ajout des classes Bootstrap pour la mise en forme
    subTitlRecipeRec.textContent = "RECETTE";
    wrapTextRecipe.appendChild(subTitlRecipeRec);

    const recipeDesc = document.createElement("p");
    recipeDesc.textContent = recipe.description;
    recipeDesc.setAttribute("class","recipe-desc")
    wrapTextRecipe.appendChild(recipeDesc);



    const subTitlRecipeIng = document.createElement("h3");
    subTitlRecipeIng.classList.add("reciepe-subtitle", "mb-2"); // Ajout des classes Bootstrap pour la mise en forme
    subTitlRecipeIng.textContent = "INGREDIENTS";
    wrapTextRecipe.appendChild(subTitlRecipeIng);

    const ingredientsList = document.createElement("section");
    ingredientsList.setAttribute("class","row row-cols-2")
    wrapTextRecipe.appendChild(ingredientsList);

    for (const ingredient of recipe.ingredients) {
      const { ingredient: name, quantity, unit = "" } = ingredient;

      const ingredientBlock = document.createElement("div")
      ingredientBlock.setAttribute("class","col")
      ingredientsList.appendChild(ingredientBlock);


      const ingredientItem = document.createElement("p");
      ingredientItem.setAttribute("class","ingredient-Item-name")
      ingredientItem.textContent = `${name}`;
      ingredientBlock.appendChild(ingredientItem);

      const ingredientSubItem = document.createElement("p")
      ingredientSubItem.setAttribute("class","fw-light")
      ingredientSubItem.textContent = `${quantity} ${unit}`;
      ingredientBlock.appendChild(ingredientSubItem);

    }

    // const servingsParagraph = document.createElement("p");
    // servingsParagraph.textContent = `Servings: ${recipe.servings}`;
    // wrapTextRecipe.appendChild(servingsParagraph);

    const timeParagraph = document.createElement("p");
    timeParagraph.classList.add("reciepe-time");
    timeParagraph.textContent = `${recipe.time} min`;
    wrapTextRecipe.appendChild(timeParagraph);

    // const applianceParagraph = document.createElement("p");
    // applianceParagraph.textContent = `Appareil: ${recipe.appliance}`;
    // wrapTextRecipe.appendChild(applianceParagraph);

    // const ustensilsParagraph = document.createElement("p");
    // ustensilsParagraph.textContent = `Ustensils: ${recipe.ustensils.join(", ")}`;
    // wrapTextRecipe.appendChild(ustensilsParagraph);
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
