import React from 'react';
import { connect } from 'dva';
import moment from 'moment'
import { Card, Table, Select, Input, Button, DatePicker } from 'antd'
import request from '../../utils/request'

const { Option } = Select


@connect(({
            query: { aliPayOrder = {} },
          }) => ({
  query: aliPayOrder
}))
class AliPayOrder extends React.Component {
  state = {}

  componentDidMount() {
    this.getList()
  }

  getList=(params={})=>{
    const { query } = this.props
    request('/admin/order/aliPayOrder', {...query, pageSize: 10, pageNum: 1, ...params}).then(({data: {code, msg, data={}}}) => {
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
        aliPayOrder:{
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
      title: '支付时间',
      dataIndex: 'payTime',
      key: 'payTime',
    },{
      title: '成功时间',
      dataIndex: 'successTime',
      key: 'successTime',
    },{
      title: '支付方式',
      dataIndex: 'payType',
      key: 'payType',
    },{
      title: '支付宝名称',
      dataIndex: 'aliPayName',
      key: 'aliPayName',
    },{
      title: '支付宝账号',
      dataIndex: 'aliPayAccount',
      key: 'aliPayAccount',
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
        <Card title={<span className='title_1'>支付宝订单明细</span>}>
          <div style={{ overflow: 'hidden', marginBottom: '10px' }}>
            <ul className='query'>
              <li>
                <span style={{width: '80px'}}>支付宝账号：</span>
                <Input
                  value={query.aliPayAccount}
                  style={{ width: 200 }}
                  onChange={e => {
                    this.onQueryChange({aliPayAccount:e.target.value.trim()})
                  }}
                />
              </li>
              <li>
                <span style={{width: '80px'}}>支付订单号：</span>
                <Input
                  value={query.payOrderId}
                  style={{ width: 200 }}
                  onChange={e => {
                    this.onQueryChange({payOrderId:e.target.value.trim()})
                  }}
                />
              </li>
              <li>
                <span style={{width: '80px'}}>渠道订单号：</span>
                <Input
                  value={query.channelOrderId}
                  style={{ width: 200 }}
                  onChange={e => {
                    this.onQueryChange({channelOrderId:e.target.value.trim()})
                  }}
                />
              </li>
              <li>
                <span style={{width: '80px'}}>商户名：</span>
                <Input
                  value={query.merchantName}
                  style={{ width: 200 }}
                  onChange={e => {
                    this.onQueryChange({merchantName:e.target.value.trim()})
                  }}
                />
              </li>
              <li>
                <span style={{width: '80px'}}>订单状态：</span>
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
                <span style={{width: '80px'}}>交易日期：</span>
                <DatePicker
                  allowClear
                  style={{width: '200px'}}
                  value={query.payTime ? moment(query.payTime, 'YYYY-MM-DD') : null}
                  format="YYYY-MM-DD"
                  onChange={(value) => {
                    this.onQueryChange({
                      payTime: value ? value.format('YYYY-MM-DD') : ''
                    });
                  }}
                />
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

export default AliPayOrder
