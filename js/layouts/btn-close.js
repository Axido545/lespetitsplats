import { displayReciepes } from './display-reciepes.js';
import { searchRecipes } from '../utils/boucle-for.js';
import { messageError } from '../script/index.js';
import { displayFilteredRecipes } from '../script/index.js';

export function setupClearableInput(inputParam) {
    const inputContainer = inputParam.parentElement;
    const clearIcon = inputContainer.querySelector('.clear-icon');

    clearIcon.addEventListener('click', function () {
        inputParam.value = '';
        inputParam.dispatchEvent(new Event('input'));
    });

    inputParam.addEventListener('input', function () {
        if (inputParam.value.trim() !== '') {
            clearIcon.style.display = 'block';
        } else {
            clearIcon.style.display = 'none';
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const clearableInputs = document.querySelectorAll('.clearable-input');
    clearableInputs.forEach(input => {
        setupClearableInput(input);
    });

    const myInput = document.getElementById('searchInput');
    // const recipeCount = document.getElementById('recipeCountId'); // Assurez-vous que recipeCount est correctement ciblé

    myInput.addEventListener('input', function (event) {
        event.preventDefault();
        const inputValue = myInput.value.trim();

        if (inputValue === '') {
            displayReciepes(); // Assurez-vous que displayReciepes est correctement défini
            messageError.style.display = 'block';
            recipeCount.style.display = 'block';
        } else if (inputValue.length >= 3) {
            const filteredRecipes = searchRecipes(inputValue);
            displayFilteredRecipes(filteredRecipes); // Assurez-vous que displayFilteredRecipes est correctement défini
        } else {
            const allRecipeItems = document.querySelectorAll("article");
            for (const recipeItem of allRecipeItems) {
                recipeItem.style.display = 'none';
            }
        }
    });
});
