let myLibrary = []

function Book(title, author, pages, read) {
  this.title = title
  this.author = author
  this.pages = pages
  this.read = read
  this.added = new Date()

  this.isReadText = () => (this.read === true) ? "Already read" : "Want to read"

  this.info = () => `${this.title} by ${this.author}. ${pages} pages. ${this.isReadText}. Added on ${this.added}`

  this.toggleReadStatus = () => this.read = !this.read 
}

const addBookToLibrary = (book) => {

  // check to make sure the book is not already in the list
  let isInLibrary = myLibrary.some(prevBook => (prevBook.title === book.title && prevBook.author === book.author))
  if(isInLibrary) return
  
  //set the book ID
  let bookId = myLibrary.length + 1
  for (let i=0; i< myLibrary.length; i++) {
    if(myLibrary[i].id >= bookId) bookId = myLibrary[i].id + 1
  }
  book.id = bookId

  myLibrary.push(book)
}

const createBookCard = (book) => {
  const template = `
    <h3 class="book-title">${book.title}</h3>
    <p class="book-author">${book.author}</p>
    <p class="book-pages">${book.pages} pages</p>
    <button class="button read">${book.isReadText()}</button>
    <button class="button remove">Remove</button>
  `
  let newBook = document.createElement("div")
  newBook.classList.add("book")
  newBook.dataset.id = (book.hasOwnProperty('id'))? book.id : ""
  newBook.innerHTML = template
  main.prepend(newBook)
  newBook.addEventListener("click", (e) => {
    const currentCard = e.target.parentNode
    const currentBookId = parseInt(currentCard.dataset.id)
    const currentBook = myLibrary.filter(book => book.id === currentBookId)[0]

    if (e.target.classList.contains("remove")) {
  
      // remove from array
      myLibrary = myLibrary.filter(book => book.id !== currentBookId)
  
      // delete node
      main.removeChild(currentCard)
    }

    else if (e.target.classList.contains("read")) {
      
        currentBook.toggleReadStatus()
        e.target.textContent = currentBook.isReadText()
    }
    else return
  }) 
}


/* page setup */
const openModalBtn = document.getElementById("openModal")
const addBookModal = document.getElementById("addBookModal")
const closeModalBtn = document.getElementById("closeModal")
const addBookForm = document.getElementById("addBookForm")
const addBookBtn = document.querySelector(".add-book-modal .button-submit")
const main = document.querySelector("main")

addBookBtn.addEventListener("click", (e) => {
  e.preventDefault()
  const bookTitle = addBookForm.title.value
  const bookAuthor = addBookForm.author.value
  const bookPages = parseInt(addBookForm.pages.value)
  const bookIsRead = addBookForm.read.checked

  console.log(bookTitle, bookAuthor, bookPages, bookIsRead)
  const newBook = new Book(bookTitle, bookAuthor, bookPages, bookIsRead)
  addBookToLibrary(newBook)
  createBookCard(newBook)
  
  addBookModal.classList.add("display-none")
  addBookForm.reset()
})


openModalBtn.addEventListener("click", () => {
  addBookModal.classList.remove("display-none")
})

addBookModal.addEventListener("click", (e) => {
  if(e.target.matches("#addBookModal") || e.target.matches("#closeModal")) addBookModal.classList.add("display-none")
})

/* add test data to myLibrary */
const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, true)
const myths01 = new Book("Mythos", "Stephen Fry", 352, true)
const myths02 = new Book("Heroes", "Stephen Fry", 352, false)
const myths03 = new Book("Troy", "Stephen Fry", 288, false)
addBookToLibrary(theHobbit)
addBookToLibrary(myths01)
addBookToLibrary(myths02)
addBookToLibrary(myths03)
addBookToLibrary(myths03)
console.log(myLibrary)

const createBookCards = () => {
  main.innerHTML = ""
  myLibrary.forEach(book => createBookCard(book))
}

createBookCards()

