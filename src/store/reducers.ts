import { combineReducers } from "redux";

import authentication from "../containers/auth/slice";
import popup from "../containers/popup/popupSlice";
import playlists from "../containers/playlist/slice";
import search from "../containers/search/searchSlice";

const rootReducer = combineReducers({
  authentication,
  popup,
  playlists,
  search,
});

export default rootReducer;
