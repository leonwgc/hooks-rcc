import * as antd from 'antd';
import ImagesSetting from './prop-setting-component/ImagesSetting';

let id = 1;
export function gid() {
  return id++;
}

// props setting , type -> component
const editorComponentMap = {
  string: antd.Input,
  function: antd.Input,
  boolean: antd.Switch,
  enum: antd.Select, // 下拉设置选项
  mstring: antd.Input.TextArea,
  images: ImagesSetting,
};

export const isValidDataType = (type) => {
  return Object.keys(editorComponentMap).indexOf(type) != -1;
};

export function getEditComponentType(type) {
  return editorComponentMap[type] || antd.Input;
}
