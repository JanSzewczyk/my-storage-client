import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";

import browserHistory from "./shared/history";
import store from "./shared/store";
import * as serviceWorker from "./serviceWorker";

import App from "./App";
import NotificationProvider from "./components/UI/Notification";

import "./index.scss";

const app = (
  <NotificationProvider>
    <Provider store={store}>
      <Router history={browserHistory}>
        <App />
      </Router>
    </Provider>
  </NotificationProvider>
);

ReactDOM.render(
  <React.StrictMode>{app}</React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();
