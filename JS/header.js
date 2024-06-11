
const nav = document.querySelector(".common-bar")
fetch("../header.html")
.then(res=> res.text())
.then(data => {
    nav.innerHTML=data
})





/*
    const nav = document.querySelector(".common-bar");
    if (nav) {
        fetch("./header.html")
            .then(res => res.text())
            .then(data => {
                nav.innerHTML = data;
            })
            .catch(error => {
                console.error('Error fetching header:', error);
            });
    } else {
        console.error('Error: top-bar element not found.');
    }

    */