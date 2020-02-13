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

  function clearForm(){
    let bookFormDiv = document.getElementById("book-form")
    bookFormDiv.innerHTML = ''
}

// function attachClickTobookList(){
//   let books = document.querySelector("#book-list")
//   books.forEach(book =>{
//       book.addEventListener('click', displayBook)
//   })
// }

//show form 
function displayCreateForm(){
  let bookFormDiv = document.getElementById("book-form") 
  let html = `
      <form onsubmit="createBook();return false;">
      <label>Title</label>
      <input type ="text" id="title"></br>
      <label>Author</label>
      <input type ="text" id="author"></br>
      <input type ="submit" value="Create book">
  `
  bookFormDiv.innerHTML = html
}

//add new book to database and page

function createBook(){
  const book = {
      title: document.getElementById('title').value,
      author: document.getElementById('author').value
  }
  fetch(BASE_URL+'/books',{
      method: "POST",
      body: JSON.stringify(book),
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
      }
  })
  .then(resp => resp.json())
  .then(book => {
      document.querySelector('#book-list').innerHTML += `
      <li><a href="#" data-id="${book.id}">${book.title}</a>
       - ${book.author}
       <button data-id=${book.id} onclick="editbook(${book.id})"; return false;>Edit</button>
       <button data-id=${book.id} onclick="removebook(${book.id})"; return false;>Delete</button>
       </li>
      `
      // attachClickTobookLinks()
      clearForm()
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