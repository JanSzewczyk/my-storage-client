import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";

import authReducer from "../store/auth/authReducer";
import userReducer from "../store/user/userReducer";
import employeeReducer from "../store/employee/employeeReducer";
import storageReducer from "../store/storage/storageReducer";
import itemReducer from "../store/item/itemReducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducers = combineReducers({
  auth: authReducer,
  employee: employeeReducer,
  item: itemReducer,
  storage: storageReducer,
  user: userReducer,
});

const store = createStore(
  rootReducers,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
