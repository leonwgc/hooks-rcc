const Carousel = {
  props: {
    autoPlay: {
      label: '是否自动轮播',
      type: 'boolean',
    },
    loop: {
      label: '是否循环',
      type: 'boolean',
      elProps: {
        defaultValue: true,
      },
    },
    images: {
      label: '图片',
      type: 'images',
    },
  },
  styles: {
    width: {
      label: '宽度',
      type: 'string',
    },
    height: {
      label: '高度',
      type: 'string',
    },
  },
};
export default Carousel;
