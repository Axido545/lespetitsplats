export function firstInputValue(){
  const FirstinputValue = document.getElementById("searchInput").value;
  if (FirstinputValue.length > 2){
    var elts = ArrayLowerCase(FirstinputValue);
    return elts;
  }
  return [];
}

function ArrayLowerCase(inputString){
  const inputArray = inputString.split(" ");
  const ArrayLowerCase = inputArray.map(element => {
    return element.toLowerCase();
  });
  return ArrayLowerCase;
}

  // export function IngredientInputValue() {
  //   const inputArray = localStorage.getItem("ingredients");
  //     if(inputArray == null){
  //       return [];
  //     } else {
  //       const inputArraySplit = inputArray.split("||");
  //       return inputArraySplit;
  //     }
  // }


  export function IngredientInputValue() {
    var tableauRecupere = localStorage.getItem("ingredients");
    if(tableauRecupere == null){
      return [];
    }
    else {
      var tableauSplit = tableauRecupere.split("||");
      return tableauSplit;
    }
  }

