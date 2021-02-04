import { Input, Switch, Select } from 'antd';

const MyInput = {
  props: {
    placeholder: {
      label: 'placeholder',
      type: Input,
    },
    disabled: {
      label: '禁用状态',
      tip: '是否禁用状态，默认为 false',
      type: Switch,
    },
    name: {
      label: 'name',
      tip: '表单字段key',
      type: Input,
      elProps: {
        defaultValue: () => 'id' + Date.now(),
        placeholder: '表单字段key',
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
    maxLength: {
      label: '最大长度',
      type: Input,
    },
    size: {
      label: '控件大小',
      tip: '控件大小。注：标准表单内的输入框大小限制为 large。可选 large default small',
      type: Select,
      elProps: {
        options: ['large', 'default', 'small'].map((v) => ({
          label: v,
          value: v,
        })),
        defaultValue: 'default',
      },
    },
    type: {
      label: '声明 input 类型',
      tip: '声明 input 类型，同原生 input 标签的 type 属性',
      type: Select,
      elProps: {
        options: [
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
        ].map((v) => ({
          label: v,
          value: v,
        })),
        defaultValue: 'text',
      },
    },
    onPressEnter: {
      label: '按下回车回调',
      type: Input,
      placeholder: '(e) => {}',
    },
    onChange: {
      label: '输入框内容变化时的回调',
      type: Input,
      placeholder: '(e)=>{}',
    },
  },
};

export default MyInput;
