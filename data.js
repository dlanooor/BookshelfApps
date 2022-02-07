const STORAGE_KEY = "BOOKSHELF_APPS";

let bookshelf = [];

function isStorageExist() /* boolean */ {
    if(typeof(Storage) === undefined){
        alert("Browser kamu tidak mendukung local storage");
        return false
    } 
    return true;
}

function saveData() {
    const parsed /* string */ = JSON.stringify(bookshelf);
    localStorage.setItem(STORAGE_KEY, parsed);
    document.dispatchEvent(new Event("ondatasaved"));
}

function loadDataFromStorage() {
    const serializedData /* string */ = localStorage.getItem(STORAGE_KEY);
    
    let data = JSON.parse(serializedData);
    
    if(data !== null)
    bookshelf = data;

    document.dispatchEvent(new Event("ondataloaded"));
}

function updateDataToStorage() {
    if(isStorageExist())
        saveData();
}

function composeTodoObject(judul, penulis, tahun, isCompleted) {
    return {
        id: +new Date(),
        judul,
        penulis,
        tahun,
        isCompleted
    };
}

function findBook(bookId) {

    for(book of bookshelf){
        if(book.id === bookId)
            return book;
    }

    return null;
}

function findBookIndex(bookId) {
    
    let index = 0
    for (book of bookshelf) {
        if(book.id === bookId)
            return index;

        index++;
    }

    return -1;
}