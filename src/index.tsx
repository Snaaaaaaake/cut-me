import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider as StoreProvider } from "react-redux";
import dotenv from "dotenv";
import LinkService from "./service/LinkService";
import ServiceContext from "./components/Context/ServiceContext";
import App from "./components/App/App";
import store from "./store/store";

dotenv.config();
const linkService = new LinkService();

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider store={store}>
      <ServiceContext.Provider value={linkService}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ServiceContext.Provider>
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
