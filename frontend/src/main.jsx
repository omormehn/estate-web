import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ThemeProvider } from "@material-tailwind/react";
import { AuthContextProvider } from "./context/AuthContext";

import { SearchContextProvider } from "./context/SearchContext";
import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <AuthContextProvider>
          <SearchContextProvider>
            <App />
          </SearchContextProvider>
        </AuthContextProvider>
      </GoogleOAuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);
