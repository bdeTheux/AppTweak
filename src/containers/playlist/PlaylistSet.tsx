import { useSelector } from "react-redux";
import { playlistsSelectors } from "./selectors";

const PlaylistSet = () => {

    const playlists = useSelector(playlistsSelectors.getPlaylists);

    const renderPlaylists = playlists.map(playlist =>(
        <div key={playlist.id}>
            <p>{playlist.name}</p>
        </div>
    ))

    return (
        <div>
            {renderPlaylists}
        </div>
    );

}

export default PlaylistSet;