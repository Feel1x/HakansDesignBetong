document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded');
    
    const cards = document.querySelectorAll('.gallery-card');
    console.log('Found cards:', cards.length);

    cards.forEach(card => {
        const images = card.querySelectorAll('.card-image img');
        console.log('Found images:', images.length);
        
        const prevBtn = card.querySelector('.prev-btn');
        const nextBtn = card.querySelector('.next-btn');
        let currentImageIndex = 0;
        let intervalId = null;

        function updateImageClasses() {
            images.forEach((img, index) => {
                img.classList.remove('active', 'prev', 'next', 'exit');
                if (index === currentImageIndex) {
                    img.classList.add('active');
                } else if (index === (currentImageIndex - 1 + images.length) % images.length) {
                    img.classList.add('prev');
                } else if (index === (currentImageIndex + 1) % images.length) {
                    img.classList.add('next');
                } else if (index === (currentImageIndex - 2 + images.length) % images.length) {
                    img.classList.add('exit');
                }
            });
        }

        function showImage(index) {
            currentImageIndex = index;
            updateImageClasses();
        }

        function startAutoRotate() {
            console.log('Starting auto-rotate');
            if (intervalId) clearInterval(intervalId);
            
            intervalId = setInterval(() => {
                currentImageIndex = (currentImageIndex + 1) % images.length;
                showImage(currentImageIndex);
            }, 3000); // Changed to 3 seconds for testing
        }

        function stopAutoRotate() {
            console.log('Stopping auto-rotate');
            if (intervalId) {
                clearInterval(intervalId);
                intervalId = null;
            }
        }

        // Event Listeners
        prevBtn.addEventListener('click', () => {
            console.log('Previous button clicked');
            stopAutoRotate();
            currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
            showImage(currentImageIndex);
        });

        nextBtn.addEventListener('click', () => {
            console.log('Next button clicked');
            stopAutoRotate();
            currentImageIndex = (currentImageIndex + 1) % images.length;
            showImage(currentImageIndex);
        });

        const imageContainer = card.querySelector('.card-image');
        imageContainer.addEventListener('mouseenter', () => {
            console.log('Mouse entered');
            stopAutoRotate();
        });

        imageContainer.addEventListener('mouseleave', () => {
            console.log('Mouse left');
            startAutoRotate();
        });

        // Initialize
        console.log('Initializing carousel');
        updateImageClasses();
        startAutoRotate();
    });
});