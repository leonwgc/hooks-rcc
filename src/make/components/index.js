import Product from './Product';
import Flex from './Flex';
import Carousel from './Carousel';
import Image from './Image';
// import { Button, Input, Select, Checkbox } from 'antd';
import settings from '../components-setting';

export const flex = {
  cid: 'Flex',
  type: Flex,
  name: '容器组件',
  designRender: () => '容器组件',
  setting: settings.Flex,
};

// custom comps
export const components = [
  flex,
  {
    cid: 'Carousel',
    type: Carousel,
    name: '轮播组件',
    designRender: () => '轮播组件',
    setting: settings.Carousel,
  },
  {
    cid: 'Image',
    type: Image,
    name: '图片',
    designRender: () => '图片',
    setting: settings.img,
  },
  {
    cid: 'Product',
    type: Product,
    name: '图片文字测试组件',
    designRender: () => '图片文字组件测试',
    setting: settings.Product,
  },
];

// antd comps
export const antdComponents = [
  // {
  //   cid: 'Button',
  //   type: Button,
  //   name: '按钮',
  //   designRender: () => '按钮',
  //   setting: settings.Button,
  // },
  // {
  //   cid: 'Input',
  //   type: Input,
  //   name: '输入框',
  //   designRender: () => '输入框',
  //   setting: settings.Input,
  // },
  // {
  //   cid: 'Select',
  //   type: Select,
  //   name: '下拉框',
  //   designRender: () => '下拉框',
  //   setting: settings.Select,
  // },
  // {
  //   cid: 'CheckboxGroup',
  //   type: Checkbox.Group,
  //   name: '多项选择框',
  //   designRender: () => '多项选择框',
  //   setting: settings.CheckboxGroup,
  // },
];

const all = [...components, ...antdComponents];

export const getConfigById = (cid) => {
  return all.find((item) => item.cid === cid);
};

export default all;
