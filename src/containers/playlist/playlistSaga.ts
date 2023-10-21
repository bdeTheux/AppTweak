import { User } from "../auth/slice";
import axios from "axios";

import { call, put, select, takeEvery } from "@redux-saga/core/effects";
import { authSelectors } from "../auth/selectors";
import { getPlaylists, getPlaylistsSuccess } from "./slice";

function* getPlaylistsSaga() {
    try {
      const accessToken: string = yield select(authSelectors.getAccessToken);
      const user: User = yield select(authSelectors.getUser);
      const userId = user.userId;
  
      const request = () =>
        axios.get<any>(`https://api.spotify.com/v1/users/${userId}/playlists`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
      const { data } = yield call(request);

      yield put(getPlaylistsSuccess({ playlists: data }));
    } catch (error: any) {
        yield console.log("error");

    }
  }
  export default function* playlistSaga() {
    yield takeEvery(getPlaylists.type, getPlaylistsSaga);
  }