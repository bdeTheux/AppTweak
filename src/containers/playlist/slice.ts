import { configureStore, createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { playlistsSelectors } from "./selectors";
import { useSelector } from "react-redux";
export interface Playlist {
    id? : string;
    name?: string;
    description?: string;
    tracks? : Track[];
    snapshot_id?: string
}

export interface Track {
  id: string;
  album: any;
  name: string;
  albumName: string;
  artist: string;
  cover: string;
  releaseDate: string;
  uri: string;
}

export interface ListPlaylists {
    items : Playlist[];
    selectedPlaylist : Playlist;
    
}
export interface PlaylistState {
    playlists: ListPlaylists;
    //selectedPlaylist: Playlist;
  }
  
const initialState: ListPlaylists = {
    items: [],
    selectedPlaylist: {},

}

//Create actions
export const getPlaylists = createAction("playlists/getPlaylists");
export const getPlaylistsSuccess = createAction<PlaylistState>("playlists/getPlaylistsSuccess");
export const getPlaylistsFail = createAction<any>("playlists/getPlaylistsFail");

export const addPlaylist = createAction<any>("playlists/addPlaylist");
export const addPlaylistSuccess = createAction<Playlist>("playlists/addPlaylistSuccess");
export const addPlaylistFail = createAction<any>("playlists/addPlaylistFail");

export const getPlaylistTracks = createAction<Playlist>("playlists/getPlaylistTracks");
export const getPlaylistTracksSuccess = createAction<Playlist>("playlists/getPlaylistTracksSuccess");
export const getPlaylistTracksFail = createAction<any>("playlists/getPlaylistTracksFail");

export const addPlaylistTracks = createAction("playlists/addPlaylistTracks");
export const addPlaylistTracksSuccess = createAction<Playlist>("playlists/addPlaylistTracksSuccess");
export const addPlaylistTracksFail = createAction<any>("playlists/addPlaylistTracksFail");

export const removePlaylistTracks = createAction("playlists/removePlaylistTracks");
export const removePlaylistTracksSuccess = createAction<Playlist>("playlists/removePlaylistTracksSuccess");
export const removePlaylistTracksFail = createAction<any>("playlists/removePlaylistTracksFail");

const playlistsSlice = createSlice({
    name:"playlists",
    initialState,
    reducers: {
      setPlaylists: (state, action) => {
        state.items = action.payload;
      },
      setPlaylist: (state, action) => {
        state.selectedPlaylist = action.payload;
      },
    },
    extraReducers(builder) {
        builder
            .addCase(getPlaylistsSuccess, (state, action) => {
                state.items = action.payload.playlists?.items;
            })
            .addCase(addPlaylistSuccess, (state, action: any) => {
                console.log(action)
                
                const newPlaylist: Playlist = {
                    name: action.payload.tracks.name,//action.values.name,
                    description: action.payload.tracks.description,
                    id: action.payload.tracks.id,
                    tracks: [],
                    snapshot_id: action.payload.tracks.snapshot_id
                };
                state.items = [...state.items, newPlaylist]
            })
            .addCase(getPlaylistTracksSuccess, (state, action: any) => {
              console.log("action", action)
              
              
              const regex = /\/playlists\/([^/]+)/;
              
              const match = action.payload.tracks.href.match(regex);
              
              let playlistId: string | null | undefined = null;
              if (match) {
                playlistId = match[1];
              }
              console.log(action.payload.playlistId + "action")
              let playlist: Playlist = {
                id: playlistId|| "",
                tracks: action.payload.tracks.items.map((i: { track: Track; }) => i.track)
              }
              state.selectedPlaylist = playlist
              if(state.selectedPlaylist.tracks !== undefined){
                console.log(state.selectedPlaylist.tracks[0] + " SELECTED");

              }
              
              console.log( action.payload.tracks.items.map((i: { track: Track; }) => i.track))

              //state.items[2].tracks = action.payload.tracks.items.map((i: { track: Track; }) => i.track)
              state.items.filter(i => i.id === playlistId)[0].tracks = action.payload.tracks.items.map((i: { track: Track; }) => i.track);
              
            }).addCase(addPlaylistTracksSuccess, (state, action: any) => { 
              state.selectedPlaylist.snapshot_id = action.payload.tracks.snapshot_id
            })
            .addCase(removePlaylistTracksSuccess, (state, action: any) => { 
              state.selectedPlaylist.snapshot_id = action.payload.tracks.snapshot_id
            })

    },
  })

export const { setPlaylists } = playlistsSlice.actions;

export const  selectAllPlaylist  = (state: { playlists: any; }) => state.playlists;

export default playlistsSlice.reducer;