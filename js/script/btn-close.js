import { displayReciepes } from "./display-reciepes.js";
import { filterRecipesByTags, mySearch } from "../utils/boucle-for.js";
import { displayDataReciepes, getRecipe } from "./index.js";
import { displaySuggestions, fetchData } from "../utils/suggestions.js";
import { clearIcon } from "../utils/getvalues.js";
import { updateTagsArray } from "../utils/getvalues.js";
const myInput = document.getElementById("searchInput");

getRecipe();
const data = await fetchData();

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

    //   clearIcon.style.display = "none";
    if (updateTagsArray.length === 0) {
      location.reload();
    } else {
      const data = await fetchData();
      filterRecipesByTags(data);
    }
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
  });
}
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
