/* ===== INTRO BACKGROUND LOOPER ===== */
const introGifs = [
    "Zombies Making Plays GIF by Call of Duty.gif", // Original
    "Rcxd GIF by Call of Duty.gif", // CoD Generic
    "Squad GIF by Call of Duty.gif", // FPS Action
    "Gg GIF by Call of Duty.gif"  // Tactical
];

let currentGifIndex = 0;

function cycleIntroBackground() {
    const overlay = document.getElementById('intro-overlay');
    if (overlay && !overlay.classList.contains('hidden')) {
        currentGifIndex = (currentGifIndex + 1) % introGifs.length;
        overlay.style.backgroundImage = `url('${introGifs[currentGifIndex]}')`;
    }
}

// Change background every 3 seconds
setInterval(cycleIntroBackground, 3000);


function enterSite() {
    const overlay = document.getElementById('intro-overlay');
    overlay.classList.add('hidden');
}

function showContent(tabId, evt) {
    // 1. Hide all tab contents
    const contents = document.querySelectorAll('.tab-content');
    contents.forEach(content => {
        content.classList.remove('active');
    });

    // 2. Remove active state from all buttons
    const buttons = document.querySelectorAll('.nav-btn');
    buttons.forEach(btn => {
        btn.classList.remove('active');
    });

    // 3. Show the selected tab
    document.getElementById(tabId).classList.add('active');

    // 4. Highlight the clicked button
    if (evt && evt.currentTarget) {
        evt.currentTarget.classList.add('active');
    }
}

/* ===== CAROUSEL FUNCTIONALITY ===== */
let currentCarouselIndex = 1;
let carouselInterval;

// Show specific slide
function currentSlide(n) {
    clearInterval(carouselInterval);
    showSlide(currentCarouselIndex = n);
    startCarousel();
}

// Move to next or previous slide
function moveSlide(n) {
    clearInterval(carouselInterval);
    showSlide(currentCarouselIndex += n);
    startCarousel();
}

// Display the slide
function showSlide(n) {
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.dot');
    
    // Wrap around
    if (n > slides.length) { currentCarouselIndex = 1; }
    if (n < 1) { currentCarouselIndex = slides.length; }
    
    // Hide all slides
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Show current slide
    if (slides[currentCarouselIndex - 1]) {
        slides[currentCarouselIndex - 1].classList.add('active');
    }
    if (dots[currentCarouselIndex - 1]) {
        dots[currentCarouselIndex - 1].classList.add('active');
    }
}

// Auto advance carousel every 5 seconds
function startCarousel() {
    carouselInterval = setInterval(() => {
        currentCarouselIndex++;
        showSlide(currentCarouselIndex);
    }, 5000);
}

// Initialize carousel when page loads
document.addEventListener('DOMContentLoaded', () => {
    showSlide(currentCarouselIndex);
    startCarousel();
});
