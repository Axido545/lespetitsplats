import { displayDataReciepes, allRecipes } from "./index.js";
import { recipes } from "../data/recipes.js";
import { clearIcon, myInput } from "../utils/getvalues.js";
import { filterRecipesByTags, mySearch } from "../utils/boucle-for.js";

export const searchBtn = document.querySelector(".search-btn");
export const whiteGlass = document.querySelector(".glass-white");
export const blackGlass = document.querySelector(".glass-black");

export function displayBtnBigSearch() {
  if (myInput.value != "") {
    clearIcon.classList.remove("hidden");
  }
  clearIcon.addEventListener("click", async function () {
    myInput.value = "";

    clearIcon.classList.add("hidden");
    const filteredRecipes = filterRecipesByTags(recipes);

    mySearch(filteredRecipes, "");
  });
}

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
