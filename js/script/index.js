import { searchRecipes} from '../utils/filtre.js';
import {recipes}  from '../data/recipes.js';
import { displayBtnSearch } from '../layouts/btn-search.js';
import { displayReciepes, maskRecipe } from '../layouts/display-reciepes.js';
import {setupClearableInput} from '../layouts/btn-close.js';
import {  displayIngredient  } from '../utils/ingredient.js';

const recipeContainer = document.getElementById("recipeContainer");
const inputTwo = document.getElementById('ingredientSearch')
recipeContainer.classList.add("gallery-recipes");

const searchInput = document.getElementById('searchInput');
export const recipeCount = document.querySelector("#recipeCount")
export const messageError = document.querySelector(".message-error");


displayReciepes()


document.addEventListener('keydown',function(event){
  if(event.key === 'Enter'){
    event.preventDefault();

  }
})

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
        messageError.textContent = `Aucune recette ne contient ‘${inputValue} ’ vous pouvez chercher « tarte aux pommes », « poisson », etc.`;
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

// Chargement initial des recettes
window.onload = function () {
  displayReciepes(recipes);
  displayBtnSearch()
displayIngredient()
setupClearableInput(searchInput);
setupClearableInput(inputTwo);
};



// Réinitialiser les valeurs des champs d'entrée lors du chargement de la page
window.addEventListener("load", function() {
  searchInput.value = ''; // Réinitialiser la valeur du champ de recherche principal
  inputTwo.value = ''; // Réinitialiser la valeur du champ de recherche d'ingrédients
});