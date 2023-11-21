import { addTag, removeTag} from "./tags.js";
import { getRecipe, displayDataReciepes } from "../script/index.js";
import { updateTagsArray } from "./getvalues.js";
// import { filterRecipesByTags } from "./boucle-for.js";

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
export function afficheListeSuggestions(elements, containerId) {
  const container = document.getElementById(containerId);

  // Efface le contenu existant de l'élément
  container.innerHTML = "";

  elements.forEach(element => {
    const newSuggestion = document.createElement("li");
    newSuggestion.setAttribute("class", "suggestion");
    newSuggestion.innerHTML = element;

    newSuggestion.addEventListener("click", function(){
      // Vérifie si la suggestion a la classe suggestion-active
      const isActive = newSuggestion.classList.contains("suggestion-active");

      // Si la suggestion est active, supprimer la classe et l'image
      if (isActive) {
        newSuggestion.classList.remove("suggestion-active");
        const existingImage = newSuggestion.querySelector('img');
        if (existingImage) {
          existingImage.remove();
        }

removeTag(element,newSuggestion)
console.log(element+ ","+newSuggestion)
      } else {
        // Ajouter la classe suggestion-active à la suggestion
        newSuggestion.classList.add("suggestion-active");

        // Vérifie si une image est déjà présente dans la suggestion
        const existingImage = newSuggestion.querySelector('img');
        if (!existingImage) {
          // Ajouter l'image uniquement si aucune image n'est présente
          var img = document.createElement('img');
          img.src = './asset/croix-suggestion.png';
          img.alt = 'fermer la suggestion';
          img.classList.add('close-suggestion'); 
          newSuggestion.appendChild(img);
        }

        // Ajouter le tag et mettre à jour les autres éléments
        addTag(element);
        updateTagsArray();
        // filterRecipesByTags() si nécessaire
      }
    });

    container.appendChild(newSuggestion);
  });
}
