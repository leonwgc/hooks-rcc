import Product from './Product';
import Flex from './Flex';
import Carousel from './Carousel';
import { Button, Input, Select, Checkbox } from 'antd';
import ProductSetting from '../components-setting/Product';

// custom comps
export const components = [
  {
    id: 'Flex',
    type: Flex,
    name: 'Flex容器组件',
    designRender: () => 'Flex容器组件',
    setting: require('../components-setting/Flex').default,
  },
  {
    id: 'Product',
    type: Product,
    name: '图片文字测试组件',
    designRender: () => '图片文字组件测试',
    setting: ProductSetting,
  },
  {
    id: 'Carousel',
    type: Carousel,
    name: '轮播组件',
    designRender: () => '轮播组件',
    setting: require('../components-setting/Carousel').default,
  },
];

// antd comps
export const antdComponents = [
  {
    id: 'Button',
    type: Button,
    name: '按钮',
    designRender: () => '按钮',
    setting: require('../components-setting/Button').default,
  },
  {
    id: 'Input',
    type: Input,
    name: '输入框',
    designRender: () => '输入框',
    setting: require('../components-setting/Input').default,
  },
  {
    id: 'Select',
    type: Select,
    name: '下拉框',
    designRender: () => '下拉框',
    setting: require('../components-setting/Select').default,
  },
  {
    id: 'CheckboxGroup',
    type: Checkbox.Group,
    name: '多项选择框',
    designRender: () => '多项选择框',
    setting: require('../components-setting/CheckboxGroup').default,
  },
];

// html tags
export const htmlComponents = [
  {
    id: 'img',
    type: 'img',
    name: '图片',
    designRender: () => '图片',
    setting: require('../components-setting/Image').default,
  },
  {
    id: 'div',
    type: 'div',
    name: '块元素',
    designRender: () => '块元素',
    setting: {},
  },
  {
    id: 'span',
    type: 'span',
    name: '内联元素',
    designRender: () => '内联元素',
    setting: {},
  },
];

const all = [...components, ...antdComponents, ...htmlComponents];

export const getConfigById = (id) => {
  return all.find((item) => item.id === id);
};

export default all;
