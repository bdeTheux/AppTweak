import { Avatar, Button, Card, List } from 'antd';
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
            style={{width: '150vh'}}
            dataSource={tracks}
            locale={{
                emptyText: 'No track',
                
            }}
            renderItem={(item: any) => (
                <List.Item>
                    <Card style={{width:"150%"}}>
                        <List.Item.Meta
                            avatar={<Avatar style={{ borderRadius: 0,  width: '16.5vh', height: '16.5vh'}} src={item.album.images[0].url} />}
                            description={
                                <section id='track'>
                                    <div>
                                        <h2 style={{flex: "0 1 0"}}>{item.name}</h2>
                                        <p style={{flex: "0 1 0"}}>{item.album.name}</p>
                                    </div>
                                    <p style={{flex: "0 1 auto"}}>"Ant Design, a design language for background applications, is refined by Ant UED Team"</p>
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
        //<></>
        <div className="tracks">
    
        {tracks?.length !== 0 ? listTrack: <h3>No Playlists</h3>}
        
    
        </div>
        /*tracks.map(track: any => {

        })*/
    )

}

export default ListTracks;