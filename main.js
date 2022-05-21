let myLibrary = [];

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
    document.querySelector("#addBookDiv").style.visibility = "visible";
}
let theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, false);
console.log(theHobbit.info());

