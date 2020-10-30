let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  ////make fetch GET request to get all his toys
  fetch('http://localhost:3000/toys')
  .then(response => response.json())
  .then(data =>{
    renderAllToys(data)
  })

  ///Event listener for form submit preventing default
  const newToyForm = document.querySelector('.add-toy-form')
  newToyForm.addEventListener('submit', event=>{
    event.preventDefault()
    const form = event.target

    ///need toy object
    
    ////make fetch POST request to add toys from form
    console.log(form.name.value)
    console.log(form.image.value)
  })





});


////////HELPER FUNCTIONS///////


//renderAllToys
const renderAllToys = (toyArray) =>{
  toyArray.forEach(toy =>{
    renderToy(toy)
  })
}

//renderOneToy
const renderToy = (toy) =>{
  //parent div to append to
  const toyCollection = document.querySelector('#toy-collection')

  //div container to hold toy card
  const toyCard = document.createElement('div')
  toyCard.classList.add('card')
  toyCard.dataset.id = toy.id
  toyCard.innerHTML = `<h2>${toy.name}</h2>
                        <img src=${toy.image} class="toy-avatar" />
                        <p>${toy.likes} Likes</p>
                        <button class="like-btn">Like <3</button>`
  //append toy card to parent
  toyCollection.append(toyCard)
}