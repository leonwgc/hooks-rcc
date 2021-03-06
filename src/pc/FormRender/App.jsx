import React, { useState, useEffect } from 'react';
import FormRenderer from './FormRenderer';
import * as enums from './enums';
import { Input, Radio, DatePicker, Select, Form, Button, Spin } from 'antd';
import dayjs from 'dayjs';
import './App.less';

const dateFormat = 'YYYY-MM-DD';

const GroupTitle = ({ title }) => {
  return <h3>{title}</h3>;
};

// self-defined Comp
const MyDatePicker = ({ value, onChange }) => {
  const [v, setV] = useState(dayjs(value));
  const myOnChange = (mv) => {
    setV(mv);
    if (!mv) {
      onChange(mv);
    } else {
      onChange(mv.format(dateFormat));
    }
  };
  return <DatePicker value={v} onChange={myOnChange}></DatePicker>;
};

export default function App({}) {
  const [form] = Form.useForm();
  const [settingForm] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  // simulate ajax load data
  const [coutries, setCoutries] = useState([]);

  const [settingData, setSettingData] = useState({ formLayout: 'horizontal' });

  useEffect(() => {
    setTimeout(() => {
      setCoutries([
        { label: '中国香港', value: '中国香港' },
        { label: '中国澳门', value: '中国澳门' },
        { label: '中国台湾', value: '中国台湾' },
        { label: '中华人民共和国', value: '中华人民共和国' },
      ]);
    }, 1000);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setData({
        name: '汪国超',
        nameSpell: 'wgc',
        custNickNameInOrg: 'leon',
        englishName: 'leon',
        gender: 'M',
        marryStatus: 'Y',
        birthday: '1986-11-19',
        individualEmail: 'giantfish@15.om',
        country: '中华人民共和国',
        race: '01',
        politicStatus: 'LM',
        educationLevel: 'U',
        overseasStudyExp: 'N',
        firstworkdate: '2020-09-17',
        householdType: 'U',
        householdAddress: '阳新',
        contactAddress: '上海闵行',
        housePlace: '上海闵行dh',
      });
      form.resetFields();
      setLoading(false);
    }, 1000);
  }, []);

  const layoutData = [
    [{ type: GroupTitle, title: '基础信息' }],
    [
      {
        type: Input,
        label: '姓名',
        placeholder: '请填写',
        name: 'name',
        rules: [{ required: true, message: '' }],
      },
      { type: Input, label: '拼音', placeholder: '例：liming (李明)', name: 'nameSpell' },
    ],
    [{ type: GroupTitle, title: '其他信息' }],
    [
      {
        type: Input,
        label: '昵称',
        placeholder: '请填写（非必填）',
        name: 'custNickNameInOrg',
        show: () => {
          return form.getFieldValue('name') === '汪国超';
        },
      },
      { type: Input, label: '英文名', placeholder: '请填写（非必填）', name: 'englishName' },
    ],
    [
      {
        type: Radio.Group,
        label: '性别',
        name: 'gender',
        options: [
          { value: 'M', label: '男' },
          { value: 'F', label: '女' },
        ],
      },
      {
        type: Radio.Group,
        label: '婚姻状况',
        name: 'marryStatus',
        options: [
          { value: 'Y', label: '已婚' },
          { value: 'N', label: '未婚' },
        ],
      },
    ],
    [
      {
        type: MyDatePicker,
        label: '生日',
        title: '出生日期',
        placeholder: '请选择',
        name: 'birthday',
        format: dateFormat,
        // locale,
      },

      { type: Input, label: '个人邮箱', placeholder: '请填写（非必填）', name: 'individualEmail' },
    ],
    [
      {
        type: Select,
        label: '国籍',
        title: '国籍',
        name: 'country',
        options: coutries,
        showSearch: true,
        optionFilterProp: 'label',
      },
      {
        type: Select,
        label: '民族',
        title: '民族',
        name: 'race',
        options: enums.nationalities,
        showSearch: true,
        optionFilterProp: 'label',
      },
    ],
    [
      {
        type: Select,
        label: '政治面貌',
        title: '政治面貌',
        name: 'politicStatus',
        options: enums.politicStatus,
        showSearch: true,
        optionFilterProp: 'label',
      },
      {
        type: Select,
        label: '最高学历',
        title: '最高学历',
        name: 'educationLevel',
        options: enums.educationLevel,
        showSearch: true,
        optionFilterProp: 'label',
      },
    ],
    [
      {
        type: Radio.Group,
        label: '留学经历',
        name: 'overseasStudyExp',
        options: [
          { value: 'Y', label: '有' },
          { value: 'N', label: '无' },
        ],
      },
      {
        type: MyDatePicker,
        label: '首次工作',
        title: '首次工作',
        name: 'firstworkdate',
        placeholder: '请选择首次参加工作时间',
        format: dateFormat,
        // locale,
      },
    ],
    [
      ({
        type: Select,
        label: '户口性质',
        name: 'householdType',
        options: enums.householdType,
        showSearch: true,
        optionFilterProp: 'label',
      },
      {
        type: Input,
        label: '户籍地址',
        placeholder: '请填写',
        name: 'householdAddress',
        rows: 1,
        autoHeight: true,
      }),
    ],
    [
      {
        type: Input,
        label: '联系地址',
        placeholder: '请填写',
        name: 'contactAddress',
        rows: 1,
        autoHeight: true,
      },
      {
        type: Input,
        label: '家庭住址',
        placeholder: '请填写',
        name: 'housePlace',
        rows: 1,
        autoHeight: true,
      },
    ],
  ];

  const onChange = (values) => {
    setData(values);
  };

  // settings

  const settingLayout = [
    [
      {
        type: Radio.Group,
        label: 'Form Layout',
        name: 'formLayout',
        options: [
          { value: 'horizontal', label: 'horizontal' },
          { value: 'vertical', label: 'vertical' },
          { value: 'inline', label: 'inline' },
        ],
      },
    ],
  ];

  const onValuesChange = (values) => {
    setSettingData(values);
  };

  const { formLayout } = settingData;

  return (
    <div className="app">
      <div>
        <Form
          form={settingForm}
          layout={formLayout}
          initialValues={settingData}
          onValuesChange={onValuesChange}
        >
          <FormRenderer layoutData={settingLayout} />
        </Form>
      </div>
      <Spin spinning={loading}>
        <Form
          form={form}
          onFinish={onChange}
          onValuesChange={onChange}
          initialValues={data}
          layout={formLayout}
        >
          <FormRenderer layoutData={layoutData} />
          <div>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </div>
        </Form>
      </Spin>
    </div>
  );
}
