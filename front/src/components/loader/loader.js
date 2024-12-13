import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Flex, Spin } from 'antd';
const Loader = () => (
  <Flex align="center" gap="middle" justify='center'>

   
    <Spin
      indicator={
        <LoadingOutlined
          style={{
            fontSize: 48,
          }}
          spin
        />
      }
    />
  </Flex>
);
export default Loader;