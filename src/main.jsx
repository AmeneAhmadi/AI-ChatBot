import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ThemeProvider from "./contexts/ThemeProvider";
import {AuthProvider} from "./contexts/AuthProvider";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
);
