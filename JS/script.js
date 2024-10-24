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



// Image carousel functionality
document.querySelectorAll('.gallery-card').forEach(card => {
    const images = card.querySelectorAll('.card-image img');
    const prevBtn = card.querySelector('.prev-btn');
    const nextBtn = card.querySelector('.next-btn');
    let currentImageIndex = 0;
    let intervalId;

    function showImage(index) {
        images.forEach(img => img.classList.remove('active'));
        images[index].classList.add('active');
    }

    function startAutoRotate() {
        intervalId = setInterval(() => {
            currentImageIndex = (currentImageIndex + 1) % images.length;
            showImage(currentImageIndex);
        }, 1000);
    }

    function stopAutoRotate() {
        clearInterval(intervalId);
    }

    prevBtn.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        showImage(currentImageIndex);
    });

    nextBtn.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        showImage(currentImageIndex);
    });

    // Add event listeners for mouse enter and leave
    const imageContainer = card.querySelector('.card-image');
    imageContainer.addEventListener('mouseenter', stopAutoRotate);
    imageContainer.addEventListener('mouseleave', startAutoRotate);

    // Start the auto-rotation initially
    startAutoRotate();
});
