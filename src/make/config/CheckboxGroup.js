const CheckboxGroup = {
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
  styles: {},
};
export default CheckboxGroup;
