import { renderSiteContent } from "./modules/content-renderer.js";
import { startIntroBackgroundLoop } from "./modules/intro.js";
import { bindClickAnimations } from "./modules/interactions.js";
import { showContent } from "./modules/tabs.js";
import { currentSlide, initialiseCarousel, moveSlide } from "./modules/carousel.js";
import { initialiseServiceWorker } from "./modules/service-worker.js";
import { initialiseAuth } from "./modules/auth.js";

document.addEventListener("DOMContentLoaded", () => {
    renderSiteContent();
    startIntroBackgroundLoop();
    initialiseCarousel();
    bindClickAnimations();
    initialiseAuth({ showContent });
    initialiseServiceWorker();
});

window.showContent = showContent;
window.currentSlide = currentSlide;
window.moveSlide = moveSlide;
