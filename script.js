let myLibrary = []

class Book {
  constructor() {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.added = new Date()
    this.isReadText = () => (this.read === true) ? "Already read" : "Want to read"
  }
  info = () => `${this.title} by ${this.author}. ${pages} pages. ${this.isReadText}. Added on ${this.added}`
  toggleReadStatus = () => this.read = !this.read 
  
  addBookToLibrary = () => {

    // check to make sure the book is not already in the list
    let isInLibrary = myLibrary.some(prevBook => (prevBook.title === this.title && prevBook.author === this.author))
    if(isInLibrary) return
    
    //set the book ID
    let bookId = myLibrary.length + 1
    for (let i=0; i< myLibrary.length; i++) {
      if(myLibrary[i].id >= bookId) bookId = myLibrary[i].id + 1
    }
    this.id = bookId
    
    myLibrary.push(this)
  }
  
    createBookCard = () => {
    const template = `
    <h3 class="book-title">${this.title}</h3>
    <p class="book-author">${this.author}</p>
    <p class="book-pages">${this.pages} pages</p>
    <button class="button read">${this.isReadText()}</button>
    <button class="button remove">Remove</button>
    `
    let newBook = document.createElement("div")
    newBook.classList.add("book")
    newBook.dataset.id = (this.hasOwnProperty('id')) ? this.id : ""
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
  const newBook = new Book()
  newBook.title = addBookForm.title.value
  newBook.author = addBookForm.author.value
  newBook.pages = parseInt(addBookForm.pages.value)
  newBook.read = addBookForm.read.checked
  
  newBook.addBookToLibrary()
  newBook.createBookCard()
  
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
const theHobbit = new Book()
theHobbit.title = "The Hobbit"
theHobbit.author = "J.R.R. Tolkien"
theHobbit.pages = 295
theHobbit.checked = true

const myths01 = new Book()
myths01.title = "Mythos",
myths01.author =  "Stephen Fry"
myths01.pages = 352
myths01.checked = true

const myths02 = new Book()
myths02.title = "Heroes",
myths02.author =  "Stephen Fry"
myths02.pages = 352
myths02.checked = false

const myths03 = new Book()
myths03.title = "Troy",
myths03.author =  "Stephen Fry"
myths03.pages = 288
myths03.checked = false

theHobbit.addBookToLibrary()
myths01.addBookToLibrary()
myths02.addBookToLibrary()
myths03.addBookToLibrary()
myths03.addBookToLibrary()

console.log(myLibrary)

const createBookCards = () => {
  main.innerHTML = ""
  myLibrary.forEach(book => book.createBookCard())
}

createBookCards()

