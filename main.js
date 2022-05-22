let myLibrary = [];
let bookListVis = true;

function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    this.info = function(){
        var returnString = ` ${this.title} by ${this.author}, ${this.pages} pages`
        this.read ? returnString += " has been read" : returnString += " not read yet"
        return returnString;
    }
}

function addNewBook(){
    toggleVisibility();
}

const toggleVisibility = () => {
    if (bookListVis){
        document.querySelector("#addBookDiv").style.visibility = "visible";
        document.querySelector("#bookList").style.visibility = "hidden";
        bookListVis = false;
    }

    else {
        document.querySelector("#addBookDiv").style.visibility = "hidden";
        document.querySelector("#bookList").style.visibility = "visible";
        bookListVis = true;
    }
}

let theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, false);
console.log(theHobbit.info());

