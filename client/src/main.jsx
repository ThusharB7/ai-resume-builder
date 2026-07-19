import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";

import App from "./App";

import ThemeProvider from "./providers/ThemeProvider";
import QueryProvider from "./providers/QueryProvider";

import { Toaster } from "sonner";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <QueryProvider>
        <App />
        <Toaster richColors position="top-right" />
      </QueryProvider>
    </ThemeProvider>
  </React.StrictMode>
);