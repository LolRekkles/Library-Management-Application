//book class

class Book {
  constructor(sno, title, author) {
    this.sno = sno;
    this.title = title;
    this.author = author;
  }
}

//UI class

class UI {
  static displayBooks() {
    const books = Store.getBooks();
    books.forEach((book) => UI.addBookToList(book));
  }

  static addBookToList(book) {
    const list = document.querySelector("#book-list");
    const row = document.createElement("tr");

    row.innerHTML = `
            <td>${book.sno}</td>
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;

    list.appendChild(row);
  }

  static deleteBook(el) {
    if (el.classList.contains("delete")) {
      el.parentElement.parentElement.remove();
    }
  }

  static showAlert(message, className) {
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const form = document.querySelector("#book-form");
    container.insertBefore(div, form);

    // Vanish in 3 seconds
    setTimeout(() => document.querySelector(".alert").remove(), 3000);
  }

  static clearFields() {
    document.querySelector("#sno").value = "";
    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
  }
}

// store class

class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }
    return books;
  }

  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
  }

  static removeBook(sno) {
    const books = Store.getBooks();
    books.forEach((book, index) => {
      if (book.sno === sno) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem("books", JSON.stringify(books));
  }
}

// event to display books

document.addEventListener("DOMContentLoaded", UI.displayBooks);

//event to add book

document.querySelector("#book-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const sno = document.querySelector("#sno").value;
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;

  if (sno === "" || title === "" || author === "") {
    UI.showAlert("Please fill in all fields", "error");
  } else {
    const book = new Book(sno, title, author);
    UI.addBookToList(book);

    Store.addBook(book);

    UI.showAlert("Book added", "success");

    UI.clearFields();
  }
});

//event to remove book

document.querySelector("#book-list").addEventListener("click", (e) => {
  console.log(e.target);
  UI.deleteBook(e.target);

  Store.removeBook(e.target.parentElement.textContent);

  UI.showAlert("Book Removed", "success");
});
