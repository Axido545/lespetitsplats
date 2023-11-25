import { recipes } from "../data/recipes.js";

/// Fonction pour afficher les recettes
export function displayReciepes(recipes) {
  // recipeContainer.innerHTML = ''; // Efface le contenu précédent
  const {
    id,
    image,
    name,
    servings,
    ingredients,
    time,
    description,
    appliance,
    ustensils,
  } = recipes;

  // for(var i = 0; i< recipes.length ; i++){
  const articleRecipe = document.createElement("article");
  // articleRecipe.classList.add("recipe-article", "position-relative", "col-4");
  articleRecipe.classList.add(
    "recipe-article",
    "position-relative",
    "col-xs-12",
    "col-sm-6",
    "col-md-3",
    "col-3"
  );

  articleRecipe.setAttribute("id", id);

  // recipeContainer.appendChild(articleRecipe);

  const imgRecipe = document.createElement("img");
  imgRecipe.classList.add("img-recette", "img-fluid");

  imgRecipe.setAttribute("src", `asset/imgs_recettes/${image}`);
  imgRecipe.setAttribute("alt", name);
  articleRecipe.appendChild(imgRecipe);

  const wrapTextRecipe = document.createElement("section");
  wrapTextRecipe.classList.add("text-container", "p-3");
  articleRecipe.appendChild(wrapTextRecipe);

  const titleRecipe = document.createElement("h2");
  titleRecipe.classList.add("reciepe-name", "mb-3");
  titleRecipe.textContent = name;
  wrapTextRecipe.appendChild(titleRecipe);

  const subTitlRecipeRec = document.createElement("h3");
  subTitlRecipeRec.classList.add("reciepe-subtitle", "mb-2");
  subTitlRecipeRec.textContent = "RECETTE";
  wrapTextRecipe.appendChild(subTitlRecipeRec);

  const recipeDesc = document.createElement("p");
  recipeDesc.textContent = description;
  recipeDesc.setAttribute("class", "recipe-desc");
  wrapTextRecipe.appendChild(recipeDesc);

  const subTitlRecipeIng = document.createElement("h3");
  subTitlRecipeIng.classList.add("reciepe-subtitle", "mb-2");
  wrapTextRecipe.appendChild(subTitlRecipeIng);

  const ingredientsList = document.createElement("section");
  ingredientsList.setAttribute("class", "row row-cols-2");
  wrapTextRecipe.appendChild(ingredientsList);

  for (const ingredient of ingredients) {
    const { ingredient: name, quantity, unit = "" } = ingredient;

    const ingredientBlock = document.createElement("div");
    ingredientBlock.setAttribute("class", "col");
    ingredientsList.appendChild(ingredientBlock);

    const ingredientItem = document.createElement("p");
    ingredientItem.setAttribute("class", "ingredient-Item-name");
    ingredientItem.textContent = `${name}`;
    ingredientBlock.appendChild(ingredientItem);

    if (quantity) {
      const ingredientSubItem = document.createElement("p");
      ingredientSubItem.setAttribute("class", "fw-light");
      ingredientSubItem.textContent = `${quantity} ${unit}`;
      ingredientBlock.appendChild(ingredientSubItem);
    }
  }

  const timeParagraph = document.createElement("p");
  timeParagraph.classList.add("reciepe-time");
  timeParagraph.textContent = `${time} min`;
  wrapTextRecipe.appendChild(timeParagraph);

  const applianceInfo = document.createElement("span");
  applianceInfo.setAttribute("class", "hidden appliance-info");
  applianceInfo.textContent = appliance;
  // applianceInfo.setAttribute("class","hidden appliance-info")
  wrapTextRecipe.appendChild(applianceInfo);

  const ustensileInfo = document.createElement("span");
  ustensileInfo.setAttribute("class", "hidden ustensile-info");
  ustensileInfo.textContent = ustensils;

  // ustensileInfo.setAttribute("class","hidden ustensile-info")
  wrapTextRecipe.appendChild(ustensileInfo);

  return articleRecipe;
}

export function maskReciepe() {
  const allRecipe = document.querySelectorAll("article");
  allRecipe.forEach((recipe) => {
    recipe.style.display = "none";
  });
}
