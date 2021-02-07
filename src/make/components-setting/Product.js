import { Input } from 'antd';

const Product = {
  props: {
    src: {
      label: '图片链接',
      type: Input,
      elProps: {
        defaultValue:
          'http://t8.baidu.com/it/u=2247852322,986532796&fm=79&app=86&f=JPEG?w=1280&h=853',
      },
    },
    title: {
      label: '标题',
      type: Input,
      elProps: {
        defaultValue: 'title',
      },
    },
    desc: {
      label: '说明',
      type: Input,
      elProps: {
        defaultValue: 'this is desc',
      },
    },
    link: {
      label: '点击图片跳转链接',
      type: Input,
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
      label: '外边距',
      type: Input,
    },
    padding: {
      label: '内边距',
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
      label: '字体大小',
      type: Input,
      elProps: {
        defaultValue: '30px',
      },
    },
    color: {
      label: '字体颜色',
      type: Input,
      elProps: {
        type: 'color',
        defaultValue: 'blue',
      },
    },
  },
};
export default Product;
