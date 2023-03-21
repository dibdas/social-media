import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>

  // <BrowserRouter>
  // Hashrouter is for the production
  // hashRouter and browserRouter , both are different but intrenally they work in similar fashion
  // after deployment BrowserRouter does not work properly ,therfore we use HashRouter
  // with the help of HasHrouter, routes work properly , after the deployment
  <HashRouter>
    {/* Provider can be written inside or outside the BrowserRouter, they are independent to each other */}

    <Provider store={store}>
      <App />
    </Provider>
  </HashRouter>
  // </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
