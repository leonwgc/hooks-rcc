import Product from './Product';
import Flex from './Flex';
import Carousel from './Carousel';
import { Button, Input, Select, Checkbox } from 'antd';

// custom comps
export const components = [
  {
    cid: 'Flex',
    type: Flex,
    name: 'Flex容器组件',
    designRender: () => 'Flex容器组件',
    setting: require('../components-setting/Flex').default,
  },
  {
    cid: 'Product',
    type: Product,
    name: '图片文字测试组件',
    designRender: () => '图片文字组件测试',
    setting: require('../components-setting/Product').default,
  },
  {
    cid: 'Carousel',
    type: Carousel,
    name: '轮播组件',
    designRender: () => '轮播组件',
    setting: require('../components-setting/Carousel').default,
  },
];

// antd comps
export const antdComponents = [
  {
    cid: 'Button',
    type: Button,
    name: '按钮',
    designRender: () => '按钮',
    setting: require('../components-setting/Button').default,
  },
  {
    cid: 'Input',
    type: Input,
    name: '输入框',
    designRender: () => '输入框',
    setting: require('../components-setting/Input').default,
  },
  {
    cid: 'Select',
    type: Select,
    name: '下拉框',
    designRender: () => '下拉框',
    setting: require('../components-setting/Select').default,
  },
  {
    cid: 'CheckboxGroup',
    type: Checkbox.Group,
    name: '多项选择框',
    designRender: () => '多项选择框',
    setting: require('../components-setting/CheckboxGroup').default,
  },
];

// html tags
export const htmlComponents = [
  {
    cid: 'img',
    type: 'img',
    name: '图片',
    designRender: () => '图片',
    setting: require('../components-setting/Image').default,
  },
  {
    cid: 'div',
    type: 'div',
    name: '块元素',
    designRender: () => '块元素',
    setting: {},
  },
  {
    cid: 'span',
    type: 'span',
    name: '内联元素',
    designRender: () => '内联元素',
    setting: {},
  },
];

const all = [...components, ...antdComponents, ...htmlComponents];

export const getConfigById = (cid) => {
  return all.find((item) => item.cid === cid);
};

export default all;
