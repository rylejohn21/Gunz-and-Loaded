export function addClickAnimation(target, event) {
    if (!target) {
        return;
    }

    target.classList.remove("is-pressing");
    void target.offsetWidth;
    target.classList.add("is-pressing");

    const ripple = document.createElement("span");
    ripple.className = "click-ripple";

    const rect = target.getBoundingClientRect();
    const x = event.clientX ? event.clientX - rect.left : rect.width / 2;
    const y = event.clientY ? event.clientY - rect.top : rect.height / 2;

    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;

    target.appendChild(ripple);
    ripple.addEventListener("animationend", () => ripple.remove());
    target.addEventListener("animationend", () => target.classList.remove("is-pressing"), { once: true });
}

export function bindClickAnimations() {
    document.addEventListener("click", event => {
        const animatedTarget = event.target.closest("button, a, .dot");
        if (!animatedTarget) {
            return;
        }

        addClickAnimation(animatedTarget, event);
    });
}
