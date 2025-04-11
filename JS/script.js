document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const header = document.querySelector('header');
    const contentSection = document.querySelector('.content-section');
    // Tvinga header att uppdatera direkt vid sidladdning    teeeeeeeeest
    window.dispatchEvent(new Event('scroll'));


    // Toggle menu
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        header.classList.toggle('nav-menu-active');
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            header.classList.remove('nav-menu-active');
        });
    });

    // Handle scroll effect
    window.addEventListener('scroll', () => {
        if (!navMenu.classList.contains('active')) {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    });

    // Intersection Observer for content section animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add visible class to all elements in sequence
                const title = entry.target.querySelector('.content-title');
                const image = entry.target.querySelector('.image-container');
                const main = entry.target.querySelector('.content-main');
                const ending = entry.target.querySelector('.content-ending');

                title.classList.add('visible');
                image.classList.add('visible');
                main.classList.add('visible');
                ending.classList.add('visible');

                observer.unobserve(entry.target); // Stop observing once animation is triggered
            }
        });
    }, {
        threshold: 0.2 // Trigger when 20% of the section is visible
    });

    if (contentSection) {
        observer.observe(contentSection);
    }

    // Middle section animations
    const middleSections = document.querySelectorAll('.middle-section');
    const middleImages = document.querySelectorAll('.middle-image img');
    const middleTexts = document.querySelectorAll('.middle-text');

    const middleObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const section = entry.target;
                const imageContainer = section.querySelector('.middle-image');
                const text = section.querySelector('.middle-text');
                
                imageContainer.classList.add('visible');
                imageContainer.querySelector('img').classList.add('visible');
                text.classList.add('visible');
            }
        });
    }, {
        threshold: 0.2
    });

    middleSections.forEach(section => {
        middleObserver.observe(section);
    });

    // About page hero image zoom effect
    const aboutHeroImage = document.querySelector('.about-hero-image');
    if (aboutHeroImage) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const maxScroll = window.innerHeight;
            const zoomFactor = 1 + (scrolled / maxScroll) * 0.2; // Max zoom of 1.2x
            aboutHeroImage.querySelector('img').style.transform = `scale(${zoomFactor})`;
        });
    }

    // About page animations
    const aboutText = document.querySelector('.about-text');
    const aboutContact = document.querySelector('.about-contact');

    if (aboutText && aboutContact) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.2
        });

        observer.observe(aboutText);
        observer.observe(aboutContact);
    }
});

