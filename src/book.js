class Book {
    constructor(book) {
        this.id = book.id
        this.title = book.title
        this.author = book.author
        this.link = book.link
        this.imageLink = book.imageLink
        this.language = book.language
        this.page = book.page
        this.year = book.year
        this.country = book.country
        this.comments = book.comments
    }

    render(){
        // debugger
        let books_container = document.querySelector('.container')
        let book_div = document.createElement('div')
        book_div.setAttribute("data-id",this.id)
        book_div.classList.add("book");
        let book_img = document.createElement('img')
        let bLink = `./src/${this.imageLink}`
        book_img.src = bLink
  
        // add title 
        book_div.innerHTML += `<h3>${this.title}</h3>`
   
        let comment_div = document.createElement('div')
        comment_div.classList.add("comments");
        book_div.append(comment_div)
  
        //add comments 
        this.comments.forEach(comment => {
        comment_div.innerHTML += `<br>${comment.content} - ${comment.comment_type}<br>`
        })
   
        //add comment link
        book_div.innerHTML += `<a href="#" onclick='displayCreateCommentForm();return false;'>Add a Comment</a>`
  
        books_container.appendChild(book_div)
      
        book_div.appendChild(book_img)
    }

    renderNewBook(){
     let book_area = document.querySelector('#book-list')
     book_area.innerHTML += `
      <li><a href="#" data-id="${this.id}">${this.title}</a>
       - ${this.author} ${this.imageLink}
       <button data-id=${this.id} onclick="editbook(${this.id})"; return false;>Edit</button>
       <button data-id=${this.id} onclick="removebook(${this.id})"; return false;>Delete</button>
       </li>
      `
    }


}

