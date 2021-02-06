import { Input, Switch, Select } from 'antd';
import ImagesSetting from '../prop-setting-components/ImagesSetting';

const Carousel = {
  props: {
    autoPlay: {
      label: '是否自动轮播',
      type: Switch,
      itemProps: {
        valuePropName:'checked'
      },
    },
    loop: {
      label: '是否循环',
      type: Switch,
      itemProps: {
        valuePropName:'checked'
      },
      elProps: {
        defaultValue: true,
      },
    },
    images: {
      label: '图片',
      type: ImagesSetting,
    },
  },
  styles: {
    width: {
      label: '宽度',
      type: Input,
    },
    height: {
      label: '高度',
      type: Input,
    },
  },
};
export default Carousel;
