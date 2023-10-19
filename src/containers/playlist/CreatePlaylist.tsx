

const CreatePlaylist = () => {

    return (
        <div>
            <h2>Add new playlist</h2>
            <input name="playlistName" type="text" placeholder="Playlist name" required></input>
            <textarea name="description" rows={3} placeholder="Playlist description (optional)"></textarea>
        </div>
    );
}

export default CreatePlaylist;