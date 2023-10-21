import { configureStore, createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

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

const playlistsSlice = createSlice({
    name:"playlists",
    initialState,
    reducers: {
      setPlaylists: (state, action) => {
        state.items = action.payload;
      },
      addPlaylist: (state, action) => {
          const newPlaylist = {
              name: action.payload,
              description: action.payload
          };
          //state.push(newPlaylist);
      }
    },
    extraReducers(builder) {
        builder
            .addCase(getPlaylistsSuccess, (state, action) => {
                state.items = action.payload.playlists?.items;
            })
    },
  })


/*const addPlaylist = async () => {
    try{
        const request = await axios.post(`https://api.spotify.com/v1/users/${userId}/playlists`,{
            headers: {Authorization: `Bearer ${token}`},
            //body: {name + description}
        })
    }catch(error){
        return null;
    }
}*/

export const { setPlaylists } = playlistsSlice.actions;

export const  selectAllPlaylist  = (state: { playlists: any; }) => state.playlists;//playlistsSlice.actions;

export default playlistsSlice.reducer;