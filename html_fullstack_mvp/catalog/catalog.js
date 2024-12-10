let inputBookInfo = {
  title: document.getElementById("title-book"),
  author: document.getElementById("author-book"),
};
let deepSearchBtn = document.querySelector(".btn-deep-search");

let lightSearchBtn = document.querySelectorAll(".btn-book-filter");
//id a m and r

//deep search
deepSearchBtn.addEventListener("click", (e) => {
  //i have the

  e.preventDefault();
  let title = inputBookInfo.title.value.toLowerCase().trim();
  let author = inputBookInfo.author.value.toLowerCase().trim();

  fetch(`http://127.0.0.1:5000/api/books`)
    .then((res) => res.json())
    .then((data) => {
        if (!title && !author) {
            //#title-book #author-book
            document.getElementById("title-book").classList.add("error");
            document.getElementById("author-book").classList.add("error");
            document.getElementById("text-book").classList.add("error");
            return;
          } else{
            document.getElementById("title-book").classList.remove("error");
            document.getElementById("author-book").classList.remove("error");
            document.getElementById("text-book").classList.remove("error");
          }
          console.log(data)
      data.forEach((book) => {
        
        const bookDataName = book.book_name.toLowerCase().trim();

       

        if (
          title && bookDataName.includes(title) ||
          book.book_author.toLowerCase() === author ) {
            console.log("true")
        activateOverlay(book)
        }
       
      });
    });

  //reset deep search
  inputBookInfo.title.value = "";
  inputBookInfo.author.value = "";
});




function activateOverlay(overlayBook)
{
    document.getElementById("overlay").style.width = "100%";
    document.getElementById("overlay").style.display = "block";
    document.querySelector("body").style.overflow="hidden";
    document.getElementById("book-search").innerText =
    overlayBook.book_name;
}

//lightsearch option
lightSearchBtn.forEach((cta, _, btnOverall) => {
  cta.addEventListener("click", (e) => {
    e.preventDefault();

    console.log("cta. id: ", cta.id); //cta.id == genre

    //search backend one book for each genre and put some description
    //bookTitle.textContent=`${cta.id}`;

   

    fetch(`http://127.0.0.1:5000/api/books`)
      .then((res) => res.json())
      .then((data) => {
        const overlayList = data.filter(
          (book) => book.book_genre.toLowerCase() === cta.id.toLowerCase()
        );
        const overlayBook = overlayList.filter(
          (e) => e.interactive_type === "ebook"
        );
        activateOverlay(overlayBook[0])
      });
  });
});


let closeBtn = document.querySelector(".exit-button");

closeBtn.addEventListener("click", (e) => {
  e.preventDefault();

  document.getElementById("overlay").style.width = "0%";
  document.getElementById("overlay").style.display = "none";
  document.querySelector("body").style.overflow="auto";
});

window.addEventListener("load", (e) => {
  e.preventDefault();
  inputBookInfo.author.value = "";
  document.getElementById("overlay").style.width = "0%";
  document.getElementById("overlay").style.display = "none";
});
