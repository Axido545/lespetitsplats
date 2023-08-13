import { recipes } from '../data/recipes.js';

export function dispayIngredient() {
  const searchIngredient = document.getElementById("ingredientSearch") ;  // Convertir en minuscules pour une recherche insensible à la casse
      const tagContainer = document.querySelector(".selected-tags");


  searchIngredient.addEventListener('keyup', function() {
    const myIngredient = searchIngredient.value.trim();
    const lowerCaseMyIngredient = myIngredient.toLowerCase();

    const result = recipes.filter(recipe => {
      const lowerCaseIngredients = recipe.ingredients.map(ingredient => ingredient.ingredient.toLowerCase()).join(' ');
      return lowerCaseIngredients.includes(lowerCaseMyIngredient);
    });

    console.log(result);

    let suggestionsHTML = "";

    result.forEach(recipe => {
      recipe.ingredients.forEach(ingredient => {
        if (ingredient.ingredient.toLowerCase().includes(lowerCaseMyIngredient)) {
          suggestionsHTML += `
            <div class="suggestion" data-ingredient="${ingredient.ingredient}">${ingredient.ingredient}</div><br/>
          `;
        }
      });
    });
    const suggestionsContainer = document.querySelector(".all-suggestions");
    suggestionsContainer.innerHTML = suggestionsHTML;

    // Ajouter un gestionnaire d'événements pour créer un "tag" lorsque l'utilisateur clique sur une suggestion
    const suggestionElements = document.querySelectorAll(".suggestion");
    suggestionElements.forEach(suggestionElement => {
      suggestionElement.addEventListener("click", function() {
        const selectedIngredient = this.getAttribute("data-ingredient");
        createTag(selectedIngredient);
      });
    });
  });

// Supposons que "tagContainer" est l'élément parent où vous créez vos balises.

// // Code pour créer une balise et son bouton de fermeture.
// function createTag(tagText) {
//   const tagElement = document.createElement('div');
//   tagElement.className = 'tag'; // Appliquez des styles CSS si nécessaire.
  
//   const tagTextElement = document.createElement('span');
//   tagTextElement.textContent = tagText;
  
//   const closeTag = document.createElement('i');
//   closeTag.setAttribute("class", "x close-tag")
//   // closeTag.textContent = 'X';
  
//   tagElement.appendChild(tagTextElement);
//   tagElement.appendChild(closeTag);
//   tagContainer.appendChild(tagElement);
  
//   // Ajouter un gestionnaire d'événements au bouton de fermeture.
//   closeTag.addEventListener('click', function() {
//       tagElement.style.display = "none";
//       console.log("La balise a été fermée : " + tagText);
//   });
// }

// }


  // // Fonction pour créer un "tag"
  // function createTag(ingredient) {
  //   const tagContainer = document.querySelector(".selected-tags");
  
  //   // Vérifier si le tag existe déjà
  //   const existingTag = Array.from(tagContainer.querySelectorAll(".tag")).find(tag => tag.textContent === ingredient);
  
  //   if (!existingTag) {
  //     const tagElement = document.createElement("div");
  //     tagElement.classList.add("tag");
  //     tagElement.innerHTML =`${ingredient}    <span class="close-tag">x</span>` ;
  //     tagContainer.appendChild(tagElement);


  //     const closeTag = document.querySelector(".close-tag")



  //     const tagToDelet = document.querySelector(".tag")

    


  //     closeTag.addEventListener('click', function(){
  //       tagToDelet.style.display ="none"
  //       console.log("il ve se fermer la le tag")
      
  //     })


  //   }

  // }

// Code pour créer une balise et son bouton de fermeture.
function createTag(tagText) {
  const tagElement = document.createElement('div');
  tagElement.className = 'tag'; // Appliquez des styles CSS si nécessaire.
  
  const tagTextElement = document.createElement('span');
  tagTextElement.textContent = tagText;
  
  const closeTag = document.createElement('i');
  closeTag.setAttribute("class", "fa-solid fa-xmark close-tag")
  
  tagElement.appendChild(tagTextElement);
  tagElement.appendChild(closeTag);
  tagContainer.appendChild(tagElement);
  
  // Ajoute un gestionnaire d'événements au bouton de fermeture.
  closeTag.addEventListener('click', function() {
      tagElement.style.display = "none";
      console.log("La balise a été fermée : " + tagText);
  });
}


  
}

// searchIngredient.addEventListener("keyup", () => {
//   const myIngredient = searchIngredient.value.trim();
//   const filteredIngredients = searchMyIngredient(myIngredient);
//   displayFilteredIngredients(filteredIngredients);
// });

// function searchMyIngredient(myIngredient) {
//   const lowerCaseMyIngredient = myIngredient.toLowerCase();

//   const filterIngredients = recipes.filter(recipe => {
//     const lowerCaseIngredients = recipe.ingredients.map(ingredient => ingredient.ingredient.toLowerCase()).join(' ');
//     return lowerCaseIngredients.includes(lowerCaseMyIngredient);
//   });

//   return filterIngredients;
// }

// export function displayFilteredIngredients(filterIngredients) {
//   console.log(filterIngredients);

//   const allIngredientItems = document.querySelectorAll('.suggestion');

//   for (const ingredientItem of allIngredientItems) {

//     const recipeIngredients = ingredientItem.querySelector('.ingredient-Item-name').textContent.trim();

//     const isIngredientIncluded = filterIngredients.filter(recipe => {
//       const lowerCaseIngredients = recipe.ingredients.map(ingredient => ingredient.ingredient.toLowerCase()).join(' ');

//       return lowerCaseIngredients.includes(recipeIngredients.toLowerCase());
//     }).length > 0;

//     if (isIngredientIncluded) {
//       ingredientItem.style.display = 'block';
//     } else {
//       ingredientItem.style.display = 'none';
//     }
//   }
// }



