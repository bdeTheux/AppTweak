import { Avatar, Button, Card, List } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { playlistsSelectors } from "../playlist/selectors";
import { getPlaylistTracks, removePlaylistTracks } from '../playlist/slice';
import { DeleteOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';

const ListTracks = (props: any) => {
    const [asRemove, setRemove] = useState(false);
    const playlistSelected = useSelector(playlistsSelectors.getPlaylist)
    let tracks = playlistSelected.tracks;
    const dispatch = useDispatch();

    const removeTrack = (track: any) => {        
        dispatch(removePlaylistTracks(track));
        tracks = playlistSelected.tracks;
        setRemove (true);
    }
    
    useEffect(() => {
        if(Object.keys(playlistSelected).length !== 0 && asRemove ){ 
            setRemove (false);
            dispatch(getPlaylistTracks(playlistSelected))            
        }
    }, [playlistSelected.snapshot_id]);    
     
    const listTrack = (
        <List
            className="demo-loadmore-list"
            style={{width: '150vh'}}
            dataSource={tracks}
            locale={{
                emptyText: 'No track',
                
            }}
            renderItem={(item: any) => (
                <List.Item>
                    <Card id={item.id} style={{width:"150%"}}>
                        <List.Item.Meta
                            avatar={<Avatar style={{ borderRadius: 0,  width: '16.5vh', height: '16.5vh'}} src={item.album.images[0].url} />}
                            description={
                                <section id='track'>
                                    <div>
                                        <h2 style={{flex: "0 1 0"}}>{item.name}</h2>
                                        <p style={{flex: "0 1 0"}}>{item.artists[0].name}</p>
                                    </div>
                                    <p style={{flex: "0 1 auto"}}>Album: {item.album.name}</p>
                                    <div style={{flex: "0 1 auto"}}>{item.album.release_date}</div>
                                    <Button style={{width:"10%"}} type="primary"onClick={() => {removeTrack(item)}} icon={<DeleteOutlined />} size={'large'} />
                                </section>
                            }
                        />
                    </Card>
                </List.Item>
            )}
        />
    )
    
    return (
        <div className="tracks">
            {tracks?.length !== 0 ? listTrack: <h3>No Tracks in this playlist</h3>}
        </div>        
    )

}

export default ListTracks;