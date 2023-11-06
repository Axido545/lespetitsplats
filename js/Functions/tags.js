import { recipes } from "../Data/recipes.js";
import { displayDataReciepes } from "../Layout/index.js";
import { displayTags } from "../Layout/display-tags.js";
// import { createTag } from "../Layout/create-tag.js";
// import { mySearch } from "./searchreciepes.js";
import { mySearch } from "./boucle-for.js";


export function newTags(dataTags) {
    let myIngredientsArray = [];
    dataTags.forEach(recipes => {
      let ingredients = recipes.ingredients

      ingredients.forEach(ingredient => {
                   let ingredientName = ingredient.ingredient;
                   if(!myIngredientsArray.some(function(element) {  
                        return element.toLowerCase()=== ingredientName.toLowerCase();
                      })){
                        myIngredientsArray.push(ingredientName);
                   }
    })
    const ingredientSearch = document.getElementById("ingredientSearch");
  ingredientSearch.addEventListener("input", function (){
      let filteredIngredient = myIngredientsArray.filter(function(element) {
          return element.toLowerCase().includes(ingredientSearch.value.toLowerCase());
        });
        updateTag(filteredIngredient,"ingredients","suggestions-ingredients");
        AddSuggestions("ingredients");
  })
})

// deleteTags();
updateTag(myIngredientsArray,"ingredients","suggestions-ingredients")
}

export function updateTag(list,name,id){
  const optionsIsuggestionsIngredients = document.getElementById(id);
  while (optionsIsuggestionsIngredients.firstChild) {
    optionsIsuggestionsIngredients.removeChild(optionsIsuggestionsIngredients.firstChild);
  }
  //Créer une fonction pour supprimer enfant
  //on tri par ordre alphabétique
   list.sort(function(a, b) {
      return a.localeCompare(b);
  });
  list.forEach(element => {
    var isSelected = checkValeur(name,element);
    displayTags(element,name,id,isSelected);
 });
}

function deleteTags(){
  const tags = document.getElementById("tag");
  while (tags.firstChild) {
    tags.removeChild(tags.firstChild);
  }
}

export function AddTags(list,name,id){
  list.forEach(element => {
    var isSelected = checkValeur(name,element);
    // createSelectCard(element,name,id,isSelected);
    AddTags(element,name,id,isSelected);
 });
}

// export function AddTags(list, name, id) {
//   if (Array.isArray(list)) {
//     list.forEach(element => {
//       var isSelected = checkValeur(name, element);
//       // createSelectCard(element, name, id, isSelected);
//       AddTags(element, name, id, isSelected);
//     });
//   } else {
//     // Gérer le cas où list n'est pas un tableau
//   }
// }

//Cette fonction permet d'ajout le event listener sur chaque element d'une nouvelle liste
export function AddSuggestions(name){
  const listElement = document.getElementsByName(name);
  listElement.forEach(element => {
      element.addEventListener("click", function(){
        if(element.classList.contains("selected") || element.id =="tagElement"){
          console.log("supprimer")
          DeleteSuggestions(element.textContent,name);
        }
        else {
          ajoutLocalStorage(element.textContent,name);
        }
        filterRecipesByKeyword(recipes);
      });
  });
}

export function DeleteSuggestions(tag,name){
  var SuggestionsArray = localStorage.getItem(name);
  if (SuggestionsArray!=null){
      console.log(SuggestionsArray);
      var SuggestionsArraySplit = SuggestionsArray.split("||");
      var SuggestionsArray2 = SuggestionsArray.split("");
      console.log(tableauSplit2.length);

      if (SuggestionsArraySplit.length === 1 ){
          localStorage.removeItem(name);
      }
      else {
          var newSuggestionsArray = SuggestionsArraySplit.filter(function(element) {
              return element !== tag;
          });
          var newSuggestionsArrayJoin = newSuggestionsArray.join("||");
          console.log(newSuggestionsArrayJoin);
          localStorage.setItem(name,newSuggestionsArrayJoin);
      }
  }   
}

//Check si la valeur est présente en localStorage
export function checkValeur(name,tag){
  var tableauRecupere = localStorage.getItem(name);
  if(tableauRecupere == null){
      return false;
  }
  else {
      var tableauSplit = tableauRecupere.split("||");

      if (tableauSplit.includes(tag)){
          return true;
      }
      else {
          return false;
      }  
  }   
}

