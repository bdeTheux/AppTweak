import { configureStore, createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface Playlist {
    id? : string;
    name?: string;
    description?: string;
  }

export interface ListPlaylists {
    items : Playlist[];
}
export interface PlaylistState {
    playlists: ListPlaylists;
  }
  
const initialState: ListPlaylists = {
    items: [],
}

//Create actions
export const getPlaylists = createAction("playlists/getPlaylists");
export const getPlaylistsSuccess = createAction<PlaylistState>("playlists/getPlaylistsSuccess");
export const addPlaylistSuccess = createAction<Playlist>("playlists/addPlaylistSuccess");
export const addPlaylist = (values: any) => ({
    type: "playlists/addPlaylistSuccess",
    values: values,
  });

const playlistsSlice = createSlice({
    name:"playlists",
    initialState,
    reducers: {
      setPlaylists: (state, action) => {
        state.items = action.payload;
      }
    },
    extraReducers(builder) {
        builder
            .addCase(getPlaylistsSuccess, (state, action) => {
                state.items = action.payload.playlists?.items;
            })
            .addCase(addPlaylistSuccess, (state, action: any) => {
                console.log(action)
                const newPlaylist: Playlist = {
                    name: action.values.name,
                    description: action.values.description,
                    id: action.values.id
                };
                state.items = [...state.items, newPlaylist]
            })      
    },
  })

export const { setPlaylists } = playlistsSlice.actions;

export const  selectAllPlaylist  = (state: { playlists: any; }) => state.playlists;

export default playlistsSlice.reducer;