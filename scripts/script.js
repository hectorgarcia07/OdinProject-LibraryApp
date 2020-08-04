var addBook = document.getElementById("add-book-btn");
var closeForm = document.getElementById("close-form");

addBook.addEventListener("click", function(){
    document.querySelector(".popup").style.display = "flex";
});

closeForm.addEventListener("click", function(){
    document.querySelector(".popup").style.display = "none";
});

let myLibrary = [];

function Book() {
    // the constructor...
}

function addBookToLibrary() {
    
}
