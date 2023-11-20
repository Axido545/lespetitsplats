import { addTag} from "./tags.js";
import { getRecipe } from "../script/index.js";
import { updateTagsArray } from "./getvalues.js";

// Fonction pour afficher les suggestions
export function displaySuggestions(myRecipesdata) {
  // Variable locale liste des ingrédients
  let currentIngredientsArray = [];
  
  myRecipesdata.forEach(recipe => {
    // Pour chaque recette, on extrait les ingrédients
    let ingredients = recipe.ingredients;

    // Et pour chaque ingrédient, on extrait le nom de l'ingrédient
    ingredients.forEach(ingredient => {
      let ingredientName = ingredient.ingredient;

      // On vérifie si l'ingrédient n'est pas déjà présent pour ne pas faire de doublon
      if (!currentIngredientsArray.some(function (element) {
        return element.toLowerCase() === ingredientName.toLowerCase();
      })) {
        // Si l'ingrédient n'est pas dans la liste, on l'ajoute à la variable locale
        currentIngredientsArray.push(ingredientName);
      }
    });
  });

  // Affiche les ingrédients dès le chargement de la page
  // On met en argument = la variable qui contient le tableau des ingrédients et le nom de l'ID où l'on souhaite afficher les ingrédients
  afficheListeSuggestions(currentIngredientsArray, "suggestions-ingredients");

  // Récupération du champ de recherche
  const ingredientSearch = document.getElementById("ingredientSearch");

  // Ajout de l'écouteur d'évènement sur l'input
  ingredientSearch.addEventListener("input", function () {
    // Système d'autocomplétion
    let filteredIngredient = currentIngredientsArray.filter(function (element) {
      return element.toLowerCase().includes(ingredientSearch.value.toLowerCase());
    });

    afficheListeSuggestions(filteredIngredient, "suggestions-ingredients");
  });
}

// mise a jour des 
export function afficheListeSuggestions(elements, containerId) {
  const container = document.getElementById(containerId);

  // Efface le contenu existant de l'élément
  container.innerHTML = "";

  elements.forEach(element => {
    const newSuggestion = document.createElement("li");
    newSuggestion.setAttribute("class", "suggestion");
    newSuggestion.innerHTML = element;

    newSuggestion.addEventListener("click", function(){
      addTag(element);
      updateTagsArray()
      newSuggestion.classList.toggle("suggestion-active");
    });

    container.appendChild(newSuggestion);
  });
}

