let listBtn = document.getElementById("list"); //list overlay
let exitBtn = document.querySelectorAll(".exit-button"); //exit overlay dropped

let droppedList = document.getElementById("dropped-list-button");
let likedList = document.getElementById("liked-list-button");

// variaboles log in
let isUserLogged = false;
let logUser = document.getElementById("logout");
let userInput = {
  name: document.getElementById("name"),
  password: document.getElementById("password"),
};
let logInButton = document.querySelector(".log-in-btn");
let userId;


let userUrl;
let droppedUrl, likedUrl;


logInButton.addEventListener("click", (e) => {
  e.preventDefault();


    fetch("http://127.0.0.1:5000/api/users")
      .then((res) => res.json())
      .then((data) => {
        data.forEach((user) => {
          if (user.usr_first_name.toLowerCase() == username.toLowerCase()) {
            
            userId = Number(user.usr_id);
            isUserLogged = true;
            document.querySelector(".overlay-log-in").style.display = "none";
            document.getElementById("user-name-here").innerText = username;
            userUrl = `http://127.0.0.1:5000/api/user/${userId}`;
            droppedUrl =`http://127.0.0.1:5000/api/user/${userId}/dropped_books`
            likedUrl =`http://127.0.0.1:5000/api/user/${userId}/liked_books`
            logUser.querySelector("h5").innerText = "log out app";
            
          }
        });
      })
      .catch((error) => console.error("Error fetching user list:", error));
   
});

let username = userInput.name.value;


logUser.addEventListener("click", (e) => {
  
  if(!isUserLogged)
  {
    document.querySelector(".overlay-log-in").style.display = "block";
    
  }
  else{
    userInput.name.value="";
    document.getElementById("user-name-here").innerText = "user name here";
    isUserLogged=false;
  }
  
});


listBtn.addEventListener("click", (e) => {
  document.querySelector(".overlay-list-dropped").style.display = "block";
  
//dropped list button
  droppedList.addEventListener("click",(f)=>{

    if (isUserLogged) {
      const droppedList = document.querySelector('#list-books-dropped');

      
      

      droppedList.innerHTML=""

      fetch(droppedUrl)
          .then(res => res.json()) 
          .then(data => {
              data.forEach(book => {

                  fetch(`http://127.0.0.1:5000/api/book/${book.book_id}`)
                    .then(res=>res.json())
                    .then(data=>{
                    if(book.book_id === data.book_id)
                    {
                      
                      const markup = `<li>${data.book_name}</li>`;
                      
                      droppedList.insertAdjacentHTML('beforeend', markup);
                    }

              });
              
          })
  })
          .catch(error => console.error('Error fetching dropped list:', error)); 

        
          
  }
  })

  //liked list button
  likedList.addEventListener("click",(g)=>{

    if (isUserLogged) {
      const likedList = document.querySelector('#list-books-dropped');

      
      

      likedList.innerHTML=""

      fetch(likedUrl)
          .then(res => res.json()) 
          .then(data => {
              data.forEach(book => {

                  fetch(`http://127.0.0.1:5000/api/book/${book.book_id}`)
                    .then(res=>res.json())
                    .then(data=>{
                    if(book.book_id === data.book_id)
                    {
                      
                      const markup = `<li>${data.book_name}</li>`;
                      console.log("likedList book list: ", data)
                      likedList.insertAdjacentHTML('beforeend', markup);
                    }

              });
              
          })
  })
          .catch(error => console.error('Error fetching dropped list:', error)); 

        
          
  }
  })
          
 
}
);

//exit button
exitBtn.forEach((x) => {
  x.addEventListener("click", (e) => {
    e.stopPropagation();
    console.log("inside exist");
    document.querySelector(".overlay-list-dropped").style.display = "none";
    document.querySelector(".overlay-log-in").style.display = "none";
  });
});
