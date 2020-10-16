const addBookBtn = document.getElementById("addBookBtn")
const popupForm = document.getElementById("popup")
const closeFormBtn = document.getElementById("closeFormBtn")
const submitFormBtn = document.getElementById("submitFormBtn")
const titleInput = document.getElementById("titleInput")
const authorInput = document.getElementById("authorInput");
const notReading = document.getElementById("notReading")
const reading = document.getElementById("reading")

const bookCardContainer = document.getElementsByClassName("bookCardContainer")[0]

let library = []

//Opens pop-up form
addBookBtn.onclick = () => popupForm.style.display = "flex"

//Closes pop-up form
closeFormBtn.onclick = (event) => {
    event.preventDefault()
    popupForm.style.display = "none"
}

//will close form and create new bookCard with the info
submitFormBtn.onclick = (event) =>{
    event.preventDefault();

    let titleInfo = titleInput.value
    let authorInfo = authorInput.value
    let readStatus = ""

    if(reading.checked){
        readStatus = "Reading"
    } else if (notReading.checked) {
      readStatus = "Not Reading";
    }

    CreateNewBookCard.newBookCard(titleInfo, authorInfo, readStatus);
    popupForm.style.display = "none"
}

//will hold informations about a book
class Library{
    libraryNode = null; //will hold DOM Node of a BookCard

    constructor(titleInfo, authorInfo, readStatus){
        this.titleInfo = titleInfo
        this.authorInfo = authorInfo
        this.readStatus = readStatus
    }

    //toggles status update 
    toggleStatus(){
        this.readStatus = !this.readStatus
    }

    /* Getters and Setters */
    get title(){
        return this.titleInfo
    }

    get author(){
        return this.authorInfo
    }

    get status(){
        return this.readStatus
    }

    set title(updateTitle){
        this.titleInfo = updateTitle;
    }

    set author(updateAuthor){
        this.authorInfo = updateAuthor
    }

}

const CreateNewBookCard = (() => {
    //will create a new DOM Node containing information provided
    const newBookCard = (titleInfo, authorInfo, readStatus) => {
        let newLibraryInfo = new Library(titleInfo, authorInfo, readStatus)
        newLibraryInfo.libraryNode = createDOMNode(newLibraryInfo)
        library.push(newLibraryInfo);
    }

    //will create a DOM Node for a new BookCard 
    const createDOMNode = (newLibraryInfo) => {
        let bookCardDiv = createDOMNodeHelper("div", "bookCard", "")
        let bookNodeArr = createDOMBookContent(newLibraryInfo)

        console.log(bookCardDiv)


        bookNodeArr.forEach((DOMNode) => bookCardDiv.appendChild(DOMNode))
        bookCardContainer.appendChild(bookCardDiv)

        return bookCardDiv
    }

    //creates DOM Node containing info about book
    const createDOMBookContent = (bookInfo) => {
        let titleParaTag = createDOMNodeHelper("p", "cardLabel", "Title")
        let authorParaTag = createDOMNodeHelper("p", "cardLabel", "Author")
        let statusParaTag = createDOMNodeHelper("p", "cardLabel", "Status")
        let titleInputParaTag = createDOMNodeHelper("p", "cardInfo", bookInfo.title)
        let authorInputParaTag = createDOMNodeHelper("p", "cardInfo", bookInfo.author)
        let statusInputParaTag = createDOMNodeHelper("p", "cardInfo", bookInfo.status)
        
        return [
          titleParaTag,
          titleInputParaTag,
          authorParaTag,
          authorInputParaTag,
          statusParaTag,
          statusInputParaTag
        ];
    }

    //create DOM Node, asigns it a class and its innerText
    const createDOMNodeHelper = (tag, classInfo, textValue) => {
        let newDOMNode = document.createElement(tag)
        newDOMNode.className = classInfo
        newDOMNode.innerText = textValue
        return newDOMNode
    }

    return { newBookCard, createDOMNodeHelper }
})();