import { combineReducers } from "redux";
import authReducer from "./auth";
import skillReducer from "./skill";

const rootReducer = combineReducers({
  auth: authReducer,
  skillSettings: skillReducer,
});

export default rootReducer;
