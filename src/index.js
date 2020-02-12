const BASE_URL = 'http://localhost:3000'
document.addEventListener("DOMContentLoaded", function() {
    console.log('HI-C', 'color: firebrick');
     fetchBooks()
    // fetchDogBreeds()
    // handleClickBreed()
  })

   function fetchBooks() {
    fetch(BASE_URL+'/books')
    .then(resp => resp.json())
    .then(books => renderBooks(books));
   }



  function renderBooks(books) {
    const books_container = document.querySelector('.container')
    books_container.innerHTML = ""; 
    books.forEach(book => {
      let book_div = document.createElement('div')
      // add image 
      let book_img = document.createElement('img')
      let bLink = `./src/${book.imageLink}`
      book_img.src = bLink
      // add title 
      book_div.innerHTML += `<h4>${book.title}</h4>`

      books_container.appendChild(book_div)
      book_div.appendChild(book_img)


    })
  }

//   function fetchDogBreeds() {
//     fetch('https://dog.ceo/api/breeds/list/all')
//     .then(resp => resp.json())
//     .then(breeds => renderBreeds(Object.keys(breeds.message)));
//   }

//   function renderBreeds(breeds) {
//     const dog_breeds = document.getElementById('dog-breeds')
//     breeds.forEach(breed => {
//       const li = document.createElement('li')
//     //  li.innerHTML = `${breed}`
//       li.innerHTML = `<p class='breed_name'>${breed}</p>`
//     //    li.setAttribute("class", "d")
//       dog_breeds.appendChild(li)
//       li.style.cursor = 'pointer';
//       li.addEventListener("click", handleClickBreed)
//     })
//   }

//   function handleClickBreed(event) {
//         event.target.style.color = "lightblue"; 
//     } 

    //Still Need to Filter Breeds
  //function 

// document.getElementById("myDiv").style.color = "lightblue";