"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Book {
    constructor(author, title, publisher, ISBN, description, borrowBook) {
        this.author = author;
        this.title = title;
        this.publisher = publisher;
        this.ISBN = ISBN;
        this.description = description;
        this.borrowBook = borrowBook;
    }
}
exports.Book = Book;
class BorrowBook {
    constructor(idPlace, numberOfBooks, availableBooks, borrowedBooks, availableOnlyInPlace, unspecifiedBooks, waitingQueue, signature) {
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
exports.BorrowBook = BorrowBook;
