import { useDispatch, useSelector } from "react-redux";
import { playlistsSelectors } from "./selectors";
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import { useState } from "react";
import { Playlist, getPlaylistTracks } from "./slice";
import ListTracks from "../track/ListTracks";

const PlaylistSet = () => {
    const dispatch = useDispatch();
    const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist>();
    const playlists = useSelector(playlistsSelectors.getPlaylists);
    const items = playlists.map(item => ({
        key: "" + item.id,
        label: item.name,
        onClick: () => choicePlaylist(item)
      }));
    const choicePlaylist = (playlist: Playlist) => {
        if(playlist !== undefined){
            setSelectedPlaylist(playlist);
            dispatch(getPlaylistTracks({type: "playlists/getPlaylistTracks", playlistId:playlist.id}))
        }
    }
    
    return (
        <div>
            <Dropdown menu={{items}} trigger={['click']}>
                <a>
                    <Space>
                        {selectedPlaylist ? selectedPlaylist.name : "Choose a playlist"}
                        <DownOutlined />
                    </Space>
                </a>
            </Dropdown>
            <p>{selectedPlaylist ? selectedPlaylist.description : " "}</p>
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