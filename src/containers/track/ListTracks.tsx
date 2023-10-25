import { Avatar, Button, List } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { playlistsSelectors } from "../playlist/selectors";
import { removePlaylistTracks } from '../playlist/slice';
import { DeleteOutlined } from '@ant-design/icons';

const ListTracks = (props: any) => {
    const playlistSelected = useSelector(playlistsSelectors.getPlaylist)
    let tracks = playlistSelected.tracks;
    const dispatch = useDispatch();

    const removeTrack = (track: any) => {        
        dispatch(removePlaylistTracks(track))
    }


    
    const listTrack = (
        <List
            className="demo-loadmore-list"
            style={{width: '100vh'}}
            dataSource={tracks}
            locale={{
                emptyText: 'No track',
            }}
            renderItem={(item: any) => (
                <List.Item>
                    <List.Item.Meta
                        avatar={<Avatar style={{ borderRadius: 0,  width: '10vh', height: '10vh'}} src={item.album.images[0].url} />}
                        title={item.name}
                        description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                    />
                    <div style={{display: 'center'}}>{item.album.name}</div>
                    <div>{item.album.release_date}</div>
                    <Button type="primary"onClick={() => {removeTrack(item)}} icon={<DeleteOutlined />} size={'small'} />
                    
                </List.Item>
            )}
        />
    )
    console.log(props.haveTrack);
    
    return (
        //<></>
        <>
    
        {tracks?.length !== 0 ? listTrack: <h3>No Playlists</h3>}
        
    
        </>
        /*tracks.map(track: any => {

        })*/
    )

}

export default ListTracks;