export const introGifs = [
    "Zombies Making Plays GIF by Call of Duty.gif",
    "Rcxd GIF by Call of Duty.gif",
    "Squad GIF by Call of Duty.gif",
    "Gg GIF by Call of Duty.gif"
];

let currentGifIndex = 0;

export function cycleIntroBackground() {
    const overlay = document.getElementById("intro-overlay");
    if (overlay && !overlay.classList.contains("hidden")) {
        currentGifIndex = (currentGifIndex + 1) % introGifs.length;
        overlay.style.backgroundImage = `url('${introGifs[currentGifIndex]}')`;
    }
}

export function startIntroBackgroundLoop() {
    cycleIntroBackground();
    window.setInterval(cycleIntroBackground, 3000);
}
