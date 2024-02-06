/******const*******/
export const recipeContainer = document.getElementById("recipeContainer");
export const myInput = document.getElementById("searchInput");
export const inputIngredient = document.getElementById("ingredientSearch");
export const inputAppliance = document.getElementById("applianceSearch");
export const inputUstensils = document.getElementById("ustensilSearch");
export const inputSuggestion = document.querySelectorAll("little-search");
export const clearInput = document.getElementById("clearInput");
export const clearIcon = document.querySelector(".clear-icon");
export const messageError = document.querySelector(".message-error");
export const recipeCountElement = document.getElementById("recipeCount");
export const tagsContainer = document.getElementById("selected-tags");
export const suggestionActive = document.querySelector(".suggestion-active");

window.addEventListener("load", function () {
  myInput.value = "";
  inputIngredient.value = "";
  inputAppliance.value = "";
  inputUstensils.value = "";
});
