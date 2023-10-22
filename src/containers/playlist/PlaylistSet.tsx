import { useSelector } from "react-redux";
import { playlistsSelectors } from "./selectors";
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import { SetStateAction, useState } from "react";
import { Playlist } from "./slice";

const PlaylistSet = () => {
    const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist>();
    const playlists = useSelector(playlistsSelectors.getPlaylists);
    console.log("pla", playlists)
    const items = playlists.map(item => ({
        key: "" + item.id,
        label: item.name,
        onClick: () => choicePlaylist(item)
      }));
    const choicePlaylist = (playlist: Playlist) => {
        if(playlist !== undefined){
            setSelectedPlaylist(playlist);
        }
    }
    
    return (
        <div>
            <Dropdown menu={{items}} trigger={['click']}>
                <a onClick={(e) => choicePlaylist}>
                <Space>
                    {selectedPlaylist ? selectedPlaylist.name : "Choose a playlist"}
                    <DownOutlined />
                </Space>
                </a>
            </Dropdown>
            <p>{selectedPlaylist ? selectedPlaylist.description : " "}</p>
        </div>
    );

}

export default PlaylistSet;