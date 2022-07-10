class book {
  constructor(sno, title, author) {
    this.sno = sno;
    this.title = title;
    this.author = author;
  }
}

class UI {
  addBookToList(book) {
    const list = document.getElementById("book-list");
    const row = document.createElement("tr");
    row.innerHTML = `

        <td>${book.sno}</td>
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td><a href="#" class="delete">X</a></td>
        `;

    list.appendChild(row);
  }

  showAlert(message, className) {
    const div = document.createElement("div");

    // add class name
    div.className = `alert ${className}`;

    div.appendChild(document.createTextNode(message));

    const container = document.querySelector(".container");

    //get form
    const form = document.querySelector("#book-form");

    //insert alert
    container.insertBefore(div, form);
    setTimeout(function () {
      document.querySelector(".alert").remove();
    }, 3000);
  }

  deleteBook(target) {
    if (target.className === "delete") {
      target.parentElement.parentElement.remove();
    }
  }

  clearFields() {
    document.getElementById("sno").value = "";
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
  }
}

document.getElementById("book-form").addEventListener("submit", function (e) {
  const sno = document.getElementById("sno").value;
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;

  const book = new book(sno, title, author);

  const ui = new UI();

  if (sno === "" || title === "" || author === "") {
    ui.showAlert("Please fill in all fields", "error");
  } else {
    ui.addBookToList(book);
    ui.showAlert("Book added", "success");
    ui.clearFields();
  }
  e.preventDefault();
});

document.getElementById("book-list").addEventListener("click", function (e) {
  const ui = new UI();
  ui.deleteBook(e.target);
  ui.showAlert("Book deleted", "success");
});
