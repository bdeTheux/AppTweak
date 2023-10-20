//Have a name and a list of Tracks

import { useDispatch, useSelector } from "react-redux";
import { fetchPlaylists } from "./slice";
import { AppDispatch } from "../../store/store";
import { useEffect } from "react";

const Playlist = () => {
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        dispatch(fetchPlaylists());
    }, []);
    
    return (
        <p>My playlist</p>
        
    );
}

export default Playlist;
