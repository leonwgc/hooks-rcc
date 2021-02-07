import { Input, Switch, Select, InputNumber } from 'antd';
import { getOptions } from '../helper';

const MyInput = {
  props: {
    name: {
      label: 'ID',
      type: Input,
      elProps: {
        defaultValue: () => 'id' + Date.now(),
        placeholder: '表单字段key',
      },
      itemProps: {
        tooltip: ' 数据存储的名称/英文/必填 ',
      },
    },
    label: {
      label: '标题',
      type: Input,
      elProps: {
        defaultValue: '输入框',
      },
    },
    placeholder: {
      label: '说明',
      type: Input,
      elProps: {
        defaultValue: '请输入',
      },
    },
    disabled: {
      label: '禁用状态',
      type: Switch,
      itemProps: {
        valuePropName: 'checked',
      },
    },
    type: {
      label: '类型',
      type: Select,
      elProps: {
        options: getOptions([
          'text',
          'checkbox',
          'file',
          'hidden',
          'image',
          'password',
          'color',
          'radio',
          'reset',
          'submit',
        ]),
        defaultValue: 'text',
      },
    },
    maxLength: {
      label: '最大长度',
      type: InputNumber,
    },
    size: {
      label: '控件大小',
      type: Select,
      elProps: {
        options: getOptions(['large', 'default', 'small']),
        defaultValue: 'default',
      },
    },

    onPressEnter: {
      label: '按下回车回调',
      type: Input,
      placeholder: 'console.log(1)',
    },
  },
};

export default MyInput;
