import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { store } from "../../store/store";


const token = store.getState().authentication.accessToken;
const userId = store.getState().authentication.user?.userId;

//Get all the playlist of current user
export const getPlaylists = async () => {
    
    try {
        
        const request = await axios.get(`https://api.spotify.com/v1/users/${userId}/playlists`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        console.log(request.data)
        return request.data; 
    } catch (error) {
        console.log("Erreur", error);
        return null;
    }
}

const playlistsSlice = createSlice({
  name:"playlists",
  initialState:[],
  reducers: {
    addPlaylist: () => {}
  }
})