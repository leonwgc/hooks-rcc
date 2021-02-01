export const Flex = {
  props: {
    justifyContent: {
      label: '水平排列方式',
      tip: '水平排列方式',
      type: 'enum',
      elProps: {
        defaultValue: 'start',
        options: [
          'center',
          'start',
          'end',
          'space-between',
          'space-around',
          'space-evenly',
          'stretch',
        ],
      },
    },
    alignItems: {
      label: '垂直排列方式',
      tip: '垂直排列方式',
      type: 'enum',
      elProps: {
        defaultValue: 'center',
        options: [
          'center',
          'start',
          'end',
          'space-between',
          'space-around',
          'space-evenly',
          'stretch',
        ],
      },
    },
    flexDirection: {
      label: 'flex方向',
      tip: 'flex方向',
      type: 'enum',
      elProps: {
        defaultValue: 'row',
        options: ['row', 'column'],
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
    padding: {
      label: '内边距padding',
      type: 'string',
      elProps: {
        placeholder: 'padding',
      },
    },
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

export default Flex;
