import { configureStore, createSlice } from "@reduxjs/toolkit";


const popupSlice = createSlice({
    name:"popup",
    initialState: false,
    reducers:{
        openPopup: (state, action) =>{
             state = action.payload;
             console.log(state + " = le state");
             return state;
        }
    }
})

export const isPopupOpen = (state: any) => state.popup;

export const { openPopup } = popupSlice.actions;

export default popupSlice.reducer;