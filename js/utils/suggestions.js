

export function displaySuggestions(recipes2) {
  if (!Array.isArray(recipes2)) {
    // console.error("recipes2 n'est pas un tableau." + recipes2);
    recipes2 = recipes2.split('\n'); // Si les ingrédients sont séparés par des sauts de ligne

    return;
  }
  let myIngredientsArray = [];
  recipes2.forEach(recipes => {
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
      updateSuggestion(filteredIngredient,"ingredients","suggestions-ingredients");
      AddSuggestions("ingredients");
})
})

// deleteTags();
updateSuggestion(myIngredientsArray,"ingredients","suggestions-ingredients")
}



export function updateSuggestion(list,name,id){
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
    var isSelected = verifSuggestions(name,element);
    // displaySuggestions(element,name,id,isSelected);
 });
}


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

//Check si la valeur est présente
export function verifSuggestions(name,tag){
  var Suggestions = localStorage.getItem(name);
  if(Suggestions == null){
      return false;
  }
  else {
      var tableauSplit = Suggestions.split("||");

      if (tableauSplit.includes(tag)){
          return true;
      }
      else {
          return false;
      }  
  }   
} 


