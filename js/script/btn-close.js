import { displayReciepes } from './display-reciepes.js';
import { mySearch } from '../utils/boucle-for.js';
import { messageError } from './index.js';
import { displayDataReciepes, getRecipe } from './index.js';

getRecipe()
var dataReciepes = await getRecipe();

export function setupClearableInput() {

    const clearIcon = document.getElementById('clearInput');
    const inputOne = document.getElementById('searchInput')
    clearIcon.style.display = "none"

        clearIcon.addEventListener('input', function () {
            console.log(inputOne.value)

        if (inputOne.value.trim() !== "") {
            clearIcon.style.display = 'block';
        } else {
            clearIcon.style.display = 'none';
        }
    });

    clearIcon.addEventListener('click', function () {
        inputOne.value =  "";
    clearIcon.style.display = "none"
        displayDataReciepes(dataReciepes)

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
