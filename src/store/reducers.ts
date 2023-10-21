import { combineReducers } from "redux";

import authentication from "../containers/auth/slice";
import popup from "../containers/playlist/popupSlice";
import playlists from "../containers/playlist/slice";

const rootReducer = combineReducers({
  authentication,
  popup,
  playlists,
});

export default rootReducer;
