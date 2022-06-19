import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

//Redux
import { Provider } from "react-redux";
import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./components/reducers/index";

// Route
import { BrowserRouter } from "react-router-dom";

//Antd
// import "antd/dist/antd.css";
import "antd/dist/antd.min.css";
import 'bootstrap/dist/css/bootstrap.min.css';

// store
const store = createStore(rootReducer, composeWithDevTools());

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
  // </React.StrictMode>
);
