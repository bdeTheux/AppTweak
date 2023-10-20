import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CreatePlaylist from "./PopUpAddPlaylist";
import PopUpAddPlaylist from "./PopUpAddPlaylist";
import { isPopupOpen, openPopup } from "./popupSlice";
import { store } from "../../store/store";


const PopUpButton = () => {

    const dispach = useDispatch();
    
    return (
        <div>
            <button onClick={() => dispach(openPopup(true))}>Add new playlist</button>
            {useSelector(isPopupOpen) ? <PopUpAddPlaylist />: null}
            
        </div>
    );
}

export default PopUpButton;