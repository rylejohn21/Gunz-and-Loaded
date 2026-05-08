export function initialiseServiceWorker() {
    if (!("serviceWorker" in navigator)) {
        return;
    }

    window.addEventListener("load", async () => {
        const isLocalHost = ["localhost", "127.0.0.1"].includes(window.location.hostname);

        if (isLocalHost) {
            const registrations = await navigator.serviceWorker.getRegistrations();
            await Promise.all(registrations.map(registration => registration.unregister()));

            if ("caches" in window) {
                const cacheNames = await caches.keys();
                await Promise.all(cacheNames.map(cacheName => caches.delete(cacheName)));
            }

            return;
        }

        navigator.serviceWorker.register("/sw.js?v=3");
    });
}
