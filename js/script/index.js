import { searchRecipes} from '../utils/filtre.js';
import {recipes}  from '../data/recipes.js';

/// Fonction pour afficher les recettes dans l'élément avec l'ID "recipeContainer"
export function displayRecipes() {
  const recipeContainer = document.getElementById("recipeContainer");
  recipeContainer.classList.add("gallery-recipes");

  for (let recipe of recipes) {
    const articleRecipe = document.createElement('article');
    articleRecipe.classList.add("recipe-article", "position-relative", "col-4");
    articleRecipe.setAttribute("id", recipe.id)
    recipeContainer.appendChild(articleRecipe);

    const imgRecipe = document.createElement("img");
    imgRecipe.classList.add("img-recette", "img-fluid");
    imgRecipe.setAttribute("src", `asset/imgs_recettes/${recipe.image}`);
    imgRecipe.setAttribute("alt", recipe.name);
    articleRecipe.appendChild(imgRecipe);

    const wrapTextRecipe = document.createElement("section");
    wrapTextRecipe.classList.add("text-container", "p-3"); 
    articleRecipe.appendChild(wrapTextRecipe);

    const titleRecipe = document.createElement("h2");
    titleRecipe.classList.add("reciepe-name", "mb-3");
    titleRecipe.textContent = recipe.name;
    wrapTextRecipe.appendChild(titleRecipe);

    const subTitlRecipeRec = document.createElement("h3");
    subTitlRecipeRec.classList.add("reciepe-subtitle", "mb-2"); 
    subTitlRecipeRec.textContent = "RECETTE";
    wrapTextRecipe.appendChild(subTitlRecipeRec);

    const recipeDesc = document.createElement("p");
    recipeDesc.textContent = recipe.description;
    recipeDesc.setAttribute("class","recipe-desc")
    wrapTextRecipe.appendChild(recipeDesc);



    const subTitlRecipeIng = document.createElement("h3");
    subTitlRecipeIng.classList.add("reciepe-subtitle", "mb-2"); 
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

  // Calcule du nombre de recettes
  const numberOfRecipes = recipes.length;

  // Affichage le nombre de recettes dans un élément HTML avec l'ID "recipeCount"
  const recipeCountElement = document.getElementById("recipeCount");
  if (recipeCountElement) {
    recipeCountElement.textContent = `${numberOfRecipes} recettes`;
  }

}
}
// Appeler la fonction pour afficher les recettes lorsque la page est chargée
window.onload = displayRecipes;

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

  const searchInput = document.getElementById('searchInput');

  const messageError = document.createElement("span");
  messageError.setAttribute("class","message-error")
  recipeContainer.appendChild(messageError);

  const recipeCount = document.querySelector("#recipeCount")

  function maskRecipe() {
    const allRecipe = document.querySelectorAll("article");
    allRecipe.forEach(recipe => {
      recipe.style.display = "none";
    });
  }
  function displayRecipe() {
    const allRecipe = document.querySelectorAll("article");
    allRecipe.forEach(recipe => {
      recipe.style.display = "block";
    });
  }
  displayRecipe() ;
  
  // Gestionnaire d'événement pour le formulaire de recherche
  searchInput.addEventListener('input', function (event) {
    event.preventDefault();
    const inputValue = searchInput.value.trim();
    console.log("L'élément a changé :", inputValue);
  
    if (inputValue.length < 3) {
      console.log("moins de 3 caractères");
  
      messageError.style.display = "block";
      messageError.textContent = "Veuillez entrer trois caractères minimum";
      recipeCount.style.display ="none"
      
      maskRecipe() 
    } else {
      messageError.style.display = "none";
      
      maskRecipe() 
  
      const filteredRecipes = searchRecipes(inputValue);
  
      if (filteredRecipes.length === 0) {
        messageError.style.display ="block"
        recipeCount.style.display ="none"


        messageError.textContent = `Aucune recette ne contient ‘${inputValue} ’ vous pouvez chercher «
        tarte aux pommes », « poisson », etc.`;
      } else {
        messageError.style.display ="none"

         // Affiche uniquement les recettes filtrées
    filteredRecipes.forEach(recipe => {
      const recipeItem = document.getElementById(recipe.id);
      if (recipeItem) {
        recipeItem.style.display = "block";
      }
    });
    recipeCount.style.display = "block";

    recipeCount.textContent = `${filteredRecipes.length} recettes`;
      }
    }
  });
  


