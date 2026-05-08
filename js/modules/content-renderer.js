import { carouselSlides, siteSections } from "../data/site-content.js";

function renderCarousel() {
    return `
        <div class="carousel-container">
            <div class="carousel-wrapper">
                ${carouselSlides.map(slide => `
                    <div class="carousel-slide">
                        <img src="${slide.src}" alt="${slide.alt}">
                    </div>
                `).join("")}
            </div>
            <button class="carousel-prev" onclick="moveSlide(-1)">&#10094;</button>
            <button class="carousel-next" onclick="moveSlide(1)">&#10095;</button>
            <div class="carousel-dots">
                ${carouselSlides.map((_, index) => `
                    <span class="dot" onclick="currentSlide(${index + 1})"></span>
                `).join("")}
            </div>
        </div>
    `;
}

function renderFeatureStrip(features = []) {
    if (!features.length) {
        return "";
    }

    return `
        <div class="feature-strip">
            ${features.map(feature => `<div class="feature-pill">${feature}</div>`).join("")}
        </div>
    `;
}

function renderMedia(media) {
    if (!media) {
        return "";
    }

    if (media.type === "image") {
        return `
            <div class="media">
                <img src="${media.src}" alt="${media.alt}" class="item-image">
            </div>
        `;
    }

    if (media.type === "video") {
        return `
            <div class="media">
                <video class="item-video" src="${media.src}" autoplay muted loop playsinline></video>
            </div>
        `;
    }

    if (media.type === "stacked") {
        return `
            <div class="media stacked">
                <iframe width="895" height="503" src="${media.embed}" title="${media.embedTitle}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                <img src="${media.imageSrc}" alt="Draw preview image" class="item-image large">
            </div>
        `;
    }

    return "";
}

function renderStandardItems(items = []) {
    if (!items.length) {
        return "";
    }

    return `
        <div class="items">
            ${items.map(item => `
                <div class="item">
                    <h3>${item.title}</h3>
                    ${renderMedia(item.media)}
                    ${renderFeatureStrip(item.features)}
                    ${item.text ? `<p>${item.text}</p>` : ""}
                </div>
            `).join("")}
        </div>
    `;
}

function renderHero(hero) {
    if (!hero) {
        return "";
    }

    return `
        <div class="panel-hero">
            <span class="panel-kicker">${hero.kicker}</span>
            <h2>${hero.title}</h2>
            <p>${hero.text}</p>
        </div>
    `;
}

function renderUtility(section) {
    if (!section.utility) {
        return "";
    }

    const stackClassMap = {
        download: "utility-stack utility-stack-download",
        contact: "utility-stack contact-layout",
        topup: "utility-stack topup-layout"
    };

    const groupClassMap = {
        download: "download-buttons",
        contact: "",
        topup: "topup-cards"
    };

    const stackClass = stackClassMap[section.utility.type] ?? "utility-stack";
    const groupClass = groupClassMap[section.utility.type];

    return `
        <div class="${stackClass}">
            <div class="${groupClass}">
                ${section.utility.items.map(item => `
                    <a href="${item.href}" class="${item.classes}"${item.external ? ' target="_blank" rel="noopener noreferrer"' : ""}>
                        <span class="action-card__label">${item.label}</span>
                        <span class="action-card__meta">${item.meta}</span>
                    </a>
                `).join("")}
            </div>
        </div>
    `;
}

function renderFooter(footerImage) {
    if (!footerImage) {
        return "";
    }

    return `
        <div class="section-footer">
            <img src="${footerImage}" alt="Footer banner">
        </div>
    `;
}

function renderSection(section) {
    return `
        <section id="${section.id}" class="${section.classes}">
            ${section.heading ? `<h2>${section.heading}</h2>` : ""}
            ${renderHero(section.hero)}
            ${section.carousel ? renderCarousel() : ""}
            ${section.utility ? renderUtility(section) : renderStandardItems(section.items)}
            ${renderFooter(section.footerImage)}
        </section>
    `;
}

export function renderSiteContent(containerId = "content-root") {
    const container = document.getElementById(containerId);
    if (!container) {
        return;
    }

    container.innerHTML = siteSections.map(renderSection).join("");
}
