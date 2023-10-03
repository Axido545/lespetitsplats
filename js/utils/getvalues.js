
export function firstInputValue() {
    const inputValue = document.getElementById("searchInput").value;
  
    if (typeof inputValue !== 'string' || inputValue.length <= 2) {
      return []; // Retourne un tableau vide si la valeur a moins de 3 caractères
    }
    // var keywords = splitKeyword(inputValue);
    return inputValue;
  }


  export function IngredientInputValue() {
    const IngredientinputValue = document.getElementById("ingredientSearch").value;
  
    if (IngredientinputValue.length <= 2) {
      return []; // Retourne un tableau vide si la valeur a moins de 3 caractères
    }
  
    return IngredientinputValue;
  }


