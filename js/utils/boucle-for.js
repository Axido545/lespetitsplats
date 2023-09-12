import { recipes } from '../data/recipes.js';
import { messageError,displayDataReciepes, numberOfRecipes } from '../script/index.js';
import { maskReciepe } from '../layouts/display-reciepes.js';
// import { filterRecipeIdsByAllTags, filterRecipesByTags, searchRecipesTag, updateAllSuggestions, handleSearch, displayedRecipes } from './tags.js';

// Fonction pour effectuer la recherche en fonction de la saisie de l'utilisateur
export function searchRecipes(keyword) {
  const filteredRecipes = [];
  for (const recipe of recipes) {
    const lowerCaseKeyword = keyword.toLowerCase();
    const lowerCaseName = recipe.name.toLowerCase();
    const lowerCaseIngredients = recipe.ingredients.join(' ').toLowerCase();
    const lowerCaseDescription = recipe.description.toLowerCase();

    if (
      lowerCaseName.includes(lowerCaseKeyword) ||
      lowerCaseIngredients.includes(lowerCaseKeyword) ||
      lowerCaseDescription.includes(lowerCaseKeyword)
    ) {
      filteredRecipes.push(recipe);
    }
  }
  return filteredRecipes;
}

export const myInput =   document.getElementById('searchInput')


export function FilteredReciepesFirstInput () {
  const myInput =   document.getElementById('searchInput')
  myInput.addEventListener("input", function(){
    // console.log(myInput.value.split("").length)
    // console.log(myInput.value.split(""))

    if(myInput.value.split("").length < 3){
    // console.log('veuillez entrer 3 caractères')
          messageError.style.display ="block";
          messageError.textContent = "Veuillez entrer trois caractères minimum";
          // maskReciepe() 
    } else if(myInput.value.split("").length === 0){
        messageError.textContent = `Aucune recette ne contient ‘${inputValue} ’ vous pouvez chercher « tarte aux pommes », « poisson », etc.`;
        // maskReciepe()
    } else {
      messageError.textContent = ``;
      // displayDataReciepes(dataReciepes)
// const filteredRecipes = searchRecipes(document.getElementById('searchInput').value);
// console.log(filteredRecipes)


//       filteredRecipes.forEach(recipe => {
//           // console.log(recipe)
//             const recipeItem = document.getElementById(recipe.id);
//             console.log(recipeItem)
//             // console.log(recipe.id)
        
//             if (recipeItem) {
//               recipeItem.style.display = "block";
//               // recipeItem.classList.remove('hidden');
//             } else {
//               recipeItem.style.display = "none";
//             }
//           });

    }
  }
  )

}



// export function FilteredReciepesFirstInput(){
// const filteredRecipes = searchRecipes(document.getElementById('searchInput').value);
// console.log(filteredRecipes)
// filteredRecipes.forEach(recipe => {
//   console.log(recipe)
//     const recipeItem = document.getElementById(recipe.id);
//     console.log(recipeItem)
//     console.log(recipe.id)

//     if (recipeItem) {
//       recipeItem.style.display = "block";
//       // recipeItem.classList.remove('hidden');
//     } else {
//       recipeItem.style.display = "none";
//     }
//   });
// }

//   // Gestionnaire d'événement pour le formulaire de recherche
//   searchInput.addEventListener('input', function (event) {
//     event.preventDefault();
//     const inputValue = searchInput.value.trim();

//     if (inputValue.length < 3) {
//       console.log('veuillez entrer 3 caractères')
//       messageError.style.display ="block";
//       messageError.textContent = "Veuillez entrer trois caractères minimum";
//       maskReciepe() 
//     } else {
//       messageError.textContent = "";
//       const filteredRecipes = searchRecipes(inputValue);
  
//       if (filteredRecipes.length === 0) {

//         messageError.textContent = `Aucune recette ne contient ‘${inputValue} ’ vous pouvez chercher « tarte aux pommes », « poisson », etc.`;
//         maskReciepe()
//       } else {

//          // Affiche uniquement les recettes filtrées
//         //  const searchBar = document.getElementById("ingredientSearch");
//         //  const searchInput = searchBar.value.toLowerCase();
//         //  const ingredientTags = searchInput.split(" ");
//         //  const searchBarAppliance = document.getElementById("applianceSearch");
//         //  const searchInputAppliance = searchBarAppliance.value.toLowerCase();
//         //  const applianceTags = searchInputAppliance.split(" ");
//         //  const searchBarUstensiles = document.getElementById("ustensilSearch");
//         //  const searchInputUstensiles = searchBarUstensiles.value.toLowerCase();
//         //  const ustensileTags = searchInputUstensiles.split(" ");


//         //  const filteredRecipeIds = filterRecipeIdsByAllTags(ingredientTags, applianceTags, ustensileTags);
//         //  const recipesToShow = filteredRecipeIds.filter(id => displayedRecipes.includes(id));
     
//         const result = filteredRecipes;
//          console.log(result)
//          console.log(displayDataReciepes(filteredRecipes))

// FilteredReciepesFirstInput()






//     // filterRecipesByTags()
//     // searchRecipesTag()
//     // updateAllSuggestions()
//     // handleSearch()
//     displayDataReciepes(dataReciepes )
//     console.log( displayDataReciepes(dataReciepes ))
//   }
//     }
//   });


  
document.addEventListener('keydown',function(event){
  if(event.key === 'Enter'){
    event.preventDefault();

  }
})

// Réinitialiser les valeurs des champs d'entrée lors du chargement de la page
window.addEventListener("load", function() {
  searchInput.value = ''; // Réinitialiser la valeur du champ de recherche principal
});
