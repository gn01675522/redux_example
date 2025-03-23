import { StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import axios from "axios";

import { store } from "./store/store";

import App from "./App";

import "./stylesheets/_reset.scss";

axios.defaults.baseURL = process.env.APP_API_URL || "http://localhost:3000";

const element = document.getElementById("root") as HTMLElement;

const root = ReactDOM.createRoot(element);

/**
 * @description 使用方式就是 import Provider from react-redux，然後傳入 store 即可
 * @description 然後注意的是要讓他在最外層，其他的就沒什麼特別需要注意的
 */
root.render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
