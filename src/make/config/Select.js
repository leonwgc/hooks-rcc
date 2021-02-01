const Select = {
  props: {
    name: {
      label: 'name',
      tip: '输入框的 name',
      type: 'string',
      elProps: {
        defaultValue: () => 'id' + Date.now(),
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
    allowClear: {
      label: '支持清除',
      tip: '支持清除',
      type: 'boolean',
      elProps: {
        defaultValue: true,
      },
    },
    mode: {
      label: 'mode',
      tip: 'multiple | tags',
      type: 'enum',
      elProps: {
        options: ['multiple', 'tags'],
        allowClear: true,
      },
    },
    optionLabels: {
      label: '选项',
      tip: '选项和选项值一一对应',
      type: 'enum',
      elProps: {
        mode: 'tags',
        allowClear: true,
        options: ['选项1', '选项2'],
        defaultValue: ['选项1', '选项2'],
      },
    },
    optionValues: {
      label: '选项值',
      tip: '选项和选项值一一对应',
      type: 'enum',
      elProps: {
        mode: 'tags',
        allowClear: true,
        options: ['选项1的值', '选项2的值'],
        defaultValue: ['选项1的值', '选项2的值'],
      },
    },
  },
  styles: {
    line: {
      label: '整体样式设置',
      type: 'divider',
      tip: '整体样式设置和单个样式设置不要同时设置，选择一种！',
    },
    cssText: {
      label: 'cssText',
      tip: 'css样式,设置这个了就不用设置下面其他属性',
      type: 'mstring',
      elProps: {
        defaultValue: 'font-size:30px; color:red;',
      },
    },
    line1: {
      label: '单个样式设置',
      type: 'divider',
      tip: '整体样式设置和单个样式设置不要同时设置，选择一种！',
    },
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
    fontSize: {
      label: '字体大小',
      type: 'string',
    },
    color: {
      label: '字体颜色',
      type: 'string',
      elProps: {
        type: 'color',
      },
    },
  },
};
export default Select;
