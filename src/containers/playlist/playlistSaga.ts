import { User } from "../auth/slice";
import axios from "axios";

import { call, put, select, takeLatest, takeEvery, takeLeading } from "@redux-saga/core/effects";

import { authSelectors } from "../auth/selectors";
import { 
  getPlaylists,
  getPlaylistsSuccess,
  getPlaylistsFail,
  addPlaylist,
  addPlaylistSuccess,
  addPlaylistFail,
  getPlaylistTracks,
  getPlaylistTracksSuccess,
  getPlaylistTracksFail,
  addPlaylistTracks,
  addPlaylistTracksSuccess,
  addPlaylistTracksFail,
  Playlist,
  removePlaylistTracks, 
  removePlaylistTracksSuccess,
  removePlaylistTracksFail} from "./slice";
import { playlistsSelectors } from "./selectors";
function* getPlaylistsSaga() {
    try {
      const accessToken: string = yield select(authSelectors.getAccessToken);
      const user: User = yield select(authSelectors.getUser);
      const userId = user.userId;
      
      //https://api.spotify.com/v1/me/playlists
      const request = () =>
        axios.get<any>(`https://api.spotify.com/v1/users/${userId}/playlists`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
      const { data } = yield call(request);

      yield put(getPlaylistsSuccess({ playlists: data }));
    } catch (error: any) {
      yield put(getPlaylistsFail({ messages: error.message }));
    }
  }

type AnyAction = {type: string, [key: string]: any}
function* addPlaylistSaga ( values  : any) {
    try{      
      const accessToken: string = yield select(authSelectors.getAccessToken);
      const user: User = yield select(authSelectors.getUser);
      const userId = user.userId;
      
      //return;
      const request = () =>
        axios.post(`https://api.spotify.com/v1/users/${userId}/playlists`,
        {
          name: values.payload.name,
          description: values.payload.description,
          public: false,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`, 
          }
        },
      );
      
      const { data } = yield call(request) as Playlist;
      yield put(addPlaylistSuccess({tracks: data}));
    }catch(error: any){
      yield put(addPlaylistFail({ message: error.message}));
    }
}

function* getPlaylistTracksSaga ( values  : any) {
  try{
    const accessToken: string = yield select(authSelectors.getAccessToken);
    const playlistId: string = values.payload.id//yield select(playlistsSelectors.getPlaylist);// values.playlistId;
    
    const request = () => 
      axios.get(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
    
    const { data } = yield call(request);
    yield put(getPlaylistTracksSuccess({ tracks : data }));

  }catch(error: any){
    yield put(getPlaylistTracksFail({ message: error.message }));
  }

}

function* addPlaylistTracksSaga ( values :any) {
  try{
    const accessToken: string = yield select(authSelectors.getAccessToken);
    const playlist: Playlist = yield select(playlistsSelectors.getPlaylist);
    const playlistId = playlist.id;
    
    const request = () => 
      axios.post(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
      {
        uris : [
          values.payload.uri
        ],
        position: 0
      },
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
    
    const { data } = yield call(request);
    yield put(addPlaylistTracksSuccess({ tracks : data }));

  }catch(error: any){
    yield put(addPlaylistTracksFail({ message: error.message }));
  }

}

function* removePlaylistTracksSaga (values : any) {
  try{
    const accessToken: string = yield select(authSelectors.getAccessToken);
    const playlist: Playlist = yield select(playlistsSelectors.getPlaylist);
    const playlistId = playlist.id;
    
    const request = () => 
      axios.delete(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`,{ 
        headers: { Authorization: `Bearer ${accessToken}` }, 
        data: {tracks : [{uri:values.payload.uri}]}
      })
    
    const { data } = yield call(request);
    yield put(removePlaylistTracksSuccess({ tracks : data }));

  }catch(error: any){
    yield put(removePlaylistTracksFail({ message: error.message }));
  }
}

export default function* playlistSaga() {
  yield takeEvery(getPlaylists.type, getPlaylistsSaga);
}
export function* CreatePlaylistSaga() {
  yield takeLatest(addPlaylist.type, addPlaylistSaga);
}

export function* GetPlaylistTracksSaga() {
  yield takeEvery(getPlaylistTracks.type, getPlaylistTracksSaga);
}

export function* AddPlaylistTracksSaga() {
  yield takeLatest(addPlaylistTracks.type, addPlaylistTracksSaga);
}

export function* RemovePlaylistTracksSaga() {
  yield takeLatest(removePlaylistTracks.type, removePlaylistTracksSaga);
}