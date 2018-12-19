export class Book {
    author: string;
    title: string;
    publisher: string;
    ISBN: string;
    description: string;
    borrowBook: Array<BorrowBook>;

    constructor(author: string, title: string, publisher: string, ISBN: string, description: string, borrowBook: Array<BorrowBook>) {
        this.author = author;
        this.title = title;
        this.publisher = publisher;
        this.ISBN = ISBN;
        this.description = description;
        this.borrowBook = borrowBook;
    }
}

export class BorrowBook {
    idPlace: string;
    numberOfBooks: number;
    availableBooks: number;
    borrowedBooks: number;
    availableOnlyInPlace: number;
    unspecifiedBooks: number;
    waitingQueue: number;
    signature: string;

    constructor(idPlace: string, numberOfBooks: number, availableBooks: number, borrowedBooks: number, availableOnlyInPlace: number, unspecifiedBooks: number, waitingQueue: number, signature: string) {
        this.idPlace = idPlace;
        this.numberOfBooks = numberOfBooks;
        this.availableBooks = availableBooks;
        this.borrowedBooks = borrowedBooks;
        this.availableOnlyInPlace = availableOnlyInPlace;
        this.unspecifiedBooks = unspecifiedBooks;
        this.waitingQueue = waitingQueue;
        this.signature = signature;
    }
}