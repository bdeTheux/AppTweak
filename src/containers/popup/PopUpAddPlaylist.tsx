import { useDispatch } from "react-redux";
import { openPopup } from "./popupSlice";
import { useState } from "react";
import { addPlaylist } from "../playlist/slice";
import "./popup.css"
import { Button, Modal } from "antd";
import { SearchOutlined } from "@ant-design/icons";


const PopUpAddPlaylist = () => {

    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const onAddPlaylist = () => {
        //Check for Name and description
        if(name !==""){
            dispatch(addPlaylist({name,description}))
            setName("");
            setDescription("");
            dispatch(openPopup(false));
        }
    }
    
    return (
        <section className="popup">
            <Modal
            open={true}
            title=""
            onOk={onAddPlaylist}
            onCancel={() => dispatch(openPopup(false))}
            okText="Create"
            footer={(_, { OkBtn, CancelBtn }) => (
                <>
                    <CancelBtn />
                    <OkBtn />
                </>
            )}
      >
        <h2>Add new playlist</h2>
        <form className="addPlaylistForm">
            <input className="playlistName" name="playlistName" type="text" placeholder="Playlist name" value={name} onChange={(e) => setName(e.target.value)} required></input>
            <textarea className="playlistDescription" name="description" rows={3} placeholder="Playlist description (optional)" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
        </form>
      </Modal>

        </section>
    );
}

export default PopUpAddPlaylist;