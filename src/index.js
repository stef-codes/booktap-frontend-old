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
      book_div.setAttribute("data-id",book.id)
      // add image 
      let book_img = document.createElement('img')
      let bLink = `./src/${book.imageLink}`
      book_img.src = bLink
      // add title 
      book_div.innerHTML += `<br>${book.title}<br>`
      //add comment link
      book_div.innerHTML += `<a href="#" onclick='displayCreateCommentForm();return false;'>Add a Comment</a>`

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
function displayCreateBookForm(){
  let bookFormDiv = document.getElementById("book-form") 
  let html = `
      <form onsubmit="createBook();return false;">
      <label>Title</label>
      <input type ="text" id="title"></br>
      <label>Author</label>
      <input type ="text" id="author"></br>
      <label>Book Link</label>
      <input type ="text" id="link"></br>
      <label>Image URL</label>
      <input type ="text" id="image-link"></br>
      <label>Language</label>
      <input type ="text" id="language"></br>
      <label>Pages</label>
      <input type ="text" id="pages"></br>
      <label>Year</label>
      <input type ="text" id="year"></br>
      <label>Country</label>
      <input type ="text" id="country"></br>
      <input type ="submit" value="Create book">
  `
  bookFormDiv.innerHTML = html
}

//add new book to database and page

function createBook(){
  const book = {
      title: document.getElementById('title').value,
      author: document.getElementById('author').value,
      imageLink: document.getElementById('image-link').value
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
       - ${book.author} ${book.imageLink}
       <button data-id=${book.id} onclick="editbook(${book.id})"; return false;>Edit</button>
       <button data-id=${book.id} onclick="removebook(${book.id})"; return false;>Delete</button>
       </li>
      `
      // attachClickTobookLinks()
      clearForm()
  })
}

// for testing
function fetchBook() {
  let book_id = event.target.parentElement.dataset.id

  fetch(BASE_URL+'/books/'+book_id)
  .then(resp => resp.json())
  .then(book => console.log(book));
 }


//Create Comments Form
function displayCreateCommentForm() {
  let book_id = event.target.parentElement.dataset.id
  let formdiv = document.querySelector('#comment-form')

  fetch(BASE_URL+'/books/'+book_id)
    .then(resp => resp.json())
    .then(book => {

      formdiv.innerHTML = `<h3>${book.title}</h3>`
      let html = `
      <form>
      <input type="hidden" id="book_id" name="book_id" value=${book.id}></br>
      <label>Comment</label>
      <input type ="text" id="content" name="content"></br>
      <label>Type</label>
      <input type ="text" id="comment_type" name-"comment_type"></br>
      <input type="submit">
      </form>
      `
      formdiv.innerHTML += html
      let form = document.querySelector('form')
      form.addEventListener("submit", createComment)
    })
}

function createComment() {
  event.preventDefault()
  // let book_id = event.target.book_id.value

  const comment = {
    content: event.target.content.value,
    comment_type: event.target.comment_type.value,
    book_id: event.target.book_id.value
  }

  fetch(BASE_URL+'/books/'+comment.book_id+'/comments',{
    method: "POST",
    body: JSON.stringify(comment),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  } )
    .then(resp => resp.json())
    .then(data => console.log(data))

      // let newDev = new RpDevice(data)
      // newDev.renderDevice()
      // let formdiv = document.querySelector('#device-form')
      // formdiv.innerHTML = ''
   // )
//}
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