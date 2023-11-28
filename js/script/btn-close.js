import { displayReciepes } from "./display-reciepes.js";
import { filterRecipesByTags, mySearch } from "../utils/boucle-for.js";
import { displayDataReciepes, getRecipe } from "./index.js";
import { displaySuggestions, fetchData } from "../utils/suggestions.js";
import { clearIcon } from "../utils/getvalues.js";
import { updateTagsArray } from "../utils/getvalues.js";
const myInput = document.getElementById("searchInput");

// getRecipe();
// const data = await fetchData();

export async function setupClearableInput() {
  clearIcon.style.display = "none";

  clearIcon.addEventListener("input", function () {
    console.log(inputOne.value);

    if (myInput.value.trim() !== "") {
      clearIcon.style.display = "block";
    } else {
      clearIcon.style.display = "none";
    }
  });

  clearIcon.addEventListener("click", async function () {
    myInput.value = "";
    clearIcon.style.display = "none";
    updateTagsArray();

    // const tags = document.querySelectorAll(".tag");
    console.log(updateTagsArray());

    if (updateTagsArray().length === 0) {
      // console.log("ya pas de tag");
      // const data = await fetchData();

      // mySearch(data, "");
      // console.log(mySearch(data, myInput.value));
      location.reload();

      const data = await fetchData();
      displaySuggestions(data);
      filterRecipesByTags(data);
      // displayDataReciepes(data);
      mySearch(data, "");
    }

    // const data = await fetchData();
    // console.log(
    //   JSON.stringify(data) + "= la valeur de data après clic sur croix"
    // );
    // filterRecipesByTags(data);
    // mySearch(data, "");
    // const result = mySearch(data, "");
    // console.log(
    //   "resultat quand on clic sur la croix de searchBar mysearch =" + result
    // );
  });
}
// if (updateTagsArray.length === 0) {
//   console.log("pas de tags présents");
//   location.reload();
// } else {
//   console.log("Oui il ya des tags");

// const data = await fetchData();
// filterRecipesByTags(data);
//     removeInput();
//     const data = await fetchData();
//     filterRecipesByTags(data);
//     displaySuggestions(data);
//     const inputSearch = document.getElementById("searchInput");
//     const inputText = inputSearch.value.trim().toLowerCase();
//     mySearch(data, inputText);
//   });
// }
// async function removeInput() {
//   myInput.value = "";
//   clearIcon.style.display = "none";
//   const data = await fetchData();
//   filterRecipesByTags(data);
//   displaySuggestions(data);
//   const inputSearch = document.getElementById("searchInput");
//   const inputText = inputSearch.value.trim().toLowerCase();
//   mySearch(data, inputText);

// document.addEventListener('DOMContentLoaded', function() {
//     const clearableInputs = document.querySelectorAll('.clearable-input');
//     clearableInputs.forEach(input => {
//         setupClearableInput(input);
//     });

//     const myInput = document.getElementById('searchInput');
//     // const recipeCount = document.getElementById('recipeCountId'); // Assurez-vous que recipeCount est correctement ciblé

//     myInput.addEventListener('input', function (event) {
//         event.preventDefault();
//         const inputValue = myInput.value.trim();

//         if (inputValue === '') {
//             displayReciepes();
//             messageError.style.display = 'block';
//         } else if (inputValue.length >= 3) {
//             const filteredRecipes = mySearch(inputValue);
//             displayDataReciepes(filteredRecipes);
//         } else {
//             const allRecipeItems = document.querySelectorAll("article");
//             for (const recipeItem of allRecipeItems) {
//                 recipeItem.style.display = 'none';
//             }
//         }
//     });
// });
