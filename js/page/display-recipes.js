// fonction  photographerFactory, paramètre data.
function recipeFactory(data) {
    // l'intérieur de la fonction, l'objet data est destructuré pour extraire les propriétés name et portrait.
    const { name, image, servings, ingredients, id } = data;
    // c'est le chemin de l'image
    const picture = `assets/imgs/${image}`;
    const contanerImg = "container-img";
    // fonction getUserCardDOM l'intérieur de la fonction photographerFactory
    function getUserCardDOM() {
      const article = document.createElement("article");
      const divImg = document.createElement("div");
      const img = document.createElement("img");
      const h2 = document.createElement("h2");
 
      // l'attribut source de l'image reprend le chemin plus haut
      img.setAttribute("src", image);
      img.setAttribute("alt", "La photo de la recette");

      divImg.setAttribute("class", contanerImg);
  ;
      // Elle assigne la valeur de name à la propriété textContent de l'élément h2.
      h2.textContent = name;
   
      // Les éléments img et h2 sont ensuite ajoutés à l'élément article.
      article.appendChild(divImg);
      article.appendChild(img);
      divImg.appendChild(img);
      article.appendChild(h2);



    }
    return { name, image, getUserCardDOM };
  }
  