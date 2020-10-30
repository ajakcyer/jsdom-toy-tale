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


  //// START: make fetch GET request to get all his toys
  fetch('http://localhost:3000/toys')
  .then(response => response.json())
  .then(data =>{
    renderAllToys(data)
  })
  /////// END



  /// START: Event listener for form submit preventing default
  const newToyForm = document.querySelector('.add-toy-form')
  newToyForm.addEventListener('submit', event=>{
    event.preventDefault()
    const form = event.target

    ///need toy object
    const newToy = {
      'name': form.name.value,
      'image': form.image.value,
      'likes': 0
    }

    //toyObjConfig to add to fetch request
    const toyObjConfig = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(newToy)
    }
    
    ////make fetch POST request to add toys from form with toyObjConfig
    fetch("http://localhost:3000/toys", toyObjConfig)
    .then(response => response.json())
    .then(data =>{
      renderToy(data)
    })
    .catch(error =>{
      console.log("error:", error)
    })

    //reset form fields
    form.reset()
  })
  ///// END


  ///START: Increasing toy likes

  //ike button event delegation needs closest relative #toy-collection div
  const toyCollection = document.querySelector('#toy-collection')
  toyCollection.addEventListener('click', event =>{
    if (event.target.matches('.like-btn')){
      //individual like btns:

      /////UPDATE DATABASE BASED ON TEXT FROM SCREEN
      const likeBtn = event.target
      const toyCard = likeBtn.parentNode
      const likeP = toyCard.querySelector('p')
      const currentLikes = parseInt(likeP.textContent)

      const toyObjConfig = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          'likes': currentLikes + 1
        })
      }
      
      /////fetch PATCH request
      fetch(`http://localhost:3000/toys/${toyCard.dataset.id}`, toyObjConfig)
      .then(response => response.json())
      .then(object =>{
        ///UPDATE DOM BASED ON NEW INFO FROM DATABASE
        updateLikes(object)
      })
      .catch(console.log)


      //////GET TOY DATASET ID FROM OBJECT RESPONSE
      const updateLikes = (newToy) =>{
        const toyId = document.querySelector(`[data-id="${newToy.id}"]`)
        const toyLikes = toyId.querySelector('p')
        toyLikes.innerHTML = `${newToy.likes} Likes`
      }

    }
  })

  //// END

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