let currentCarouselIndex = 1;
let carouselInterval;

export function currentSlide(n) {
    clearInterval(carouselInterval);
    showSlide(currentCarouselIndex = n);
    startCarousel();
}

export function moveSlide(n) {
    clearInterval(carouselInterval);
    showSlide(currentCarouselIndex += n);
    startCarousel();
}

export function showSlide(n) {
    const slides = document.querySelectorAll(".carousel-slide");
    const dots = document.querySelectorAll(".dot");

    if (n > slides.length) {
        currentCarouselIndex = 1;
    }
    if (n < 1) {
        currentCarouselIndex = slides.length;
    }

    slides.forEach(slide => slide.classList.remove("active"));
    dots.forEach(dot => dot.classList.remove("active"));

    slides[currentCarouselIndex - 1]?.classList.add("active");
    dots[currentCarouselIndex - 1]?.classList.add("active");
}

export function startCarousel() {
    carouselInterval = window.setInterval(() => {
        currentCarouselIndex += 1;
        showSlide(currentCarouselIndex);
    }, 5000);
}

export function initialiseCarousel() {
    showSlide(currentCarouselIndex);
    startCarousel();
}
