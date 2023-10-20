import { combineReducers } from "redux";

import authentication from "../containers/auth/slice";
import popup from "../containers/playlist/popupSlice";
const rootReducer = combineReducers({
  authentication,
  popup,
});

export default rootReducer;
