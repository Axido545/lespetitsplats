import { addTag } from "./tags.js";

export function displaySuggestions(myRecipesdata) {
  console.log('Data at the start:', myRecipesdata);
//variable local
  let currentIngredientsArray = [];
  myRecipesdata.forEach(recipe => {

// pour chaque recette on extrait les ingredient
    let ingredients = recipe.ingredients;

// Et pour chaque ingredients on extrait le nom de l'ingrédient :
    ingredients.forEach(ingredient => {
      let ingredientName = ingredient.ingredient;

//on vérifie si l'ingrédient n'est pas déjà présent pour pas faire de doubon
// La méthode some() permet de vérifier justement 
      // if (!myIngredientsArray.some(function (element) {
      //   return element.toLowerCase() === ingredientName.toLowerCase();
      // })) {
      //   // si l'ingrédient trouvé n'est pas dans la liste on l'integre
      //   myIngredientsArray.push(ingredientName);
      // }
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
  // Oon met en argument = la variable qui contient le tableau des ingrédient et le nom de l'id ou l'on souhaite afficher les ingrédients
  
  afficheListeSuggestions(currentIngredientsArray, "suggestions-ingredients");

  // récupération du champs de recherche
  const ingredientSearch = document.getElementById("ingredientSearch");


  // ajout de l'écouteur d''évènement sur l'input
  ingredientSearch.addEventListener("input", function () {
//Système d'autocomplétion 

    let filteredIngredient = currentIngredientsArray.filter(function (element) {
return element.toLowerCase().includes(ingredientSearch.value.toLowerCase());   });

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
addTag(element)
    });

        container.appendChild(newSuggestion);
  });
}
