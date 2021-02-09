import React from 'react';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';
import 'braft-editor/dist/output.css';
import './App.less';
const myUploadFn = (param) => {
  const serverURL = 'https://t-api.zuifuli.com/api/customer/v2/attach/upload4NoLogin';
  const xhr = new XMLHttpRequest();
  const fd = new FormData();

  fd.append('storeType', 'I');
  fd.append('type', '29');
  fd.append('creator', 'test');

  const successFn = (response) => {
    // 假设服务端直接返回文件上传后的地址
    // 上传成功后调用param.success并传入上传后的文件地址
    const res = JSON.parse(xhr.responseText);
    if (res.code == '0') {
      param.success({
        url: res.result[0].cdnHref,
        meta: null,
        // meta: {
        //   id: 'xxx',
        //   title: 'xxx',
        //   alt: 'xxx',
        //   loop: true, // 指定音视频是否循环播放
        //   autoPlay: true, // 指定音视频是否自动播放
        //   controls: true, // 指定音视频是否显示控制栏
        //   poster: 'http://xxx/xx.png', // 指定视频播放器的封面
        // },
      });
    }
  };

  const progressFn = (event) => {
    // 上传进度发生变化时调用param.progress
    param.progress((event.loaded / event.total) * 100);
  };

  const errorFn = (response) => {
    // 上传发生错误时调用param.error
    param.error({
      msg: 'unable to upload.',
    });
  };

  xhr.upload.addEventListener('progress', progressFn, false);
  xhr.addEventListener('load', successFn, false);
  xhr.addEventListener('error', errorFn, false);
  xhr.addEventListener('abort', errorFn, false);

  fd.append('file', param.file);
  xhr.open('POST', serverURL, true);
  xhr.send(fd);
};

export default function App() {
  const [value, setValue] = React.useState(() => BraftEditor.createEditorState(null));

  return (
    <div className="app">
      <div className="my-editor">
        <BraftEditor
          media={{ uploadFn: myUploadFn }}
          language="zh"
          placeholder="请输入内容"
          value={value}
          onChange={setValue}
        />
      </div>
      <div
        className="preview braft-output-content"
        dangerouslySetInnerHTML={{ __html: value.toHTML() }}
      ></div>
    </div>
  );
}
