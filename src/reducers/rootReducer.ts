import { combineReducers } from "redux";
import userReducer from "./userReducer";
import linksReducer from "./linksReducer";

const rootReducer = combineReducers({
  userState: userReducer,
  linksState: linksReducer,
});

export type RootReducerType = typeof rootReducer;
export default rootReducer;
