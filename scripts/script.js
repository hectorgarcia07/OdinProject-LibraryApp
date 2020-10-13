const addBookBtn = document.getElementById("addBookBtn")
const popupForm = document.getElementById("popup")
const closeFormBtn = document.getElementById("closeFormBtn")
const submitFormBtn = document.getElementById("submitFormBtn")

//Opens pop-up form
addBookBtn.onclick = () => popupForm.style.display = "flex"

//Closes pop-up form
closeFormBtn.onclick = (event) => {
    event.preventDefault()
    popupForm.style.display = "none"
}

