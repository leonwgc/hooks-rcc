import React, { useState } from 'react';
import { Button, Modal, Space } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import Renderer from './Renderer';
import Flex from '~/make/containers/Flex';
import { update } from './stores/actions';

import './Stage.less';

const Stage = () => {
  const app = useSelector((state) => state.app);
  const dispatch = useDispatch();

  return (
    <div>
      <Flex item={app} isDesign style={{ height: 667, width: 375, overflowY: 'scroll' }} />

      <Modal
        style={{ top: 10 }}
        bodyStyle={{ padding: 0 }}
        title={null}
        visible={app.preview}
        onCancel={() => {
          update(dispatch)({ ...app, preview: false });
        }}
        width={375}
        footer={null}
      >
        <div style={{ height: 667, overflowY: 'scroll' }}>
          <Renderer isDesign={false} item={app} isTop={true} />
        </div>
      </Modal>
    </div>
  );
};

export default Stage;
