import React, { useEffect, useState } from 'react';
import FormRenderer from '~/common-pc/FormRenderer';
import { Form } from 'antd';
import { PlusOutlined, LoadingOutlined, UploadOutlined } from '@ant-design/icons';
import Upload from '~/common-pc/Upload';
import { getHostPrefix } from '~/utils/host';

export default function ImagesSetting({ onValuesChange, images = [] }) {
  const [list, setList] = useState(images);

  const layoutData = [
    {
      render() {
        return (
          <Form.Item label="图片">
            <Upload
              data={{ storeType: 'I', type: '29', creator: 'system' }}
              action={`https://${getHostPrefix()}api.zuifuli.com/api/customer/v2/attach/upload4NoLogin`}
              fileList={list}
              accept="image/*"
              onFileListChange={(fileList) => {
                setList(fileList);
                onValuesChange({ images: fileList });
              }}
            >
              {(loading, fileList) => {
                return (
                  <div>
                    {loading ? <LoadingOutlined /> : <PlusOutlined />}
                    <div style={{ marginTop: 8 }}>图片</div>
                  </div>
                );
              }}
            </Upload>
          </Form.Item>
        );
      },
    },
  ];

  return <FormRenderer layoutData={layoutData} />;
}
