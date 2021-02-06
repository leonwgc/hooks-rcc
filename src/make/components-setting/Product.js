import { Input, Switch, Select, Divider } from 'antd';

const Product = {
  props: {
    link: {
      label: 'link',
      type: Input,
    },
    imageSrc: {
      label: 'imageSrc',
      type: Input,
      elProps: {
        defaultValue:
          'http://t8.baidu.com/it/u=2247852322,986532796&fm=79&app=86&f=JPEG?w=1280&h=853',
      },
    },
    title: {
      label: 'title',
      type: Input,
      elProps: {
        defaultValue: 'title',
      },
    },
    desc: {
      label: 'desc',
      type: Input,
      elProps: {
        defaultValue: 'this is desc',
      },
    },
  },
  style: {
    cssText: {
      label: 'cssText',
      type: Input.TextArea,
      elProps: {
        allowClear: true,
      },
      itemProps: {
        tooltip: '整体样式设置优先于单个样式设置',
        help: '设置了cssText，其他样式设置无效',
      },
    },
    margin: {
      label: 'margin',
      type: Input,
    },
    padding: {
      label: 'padding',
      type: Input,
    },
    width: {
      label: '宽度',
      type: Input,
    },
    height: {
      label: '高度',
      type: Input,
    },
    fontSize: {
      label: 'fontSize',
      type: Input,
      elProps: {
        defaultValue: '30px',
      },
    },
    color: {
      label: 'fontColor',
      type: Input,
      elProps: {
        type: 'color',
        defaultValue: 'red',
      },
    },
  },
};
export default Product;
