let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
    } else {
      toyForm.style.display = "none";
    }
  });

  fetchToyData();
  createNewToyEventListener();

});

function fetchToyData(){

  fetch("http://localhost:3000/toys")
  .then(response => response.json())
  .then(jsonData => {

    jsonData.forEach((object) =>  {
      let toyId = object['id'];
      let toyName = object['name'];
      let toyImageSource = object['image'];
      let likes = object['likes'];

      let toyCard = document.createElement('div')
        toyCard.className = "card"

      let toyNameHeader = document.createElement('h2')
        toyNameHeader.innerHTML = toyName

      let toyImg = document.createElement('img')
        toyImg.className = "toy-avatar"
        toyImg.src = toyImageSource

      let toyLikes = document.createElement('p')
        toyLikes.innerHTML = likes + ` likes`

      let likeButton = document.createElement('button')
        likeButton.className = "like-btn"
        likeButton.innerHTML = "Like <3"
        likeButton.addEventListener('click', function(e) {
          let addLike = parseInt(e.target.previousElementSibling.innerText) + 1

          fetch(`http://localhost:3000/toys/${toyId}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json"
            },

            body: JSON.stringify({
              "likes": addLike
            })
          } )
          .then(res => res.json())
          .then((like_obj => {
            e.target.previousElementSibling.innerText = `${addLike} likes`;
          }))
        });

      let toyCollection = document.getElementById('book-collection')
      toyCollection.appendChild(toyCard);
      toyCard.appendChild(toyNameHeader);
      toyCard.appendChild(toyImg);
      toyCard.appendChild(toyLikes);
      toyCard.appendChild(likeButton);

    });

  });


}

function createNewToyEventListener (){
  const addToyForm = document.querySelector('.add-toy-form')
  addToyForm.addEventListener('submit', function(event){
    event.preventDefault();
    let toyName = event.target.getElementsByTagName("input")[0].value
    let toyImageSource = event.target.getElementsByTagName("input")[1].value

    fetch("http://localhost:3000/toys", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            body: JSON.stringify({
            "name": `${toyName}`,
            "image": `${toyImageSource}`,
            "likes": 0
            })
      })

  })
}