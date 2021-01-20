const newBook = document.querySelectorAll('#newBook')
const btnCancel = document.querySelectorAll('.btnCancel')
const submit = document.querySelectorAll('.submitBtn')
// const form = document.querySelectorAll('#bookForm')
//create a button to create a book from a form
newBook.forEach(newBook => {
    newBook.addEventListener('click', function(){
        document.getElementById('bookForm').style.display = 'block'
    })
})

//create a button within the form that closes out the form
btnCancel.forEach(btnCancel => {
    btnCancel.addEventListener('click', function(){
        event.preventDefault()
        document.getElementById('bookForm').style.display = 'none'
    })
})
//create a button that submits the new book to the libray
submit.forEach(submit =>{
    submit.addEventListener('click', addBookToLibrary)
})
//prototype for the book info
function Book(title, author, pages, read){
    this.title = title.value
    this.author = author.value
    this.pages = pages.value + 'pages'
    this.read = read.checked
}

//create a reset function for the form
function ResetForm(){
    document.getElementById('form').reset()
}

let myLibrary = [];
let bookInfo;
//a function that pushes the info from the form to the library and hides the form
function addBookToLibrary(){
    event.preventDefault()
    document.getElementById('bookForm').style.display = 'none'
    bookInfo = new Book(title, author, pages, read);
    myLibrary.push(bookInfo)
    bookShelf()
    storeBook()
    ResetForm()

}

//a function that goes into addBookToLibrary that appends the most recent book info into the library
function bookShelf(){
    const library = document.getElementById('libraryContainer');
    const books = document.querySelectorAll('.book');
    books.forEach(book => library.removeChild(book))

    for(let i = 0; i < myLibrary.length; i++)
    createBook(myLibrary[i])

}
//function that handles dom manipulation to go into the library array
function createBook(item){
    const library = document.querySelector('#libraryContainer');
    const book = document.createElement('div');
    book.classList.add('book');
    book.setAttribute('div', myLibrary.indexOf(item))
    

    const titleName = document.createElement('div');
    titleName.textContent = item.title
    titleName.classList.add('title');
    book.appendChild(titleName);

    const authorName = document.createElement('div');
    authorName.textContent = item.author;
    authorName.classList.add('author')
    book.appendChild(authorName);

    const pageNum = document.createElement('div');
    pageNum.textContent = item.pages;
    pageNum.classList.add('pages');
    book.appendChild(pageNum);

    const haveRead = document.createElement('button');
    haveRead.classList.add('read');
    if(item.read === false){
        haveRead.textContent = 'Not read yet'
        haveRead.style.backgroundColor = 'red'
    }else {
        haveRead.textContent = 'Read'
        haveRead.style.backgroundColor = 'green'
    }

    haveRead.addEventListener('click', function(){
        item.read = !item.read;
        storeBook()
        bookShelf()
    })

    book.appendChild(haveRead);

    const remove = document.createElement('button');
    remove.textContent = 'remove';
    remove.classList.add('remove');

    remove.addEventListener('click', function(){
        myLibrary.splice(myLibrary.indexOf(item),1);
        storeBook()
        bookShelf()
    })

    book.appendChild(remove)
    
    library.appendChild(book)
}
//sets books to be stored in local storage
function storeBook(){
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
}

function store() {
    if(!localStorage.myLibrary){
        bookShelf()
    }else {
        let pullBook = localStorage.getItem('myLibrary');
        pullBook = JSON.parse(pullBook)
        myLibrary = pullBook;
        bookShelf()
    }
    
}

store()
