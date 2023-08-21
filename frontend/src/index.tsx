// import { StrictMode } from "react";
import "index.css";
import { createRoot } from "react-dom/client";

import App from "./App";

const rootElement = document.getElementById("root");

if (rootElement) {
	const root = createRoot(rootElement);
	root.render(<App />);
}

// comment in for PWA with service worker in production mode
// registerServiceWorker();
