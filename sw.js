if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js');
}

function reloadCSS() {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "style.css";
  document.head.appendChild(link);
}