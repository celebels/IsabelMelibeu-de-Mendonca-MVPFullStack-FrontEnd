let btnCtas = document.querySelectorAll('.menu-mobile-btn');
let nameNavBar = document.querySelectorAll(".navbar-option-name")


btnCtas.forEach((cta,_, btnOverall)=>{
 
    cta.addEventListener("click", ()=>{


        console.log("hi cta")
       
        btnOverall.forEach((bt)=>{
         
           
            location.href=  `${window.location.origin}/${cta.id}/${cta.id}.html`;
     
            bt.classList.toggle('active',bt===cta)


        })      
     
    });


});




nameNavBar.forEach((nav) => {
   
  





    window.addEventListener("load",(e)=>{


        let currentPath = window.location.pathname;


       
        nameNavBar.forEach((nav) => {
         
            let pageName = `/${nav.id}/${nav.id}.html`;
   
         
            if (pageName === currentPath) {
                nav.classList.add("active");
             
            }
        });
   
       
        btnCtas.forEach((cta) => {
            let pageName = `/${cta.id}/${cta.id}.html`;
            if (pageName === currentPath) {
                cta.classList.add("active");
               
            }
        });
    });


})








