let addBook = document.getElementById("add-book-btn");
let closeForm = document.getElementById("close-form");
let submitBtn = document.getElementById("submitBtn");
let myLibrary = [];
let getTitle = document.getElementById("title");
let getAuthor = document.getElementById("author");
let bookContainer = document.getElementById("bookContainer");
let checkIfValid = document.getElementById("form");

//add book to array on submit
submitBtn.addEventListener("click", function(){
    event.preventDefault();
    
    //only add and display book if form has information
    if (checkIfValid.checkValidity()){
        myLibrary.push(addBookToLibrary());//adds book obj to array
        document.querySelector(".popup").style.display = "none";//hide popup
        render(); //display all books
    }
    else{
        checkIfValid.reportValidity();
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
function Book(title, author, status) {
    this.title = title;
    this.author = author;
    this.status = status;
}

//returns Book object
function addBookToLibrary() {
    let getStatus = document.getElementsByName("read");
    let readStatus = false;
    if (getStatus[0].checked) {
        readStatus = true;
    }
    return new Book(getTitle.value, getAuthor.value, readStatus);
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
        //add book column to row
        row.appendChild(createBookCol(i));
    }
}

//will create a column cointaining book information
function createBookCol(index) {
    let bookItem = document.createElement('div');
    let bookTitle = document.createElement('h2');
    let bookContent = document.createElement('p');
    let checkbox = createReadStatus(index);//builds checkbox status

    bookTitle.className = "fit-text";
    bookContent.className = "fit-text book-info";

    //adds style to the column
    bookItem.className = "book-item";

    //adds information to the column
    bookTitle.innerText = myLibrary[index].title;
    bookContent.innerText = myLibrary[index].author;

    //builds the book column
    bookItem.appendChild(createCloseBtn(index));
    bookItem.appendChild(bookTitle);
    bookItem.appendChild(bookContent);
    bookItem.appendChild(checkbox);

    return bookItem;
}

function createCloseBtn(index){
    let bookBtnContainer = document.createElement('div');
    bookBtnContainer.className = "book-form-close-btn";

    let closeBtn = document.createElement('i');
    closeBtn.index = index;

    //if clicked, delete object from array and re-render existing objs
    closeBtn.addEventListener("click", function () {
        myLibrary.splice(index, 1);
        render();
    });
    
    closeBtn.classList.add("fa", "fa-close", "close-form-btn");
    closeBtn.style.fontSize = "32px";
    bookBtnContainer.appendChild(closeBtn);
    
    return bookBtnContainer;
}

//will create the books reading status if read
function createReadStatus(index){
    let wrapper = document.createElement("div");
    let readStatusOn = document.createElement("input");
    let readStatusLabelOn = document.createElement("label");
    let readStatusOff = document.createElement("input");
    let readStatusLabelOff = document.createElement("label");

    wrapper.className = "radio-selection readToggle";
    wrapper.appendChild(readStatusOn);
    wrapper.appendChild(readStatusLabelOn);
    wrapper.appendChild(readStatusOff);
    wrapper.appendChild(readStatusLabelOff);

    readStatusOn.id = `onInput-${index}`;
    readStatusOn.type = "radio";
    readStatusLabelOn.setAttribute("for", `onInput-${index}`);
    readStatusLabelOn.innerText = "Reading";
    readStatusOff.id = `offInput-${index}`;
    readStatusOff.type = "radio";
    readStatusLabelOff.setAttribute("for", `offInput-${index}`);
    readStatusLabelOff.innerText = "Not Reading";
    readStatusLabelOn.className = "book-info form-section-label";
    readStatusLabelOff.className = "book-info form-section-label";
    readStatusOn.name = `readStatus-${index}`;
    readStatusOff.name = `readStatus-${index}`;

    if(myLibrary[index].status){
        readStatusOn.checked = true;
    }
    else{
        readStatusOff.checked = true;
    }

    [readStatusOn, readStatusOff].forEach(radio => radio.addEventListener('click', function (){
        if (readStatusOn.checked) {
            myLibrary[index].status = true;
        }
        else {
            myLibrary[index].status = false;
        }
    }));

    return wrapper;
}

