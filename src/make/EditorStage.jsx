import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Flex from '~/make/components/Flex';
import './EditorStage.less';

const EditorStage = () => {
  const app = useSelector((state) => state.app);

  return (
    <div className="editor-stage">
      <Flex
        item={app}
        isDesign
        style={{
          height: 667,
          width: 375,
          overflowY: 'scroll',
          backgroundColor: '#fff',
          flexDirection: 'column',
        }}
      />
    </div>
  );
};

export default EditorStage;
