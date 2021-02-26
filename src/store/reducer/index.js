import { combineReducers } from "redux";
import skillReducer from "./skill";

const rootReducer = combineReducers({
  skillSettings: skillReducer,
});

export default rootReducer;
