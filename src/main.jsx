import React from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";
import { Provider } from "react-redux";
// import reportWebVitals from "./reportWebVitals";
import { reduxStore } from "./App/store";
import { CookiesProvider } from "react-cookie";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CookiesProvider defaultSetOptions={{ path: "/" }}>
      <Provider store={reduxStore}>
        <App />
      </Provider>
    </CookiesProvider>
  </React.StrictMode>
);

// reportWebVitals();
