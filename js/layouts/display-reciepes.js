

import {recipes}  from '../data/recipes.js';

/// Fonction pour afficher les recettes 
export function displayReciepes() {
    recipeContainer.innerHTML = ''; // Efface le contenu précédent
  
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
  

    const recipeCountElement = document.getElementById("recipeCount");

    // Affichage le nombre de recettes dans un élément HTML avec l'ID "recipeCount"
    if (recipeCountElement) {
      recipeCountElement.textContent = `${numberOfRecipes} recettes`;
    }
  
  }
  }



  export function maskReciepe() {
    const allRecipe = document.querySelectorAll("article");
    allRecipe.forEach(recipe => {
      recipe.style.display = "none";
    });
  }



