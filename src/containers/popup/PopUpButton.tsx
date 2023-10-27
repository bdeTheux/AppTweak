import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PopUpAddPlaylist from "./PopUpAddPlaylist";
import { isPopupOpen, openPopup } from "./popupSlice";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const PopUpButton = () => {

    const dispatch = useDispatch();
    
    return (
        <div className="popUpButton">
            <Button icon={<PlusOutlined />}  onClick={() => dispatch(openPopup(true))}>Add new playlist</Button>
            {useSelector(isPopupOpen) ? <PopUpAddPlaylist />: null}
            
        </div>
    );
}

export default PopUpButton;