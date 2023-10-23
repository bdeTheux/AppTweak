import { configureStore, createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
export interface Playlist {
    id? : string;
    name?: string;
    description?: string;
    tracks? : Track[];
}

export interface Track {
  name: string,
  albumName: string,
  artist: string,
  cover: string,
  releaseDate: string
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
export const addPlaylistSuccess = createAction<Playlist>("playlists/addPlaylistSuccess");
export const getPlaylistTracksSuccess = createAction<Playlist>("playlists/getPlaylistTracksSuccess");

export const addPlaylist = (values: Playlist) => ({
    type: "playlists/addPlaylistSuccess",
    values: values,
  });
export const getPlaylistTracks = (values: any) => ({
  type: "playlists/getPlaylistTracks",
  values: values,
})

const playlistsSlice = createSlice({
    name:"playlists",
    initialState,
    reducers: {
      setPlaylists: (state, action) => {
        state.items = action.payload;
      },
      setPlaylist: (state, action) => {
        state.selectedPlaylist = action.payload;
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
                    id: action.values.id,
                    tracks: []
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
                tracks: action.payload.tracks.items.map((i: { track: Track; }) => i.track)
              }
              console.log(" ---------------------------------------")
              state.selectedPlaylist = playlist
              if(state.selectedPlaylist.tracks !== undefined){
                console.log(state.selectedPlaylist.tracks[0] + " SELECTED");

              }
              
              console.log( action.payload.tracks.items.map((i: { track: Track; }) => i.track))

              //state.items[2].tracks = action.payload.tracks.items.map((i: { track: Track; }) => i.track)
              state.items.filter(i => i.id === playlistId)[0].tracks = action.payload.tracks.items.map((i: { track: Track; }) => i.track);
              
            })      
    },
  })

export const { setPlaylists } = playlistsSlice.actions;

export const  selectAllPlaylist  = (state: { playlists: any; }) => state.playlists;

export default playlistsSlice.reducer;