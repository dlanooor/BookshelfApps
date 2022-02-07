const UNCOMPLETED_LIST_BOOK_ID = "incompleteBookshelfList";
const COMPLETED_LIST_BOOK_ID = "completeBookshelfList";
const BOOK_ITEMID = "bookId";

function makeBook(judul, penulis, tahun, isCompleted) {

    const bookTitle = document.createElement("h1");
    bookTitle.innerText = judul;

    const bookAuthor = document.createElement("h2");
    bookAuthor.innerText = penulis;

    const bookYear = document.createElement("h3");
    bookYear.innerText = tahun;

    const textContainer = document.createElement("article");
    textContainer.classList.add("book_item")
    textContainer.append(bookTitle, bookAuthor, bookYear);

    if (isCompleted) {
        textContainer.append(createBelumSelesaiBacaButton(isCompleted));
    } else {
        textContainer.append(createSelesaiBacaButton(isCompleted));
    }

    textContainer.append(createHapusButton());

    return textContainer;
}

function createBelumSelesaiBacaButton(isCompleted) {
    return createButton("green", isCompleted, function(event) {
        undoBookFromComplete(event.target.parentElement);
    });
}

function createSelesaiBacaButton(isCompleted) {
    return createButton("green", isCompleted, function(event) {
        addBookToComplete(event.target.parentElement);
    });
}

function createHapusButton() {
    return createButton("red", false, function(event) {
        removeBook(event.target.parentNode);
    });
}

function createButton(buttonTypeClass /* string */, isCompleted, eventListener /* Event */) {
    const button = document.createElement("button");
    if(buttonTypeClass === "green") {
        if(isCompleted) {
            button.innerText = "Belum selesai di Baca";
        }
        else {
            button.innerText = "Selesai di Baca";
        }
    }
    else {
        button.innerText = "Hapus buku";
    }
    button.classList.add(buttonTypeClass);
    button.addEventListener("click", function (event) {
        eventListener(event);
        event.stopPropagation();
    });
    return button;
}

function addBook() {
    const uncompletedListBook = document.getElementById(UNCOMPLETED_LIST_BOOK_ID);
    const completedListBook = document.getElementById(COMPLETED_LIST_BOOK_ID);

    const bookTitle = document.getElementById("inputBookTitle").value;
    const bookAuthor = document.getElementById("inputBookAuthor").value;
    const bookYear = document.getElementById("inputBookYear").value;
    const isComplete = document.getElementById("inputBookIsComplete").checked;

    const book = makeBook(bookTitle, bookAuthor, bookYear, isComplete);
    const bookObject = composeTodoObject(bookTitle, bookAuthor, bookYear, isComplete);
    
    book[BOOK_ITEMID] = bookObject.id;
    bookshelf.push(bookObject);

    if(isComplete) {
        completedListBook.append(book);
    }
    else {
        uncompletedListBook.append(book);
    }
    updateDataToStorage();
}

function addBookToComplete(taskElement) {
    const listCompleted = document.getElementById(COMPLETED_LIST_BOOK_ID);

    console.log(taskElement);

    const bookTitle = taskElement.querySelector(".book_item > h1").innerText;
    const bookAuthor = taskElement.querySelector(".book_item > h2").innerText;
    const bookYear = taskElement.querySelector(".book_item > h3").innerText;

    const newBook = makeBook(bookTitle, bookAuthor, bookYear, true);
    
    const book = findBook(taskElement[BOOK_ITEMID]);
    book.isCompleted = true;
    newBook[BOOK_ITEMID] = book.id;

    listCompleted.append(newBook);
    taskElement.remove();

    updateDataToStorage();
}


function removeBook(taskElement) {
    const bookPosition = findBookIndex(taskElement[BOOK_ITEMID]);
    bookshelf.splice(bookPosition, 1);

    taskElement.remove();
    updateDataToStorage();
}

function undoBookFromComplete(taskElement) {
    const listUncompleted = document.getElementById(UNCOMPLETED_LIST_BOOK_ID);


    const bookTitle = taskElement.querySelector(".book_item > h1").innerText;
    const bookAuthor = taskElement.querySelector(".book_item > h2").innerText;
    const bookYear = taskElement.querySelector(".book_item > h3").innerText;
    
    const newBook = makeBook(bookTitle, bookAuthor, bookYear, false);
    
    const book = findBook(taskElement[BOOK_ITEMID]);
    book.isCompleted = false;
    newBook[BOOK_ITEMID] = book.id;

    listUncompleted.append(newBook);
    taskElement.remove();

    updateDataToStorage();
}

function refreshDataFromBookshelf() {
    const listUncompleted = document.getElementById(UNCOMPLETED_LIST_BOOK_ID);
    let listCompleted = document.getElementById(COMPLETED_LIST_BOOK_ID);

    for(book of bookshelf){
        const newBook = makeBook(book.judul, book.penulis, book.tahun, book.isCompleted);
        newBook[BOOK_ITEMID] = book.id;

        if(book.isCompleted){
            listCompleted.append(newBook);
        } else {
            listUncompleted.append(newBook);
        }
    }
}