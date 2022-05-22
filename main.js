let myLibrary = [];
let bookListVis = true;
const debugAddBook = false;
let totalRead = 0;
let totalNotRead = 0;

window.addEventListener("load", () =>{
    if (debugAddBook) toggleAddBookVisibility();
});

function addNewBook(){
    const appendBookToDom = (book) => {
        let parent = document.querySelector("#books");
        let newNode = document.createElement("div");
        newNode.classList.add("book");
        newNode.classList.add("indentedHoverDark");
        
        book.getRead() ? newNode.classList.add("read") : newNode.classList.add("notRead");

        const createHeader = (newNode, classes, text) => {
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
            
                button.addEventListener("click", () => {
                    switch (className){
                        case 'trashButton':
                            console.log("Trash Pressed");
                            parent.removeChild(newNode);
                            for(let i = 0; i < myLibrary.length; i++){
                                if (myLibrary[i][0] == newNode)
                                    myLibrary.splice(i, 1);
                            }
                            break;

                        case 'readButton':
                            console.log("Read Pressed");
                            break;
                    }
                });
                parentDiv.appendChild(button);
            }

            createButton(bookButtons, "readButton", "data/images/book.svg");
            createButton(bookButtons, "trashButton", "data/images/trash.svg");
            newNode.appendChild(bookButtons);
        }

        let readText;

        if (book.getRead()){
            readText = "Read";
            document.querySelector("#totalRead").textContent = "Total Books Read: " + ++totalRead;
        }

        else {
            readText = "Haven't Read";
            document.querySelector("#totalNotRead").textContent = "Total Books Not Read: " + ++totalNotRead;
        }

        createHeader(newNode, "bookTitle", "Title: " + book.getTitle());
        createHeader(newNode, "bookAuthor", "Author: " + book.getAuthor());
        createHeader(newNode, "bookPages", "Pages: " + book.getPages());
        createHeader(newNode, "bookRead", readText);
        createBookButtons(newNode);
        parent.appendChild(newNode);

        if (document.querySelector("#startingBook")) parent.removeChild(document.querySelector("#startingBook"))
        return newNode;
    }

    let bookQueryDic = {
        title : document.querySelector("#bookTitle").value,
        author : document.querySelector("#bookAuthor").value,
        pages : document.querySelector("#bookPages").value,
        read : document.querySelector('input[name="bookRead"]:checked').value
    }

    let newBook = new Book (bookQueryDic["title"], bookQueryDic["author"], bookQueryDic["pages"],(bookQueryDic["read"] === 'true'));
    let newNode = appendBookToDom(newBook);
    myLibrary.push([newNode, newBook]);
    console.log(myLibrary);
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