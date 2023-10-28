import { useDispatch, useSelector } from "react-redux";
import { playlistsSelectors } from "./selectors";
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import { useEffect, useState } from "react";
import { Playlist, getPlaylistTracks, getPlaylists } from "./slice";
import ListTracks from "../track/ListTracks";
import { authSelectors } from "../auth/selectors";

const PlaylistSet = () => {
    const dispatch = useDispatch();
    const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist>();
    const playlistList = useSelector(playlistsSelectors.getPlaylists)
    const user = useSelector(authSelectors.getUser);
    
    useEffect(() => {
        if (user && playlistList.length <= 0) {
            dispatch(getPlaylists())
        }
    }, [user]);

    const playlists = useSelector(playlistsSelectors.getPlaylists);
    const items = playlists.map(item => ({
        key: "" + item.id,
        label: item.name,
        onClick: () => choicePlaylist(item)
      }));
    const choicePlaylist = (playlist: Playlist) => {        
        setSelectedPlaylist(playlist);
        dispatch(getPlaylistTracks(playlist))
    }
   
    return (
        <div className="playlistSet">
            <div id="dropDown-container">
                <h1 id="dropDown">
                    <Dropdown menu={{items}} trigger={['click']}>
                        <a>
                            <Space style={{color:"#110e1b"}}>
                                {selectedPlaylist ? selectedPlaylist.name : "Choose a playlist"}
                                <DownOutlined />
                            </Space>
                        </a>
                    </Dropdown>
                </h1>

                <p>{selectedPlaylist ? selectedPlaylist.description : " "}</p>
            </div>
            <ListTracks 
                playlistId={selectedPlaylist?.id}
                /*tracks={useSelector(playlistsSelectors.getPlaylists).filter(p => p.id === selectedPlaylist?.id)[0]?.tracks !== undefined 
                    ? playlists.filter(p => p.id === selectedPlaylist?.id)[0]?.tracks
                    : []
                
                }*/
            />
        </div>
    );

}

export default PlaylistSet;