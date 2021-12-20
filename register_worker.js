if ("serviceWorker" in navigator) {
  window.addEventListener("load", async () => {
    const sw = await navigator.serviceWorker.register("/sw.js");
    console.log("Service Worker: Registered", sw);
  });
}
