let myLibrary = [];
let bookListVis = true;
const debugAddBook = true;

window.addEventListener("load", () =>{
    if (debugAddBook) toggleAddBookVisibility();
});

function addNewBook(){
    const appendBookToDom = (book) => {
        let parent = document.querySelector("#books");
        console.log(typeof(parent) + "\n" + parent)
        let newNode = document.createElement("div");
        console.log(typeof(newNode) + "\n" + newNode)
        newNode.classList.add("book");
        newNode.classList.add("indentedHoverDark");
        
        book.getRead ? newNode.classList.add("read") : newNode.classList.add("notRead");

        const createHeader = (book, newNode, classes, text) => {
            let header = document.createElement("h4");
            header.classList.add(classes);
            header.textContent = text;
            newNode.appendChild(header);
        }

        const createBookButtons = (newNode) => {
            let bookButtons = document.createElement("div");
            bookButtons.classList.add("bookButtons");

            let createButton = (parentDiv, className, imgSrc) => {
                let button = document.createElement("img");
                button.classList.add(className);
                button.src = imgSrc;
                parentDiv.appendChild(button);
                console.log("Appended");
            }

            createButton(bookButtons, "readButton", "data/images/book.svg");
            createButton(bookButtons, "trashButton", "data/images/trash.svg");
            newNode.appendChild(bookButtons);
        }


        createHeader(book, newNode, "bookTitle", book.getTitle());
        createHeader(book, newNode, "bookAuthor", book.getAuthor());
        createHeader(book, newNode, "bookPages", book.getPages());
        createHeader(book, newNode, "bookRead", book.getRead());
        createBookButtons(newNode);
        parent.appendChild(newNode);
    }

    let values = {
        title : document.querySelector("#bookTitle").value,
        author : document.querySelector("#bookAuthor").value,
        pages : document.querySelector("#bookPages").value
    }

    //let newBook = new Book (values[title], values[author], values[pages], true);
    let newBook = new Book ("testTitle", "testAuthor", 32, true);
    appendBookToDom(newBook);
    toggleAddBookVisibility();
}

const toggleAddBookVisibility = () => {
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

class Book {
    constructor(title, author, pages, read){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    getTitle(){return this.title;}
    getAuthor(){return this.author;}
    getPages(){return this.pages;}
    getRead(){return this.read;}

    printInfo(){
        var returnString = `${this.title} by ${this.author}, ${this.pages} pages`
        this.read ? returnString += " has been read" : returnString += " not been read yet"
        return returnString;
    }

    toggleRead(){
        this.read ? this.read = false : this.read = true;
    }
}

let theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, false);
myLibrary.push(theHobbit);

console.log(theHobbit.printInfo() + new Date().getMilliseconds() + myLibrary);
delete theHobbit;