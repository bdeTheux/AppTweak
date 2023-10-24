import { AutoComplete, Avatar, Button, Input, List, Space } from "antd"
import { useDispatch, useSelector } from "react-redux";
import { getTracks } from "./searchSlice";
import { searchSelectors } from "./selectors";
import { Track } from "../playlist/slice";
import { PlusOutlined } from '@ant-design/icons';

const SearchBar = () => {
    const dispatch = useDispatch();
    const items = useSelector(searchSelectors.getSearchTracks)

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
                            <Button type="primary" icon={<PlusOutlined />} size={'small'} />
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
        <Space direction="vertical">
            <AutoComplete
                style={{ width: '100vh' }}
                options={itemsDisplay()}
                onSelect={() => {}}
                onSearch={(e) => onSearch(e)}
                size="large"
            >
                <Input.Search size="large" placeholder="Search for a track" enterButton />
            </AutoComplete>
        </Space>
    )
}

export default SearchBar;