import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PopUpAddPlaylist from "./PopUpAddPlaylist";
import { isPopupOpen, openPopup } from "./popupSlice";

const PopUpButton = () => {

    const dispatch = useDispatch();
    
    return (
        <div>
            <button onClick={() => dispatch(openPopup(true))}>Add new playlist</button>
            {useSelector(isPopupOpen) ? <PopUpAddPlaylist />: null}
            
        </div>
    );
}

export default PopUpButton;