import { searchRecipes, displayFilteredRecipes } from '../utils/filtre.js';
import {recipes}  from '../data/recipes.js';


/// Fonction pour afficher les recettes dans l'élément avec l'ID "recipeContainer"
export function displayRecipes() {
  const recipeContainer = document.getElementById("recipeContainer");
  recipeContainer.classList.add("gallery-recipes");

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

      if(quantity) {
        const ingredientSubItem = document.createElement("p")
        ingredientSubItem.setAttribute("class","fw-light")
        ingredientSubItem.textContent = `${quantity} ${unit}`;
        ingredientBlock.appendChild(ingredientSubItem);
      }
    }
    const timeParagraph = document.createElement("p");
    timeParagraph.classList.add("reciepe-time");
    timeParagraph.textContent = `${recipe.time} min`;
    wrapTextRecipe.appendChild(timeParagraph);
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
displayRecipes();

const searchBtn = document.querySelector(".search-btn");
const whiteGlass = document.querySelector(".glass-white")
const blackGlass = document.querySelector(".glass-black")
whiteGlass.style.display ="block"
blackGlass.style.display ="none"

searchBtn.addEventListener("mouseover", function(event){
  event.preventDefault(); // Empêche le rafraîchissement de la page
whiteGlass.style.display ="none"
blackGlass.style.display ="block"
})

searchBtn.addEventListener("mouseout", function(event){
  event.preventDefault(); // Empêche le rafraîchissement de la page
  whiteGlass.style.display ="block"
  blackGlass.style.display ="none"
  })


// Gestionnaire d'événement pour le champ de recherche en temps réel
document.getElementById('searchInput').addEventListener('change', function (event) {
  event.preventDefault(); // Empêche le rafraîchissement de la page
  const searchInput = event.target.value.trim();
  
  if (searchInput.length >= 3) {
    const filteredRecipes = searchRecipes(searchInput);
    displayFilteredRecipes(filteredRecipes);

    if(filteredRecipes.length === 0) {
      const recipeContainer = document.getElementById("recipeContainer");
      const key = document.getElementById('searchInput')
  
      recipeContainer.textContent = `« Aucune recette ne contient « ${key.value} » vous pouvez chercher « tarte aux pommes », « poisson », etc.` ;
  
    }

  } else {
    recipeContainer.textContent = "Veuillez saisir au moins 3 caractères.";
  }


  


});

searchRecipes();
displayFilteredRecipes();


