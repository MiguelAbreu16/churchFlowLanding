import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { ApolloProvider } from "@apollo/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { theme } from "./theme/theme";
import { apolloClient } from "./apollo/client";
import "./i18n";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ApolloProvider client={apolloClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </ApolloProvider>
  </React.StrictMode>
);
