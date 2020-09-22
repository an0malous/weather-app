export const loadingSpinner = document.querySelector("#loading-spinner");

export const generateLabel = (tag, prependTo, id , className) => {
  if(document.querySelector(`#${id}`)){
    document.querySelector(`#${id}`).remove()
  }
  const label = document.createElement(tag)
  if(className){
    label.classList.add(className)
  }
  if(id){
    label.id = id
  }
  prependTo.prepend(label)
 
  return document.querySelector(`#${id}`)
}




  