const Product = {
  props: {
    link: {
      label: 'link',
      type: 'string',
    },
    imageSrc: {
      label: 'imageSrc',
      type: 'string',
      elProps: {
        defaultValue:
          'http://t8.baidu.com/it/u=2247852322,986532796&fm=79&app=86&f=JPEG?w=1280&h=853',
      },
    },
    title: {
      label: 'title',
      type: 'string',
      elProps: {
        defaultValue: 'title',
      },
    },
    desc: {
      label: 'desc',
      type: 'string',
      elProps: {
        defaultValue: 'this is desc',
      },
    },
  },
  styles: {
    line: {
      type: 'Divider',
      elProps: {
        children: '整体样式设置',
      },
    },
    cssText: {
      label: 'cssText',
      tip: '整体样式设置优先于单个样式设置',
      type: 'mstring',
      elProps: {
        defaultValue: 'font-size:30px; color:red;',
        allowClear: true,
      },
    },
    line1: {
      type: 'Divider',
      elProps: {
        children: '单个样式设置',
      },
    },
    margin: {
      label: 'margin',
      type: 'string',
    },
    padding: {
      label: 'padding',
      type: 'string',
    },
    width: {
      label: '宽度',
      type: 'string',
    },
    height: {
      label: '高度',
      type: 'string',
    },
    fontSize: {
      label: 'fontSize',
      type: 'string',
    },
    color: {
      label: 'fontColor',
      type: 'string',
      elProps: {
        type: 'color',
      },
    },
  },
};
export default Product;
