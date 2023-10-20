import { configureStore, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { store } from "../../store/store";

const initialState = {
    playlists: [],
}

const playlistsSlice = createSlice({
    name:"playlists",
    initialState,
    reducers: {
      addPlaylist: (state, action) => {
          const newPlaylist = {
              name: action.payload,
              description: action.payload
          };
          //state.push(newPlaylist);
      }
    },
    extraReducers(builder) {
        builder.addCase(fetchPlaylists.fulfilled, (state, action) =>{
            return action.payload;
        })
    },
  })

const token = 1;
const userId=1;

export const fetchPlaylists = createAsyncThunk('playlists/fetchPlaylists', async () =>{
    const token = await store.getState().authentication.accessToken;
    const userId = await store.getState().authentication.user?.userId;
    console.log(userId + " TOKE " + token);
    
    try{
        const response = await axios.get(`https://api.spotify.com/v1/users/${userId}/playlists`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        console.log(response.data);
        
        return response.data;
    }catch(error){
        return null;
    }
})


const addPlaylist = async () => {
    try{
        const request = await axios.post(`https://api.spotify.com/v1/users/${userId}/playlists`,{
            headers: {Authorization: `Bearer ${token}`},
            //body: {name + description}
        })
    }catch(error){
        return null;
    }
}

export default playlistsSlice.reducer;