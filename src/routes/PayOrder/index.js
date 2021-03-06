import React from 'react';
import { connect } from 'dva';
import moment from 'moment'
import { Card, Table, Select, Input, Button, DatePicker } from 'antd'
import request from '../../utils/request'

const { Option } = Select
const { RangePicker } = DatePicker


@connect(({
            query: { payOrder = {} },
          }) => ({
  query: payOrder
}))
class PayOrder extends React.Component {
  state = {}

  componentDidMount() {
    this.getList()
  }

  getList=(params={})=>{
    const { query } = this.props
    request('/admin/order/payOrder', {...query, pageSize: 10, pageNum: 1, ...params}).then(({data: {code, msg, data={}}}) => {
      const { total = 0, pageSize = 10, pageNum = 1, list=[] } = data
      this.setState({
        total,
        pageSize,
        pageNum,
        list,
      })
    })
  }

  onQueryChange=(params)=>{
    const { dispatch, query } = this.props
    dispatch({
      type: 'query/save',
      payload: {
        payOrder:{
          ...query,
          ...params,
        }
      }
    })
  }


  render() {

    const { query={} } = this.props
    const { total = 0, pageSize = 10, pageNum = 1, list=[] } = this.state

    const columns=[{
      title: '订单号',
      dataIndex: 'orderId',
      key: 'orderId',
    },{
      title: '商户号',
      dataIndex: 'merchantId',
      key: 'merchantId',
    },{
      title: '交易发起时间',
      dataIndex: 'orderBeginDate',
      key: 'orderBeginDate',
    },{
      title: '交易完成时间',
      dataIndex: 'orderEndDate',
      key: 'orderEndDate',
    },{
      title: '支付方式',
      dataIndex: 'payType',
      key: 'payType',
    },{
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },{
      title: '卡号',
      dataIndex: 'cardId',
      key: 'cardId',
    },{
      title: '金额',
      dataIndex: 'amount',
      key: 'amount',
    },{
      title: '状态',
      dataIndex: 'orderStatus',
      key: 'orderStatus',
    },]

    return (
      <div>
        <Card title={<span className='title_1'>支付订单</span>}>
          <div style={{ overflow: 'hidden', marginBottom: '10px' }}>
            <ul className='query'>
              <li>
                <span>订单号：</span>
                <Input
                  value={query.orderId}
                  style={{ width: 200 }}
                  onChange={e => {
                    this.onQueryChange({orderId:e.target.value.trim()})
                  }}
                />
              </li>
              <li>
                <span>订单状态：</span>
                <Select value={query.orderStatus}
                        style={{width:'200px'}}
                        onChange={(value) => {
                          this.onQueryChange({orderStatus:value})
                        }}>
                  <Option value="ALL">全部</Option>
                  <Option value="deal">处理中</Option>
                  <Option value="done">已完成</Option>
                </Select>
              </li>
              <li>
                <span>交易日期：</span>
                <RangePicker
                  allowClear
                  style={{ width: 300 }}
                  value={[
                    query.startDate ? moment(query.startDate, 'YYYY-MM-DD') : null,
                    query.endDate ? moment(query.endDate, 'YYYY-MM-DD') : null,
                  ]}
                  format="YYYY-MM-DD"
                  onChange={(value) => {
                    this.onQueryChange({
                      startDate: value[0] ? value[0].format('YYYY-MM-DD') : '',
                      endDate: value[1] ? value[1].format('YYYY-MM-DD') : '',
                    });
                  }}
                />
              </li>
              <li>
                <span>商户号：</span>
                <Input
                  value={query.merchantId}
                  style={{ width: 200 }}
                  onChange={e => {
                    this.onQueryChange({merchantId:e.target.value.trim()})
                  }}
                />
              </li>
              <li>
                <span>支付方式：</span>
                <Select value={query.payTypeId}
                        style={{width:'200px'}}
                        onChange={(value) => {
                          this.onQueryChange({payTypeId:value})
                        }}>
                  <Option value="ALL">全部</Option>
                  <Option value="pt1">支付宝</Option>
                  <Option value="pt2">快捷</Option>
                  <Option value="pt3">网银</Option>
                </Select>
              </li>
              <li>
                <span />
                <Button type='primary' onClick={()=>this.getList()}>查询</Button>
              </li>

            </ul>
          </div>

          <Table dataSource={list}
                 rowKey='orderId'
                 columns={columns}
                 pagination={{
                   total,
                   current: pageNum * 1,
                   pageSize: pageSize * 1,
                   onChange: (num, size) => {
                     this.getList({
                       pageNum: num,
                       pageSize: size,
                     })
                   },
                 }}/>
        </Card>

      </div>
    );
  }
}

export default PayOrder
