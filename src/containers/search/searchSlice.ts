import { createAction, createSlice } from "@reduxjs/toolkit";
import { Track } from "../playlist/slice";



export interface ListTracks {
    items : Track[];
    searchString : string;
    
}
export interface TrackState {
    tracks: ListTracks;
    //selectedPlaylist: Playlist;
  }
  
const initialState: ListTracks = {
    items: [],
    searchString: "",

}

//Create actions
export const getTracksSuccess = createAction<any>("search/getTracksSuccess");

export const getTracks = (values: any) => ({
  type: "search/getTracks",
  values: values,
})

const searchSlice = createSlice({
    name:"search",
    initialState,
    reducers: {
      setTracks: (state, action) => {
        state.items = action.payload;
      },
    },
    extraReducers(builder) {
        builder
            .addCase(getTracksSuccess, (state, action) => {
                state.items = action.payload.tracks.tracks.items;
            })
    },
  })

export const { setTracks } = searchSlice.actions;

export const  selectAllTracks  = (state: { tracks: any; }) => state.tracks;

export default searchSlice.reducer;