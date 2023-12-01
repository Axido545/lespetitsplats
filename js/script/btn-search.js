export const searchBtn = document.querySelector(".search-btn");
export const whiteGlass = document.querySelector(".glass-white");
export const blackGlass = document.querySelector(".glass-black");

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
