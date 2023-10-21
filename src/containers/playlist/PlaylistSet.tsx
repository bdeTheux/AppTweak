import { useSelector } from "react-redux";
import { playlistsSelectors } from "./selectors";
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';

const PlaylistSet = () => {

    const playlists = useSelector(playlistsSelectors.getPlaylists);
    console.log("pla", playlists)
    const items = playlists.map(item => ({
        key: "" + item.id,
        label: item.name
      }));
    
    return (
        <Dropdown menu={{items}} trigger={['click']}>
            <a onClick={(e) => e.preventDefault()}>
            <Space>
                Click me
                <DownOutlined />
            </Space>
            </a>
        </Dropdown>
    );

}

export default PlaylistSet;