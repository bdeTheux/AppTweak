import { useDispatch, useSelector } from "react-redux";
import { openPopup } from "./popupSlice";
import { useState } from "react";
import { addPlaylist } from "./slice";

const PopUpAddPlaylist = () => {

    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const onAddPlaylist = () => {
        //Check for Name and description
        if(name !==""){
            console.log(name + " desc : " + description)
            dispatch(addPlaylist({name,description}))
            setName("");
            setDescription("");
            dispatch(openPopup(false));
        }
    }
    
    return (
        <div>
            <h2>Add new playlist</h2>
            <form>
                <input name="playlistName" type="text" placeholder="Playlist name" value={name} onChange={(e) => setName(e.target.value)} required></input>
                <textarea name="description" rows={3} placeholder="Playlist description (optional)" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                <button onClick={() => dispatch(openPopup(false))}>Cancel</button>
                <button type="button" onClick={onAddPlaylist}>Create</button>
            </form>
        </div>
    );
}

export default PopUpAddPlaylist;