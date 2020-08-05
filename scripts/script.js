let addBook = document.getElementById("add-book-btn");
let closeForm = document.getElementById("close-form");
let submitBtn = document.getElementById("submitBtn");
let myLibrary = [];
let getTitle = document.getElementById("title");
let getAuthor = document.getElementById("author");
let bookContainer = document.getElementById("bookContainer");

//add book to array on submit
submitBtn.addEventListener("click", function(){
    event.preventDefault();

    if(getTitle.value != "" && getAuthor.value != ""){
        myLibrary.push(addBookToLibrary(myLibrary.length));
        document.querySelector(".popup").style.display = "none";
        render(); //display all books
    }
})

//open popup form to add book
addBook.addEventListener("click", function(){
    document.querySelector(".popup").style.display = "flex";
});
//close form when clicked
closeForm.addEventListener("click", function(){
    document.querySelector(".popup").style.display = "none";
});

//Book object
function Book(title, author, index) {
    this.title = title;
    this.author = author;
    this.index = index;
}

//returns Book object
function addBookToLibrary(index) {
    let book = new Book(getTitle.value, getAuthor.value, index);
    return book;
}

//displays all the books in the myLibrary array
//max number of columns per row is 5
function render(){
    let max = 5;

    //remove all boooks
    bookContainer.innerHTML = "";

    //add all books
    for(let i = 0; i < myLibrary.length; i++){
        //create new row
        if(i % max == 0){
            var row = document.createElement('div');
            row.className = "book-row";
            bookContainer.appendChild(row);
        }
        row.appendChild(createBookCol(i));
    }
}

function createCloseBtn(){
    let bookBtnContainer = document.createElement('div');
    bookBtnContainer.className = "book-form-close-btn";

    let closeBtn = document.createElement('i');
    //deletes item if clicked
    closeBtn.addEventListener("click",function(){
        myLibrary.splice(this.index, 1);
    })
    closeBtn.classList.add("fa", "fa-close", "close-form-btn");
    closeBtn.style.fontSize = "32px";
    bookBtnContainer.appendChild(closeBtn);
    return bookBtnContainer;
}

function createBookCol(index){
    let bookItem = document.createElement('div');

    //adds book contents to column
    bookItem.className = "book-item";
    //adds close button 
    bookItem.appendChild(createCloseBtn());
    bookItem.innerHTML += '<h2>' + myLibrary[index].title + '</h2>'
    bookItem.innerHTML += '<p> Author: ' + myLibrary[index].title + '</p>'
    return bookItem;
}