import { InputNumber, Switch, Select } from 'antd';
import ImagesSetting from '../prop-setting-components/ImagesSetting';

const Carousel = {
  props: {
    images: {
      label: '图片',
      type: ImagesSetting,
      elProps: {
        imagesProp: 'images',
        defaultValue: [
          {
            url: 'https://image.zuifuli.com/29/20210206/4769270d85dd47bc65aebd20ff86fc72.jpg',
            uid: 3975102,
            name: '1.jpg',
          },
          {
            url: 'https://image.zuifuli.com/29/20210206/a81599909128d622ec476bd2aa5ca4fe.jpg',
            uid: 3975103,
            name: '2.jpg',
          },
          {
            url: 'https://image.zuifuli.com/29/20210206/4769270d85dd47bc65aebd20ff86fc72.jpg',
            uid: 3975102,
            name: '1.jpg',
          },
          {
            url: 'https://image.zuifuli.com/29/20210206/a81599909128d622ec476bd2aa5ca4fe.jpg',
            uid: 3975103,
            name: '2.jpg',
          },
        ],
      },
    },
    height: {
      label: '图像的高度',
      type: InputNumber,
      elProps: {
        defaultValue: 160,
      },
    },
    autoplay: {
      label: '是否自动轮播',
      type: Switch,
      itemProps: {
        valuePropName: 'checked',
      },
      elProps: { defaultValue: true },
    },
    wrapAround: {
      label: '无限轮播',
      type: Switch,
      itemProps: {
        valuePropName: 'checked',
      },
      elProps: { defaultValue: true },
    },
    autoplayInterval: {
      label: '自动轮播时间间隔',
      type: Switch,
      type: InputNumber,
      elProps: {
        defaultValue: 1500,
      },
    },
    slidesToShow: {
      label: 'slidesToShow',
      type: InputNumber,
      elProps: {
        defaultValue: 1,
      },
    },
  },
  styles: {},
};
export default Carousel;
