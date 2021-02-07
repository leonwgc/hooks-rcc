import Product from './Product';
import Flex from './Flex';
import Carousel from './Carousel';
import { Button, Input, Select, Checkbox } from 'antd';
import settings from '../components-setting';

export const flex = {
  cid: 'Flex',
  type: Flex,
  name: 'Flex容器组件',
  designRender: () => 'Flex容器组件',
  setting: settings.Flex,
};

// custom comps
export const components = [
  flex,
  {
    cid: 'Product',
    type: Product,
    name: '图片文字测试组件',
    designRender: () => '图片文字组件测试',
    setting: settings.Product,
  },
  {
    cid: 'Carousel',
    type: Carousel,
    name: '轮播组件',
    designRender: () => '轮播组件',
    setting: settings.Carousel,
  },
];

// antd comps
export const antdComponents = [
  {
    cid: 'Button',
    type: Button,
    name: '按钮',
    designRender: () => '按钮',
    setting: settings.Button,
  },
  {
    cid: 'Input',
    type: Input,
    name: '输入框',
    designRender: () => '输入框',
    setting: settings.Input,
  },
  {
    cid: 'Select',
    type: Select,
    name: '下拉框',
    designRender: () => '下拉框',
    setting: settings.Select,
  },
  {
    cid: 'CheckboxGroup',
    type: Checkbox.Group,
    name: '多项选择框',
    designRender: () => '多项选择框',
    setting: settings.CheckboxGroup,
  },
];

// html tags
export const htmlComponents = [
  {
    cid: 'img',
    type: 'img',
    name: '图片',
    designRender: () => '图片',
    setting: settings.img,
  },
];

const all = [...components, ...antdComponents, ...htmlComponents];

export const getConfigById = (cid) => {
  return all.find((item) => item.cid === cid);
};

export default all;
