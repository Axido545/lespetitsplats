import { recipes } from "../data/recipes.js";
import { displayDataReciepes, getRecipe } from "../script/index.js";
getRecipe()

function filterRecipesByTags(tags) {

  // Filtre les recettes en fonction des tags
  const filteredRecipes = recipes.filter(recipe => {
    // vérification si la recette contient tous les tags
    return tags.every(tag => recipe.ingredients.includes(tag));
  });

  return filteredRecipes;
}




// Fonction pour retirer les pluriels si une forme singulière existe
export function removePluralIfSingularExists(ingredients) {
  const uniqueIngredients = [];

  ingredients.forEach(ingredient => {
    const ingredientLowerCase = ingredient.toLowerCase().trim();
    const singularForm = ingredientLowerCase.endsWith('s')
      ? ingredientLowerCase.slice(0, -1) // Retire le "s" final
      : ingredientLowerCase;

          // Vérifie si la forme singulière existe déjà dans le tableau uniqueIngredients
    if (!uniqueIngredients.includes(singularForm)) {
      uniqueIngredients.push(singularForm);
    }
  });

  return uniqueIngredients;
}



export function displaySuggestions() {
  // Sélection tous les éléments avec la classe "ingredient-Item-name"
  const ingredientsElements = document.querySelectorAll(".ingredient-Item-name");

  // mise en place d'un tableau pour stocker les ingrédients uniques
  const ingredients  = [];

  // Parcourez les éléments et filtrez les ingrédients
  ingredientsElements.forEach(element => {
    const ingredient = element.textContent.toLowerCase().trim();
    ingredients.push(ingredient);
  });

  const uniqueIngredients = removePluralIfSingularExists(ingredients);

  // liste HTML avec les ingrédients filtrerés
  const suggestionsHTML = uniqueIngredients.map(ingredient => `
    <li class="suggestion" data-ingredient="${ingredient}">${ingredient}</li>
  `).join("");

  // Insétion la liste dans un élément HTML 
  const suggestionsContainer = document.querySelector(".all-suggestions");
  suggestionsContainer.innerHTML = `<ul>${suggestionsHTML}</ul>`;


  

//auto completion
  // Ajout du gestionnaire d'événement pour l'autocomplétion
  const inputSuggestion = document.getElementById("ingredientSearch");
  inputSuggestion.addEventListener("input", function() {
    const searchTerm = inputSuggestion.value.toLowerCase().trim();
    const filteredIngredients = uniqueIngredients.filter(ingredient =>
      ingredient.includes(searchTerm)
    );

    // Affiche les ingrédients filtrés en tant qu'autocomplétion
    const autocompleteList = document.querySelector(".all-suggestions");
    autocompleteList.innerHTML = "";

    filteredIngredients.forEach(ingredient => {

      const listItem = document.createElement("li");
      listItem.textContent = ingredient;
      listItem.classList.add("suggestion");

      listItem.dataset.ingredient = ingredient;
      autocompleteList.appendChild(listItem);
    });
  });




}

// Réinitialise les valeurs des champs d'entrée lors du chargement de la page
window.addEventListener("load", function() {
  const inputSuggestion = document.getElementById("ingredientSearch");

  inputSuggestion.value = ''; // Réinitialise la valeur du champ de recherche principal
  
  });

  const tags = [];


///////////////////////
export function createTag(tagText) {
  const tagElement = document.createElement('div');
  tagElement.className = 'tag';
  
  const tagTextElement = document.createElement('span');
  tagTextElement.setAttribute("class", "tag-name");
  tagTextElement.textContent = tagText;
// Filtrer les recettes en utilisant les tags actuels
const filteredRecipes = filterRecipesByTags(tags);

// Appelez la fonction pour afficher les recettes filtrées
displayDataReciepes(filteredRecipes);
  

}

export function newTags() {


  const suggestions = document.querySelectorAll(".suggestion");


  suggestions.forEach(function(suggestion) {
    suggestion.addEventListener('click', function() {

      console.log("j'ai cliqué sur une suggestion")
      // Récupération de la valeur de l'attribut "data-ingredient"
      const ingredientName = suggestion.getAttribute("data-ingredient");

      createTag(ingredientName);



      // affichage d'un élément de tag
      const tagElement = document.createElement('div');
      tagElement.className = 'tag';
  
      // affichage d' un élément pour le texte du tag
      const tagTextElement = document.createElement('span');
      tagTextElement.setAttribute("class", "tag-name");
      tagTextElement.textContent = ingredientName;
  
      // Ajout du texte au tag
      tagElement.appendChild(tagTextElement);
  const tagContainer = document.querySelector(".selected-tags")
      // Ajout de tag au conteneur de tags
      tagContainer.appendChild(tagElement);
  
       const closeTag = document.createElement('i');
      closeTag.setAttribute("class", "fa-solid fa-xmark close-tag");
          tagElement.appendChild(closeTag);
    
    // Ajout du tag au tableau de tags
    tags.push(ingredientName);
  
   // Filtrage des recettes en utilisant les tags actuels
   const filteredRecipes = filterRecipesByTags(tags);
  
     // Appel de la fonction pour afficher les recettes filtrées
     displayDataReciepes(filteredRecipes);


     console.log(filterRecipesByTags(tags))

     console.log( displayDataReciepes(filteredRecipes))



    closeTag.addEventListener('click', function(){
      console.log('yeahhhhh')
         // Supprimez le tag du tableau de tags
         const index = tags.indexOf(ingredientName);
         if (index !== -1) {
           tags.splice(index, 1);
         }
   
         // Filtrage les recettes en utilisant les tags actuels
         const filteredRecipes = filterRecipesByTags(tags);
   console.log(filterRecipesByTags(tags))
         // Appel de la fonction pour afficher les recettes filtrées
         displayDataReciepes(filteredRecipes);
         console.log( displayDataReciepes(filteredRecipes))

   tagElement.style.display = "none";
    })
    });
  });
  
}