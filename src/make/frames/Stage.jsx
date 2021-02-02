import React, { useState } from 'react';
import { Button, Modal, Space } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import Renderer from './Renderer';
import ErrorBoundary from '../common/ErrorBoundary';
import { EyeTwoTone } from '@ant-design/icons';
import useWindowSize from '../hooks/useWindowSize';
import FlexContainer from '~/make/containers/FlexContainer';
import { update } from '../stores/actions';

import './Stage.less';

const Stage = ({ history }) => {
  const [mode, setMode] = useState('mobile');
  const [showPreview, setShowPreview] = useState(false);
  const app = useSelector((state) => state.app);
  const size = useWindowSize();
  const dispatch = useDispatch();

  return (
    <>
      <div className="header">
        <Space>
          <Button
            icon={<EyeTwoTone />}
            disabled={showPreview}
            onClick={() => {
              setShowPreview(true);
              localStorage.setItem('m', JSON.stringify(app));
            }}
          >
            预览
          </Button>
          {app.comps.length ? (
            <Button
              disabled={showPreview}
              onClick={() => {
                update(dispatch)({ comps: [], activeComp: null });
              }}
            >
              清空
            </Button>
          ) : null}
        </Space>
      </div>
      <FlexContainer item={app} style={{ height: '80vh' }} />
      <Modal
        style={{ top: 10 }}
        title={
          <div className="preview-title">
            <Space>
              <Button
                type={mode == 'mobile' ? 'primary' : 'default'}
                onClick={() => {
                  setMode('mobile');
                  history.push('/m');
                }}
              >
                手机
              </Button>
              <Button
                type={mode == 'pc' ? 'primary' : 'default'}
                onClick={() => {
                  setMode('pc');
                }}
              >
                电脑
              </Button>
            </Space>
          </div>
        }
        visible={showPreview}
        onCancel={() => setShowPreview(false)}
        width={mode === 'mobile' ? 500 : size.width * 0.7}
        footer={null}
      >
        <div className={`preview-stage ${mode === 'mobile' ? 'mobile' : ''}`}>
          <div className="screen">
            <ErrorBoundary>
              <Renderer isDesign={false} item={app} isTop={true} />
            </ErrorBoundary>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Stage;
