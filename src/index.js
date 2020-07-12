import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";

import browserHistory from "./shared/config/history";
import store from "./shared/config/store";
import * as serviceWorker from "./serviceWorker";
// import NotificationProvider from "./components/UI/Notification";

import App from "./App";

import "./index.scss";

const app = (
  // <NotificationProvider>
  <Provider store={store}>
    <Router history={browserHistory}>
      <App />
    </Router>
  </Provider>
  // </NotificationProvider>
);

ReactDOM.render(
  <React.StrictMode>{app}</React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();
