import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";

import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";

import "./index.scss";

import { browserHistory } from "./shared/history";
import * as serviceWorker from "./serviceWorker";

import App from "./App";
import NotificationProvider from "./components/UI/Notification";
import authReducer from "./store/auth/authReducer";
import userReducer from "./store/user/userReducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducers = combineReducers({
  auth: authReducer,
  user: userReducer,
});

const store = createStore(
  rootReducers,
  composeEnhancers(applyMiddleware(thunk))
);

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
