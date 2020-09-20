import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";

import authReducer from "../../store/auth/auth.reducer";
import userReducer from "../../store/user/userReducer";
import employeeReducer from "../../store/employee/employee.reducer";
import storageReducer from "../../store/storage/storageReducer";
import itemReducer from "../../store/item/itemReducer";
import actionReducer from "../../store/action/actionReducer";
import statisticReducer from "../../store/statistic/statisticReducer";
import productReducer from "../../store/product/productReducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// TODO add type
const rootReducers = combineReducers({
  action: actionReducer,
  authStore: authReducer,
  employeeStore: employeeReducer,
  item: itemReducer,
  product: productReducer,
  statistic: statisticReducer,
  storage: storageReducer,
  user: userReducer,
});

const store = createStore(
  rootReducers,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
