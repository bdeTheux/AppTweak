import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PopUpAddPlaylist from "./PopUpAddPlaylist";
import { isPopupOpen, openPopup } from "./popupSlice";

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