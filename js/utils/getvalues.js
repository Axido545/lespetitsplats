export function firstInputValue() {
    const inputValue = document.getElementById("searchInput").value;
  
    if (inputValue.length <= 2) {
      return []; // Retourne un tableau vide si la valeur a moins de 3 caractères
    }
  
    return inputValue; // Sinon, retourne le résultat de splitKeyword
  }