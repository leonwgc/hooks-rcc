import { Input, Switch, Select } from 'antd';

export const Flex = {
  props: {
    justifyContent: {
      label: '水平排列方式',
      tip: '水平排列方式',
      type: Select,
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
        ].map((v) => ({
          label: v,
          value: v,
        })),
      },
    },
    alignItems: {
      label: '垂直排列方式',
      tip: '垂直排列方式',
      type: Select,
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
        ].map((v) => ({
          label: v,
          value: v,
        })),
      },
    },
    flexDirection: {
      label: 'flex方向',
      tip: 'flex方向',
      type: Select,
      elProps: {
        defaultValue: 'row',
        options: ['row', 'column'].map((v) => ({
          label: v,
          value: v,
        })),
      },
    },
  },
  styles: {
    margin: {
      label: '外边局',
      type: Input,
      elProps: {
        placeholder: 'margin',
      },
    },
    padding: {
      label: '内边距padding',
      type: Input,
      elProps: {
        placeholder: 'padding',
      },
    },
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

export default Flex;
