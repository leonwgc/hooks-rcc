import { Input, Switch, Select } from 'antd';
import { getOptions } from './util';

const CheckboxGroup = {
  props: {
    name: {
      label: 'name',
      tip: '输入框的 name',
      type: Input,
      elProps: {
        defaultValue: () => 'id' + Date.now(),
      },
    },
    label: {
      label: 'label',
      tip: '输入框的 label',
      type: Input,
      elProps: {
        defaultValue: '输入',
      },
    },
    optionLabels: {
      label: '选项',
      tip: '选项和选项值一一对应',
      type: Select,
      elProps: {
        mode: 'tags',
        allowClear: true,
        options: getOptions(['选项1', '选项2']),
        defaultValue: ['选项1', '选项2'],
      },
    },
    optionValues: {
      label: '选项值',
      tip: '选项和选项值一一对应',
      type: Select,
      elProps: {
        mode: 'tags',
        allowClear: true,
        options: getOptions(['选项1的值', '选项2的值']),
        defaultValue: ['选项1的值', '选项2的值'],
      },
    },
  },
  style: {},
};
export default CheckboxGroup;
