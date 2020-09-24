import React, { useState, useEffect } from 'react';
import FormRenderer from './FormRenderer';
import * as enums from './enums';
import { Input, Radio, DatePicker, Select, Form, Button, Spin } from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';

const dateFormat = 'YYYY-MM-DD';

export default function App({}) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setData({
        name: '汪国超',
        nameSpell: 'wgc',
        custNickNameInOrg: 'leon',
        englishName: 'leon',
        gender: 'M',
        marryStatus: 'Y',
        birthday: moment('1986-11-19'),
        individualEmail: 'giantfish@15.om',
        country: 'HK',
        race: '01',
        politicStatus: 'LM',
        educationLevel: 'U',
        overseasStudyExp: 'N',
        firstworkdate: moment('2020-09-17'),
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
    [
      {
        type: Input,
        label: '姓名',
        placeholder: '请填写',
        name: 'name',
        rules: [{ required: true, message: '*' }],
      },
      { type: Input, label: '拼音', placeholder: '例：liming (李明)', name: 'nameSpell' },
    ],
    [
      { type: Input, label: '昵称', placeholder: '请填写（非必填）', name: 'custNickNameInOrg' },
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
        type: DatePicker,
        label: '生日',
        title: '出生日期',
        placeholder: '请选择',
        name: 'birthday',
        format: dateFormat,
        locale: locale,
      },

      { type: Input, label: '个人邮箱', placeholder: '请填写（非必填）', name: 'individualEmail' },
    ],
    [
      {
        type: Select,
        label: '国籍',
        title: '国籍',
        name: 'country',
        options: enums.coutries,
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
        type: DatePicker,
        label: '首次工作',
        title: '首次工作',
        name: 'firstworkdate',
        placeholder: '请选择首次参加工作时间',
        format: dateFormat,
        locale: locale,
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

  const onFinish = (values) => {
    setData(values);
  };

  return (
    <div className="page-base-info">
      <Spin spinning={loading}>
        <Form form={form} onFinish={onFinish} initialValues={data} layout="vertical">
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
