const img = {
  props: {
    src: {
      label: '图像url',
      type: 'string',
      elProps: {
        defaultValue:
          'http://t8.baidu.com/it/u=2247852322,986532796&fm=79&app=86&f=JPEG?w=1280&h=853',
      },
    },
    alt: {
      label: '图像的替代文本',
      type: 'string',
    },
    width: {
      label: '图像的宽度',
      type: 'string',
      elProps: {
        defaultValue: 50,
      },
    },
    height: {
      label: '图像的高度',
      type: 'string',
      elProps: {
        defaultValue: 50,
      },
    },
  },
  styles: {
    margin: {
      label: '外边局',
      type: 'string',
      elProps: {
        placeholder: 'margin',
      },
    },
  },
};
export default img;
