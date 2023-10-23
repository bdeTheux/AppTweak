import { Space } from "antd"
import Search from "antd/es/input/Search"

const SearchBar = () => {
    return (
        <Space direction="vertical">
            <Search placeholder="input search text" onChange={(e) => console.log("search: ", e)} style={{ width: 200 }} />
        </Space>
    )
}

export default SearchBar;