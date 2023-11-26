import { addTag, removeTag } from "./tags.js";
import { getRecipe, allRecipes } from "../script/index.js";
import { updateTagsArray, ingredientSearch } from "./getvalues.js";
import { filterRecipesByTags, mySearch } from "./boucle-for.js";

export async function fetchData() {
  const data = await getRecipe();
  console.log("Valeur de data :", data);
  // Vous pouvez utiliser la valeur de data ici
  return data;
}

// Fonction pour afficher les suggestions
export function displaySuggestions(myRecipesdata) {
  // Variable locale liste des ingrédients
  let currentIngredientsArray = [];
  let currentApplianceArray = [];

  myRecipesdata.forEach((recipe) => {
    // Pour chaque recette, on extrait les ingrédients
    let ingredients = recipe.ingredients;

    // Et pour chaque ingrédient, on extrait le nom de l'ingrédient
    ingredients.forEach((ingredient) => {
      let ingredientName = ingredient.ingredient;

      // On vérifie si l'ingrédient n'est pas déjà présent pour ne pas faire de doublon
      if (
        !currentIngredientsArray.some(function (element) {
          return element.toLowerCase() === ingredientName.toLowerCase();
        })
      ) {
        // Si l'ingrédient n'est pas dans la liste, on l'ajoute à la variable locale
        currentIngredientsArray.push(ingredientName);
      }
    });
    // Pour chaque recette, on extrait les ingrédients
    let appliances = recipe.appliance;
    // On vérifie si l'ingrédient n'est pas déjà présent pour ne pas faire de doublon
    if (
      !currentApplianceArray.some(function (element) {
        return element.toLowerCase() === appliances.toLowerCase();
      })
    ) {
      // Si l'ingrédient n'est pas dans la liste, on l'ajoute à la variable locale
      currentApplianceArray.push(appliances);
    }
  });

  // Affiche les ingrédients dès le chargement de la page
  // On met en argument = la variable qui contient le tableau des ingrédients et le nom de l'ID où l'on souhaite afficher les ingrédients
  afficheListeSuggestions(currentIngredientsArray, "suggestions-ingredients");
  afficheListeSuggestions(currentApplianceArray, "suggestions-appareils");

  // Ajout de l'écouteur d'évènement sur l'input
  ingredientSearch.addEventListener("input", function () {
    // Système d'autocomplétion
    let filteredIngredient = currentIngredientsArray.filter(function (element) {
      return element
        .toLowerCase()
        .includes(ingredientSearch.value.toLowerCase());
    });

    afficheListeSuggestions(filteredIngredient, "suggestions-ingredients");
  });
}
export function afficheListeSuggestions(elements, containerId) {
  const container = document.getElementById(containerId);

  // Efface le contenu existant de l'élément
  container.innerHTML = "";

  elements.forEach(async (element) => {
    const newSuggestion = document.createElement("li");
    newSuggestion.setAttribute("class", "suggestion");
    newSuggestion.innerHTML = element;

    newSuggestion.addEventListener("click", async function (event) {
      event.stopPropagation();
      if (
        newSuggestion &&
        newSuggestion.classList &&
        newSuggestion.classList.contains("suggestion-active")
      ) {
        newSuggestion.classList.remove("suggestion-active");
        const existingImage = newSuggestion.querySelector(".close-suggestion");
        if (existingImage && existingImage.parentNode) {
          existingImage.parentNode.removeChild(existingImage);
        }
        removeTag(element, newSuggestion);
        updateTagsArray();
      } else {
        newSuggestion.classList.add("suggestion-active");

        // Vérifie si une image est déjà présente dans la suggestion
        const existingImage = newSuggestion.querySelector("img");
        if (!existingImage) {
          // Ajouter l'image uniquement si aucune image n'est présente
          var img = document.createElement("img");
          img.src = "./asset/croix-suggestion.png";
          img.alt = "fermer la suggestion";
          img.classList.add("close-suggestion");
          newSuggestion.appendChild(img);
        }

        await addTag(element);
        updateTagsArray();
        const data = await fetchData(); // Assurez-vous que fetchData est correctement défini
        // displaySuggestions(data);
        filterRecipesByTags(data);
        // const inputSearch = document.getElementById("searchInput");
        // const inputText = inputSearch.value.trim().toLowerCase();

        // mySearch(data, inputText);

        // (async () => {
        //   const data = await fetchData();

        //   // Ajouter le tag et mettre à jour les autres éléments
        //   addTag(element);
        //   updateTagsArray();
        //   displaySuggestions(data);
        //   filterRecipesByTags(data);
        //   mySearch(data);
        // })();
      }
    });

    container.appendChild(newSuggestion);
  });
}
