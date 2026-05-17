import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { SUPABASE_ANON_KEY, SUPABASE_URL } from "../supabase-config.js";

const AUTH_VIEWS = ["login", "signup", "forgot", "reset"];
const PLACEHOLDER_URL = "https://YOUR_PROJECT_ID.supabase.co";
const PLACEHOLDER_KEY = "YOUR_SUPABASE_ANON_KEY";
const ICON_HTML = '<span class="btn-icon">&#8982;</span>';

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
            detectSessionInUrl: false
        }
    })
    : null;

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
        ? `${ICON_HTML} ${loadingLabel} <span class="muzzle-flash"></span>`
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

function showAuthenticatedState(user, showContent, options = {}) {
    const { redirectToHome = false } = options;
    const { overlay, sessionEmail, logoutButton } = getAuthElements();
    overlay.classList.add("hidden");
    sessionEmail.textContent = user?.email ?? "Signed in";
    logoutButton.hidden = false;

    if (redirectToHome) {
        showContent("home");
    }
}

function showLoggedOutState() {
    const { overlay, sessionEmail, logoutButton } = getAuthElements();
    overlay.classList.remove("hidden");
    sessionEmail.textContent = "Guest";
    logoutButton.hidden = true;
    setAuthView("login");
}

function bindAuthUi(handlers) {
    document.querySelectorAll("[data-auth-view]").forEach(control => {
        control.addEventListener("click", () => {
            const view = control.dataset.authView;
            setAuthView(view);

            if (view === "forgot") {
                document.getElementById("forgot-email").value = document.getElementById("login-email").value.trim();
            }
        });
    });

    document.getElementById("login-form").addEventListener("submit", handlers.handleLogin);
    document.getElementById("signup-form").addEventListener("submit", handlers.handleSignUp);
    document.getElementById("forgot-form").addEventListener("submit", handlers.handleForgotPassword);
    document.getElementById("reset-form").addEventListener("submit", handlers.handleResetPassword);
    document.getElementById("logout-btn").addEventListener("click", handlers.handleLogout);
}

export function initialiseAuth({ showContent }) {
    async function handleLogin(event) {
        event.preventDefault();
        if (!supabase) {
            return;
        }

        const email = document.getElementById("login-email").value.trim();
        const password = document.getElementById("login-password").value;

        setAuthMessage();
        setLoadingState("login-submit", true, `${ICON_HTML} Log In <span class="muzzle-flash"></span>`, "Logging In...");

        try {
            const { data, error } = await supabase.auth.signInWithPassword({ email, password });
            if (error) {
                throw error;
            }

            showAuthenticatedState(data.user, showContent, { redirectToHome: true });
        } catch (error) {
            setAuthMessage({ error: formatAuthError(error) });
        } finally {
            setLoadingState("login-submit", false, `${ICON_HTML} Log In <span class="muzzle-flash"></span>`);
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
        setLoadingState("signup-submit", true, `${ICON_HTML} Register <span class="muzzle-flash"></span>`, "Creating...");

        try {
            const { data, error } = await supabase.auth.signUp({ email, password });
            if (error) {
                throw error;
            }

            if (data.session) {
                const { error: signOutError } = await supabase.auth.signOut();
                if (signOutError) {
                    throw signOutError;
                }
            }

            showLoggedOutState();
            setAuthMessage({ status: "Account created and saved. Please log in with your new account." });
            document.getElementById("login-email").value = email;
        } catch (error) {
            setAuthMessage({ error: formatAuthError(error) });
        } finally {
            setLoadingState("signup-submit", false, `${ICON_HTML} Register <span class="muzzle-flash"></span>`);
        }
    }

    async function handleForgotPassword(event) {
        event.preventDefault();
        if (!supabase) {
            return;
        }

        const email = document.getElementById("forgot-email").value.trim();

        setAuthMessage();
        setLoadingState("forgot-submit", true, `${ICON_HTML} Send Reset Link <span class="muzzle-flash"></span>`, "Sending...");

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
            setLoadingState("forgot-submit", false, `${ICON_HTML} Send Reset Link <span class="muzzle-flash"></span>`);
        }
    }

    async function handleResetPassword(event) {
        event.preventDefault();
        if (!supabase) {
            return;
        }

        const password = document.getElementById("reset-password").value;

        setAuthMessage();
        setLoadingState("reset-submit", true, `${ICON_HTML} Update Password <span class="muzzle-flash"></span>`, "Updating...");

        try {
            // If the recovery link included temporary tokens in the URL hash/search,
            // set them as the session so `updateUser` is authorized. We avoid
            // auto-detecting sessions on load so users aren't automatically
            // signed-in when they click the email link.
            function extractAuthParams() {
                const combined = new URLSearchParams(window.location.search);
                const hash = window.location.hash.replace(/^#/, "");
                if (hash) {
                    const hashParams = new URLSearchParams(hash);
                    for (const [k, v] of hashParams.entries()) {
                        if (!combined.has(k)) combined.set(k, v);
                    }
                }

                return {
                    access_token: combined.get("access_token"),
                    refresh_token: combined.get("refresh_token")
                };
            }

            const { access_token, refresh_token } = extractAuthParams();
            if (access_token) {
                const { error: setSessionError } = await supabase.auth.setSession({ access_token, refresh_token });
                if (setSessionError) {
                    throw setSessionError;
                }
            }

            const { data, error } = await supabase.auth.updateUser({ password });
            if (error) {
                throw error;
            }

            setAuthMessage({ status: "Password updated successfully." });
            showAuthenticatedState(data.user, showContent, { redirectToHome: true });
            window.history.replaceState({}, document.title, getRedirectUrl());
        } catch (error) {
            setAuthMessage({ error: formatAuthError(error) });
        } finally {
            setLoadingState("reset-submit", false, `${ICON_HTML} Update Password <span class="muzzle-flash"></span>`);
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

    bindAuthUi({ handleLogin, handleSignUp, handleForgotPassword, handleResetPassword, handleLogout });

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

    supabase.auth.getSession().then(({ data, error }) => {
        if (error) {
            setAuthMessage({ error: formatAuthError(error) });
            showLoggedOutState();
            return;
        }

        if (data.session?.user && !isRecoveryFlow()) {
            showAuthenticatedState(data.session.user, showContent);
            return;
        }

        showLoggedOutState();
        if (isRecoveryFlow()) {
            const { overlay } = getAuthElements();
            overlay.classList.remove("hidden");
            setAuthView("reset", { clearMessages: false });
            setAuthMessage({ status: "Create a new password to finish recovery." });
        }
    });

    supabase.auth.onAuthStateChange((event, session) => {
        if (event === "PASSWORD_RECOVERY") {
            const { overlay } = getAuthElements();
            overlay.classList.remove("hidden");
            setAuthView("reset", { clearMessages: false });
            setAuthMessage({ status: "Create a new password to finish recovery." });
            return;
        }

        if (session?.user) {
            showAuthenticatedState(session.user, showContent);
            return;
        }

        if (event === "SIGNED_OUT") {
            showLoggedOutState();
        }
    });
}
