import { recipes } from "../data/recipes.js";
import { clearIcon, myInput } from "../utils/getvalues.js";
import { filterRecipesByTags, mySearch } from "../utils/search.js";
import { updateSuggestions } from "./index.js";

export const searchBtn = document.querySelector(".search-btn");
export const whiteGlass = document.querySelector(".glass-white");
export const blackGlass = document.querySelector(".glass-black");

//croix pour effacer le text
export function btnCloseSearch() {
  if (myInput.value != "") {
    clearIcon.classList.remove("hidden");
  }
  clearIcon.addEventListener("click", async function () {
    myInput.value = "";
    mySearch(recipes, "");
    clearIcon.classList.add("hidden");
    filterRecipesByTags(recipes);
    updateSuggestions(filterRecipesByTags(recipes));
  });
}

//changement de couleur de la loupe du bouton search
export function displayBtnSearch() {
  // Gestionnaires d'événements pour les boutons "mouseover" et "mouseout"
  whiteGlass.style.display = "block";
  blackGlass.style.display = "none";

  searchBtn.addEventListener("mouseover", function () {
    whiteGlass.style.display = "none";
    blackGlass.style.display = "block";
  });

  searchBtn.addEventListener("mouseout", function () {
    whiteGlass.style.display = "block";
    blackGlass.style.display = "none";
  });
}
