import React from 'react';
import { AudioOutlined } from '@ant-design/icons';
import { Input, Space } from 'antd';

const { Search } = Input;
const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: '#1677ff',
    }}
  />
);

const onSearch = (value, _e, info) => console.log(info.source, value);

const SearchBox = () => (
  <Space
    direction="vertical"
    style={{
      display: 'flex',
      alignItems: 'center', // Center horizontally
      justifyContent: 'center', // Center vertically (within its container)
      height: '100vh', // Full height for vertical centering
    }}
  >
    <Search
      placeholder="input search text"
      allowClear
      enterButton="Search"
      size="large"
      onSearch={onSearch}
      style={{
        width: '400px', // Corrected width with units
      }}
    />
  </Space>
);

export default SearchBox;
