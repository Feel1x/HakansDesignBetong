/*document.addEventListener("Load", function() {

set
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".common-bar .top-bar .nav-menu");




if (hamburger && navMenu) {
    // Add event listener or perform other actions on header elements
    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    })
    
    document.querySelectorAll(".nav-link").forEach(
        n => n.addEventListener("click", () => {
            hamburger.classList.remove("active");
            navMenu.classList.remove("active");
    }))
} else {
    console.error("Hamburger or navMenu element not found.");
}


});
*/

const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".common-bar .top-bar .nav-menu");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
})

document.querySelectorAll(".nav-link").forEach(
    n => n.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
}))
