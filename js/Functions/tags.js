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
      var filteredIngredient = myIngredientsArray.filter(function(element) {
          return element.toLowerCase().includes(ingredientSearch.value.toLowerCase());
        });
        prepareSelect(filteredIngredient,"ingredients","suggestions-ingredients");
        ajoutListenerSurListeIngredient("ingredients");
  })
})

}
