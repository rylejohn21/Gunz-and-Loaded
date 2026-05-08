import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { SUPABASE_ANON_KEY, SUPABASE_URL } from "./supabase-config.js";

const introGifs = [
    "Zombies Making Plays GIF by Call of Duty.gif",
    "Rcxd GIF by Call of Duty.gif",
    "Squad GIF by Call of Duty.gif",
    "Gg GIF by Call of Duty.gif"
];

const AUTH_VIEWS = ["login", "signup", "forgot", "reset"];
const PLACEHOLDER_URL = "https://YOUR_PROJECT_ID.supabase.co";
const PLACEHOLDER_KEY = "YOUR_SUPABASE_ANON_KEY";

let currentGifIndex = 0;
let currentCarouselIndex = 1;
let carouselInterval;
let currentAuthView = "login";

const isSupabaseConfigured = Boolean(
    SUPABASE_URL &&
    SUPABASE_ANON_KEY &&
    SUPABASE_URL !== PLACEHOLDER_URL &&
    SUPABASE_ANON_KEY !== PLACEHOLDER_KEY
);

const supabase = isSupabaseConfigured
    ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
        auth: {
            autoRefreshToken: true,
            persistSession: true,
            detectSessionInUrl: true
        }
    })
    : null;

function cycleIntroBackground() {
    const overlay = document.getElementById("intro-overlay");
    if (overlay && !overlay.classList.contains("hidden")) {
        currentGifIndex = (currentGifIndex + 1) % introGifs.length;
        overlay.style.backgroundImage = `url('${introGifs[currentGifIndex]}')`;
    }
}

function addClickAnimation(target, event) {
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

function showContent(tabId, evt) {
    const contents = document.querySelectorAll(".tab-content");
    contents.forEach(content => {
        content.classList.remove("active");
        content.classList.remove("tab-animate");
    });

    const buttons = document.querySelectorAll(".nav-btn");
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
    } else {
        const matchingButton = Array.from(buttons).find(btn => btn.textContent.trim().toLowerCase() === tabId);
        matchingButton?.classList.add("active");
    }
}

function currentSlide(n) {
    clearInterval(carouselInterval);
    showSlide(currentCarouselIndex = n);
    startCarousel();
}

function moveSlide(n) {
    clearInterval(carouselInterval);
    showSlide(currentCarouselIndex += n);
    startCarousel();
}

