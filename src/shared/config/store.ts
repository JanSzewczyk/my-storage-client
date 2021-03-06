import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";

import authReducer from "../../store/auth/auth.reducer";
import userReducer from "../../store/user/user.reducer";
import employeeReducer from "../../store/employee/employee.reducer";
import storageReducer from "../../store/storage/storage.reducer";
import itemReducer from "../../store/item/item.reducer";
import actionReducer from "../../store/action/action.reducer";
import statisticReducer from "../../store/statistic/statistic.reducer";
import productReducer from "../../store/product/product.reducer";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const rootReducers = combineReducers({
  actionStore: actionReducer,
  authStore: authReducer,
  employeeStore: employeeReducer,
  itemStore: itemReducer,
  productStore: productReducer,
  statisticStore: statisticReducer,
  storageStore: storageReducer,
  userStore: userReducer,
});

const store = createStore(
  rootReducers,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
