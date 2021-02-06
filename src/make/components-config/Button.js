import { Input, Switch, Select } from 'antd';

const Button = {
  props: {
    children: {
      label: '按钮文本',
      type: Input,
      elProps: {
        defaultValue: '确定',
      },
    },
    disabled: {
      label: '禁用',
      type: Switch,
      itemProps: {
        tooltip: '按钮失效状态',
        valuePropName:'checked'
      },
    },
    loading: {
      label: 'loading',
      tip: 'loading',
      type: Switch,
      itemProps: {
        valuePropName:'checked'
      },
      elProps: {},
    },
    htmlType: {
      label: 'htmlType',
      tip: 'htmlType',
      type: Select,
      elProps: {
        options: ['submit', 'button'].map((v) => ({
          label: v,
          value: v,
        })),
      },
    },
    ghost: {
      label: '幽灵模式',
      tip: '按钮背景透明',
      type: Switch,
      itemProps: {
        tooltip: '按钮背景透明',
        valuePropName:'checked'
      },
    },
    href: {
      label: '跳转的地址',
      tip: '点击跳转的地址，指定此属性 button 的行为和 a 链接一致',
      type: Input,
    },
    shape: {
      label: '按钮形状',
      tip: '设置按钮形状，可选值为 circle、 round 或者不设',
      type: Select,
      elProps: {
        options: ['default', 'circle', 'round'].map((v) => ({
          label: v,
          value: v,
        })),
      },
    },
    size: {
      label: '按钮大小',
      tip: '设置按钮大小',
      type: Select,
      elProps: {
        options: ['default', 'small', 'large'].map((v) => ({
          label: v,
          value: v,
        })),
      },
    },
    target: {
      label: '链接target',
      tip: '相当于a链接的target属性, 设置跳转链接时有效',
      type: Select,
      elProps: {
        options: ['_blank', '_self', '_parent', '_top'].map((v) => ({
          label: v,
          value: v,
        })),
      },
    },
    type: {
      label: '按钮类型',
      tip: '设置按钮类型',
      type: Select,
      elProps: {
        defaultValue: 'primary',
        options: ['default', 'primary', 'dashed', 'danger', 'link'].map((v) => ({
          label: v,
          value: v,
        })),
      },
    },
    onClick: {
      label: '点击事件',
      tip: '点击事件回调',
      type: Input,
      elProps: {
        placeholder: 'console.log(1)',
      },
    },
    block: {
      label: '自适应宽度',
      tip: '将按钮宽度调整为其父宽度',
      type: Switch,
      itemProps: {
        valuePropName:'checked'
      },
    },
  },
};

export default Button;
