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

// récupere le tableau des tags
  export function updateTagsArray() {
  const selectedTags = Array.from(document.querySelectorAll('.tag')).map(tag => tag.textContent);
  console.log(selectedTags)
  return selectedTags
}