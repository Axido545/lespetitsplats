async function getRecipes() {
    try {
      const response = await fetch("data/recipes.js");
      console.log(response);
      if (!response.ok) {
        throw new Error(
          "Une erreur s'est produite lors de la récupération des données des photographes.",
        );
      } else {
      }
      const data = await response.json();
      console.log(data);
      return { recipes: data };
    } catch (error) {
      console.error(error);
      return { recipes: [] }; // Retourne un tableau vide en cas d'erreur
    }
  }
  async function displayData(recipes) {
    const recipesSection = document.querySelector(".recipes-section");

    // Vérifier que recipes est un tableau avant d'utiliser forEach
    if (!Array.isArray(recipes)) {
        console.error("Les données des recettes ne sont pas valides.", recipes);
        return;
    }

    recipes.forEach((recipe) => {
        const recipeModel = photographerFactory(recipe);
        const userCardDOM = recipeModel.getUserCardDOM();
        recipesSection.appendChild(userCardDOM);
    });
}
async function init() {
    try {
        // Récupère les données des recettes
        const response = await fetch("data/recipes.js");
        if (!response.ok) {
            throw new Error("Une erreur s'est produite lors de la récupération des données des recettes.");
        }

        const data = await response.json();

        // Vérifiez le contenu des données récupérées
        console.log(data);

        // Assurez-vous que data est un tableau valide contenant les données des recettes
        if (!Array.isArray(data)) {
            throw new Error("Les données des recettes ne sont pas valides.");
        }

        // Afficher les données des recettes
        displayData(data);
    } catch (error) {
        console.error(error);
    }
}

init();


  