function showSlide(n) {
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

function startCarousel() {
    carouselInterval = setInterval(() => {
        currentCarouselIndex += 1;
        showSlide(currentCarouselIndex);
    }, 5000);
}

function getAuthElements() {
    return {
        overlay: document.getElementById("intro-overlay"),
        status: document.getElementById("auth-status"),
        error: document.getElementById("auth-error"),
        sessionEmail: document.getElementById("session-email"),
        logoutButton: document.getElementById("logout-btn"),
        authTabs: document.querySelectorAll(".auth-tab"),
        authForms: document.querySelectorAll(".auth-form")
    };
}

function setAuthMessage({ status = "", error = "" } = {}) {
    const { status: statusEl, error: errorEl } = getAuthElements();
    statusEl.textContent = status;
    errorEl.textContent = error;
    statusEl.classList.toggle("visible", Boolean(status));
    errorEl.classList.toggle("visible", Boolean(error));
}

function setAuthView(view, options = {}) {
    const nextView = AUTH_VIEWS.includes(view) ? view : "login";
    currentAuthView = nextView;

    const { clearMessages = true, preserveInputs = false } = options;
    const { authTabs, authForms } = getAuthElements();

    authTabs.forEach(tab => {
        const isActive = tab.dataset.authView === nextView;
        tab.classList.toggle("active", isActive);
        tab.setAttribute("aria-selected", String(isActive));
    });

    authForms.forEach(form => {
        const isActive = form.dataset.authForm === nextView;
        form.classList.toggle("active", isActive);
        if (!isActive && !preserveInputs) {
            form.reset();
        }
    });

    if (clearMessages) {
        setAuthMessage();
    }
}

function setLoadingState(buttonId, isLoading, idleLabel, loadingLabel = "Please wait...") {
    const button = document.getElementById(buttonId);
    if (!button) {
        return;
    }

    button.disabled = isLoading;
    button.classList.toggle("is-loading", isLoading);
    button.innerHTML = isLoading
        ? `<span class="btn-icon">⌖</span> ${loadingLabel} <span class="muzzle-flash"></span>`
        : idleLabel;
}

function formatAuthError(error) {
    const message = error?.message?.toLowerCase?.() ?? "Something went wrong. Please try again.";

    if (message.includes("invalid login credentials")) {
        return "Invalid credentials. Double-check your email and password.";
    }
    if (message.includes("email not confirmed")) {
        return "Your email is not confirmed yet. Check your inbox for the confirmation link.";
    }
    if (message.includes("password should be at least")) {
        return "Password must be at least 6 characters long.";
    }
    if (message.includes("user already registered")) {
        return "That email is already registered. Try logging in instead.";
    }

    return error?.message ?? "Something went wrong. Please try again.";
}

function getRedirectUrl() {
    return `${window.location.origin}${window.location.pathname}`;
}

function isRecoveryFlow() {
    const combinedUrl = `${window.location.search}${window.location.hash}`.toLowerCase();
    return combinedUrl.includes("type=recovery");
}

function showAuthenticatedState(user) {
    const { overlay, sessionEmail, logoutButton } = getAuthElements();
    overlay.classList.add("hidden");
    sessionEmail.textContent = user?.email ?? "Signed in";
    logoutButton.hidden = false;
    showContent("home");
}

function showLoggedOutState() {
    const { overlay, sessionEmail, logoutButton } = getAuthElements();
    overlay.classList.remove("hidden");
    sessionEmail.textContent = "Guest";
    logoutButton.hidden = true;
    setAuthView("login");
}

async function handleLogin(event) {
    event.preventDefault();
    if (!supabase) {
        return;
    }

    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value;

    setAuthMessage();
    setLoadingState("login-submit", true, '<span class="btn-icon">⌖</span> Log In <span class="muzzle-flash"></span>', "Logging In...");

    try {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
            throw error;
        }

        showAuthenticatedState(data.user);
    } catch (error) {
        setAuthMessage({ error: formatAuthError(error) });
    } finally {
        setLoadingState("login-submit", false, '<span class="btn-icon">⌖</span> Log In <span class="muzzle-flash"></span>');
    }
}

async function handleSignUp(event) {
    event.preventDefault();
    if (!supabase) {
        return;
    }

    const email = document.getElementById("signup-email").value.trim();
    const password = document.getElementById("signup-password").value;

    setAuthMessage();
    setLoadingState("signup-submit", true, '<span class="btn-icon">⌖</span> Register <span class="muzzle-flash"></span>', "Creating...");

    try {
        const { data, error } = await supabase.auth.signUp({
            email,
            password
        });

        if (error) {
            throw error;
        }

        if (data.session) {
            const { error: signOutError } = await supabase.auth.signOut();
            if (signOutError) {
                throw signOutError;
            }
        }

        setAuthMessage({ status: "Account created and saved. Please log in with your new account." });
        setAuthView("login", { clearMessages: false, preserveInputs: false });
        document.getElementById("login-email").value = email;
        showLoggedOutState();
        setAuthMessage({ status: "Account created and saved. Please log in with your new account." });
        document.getElementById("login-email").value = email;
    } catch (error) {
        setAuthMessage({ error: formatAuthError(error) });
    } finally {
        setLoadingState("signup-submit", false, '<span class="btn-icon">⌖</span> Register <span class="muzzle-flash"></span>');
    }
}

async function handleForgotPassword(event) {
    event.preventDefault();
    if (!supabase) {
        return;
    }

    const email = document.getElementById("forgot-email").value.trim();

    setAuthMessage();
    setLoadingState("forgot-submit", true, '<span class="btn-icon">⌖</span> Send Reset Link <span class="muzzle-flash"></span>', "Sending...");

    try {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: getRedirectUrl()
        });

        if (error) {
            throw error;
        }

        setAuthMessage({ status: "Password reset email sent. Open the link in your inbox to continue." });
        setAuthView("login", { clearMessages: false });
        document.getElementById("login-email").value = email;
    } catch (error) {
        setAuthMessage({ error: formatAuthError(error) });
    } finally {
        setLoadingState("forgot-submit", false, '<span class="btn-icon">⌖</span> Send Reset Link <span class="muzzle-flash"></span>');
    }
}

