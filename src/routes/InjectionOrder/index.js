import React from 'react';
import { connect } from 'dva';
import moment from 'moment'
import { Card, Table, Input, Select, Button, DatePicker } from 'antd'
import request from '../../utils/request'

const Option = Select.Option


@connect(({
            query: { injectionOrder = {} },
          }) => ({
  query: injectionOrder
}))
class InjectionOrder extends React.Component {
  state = {}

  componentDidMount() {
    this.getList()
  }

  getList=(params)=>{
    const { query } = this.props
    request('/admin/order/injectionOrder', {...query, pageSize: 10, pageNum: 1, ...params}).then(({data: {code, msg, data={}}}) => {
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
        injectionOrder:{
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
      title: '系统订单号',
      dataIndex: 'sysOrderId',
      key: 'sysOrderId',
    },{
      title: '重置凭证号',
      dataIndex: 'injectVercherId',
      key: 'injectVercherId',
    },{
      title: '商户号',
      dataIndex: 'merchantId',
      key: 'merchantId',
    },{
      title: '充值时间',
      dataIndex: 'injectTime',
      key: 'injectTime',
    },{
      title: '到账时间',
      dataIndex: 'successTime',
      key: 'successTime',
    },{
      title: '充值渠道',
      dataIndex: 'channel',
      key: 'channel',
    },{
      title: '充值金额',
      dataIndex: 'amount',
      key: 'amount',
    },{
      title: '订单状态',
      dataIndex: 'orderStatus',
      key: 'orderStatus',
    },]

    return (
      <div>
        <Card title={<span className='title_1'>注资订单明细</span>}>
          <div style={{ overflow: 'hidden', marginBottom: '10px' }}>
            <ul className='query'>
              <li>
                <span style={{width: '80px'}}>系统订单号：</span>
                <Input
                  value={query.sysOrderId}
                  style={{ width: 200 }}
                  onChange={e => {
                    this.onQueryChange({sysOrderId:e.target.value.trim()})
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
                <span style={{width: '80px'}}>商户号：</span>
                <Input
                  value={query.merchantId}
                  style={{ width: 200 }}
                  onChange={e => {
                    this.onQueryChange({merchantId:e.target.value.trim()})
                  }}
                />
              </li>
              <li>
                <span style={{width: '80px'}}>代付卡号：</span>
                <Input
                  value={query.rpayCardNo}
                  style={{ width: 200 }}
                  onChange={e => {
                    this.onQueryChange({rpayCardNo:e.target.value.trim()})
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
                <span style={{width: '80px'}}>代付时间：</span>
                <DatePicker
                  allowClear
                  style={{width: '200px'}}
                  value={query.payTime ? moment(query.time, 'YYYY-MM-DD') : null}
                  format="YYYY-MM-DD"
                  onChange={(value) => {
                    this.onQueryChange({
                      time: value ? value.format('YYYY-MM-DD') : ''
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

export default InjectionOrder
