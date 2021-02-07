import { Input, Switch, Select } from 'antd';
import { getOptions } from '../helper';

export const Flex = {
  props: {},
  style: {
    display: {
      label: '容器类型',
      type: Select,
      elProps: {
        defaultValue: 'block',
        options: getOptions(['block', 'flex', 'inline-block', 'inline-flex']),
      },
    },
    justifyContent: {
      label: '水平排列方式',
      tip: '水平排列方式',
      type: Select,
      elProps: {
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
        placeholder: '100%',
      },
    },
    height: {
      label: '高度',
      type: Input,
    },
    minHeight: {
      label: '最小高度',
      type: Input,
      elProps: {
        defaultValue: '160px',
      },
    },
  },
};

export default Flex;
