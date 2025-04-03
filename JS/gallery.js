// Gallery functionality
document.addEventListener('DOMContentLoaded', () => {
    // Initialize gallery
    initializeGallery();
    // Initialize scroll to top button
    initializeScrollToTop();
    // Initialize category dropdown
    initializeCategoryDropdown();
});

// Gallery initialization
function initializeGallery() {
    const categories = [
        { id: 'bank', filePrefix: 'Bank', displayName: 'Bänkar och Ställ', imageCount: 5 },
        { id: 'gang', filePrefix: 'Gang', displayName: 'Gångar', imageCount: 4 },
        { id: 'kruka', filePrefix: 'Kruka', displayName: 'Designobjekt', imageCount: 3 },
        { id: 'monster', filePrefix: 'Monster', displayName: 'Mönster', imageCount: 3 },
        { id: 'pool', filePrefix: 'Pool', displayName: 'Pooler', imageCount: 1 },
        { id: 'trappa', filePrefix: 'Trappa', displayName: 'Trappor', imageCount: 7 },
        { id: 'uppfart', filePrefix: 'Uppfart', displayName: 'Uppfarter', imageCount: 4 },
        { id: 'utomhusmobler', filePrefix: 'UtomhusMobler', displayName: 'Utomhusmöbler', imageCount: 1 }
    ];
    const categoryBtns = document.querySelectorAll('.category-btn');

    // Load images for each category
    categories.forEach(category => {
        loadCategoryImages(category);
    });

    // Add click event listeners to category buttons
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const selectedCategory = btn.dataset.category;
            
            // Update active button
            categoryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Scroll to selected section
            if (selectedCategory !== 'all') {
                const targetSection = document.getElementById(selectedCategory);
                if (targetSection) {
                    const headerOffset = 150; // Adjust this value based on your header height
                    const elementPosition = targetSection.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            } else {
                // Scroll to top if "Alla" is selected
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Initialize intersection observer for fade-in animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.gallery-section').forEach(section => {
        observer.observe(section);
    });
}

// Load images for a specific category
function loadCategoryImages(category) {
    const {id, filePrefix, imageCount} = category;
    const section = document.getElementById(id);
    const masonryGrid = section.querySelector('.masonry-grid');
    
    // Example image loading (replace with actual image paths)
    for (let i = 1; i <= imageCount; i++) {
        const imagePath = `Images/Galleri/${filePrefix}${i}.jpg`;
        const galleryItem = createGalleryItem(imagePath, `${category} ${i}`);
        masonryGrid.appendChild(galleryItem);
    }
}

// Create a gallery item element
function createGalleryItem(imagePath, altText) {
    const item = document.createElement('div');
    item.className = 'gallery-item';
    
    // Extract the image name from the path
    const imageName = imagePath.split('/').pop().split('.')[0];
    item.setAttribute('data-image', imageName);
    
    const img = document.createElement('img');
    img.src = imagePath;
    img.alt = altText;
    img.loading = 'lazy';
    
    item.appendChild(img);
    return item;
}

// Scroll to top functionality
function initializeScrollToTop() {
    const scrollBtn = document.getElementById('scrollToTop');
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    });

    // Smooth scroll to top when clicked
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize category dropdown
function initializeCategoryDropdown() {
    const dropdownBtn = document.querySelector('.category-dropdown-btn');
    const dropdown = document.querySelector('.category-dropdown');
    
    if (dropdownBtn && dropdown) {
        // Set initial text
        dropdownBtn.textContent = 'Kategorier ▼';
        
        // Toggle dropdown on button click
        dropdownBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            dropdown.classList.toggle('active');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', (event) => {
            if (!dropdown.contains(event.target)) {
                dropdown.classList.remove('active');
            }
        });
        
        // Update dropdown button text when a category is selected
        const categoryBtns = document.querySelectorAll('.category-btn');
        categoryBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                // Update button text
                dropdownBtn.textContent = btn.textContent + ' ▼';
                dropdown.classList.remove('active');
                
                // Trigger the category selection
                const selectedCategory = btn.dataset.category;
                if (selectedCategory) {
                    const targetSection = document.getElementById(selectedCategory);
                    if (targetSection) {
                        const headerOffset = 150;
                        const elementPosition = targetSection.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                        
                        window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
        
        // Handle window resize
        window.addEventListener('resize', () => {
            // If screen is wide enough, close dropdown
            if (window.innerWidth > 1200) {
                dropdown.classList.remove('active');
            }
        });
        
        // Fix for touch devices
        dropdownBtn.addEventListener('touchend', (e) => {
            e.preventDefault();
            dropdown.classList.toggle('active');
        });
        
        // Prevent default behavior for touch events on dropdown content
        const dropdownContent = document.querySelector('.category-dropdown-content');
        if (dropdownContent) {
            dropdownContent.addEventListener('touchstart', (e) => {
                e.stopPropagation();
            });
        }
    }
}