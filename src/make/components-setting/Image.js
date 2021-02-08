import { Input, Switch, Select } from 'antd';
import ImageInput from '../prop-setting-components/ImageInput';

const img = {
  props: {
    src: {
      label: '图片',
      type: ImageInput,
      elProps: {
        imageProp: 'src',
        defaultValue: 'https://t7.baidu.com/it/u=4162611394,4275913936&fm=193&f=GIF',
      },
    },
  },
  style: {
    width: {
      label: '图片宽度',
      type: Input,
      elProps: {
        defaultValue: '100%',
      },
    },
    height: {
      label: '图片高度',
      type: Input,
      elProps: {
        defaultValue: '160px',
      },
    },
    backgroundSize: {
      label: '图片拉伸属性',
      type: Input,
      elProps: {
        defaultValue: '100% 100%',
      },
      itemProps: {
        help: '参考background-size',
      },
    },
  },
};
export default img;
