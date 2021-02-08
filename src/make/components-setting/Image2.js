import { Input } from 'antd';
import ImageInput from '../prop-setting-components/ImageInput';

const Image2 = {
  props: {
    src1: {
      label: '图片1',
      type: ImageInput,
      elProps: {
        imageProp: 'src1',
        defaultValue: 'https://t7.baidu.com/it/u=4162611394,4275913936&fm=193&f=GIF',
      },
    },
    src2: {
      label: '图片2',
      type: ImageInput,
      elProps: {
        imageProp: 'src2',
        defaultValue: 'https://t7.baidu.com/it/u=1831997705,836992814&fm=193&f=GIF',
      },
    },
  },
  style: {
    width: {
      label: '区域宽度',
      type: Input,
      elProps: {
        defaultValue: '100%',
      },
    },
    height: {
      label: '区域高度',
      type: Input,
      elProps: {
        defaultValue: '160px',
      },
    },
  },
};
export default Image2;
