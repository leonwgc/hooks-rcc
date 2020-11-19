import React from 'react';
import { Button, Col, Form, Input, Row, Table, Select, Popconfirm } from 'antd';
import { useAntdTable } from 'ahooks';
import { get, post } from '~/utils/fetch-zfl';
import FormRenderer from '~/common-pc/FormRenderer';

const rewardTypeEnums = {
  INTEGRAL: '积分',
  RECHARGE: '充值类',
  COUPON: '电子卡券',
  GOOD_LUCK: '谢谢参与',
  OFFLINE_PRODUCT: '线下领取',
  DELIVERABLE_PRODUCT: '线上寄送',
  PRODUCT_JD: '京东',
  PRODUCT_XY: '严选',
  PRODUCT_ZY: '自营',
  THIRD: '第三方',
};
const statusEnums = {
  O: '启用',
  C: '禁用',
};

const types = [];

for (let k of Object.keys(rewardTypeEnums)) {
  types.push({
    label: rewardTypeEnums[k],
    value: k,
  });
}

const getTableData = ({ current, pageSize }, formData) => {
  return post(`/api/promotion/v2/luck/reward/page`, {
    needTotalItem: true,
    pageSize,
    currentPage: current,
    param: { type: '1', ...formData },
  }).then(({ result = {} }) => ({
    total: result.totalItem,
    list: result.resultList,
  }));
};

const AppList = (props) => {
  const [form] = Form.useForm();
  const { tableProps, search, loading } = useAntdTable(getTableData, { form });
  console.log('loading', loading);
  const { type, changeType, submit, reset } = search;

  const searchLayout = [
    [
      {
        type: Select,
        placeholder: 'rewardType',
        style: { width: '200px' },
        label: 'rewardType',
        title: 'rewardType',
        name: 'rewardType',
        options: types,
        showSearch: true,
        optionFilterProp: 'label',
      },
      {
        type: Input,
        label: 'name',
        placeholder: '请填写',
        name: 'name',
      },
      {
        type: Input,
        label: 'skuId',
        placeholder: '请填写',
        name: 'skuId',
      },
    ],
  ];

  const columns = [
    {
      title: '奖品id',
      dataIndex: 'id',
    },
    {
      title: '类型',
      dataIndex: 'rewardType',
      render: (rewardType) => {
        return rewardTypeEnums[rewardType];
      },
    },
    {
      title: '奖品名称',
      dataIndex: 'name',
    },
    {
      title: 'sku id',
      dataIndex: 'skuId',
    },
    {
      title: '积分金额(售价)',
      dataIndex: 'fee',
    },
    {
      title: '图片',
      dataIndex: 'posterLink',
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: (status) => {
        return statusEnums[status];
      },
    },
    {
      title: '更新时间',
      dataIndex: 'gmtModified',
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      render: (value, item, index) => {
        const { status } = item;
        const statusText = status == 'O' ? '禁用' : '启用';
        return (
          <div>
            <a style={{ whiteSpace: 'nowrap' }} onClick={null}>
              编辑
            </a>
            <Popconfirm
              title={`确定${statusText}该奖品？`}
              //   onConfirm={() => this.onToggleStatus(item)}
              okText="确定"
              cancelText="取消"
            >
              <a>{statusText}</a>
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <Form form={form} layout={'vertical'}>
        <FormRenderer layoutData={searchLayout} />
        <div>
          <Form.Item
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <Button type="primary" onClick={submit}>
              Search
            </Button>
            <Button
              onClick={reset}
              style={{
                marginLeft: 16,
              }}
            >
              Reset
            </Button>
          </Form.Item>
        </div>
      </Form>
      <Table columns={columns} {...tableProps} />
    </div>
  );
};
export default AppList;
