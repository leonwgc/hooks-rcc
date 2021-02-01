const Button = {
  props: {
    children: {
      label: '内容',
      type: 'string',
      elProps: {
        defaultValue: '确定',
      },
    },
    disabled: {
      label: '禁用',
      tip: '按钮失效状态',
      type: 'boolean',
    },
    loading: {
      label: 'loading',
      tip: 'loading',
      type: 'boolean',
    },
    htmlType: {
      label: 'htmlType',
      tip: 'htmlType',
      type: 'enum',
      elProps: {
        options: ['submit', 'button'],
      },
    },
    ghost: {
      label: '幽灵模式',
      tip: '按钮背景透明',
      type: 'boolean',
    },
    href: {
      label: '跳转的地址',
      tip: '点击跳转的地址，指定此属性 button 的行为和 a 链接一致',
      type: 'string',
    },
    shape: {
      label: '按钮形状',
      tip: '设置按钮形状，可选值为 circle、 round 或者不设',
      type: 'enum',
      elProps: {
        options: ['default', 'circle', 'round'],
      },
    },
    size: {
      label: '按钮大小',
      tip: '设置按钮大小',
      type: 'enum',
      elProps: {
        options: ['default', 'small', 'large'],
      },
    },
    target: {
      label: '链接target',
      tip: '相当于a链接的target属性, 设置跳转链接时有效',
      type: 'enum',
      elProps: {
        options: ['_blank', '_self', '_parent', '_top'],
      },
    },
    type: {
      label: '按钮类型',
      tip: '设置按钮类型',
      type: 'enum',
      elProps: {
        defaultValue: 'primary',
        options: ['default', 'primary', 'dashed', 'danger', 'link'],
      },
    },
    onClick: {
      label: '点击事件',
      tip: '点击事件回调',
      type: 'function',
      elProps: {
        placeholder: 'console.log(1)',
      },
    },
    block: {
      label: '自适应宽度',
      tip: '将按钮宽度调整为其父宽度',
      type: 'boolean',
    },
  },
};

export default Button;
