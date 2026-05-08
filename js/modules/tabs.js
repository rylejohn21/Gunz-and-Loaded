export function showContent(tabId, evt) {
    const contents = document.querySelectorAll(".tab-content");
    contents.forEach(content => {
        content.classList.remove("active");
        content.classList.remove("tab-animate");
    });

    const buttons = document.querySelectorAll(".top-nav .nav-btn");
    buttons.forEach(btn => btn.classList.remove("active"));

    const nextTab = document.getElementById(tabId);
    if (!nextTab) {
        return;
    }

    nextTab.classList.add("active");
    void nextTab.offsetWidth;
    nextTab.classList.add("tab-animate");

    if (evt?.currentTarget) {
        evt.currentTarget.classList.add("active");
        return;
    }

    const matchingButton = Array.from(buttons).find(btn => btn.textContent.trim().toLowerCase() === tabId);
    matchingButton?.classList.add("active");
}
