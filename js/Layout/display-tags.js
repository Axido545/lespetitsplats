// export function displaySuggestions() {
//     // Sélection de tous les éléments 
//     const ingredientsElements = document.querySelectorAll(".ingredient-Item-name");
//     const appareilsElements = document.querySelectorAll(".appliance-info");
//     const istensilesElements = document.querySelectorAll(".ustensile-info");
  
  
//     // Mise en place d'un tableau pour stocker les éléments uniques
//     const ingredients = [];
//     const appareils = [];
//     const ustensiles = [];
  
  
  
//     // Parcourir les éléments et les filtrer
//     ingredientsElements.forEach(element => {
//       const ingredient = element.textContent.toLowerCase().trim();
//       ingredients.push(ingredient);
//     });
//     appareilsElements.forEach(element => {
//       const appareil = element.textContent.toLowerCase().trim();
//       appareils.push(appareil);
//     });
//     istensilesElements.forEach(element => {
//       const ustensile = element.textContent.toLowerCase().trim();
//       ustensiles.push(ustensile);
//     });
  
//     // Mise a jour des suggestions unique
//     removePluralIfSingularExists(ingredients,appareils,ustensiles); 
  
//     // Liste HTML avec les éléments filtrés
//     const suggestionsHTMLingredient =
    
//     uniqueIngredients.map(ingredient => `
//       <li class="suggestion" data-ingredient="${ingredient}">${ingredient}</li>
//     `).join("");
  
//     const suggestionsHTMLappareil =
  
//     uniqueAppareils.map(appareil => `
//       <li class="suggestion" data-ingredient="${appareil}">${appareil}</li>
//     `).join("");
  
//     // const suggestionsHTMLustensile =
//     uniqueUstensiles.map(ustensile => `
//       <li class="suggestion" data-ingredient="${ustensile}">${ustensile}</li>
//     `).join("");
  
//     const suggestionsHTMLustensile = uniqueUstensiles.map(ustensile =>
//       ustensile.split(',').map(item => item.trim()))
//     .map(ustensilList => ustensilList.map(item => `
//     <li class="suggestion" data-ingredient="${item}">${item}</li>
//     `).join(""));
    
  
  
//     // Insertion de la liste dans un élément HTML 
//     const suggestionsContainerIngredient = document.querySelector(".suggestions-ingredients");
//     suggestionsContainerIngredient.innerHTML = `<ul>${suggestionsHTMLingredient}</ul>`;
  
//     const suggestionsContainerAppareil = document.querySelector(".suggestions-appareils");
//     suggestionsContainerAppareil.innerHTML = `<ul>${suggestionsHTMLappareil}</ul>`;
  
//     const suggestionsContainerUstensile = document.querySelector(".suggestions-ustensiles");
//     suggestionsContainerUstensile.innerHTML = `<ul>${suggestionsHTMLustensile}</ul>`;
  
  
//     // Ajout du gestionnaire d'événement pour l'autocomplétion
//     const inputSuggestion = document.getElementById("ingredientSearch");
//     inputSuggestion.addEventListener("input", function () {
//       const searchTerm = inputSuggestion.value.toLowerCase().trim();
//       const filteredIngredients = uniqueIngredients.filter(ingredient =>
//         ingredient.includes(searchTerm)
//       );
  
//       // Affiche les ingrédients filtrés en tant qu'autocomplétion
//       // updateSuggestionsList(filteredIngredients);
//     });
//   }
  
export function displayTags(element,name,id,isSelected) {
    const suggestions = document.getElementById("suggestions-ingredients");
    const li = document.createElement("li");
    li.setAttribute('class','suggestion ')
    li.setAttribute("name",name);

    if(isSelected){
        const crossTag = document.createElement("i");
        const content = document.createElement("span");
        crossTag.classList.add("fa-solid","fa-xmark");
        content.textContent = element;
        li.appendChild(crossTag);
        li.appendChild(content);
        li.classList.add("selected");
    }    
    li.textContent = element;
    suggestions.appendChild(li);
}