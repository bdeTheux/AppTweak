import { useDispatch, useSelector } from "react-redux";
import { openPopup } from "./popupSlice";


const PopUpAddPlaylist = () => {

    //const open = useSelector(popUpStore.getState).isOpen;
    const dispach = useDispatch();
    //console.log(open + "IS OPEN");
    
    return (
        <div>
            <h2>Add new playlist</h2>
            <input name="playlistName" type="text" placeholder="Playlist name" required></input>
            <textarea name="description" rows={3} placeholder="Playlist description (optional)"></textarea>
            <button onClick={() => dispach(openPopup(false))}>Cancel</button>

        </div>
    );
}

export default PopUpAddPlaylist;