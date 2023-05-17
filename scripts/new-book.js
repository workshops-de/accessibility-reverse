const elementsWithValidaton = document.querySelectorAll("input[required]");
const resultElement = document.getElementById("result");
const form = document.getElementById("new-book");

if (elementsWithValidaton)
  elementsWithValidaton.forEach((element) => {
    element.addEventListener("blur", function () {
      element.classList.add("validated");
    });
  });

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    fetch("http://localhost:4730/books", {
      method: "POST",
      body: JSON.stringify({
        title: document.getElementById("isbn").value,
        isbn: document.getElementById("title").value,
        cover: document.getElementById("author").value,
        abstract: document.getElementById("abstract").value,
        author: document.getElementById("author").value,
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then(() => {
        form.reset();
        elementsWithValidaton.forEach((element) => {
          element.classList.remove("validated");
        });
        if (resultElement)
          resultElement.innerHTML = `<p aria-live="polite">You've just successfully saved a new book</p>`;
      })
      .catch(() => {
        if (resultElement)
          resultElement.innerHTML = `<p aria-live="polite">An error occured. Please try again later</p>`;
      })
      .finally(() => {
        form.addEventListener(
          "input",
          (e) => {
            resultElement.innerHTML = "";
          },
          { once: true }
        );
      });
  });
}