async function handleResetPassword(event) {
    event.preventDefault();
    if (!supabase) {
        return;
    }

    const password = document.getElementById("reset-password").value;

    setAuthMessage();
    setLoadingState("reset-submit", true, '<span class="btn-icon">⌖</span> Update Password <span class="muzzle-flash"></span>', "Updating...");

    try {
        const { data, error } = await supabase.auth.updateUser({ password });
        if (error) {
            throw error;
        }

        setAuthMessage({ status: "Password updated successfully." });
        showAuthenticatedState(data.user);
        window.history.replaceState({}, document.title, getRedirectUrl());
    } catch (error) {
        setAuthMessage({ error: formatAuthError(error) });
    } finally {
        setLoadingState("reset-submit", false, '<span class="btn-icon">⌖</span> Update Password <span class="muzzle-flash"></span>');
    }
}

async function handleLogout() {
    if (!supabase) {
        return;
    }

    const logoutButton = document.getElementById("logout-btn");
    logoutButton.disabled = true;

    try {
        const { error } = await supabase.auth.signOut();
        if (error) {
            throw error;
        }

        window.history.replaceState({}, document.title, getRedirectUrl());
        showLoggedOutState();
        setAuthMessage({ status: "You have been logged out." });
    } catch (error) {
        setAuthMessage({ error: formatAuthError(error) });
    } finally {
        logoutButton.disabled = false;
    }
}

function bindAuthUi() {
    document.querySelectorAll("[data-auth-view]").forEach(control => {
        control.addEventListener("click", () => {
            const view = control.dataset.authView;
            setAuthView(view);

            if (view === "forgot") {
                document.getElementById("forgot-email").value = document.getElementById("login-email").value.trim();
            }
        });
    });

    document.getElementById("login-form").addEventListener("submit", handleLogin);
    document.getElementById("signup-form").addEventListener("submit", handleSignUp);
    document.getElementById("forgot-form").addEventListener("submit", handleForgotPassword);
    document.getElementById("reset-form").addEventListener("submit", handleResetPassword);
    document.getElementById("logout-btn").addEventListener("click", handleLogout);
}

async function initialiseAuth() {
    bindAuthUi();

    if (!isSupabaseConfigured) {
        showLoggedOutState();
        setAuthMessage({
            error: "Add your Supabase project URL and anon key in js/supabase-config.js before testing auth."
        });
        return;
    }

    if (isRecoveryFlow()) {
        const { overlay } = getAuthElements();
        overlay.classList.remove("hidden");
        setAuthView("reset", { clearMessages: false });
        setAuthMessage({ status: "Create a new password to finish recovery." });
    }

    const { data, error } = await supabase.auth.getSession();
    if (error) {
        setAuthMessage({ error: formatAuthError(error) });
        showLoggedOutState();
        return;
    }

    if (data.session?.user && !isRecoveryFlow()) {
        showAuthenticatedState(data.session.user);
    } else {
        showLoggedOutState();
        if (isRecoveryFlow()) {
            const { overlay } = getAuthElements();
            overlay.classList.remove("hidden");
            setAuthView("reset", { clearMessages: false });
            setAuthMessage({ status: "Create a new password to finish recovery." });
        }
    }

    supabase.auth.onAuthStateChange((event, session) => {
        if (event === "PASSWORD_RECOVERY") {
            const { overlay } = getAuthElements();
            overlay.classList.remove("hidden");
            setAuthView("reset", { clearMessages: false });
            setAuthMessage({ status: "Create a new password to finish recovery." });
            return;
        }

        if (session?.user) {
            showAuthenticatedState(session.user);
            return;
        }

        if (event === "SIGNED_OUT") {
            showLoggedOutState();
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    setInterval(cycleIntroBackground, 3000);
    cycleIntroBackground();
    showSlide(currentCarouselIndex);
    startCarousel();

    document.addEventListener("click", event => {
        const animatedTarget = event.target.closest("button, a, .dot");
        if (!animatedTarget) {
            return;
        }

        addClickAnimation(animatedTarget, event);
    });

    initialiseAuth();
});

window.showContent = showContent;
window.currentSlide = currentSlide;
window.moveSlide = moveSlide;
