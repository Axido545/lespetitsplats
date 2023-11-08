import { checkValeur } from "../suggestions.js";



export function addNewTag(element,name,id,isSelected) {
  const suggestions = document.getElementById(id);
  console.log(document.getElementById("suggestions-ingredients"))
  const li = document.createElement("li");
  li.setAttribute('class','suggestion ')
  li.setAttribute("name",name);
  if(isSelected){
      const btncloseTag = document.createElement("i");
      const content = document.createElement("span");
      btncloseTag.classList.add("fa-solid","fa-xmark");
      content.textContent = element;
      li.appendChild(btncloseTag);
      li.appendChild(content);
      li.classList.add("selected");
  }    
  li.textContent = element;
  suggestions.appendChild(li);
}

  export function createTag(element,name, isSelected){
    const tagSection = document.getElementById("tags");
    if(isSelected){
        const div = document.createElement("div");
        div.setAttribute("id","tagElement");
        const btncloseTag = document.createElement("i");
        xMark.classList.add("fa-solid","fa-xmark");
        const span = document.createElement("span");
        div.setAttribute("name",name);
        span.textContent = element;
        div.appendChild(span);
        div.appendChild(btncloseTag);
        
        tagSection.appendChild(div);
    }
}




function deleteTags(){
  const tags = document.getElementById("tag");
  while (tags.firstChild) {
    tags.removeChild(tags.firstChild);
  }
}

export function AddTags(list,name,id){
  list.forEach(element => {
    var isSelected = checkValeur(name,element);
    // createSelectCard(element,name,id,isSelected);
    addNewTag(element,name,id,isSelected);
 });
}


