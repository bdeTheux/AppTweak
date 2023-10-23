import { all } from "@redux-saga/core/effects";

import authSaga from "../containers/auth/authSagas";
import playlistSaga, { CreatePlaylistSaga, GetPlaylistTracksSaga } from "../containers/playlist/playlistSaga";

export default function* rootSaga() {
  yield all([authSaga(), playlistSaga(), CreatePlaylistSaga(), GetPlaylistTracksSaga()]);
}
