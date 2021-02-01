const Input = {
  props: {
    placeholder: {
      label: 'placeholder',
      type: 'string',
    },
    disabled: {
      label: '禁用状态',
      tip: '是否禁用状态，默认为 false',
      type: 'boolean',
    },
    name: {
      label: 'name',
      tip: '表单字段key',
      type: 'string',
      elProps: {
        defaultValue: () => 'id' + Date.now(),
        placeholder: '表单字段key',
      },
    },
    label: {
      label: 'label',
      tip: '输入框的 label',
      type: 'string',
      elProps: {
        defaultValue: '输入',
      },
    },
    maxLength: {
      label: '最大长度',
      type: 'number',
    },
    size: {
      label: '控件大小',
      tip:
        '控件大小。注：标准表单内的输入框大小限制为 large。可选 large default small',
      type: 'enum',
      elProps: {
        options: ['large', 'default', 'small'],
        defaultValue: 'default',
      },
    },
    type: {
      label: '声明 input 类型',
      tip: '声明 input 类型，同原生 input 标签的 type 属性',
      type: 'enum',
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
        ],
        defaultValue: 'text',
      },
    },
    onPressEnter: {
      label: '按下回车回调',
      type: 'function',
      placeholder: '(e) => {}',
    },
    onChange: {
      label: '输入框内容变化时的回调',
      type: 'function',
      placeholder: '(e)=>{}',
    },
  },
};

export default Input;
