import { User } from "../auth/slice";
import axios from "axios";

import { call, put, select, takeEvery } from "@redux-saga/core/effects";
import { authSelectors } from "../auth/selectors";
import { getPlaylists, getPlaylistsSuccess, addPlaylist, getPlaylistTracks, getPlaylistTracksSuccess, addPlaylistTracks, addPlaylistTracksSuccess, Playlist, removePlaylistTracks } from "./slice";
import { playlistsSelectors } from "./selectors";

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

function* addPlaylistSaga ({ values } : {values :any}) {
    try{
      const accessToken: string = yield select(authSelectors.getAccessToken);
      const user: User = yield select(authSelectors.getUser);
      const userId = user.userId;
      
        const request = () =>
         axios.post(`https://api.spotify.com/v1/users/${userId}/playlists`,
          {
            name: values.name,
            description: values.description,
            public: false,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`, 
            }
          },
        );
        
        const { data } = yield call(request);
        yield put({ type:"playlists/addPlaylistSuccess", playlists: data });
    }catch(error){
        return null;
    }
}

function* getPlaylistTracksSaga ({ values } : {values :any}) {
  try{
    console.log(values)
    const accessToken: string = yield select(authSelectors.getAccessToken);
    const playlistId = values.playlistId;
    
    const request = () => 
      axios.get(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
    
    const { data } = yield call(request);
    yield put(getPlaylistTracksSuccess({ tracks : data }));

  }catch(error){
    return null;
  }

}

function* addPlaylistTracksSaga ({ values } : {values :any}) {
  try{
    const accessToken: string = yield select(authSelectors.getAccessToken);
    const playlist: Playlist = yield select(playlistsSelectors.getPlaylist);
    const playlistId = playlist.id;
    
    const request = () => 
      axios.post(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
      {
        uris : [
          values.uri
        ],
        position: 0
      },
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
    
    const { data } = yield call(request);
    yield put(addPlaylistTracksSuccess({ tracks : data }));

  }catch(error){
    return null;
  }

}

function* removePlaylistTracksSaga ({ values } : {values :any}) {
  try{
    const accessToken: string = yield select(authSelectors.getAccessToken);
    const playlist: Playlist = yield select(playlistsSelectors.getPlaylist);
    const playlistId = playlist.id;
    console.log(values.uri);
    
    
    const request = () => 
      axios.delete(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`,{ 
        headers: { Authorization: `Bearer ${accessToken}` }, 
        data: {tracks : [{uri:values.uri}]}
      })
    
    const { data } = yield call(request);
    yield put(addPlaylistTracksSuccess({ tracks : data }));

  }catch(error){
    return null;
  }

}

  export default function* playlistSaga() {
    yield takeEvery(getPlaylists.type, getPlaylistsSaga);
  }
  export function* CreatePlaylistSaga() {
    yield takeEvery(addPlaylist, addPlaylistSaga);
  }

  export function* GetPlaylistTracksSaga() {
    yield takeEvery(getPlaylistTracks, getPlaylistTracksSaga);
  }
  
  export function* AddPlaylistTracksSaga() {
    yield takeEvery(addPlaylistTracks, addPlaylistTracksSaga);
  }
  
  export function* RemovePlaylistTracksSaga() {
    yield takeEvery(removePlaylistTracks, removePlaylistTracksSaga);
  }