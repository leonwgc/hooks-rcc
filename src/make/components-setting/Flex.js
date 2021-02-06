import { Input, Switch, Select } from 'antd';
import { getOptions } from './util';

export const Flex = {
  props: {},
  style: {
    justifyContent: {
      label: '水平排列方式',
      tip: '水平排列方式',
      type: Select,
      elProps: {
        defaultValue: 'start',
        options: getOptions([
          'center',
          'start',
          'end',
          'space-between',
          'space-around',
          'space-evenly',
          'stretch',
        ]),
      },
    },
    alignItems: {
      label: '垂直排列方式',
      tip: '垂直排列方式',
      type: Select,
      elProps: {
        defaultValue: 'center',
        options: getOptions([
          'center',
          'start',
          'end',
          'space-between',
          'space-around',
          'space-evenly',
          'stretch',
        ]),
      },
    },
    flexDirection: {
      label: 'flex方向',
      tip: 'flex方向',
      type: Select,
      elProps: {
        defaultValue: 'row',
        options: getOptions(['row', 'column']),
      },
    },
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
      elProps: {
        defaultValue: '50%',
      },
    },
    height: {
      label: '高度',
      type: Input,
    },
  },
};

export default Flex;
