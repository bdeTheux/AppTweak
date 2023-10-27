import { AutoComplete, Avatar, Button, Input, List, Space } from "antd"
import { useDispatch, useSelector } from "react-redux";
import { getTracks } from "./searchSlice";
import { searchSelectors } from "./selectors";
import { Track, addPlaylistTracks } from "../playlist/slice";
import { PlusOutlined } from '@ant-design/icons';
import { playlistsSelectors } from "../playlist/selectors";

const SearchBar = () => {
    const dispatch = useDispatch();
    const items = useSelector(searchSelectors.getSearchTracks)
    let currentPlaylist = useSelector(playlistsSelectors.getPlaylist);
    
    const addTrack = (track: any) => {
        if(Object.keys(currentPlaylist).length !== 0){            
            dispatch(addPlaylistTracks(track))
        }
    }

    const itemsDisplay = () => {
        if (items.length === 0) return [];
        return items.map((item: Track) => {
            return {
                value: item?.name + Math.random(),
                label: (
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        <List.Item>
                            <List.Item.Meta 
                                avatar={<Avatar style={{ borderRadius: 0, height: '10vh'}} src={item?.album.images[0].url} />}
                                title={item.name}
                                style={{}}
                            />
                            <Button type="primary"onClick={() => addTrack(item)} icon={<PlusOutlined />} size={'small'} />
                        </List.Item>
                    </div>
                ),
            };
        })
    }
    const onSearch = (e: string) =>{
        if(e !== "" && e !== undefined){
            dispatch(getTracks(e))
        }
    }

    return (
        <div className="searchBar">
            <Space direction="vertical">
                <AutoComplete
                    style={{ width: '70vh'}}
                    options={itemsDisplay()}
                    onSelect={() => {}}
                    onSearch={(e) => onSearch(e)}
                    
                >
                    <Input.Search size="large" placeholder="Search for a track" enterButton />
                </AutoComplete>
            </Space>
        </div>
    )
}

export default SearchBar;