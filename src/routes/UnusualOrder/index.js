import React from 'react';
import { connect } from 'dva';
import { Card, Table, Select, Input, Button, Modal, message} from 'antd'
import request from '../../utils/request'

const { Option } = Select


@connect(({
            query: { unusualOrder = {} },
          }) => ({
  query: unusualOrder
}))
class UnusualOrder extends React.Component {
  state = {}

  componentDidMount() {
    this.getList()
  }

  getList=(params={})=>{
    const { query } = this.props
    const { pageSize = 10, pageNum = 1 } = this.state
    request('/admin/finance/unusualOrder/getList', {...query, pageSize, pageNum, ...params}).then(({data: {code, msg, data={}}}) => {
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
        unusualOrder:{
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
      title: '交易时间',
      dataIndex: 'tradeTime',
      key: 'tradeTime',
    },{
      title: '金额',
      dataIndex: 'amount',
      key: 'amount',
    },{
      title: '交易类型',
      dataIndex: 'tradeType',
      key: 'tradeType',
    },{
      title: '异常类型',
      dataIndex: 'unusualType',
      key: 'unusualType',
    },{
      title: '上游状态',
      dataIndex: 'upperStatus',
      key: 'upperStatus',
    },{
      title: '下游状态',
      dataIndex: 'lowerStatus',
      key: 'lowerStatus',
    },{
      title: '处理结果',
      dataIndex: 'dealResult',
      key: 'dealResult',
    },{
      title: '操作',
      dataIndex: 'handle',
      key: 'orderId',
      render: (orderId, {dealResultId})=>{
        if(dealResultId==='wait'){
          return <Button type='primary'
                         size='small'
                         onClick={()=>{
                           Modal.confirm({
                             content: '确定对该订单标记为已处理？',
                             okText: '确认',
                             cancelText: '取消',
                             onOk: ()=>{
                               request('/admin/finance/unusualOrder/markDone',{orderId}).then(({data: {code}})=>{
                                 if(code==='000000'){
                                   message.success('标记成功')
                                 }
                                 this.getList()
                               })
                             }
                           });
                         }}>
            标记已处理
          </Button>
        }
      }
    }]

    return (
      <div>
        <Card title={<span className='title_1'>异常订单</span>}>
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
                <span>账户号：</span>
                <Input
                  value={query.accountId}
                  style={{ width: 200 }}
                  onChange={e => {
                    this.onQueryChange({accountId:e.target.value.trim()})
                  }}
                />
              </li>
              <li>
                <span>异常类型：</span>
                <Select value={query.unusualTypeId}
                        style={{width:'200px'}}
                        onChange={(value) => {
                          this.onQueryChange({unusualTypeId:value})
                        }}>
                  <Option value="ALL">全部</Option>
                  <Option value="upper">上游异常</Option>
                  <Option value="lower">下游异常</Option>
                  <Option value="system">系统异常</Option>
                  <Option value="refund">申请退款</Option>
                </Select>
              </li>
              <li>
                <span>处理结果：</span>
                <Select value={query.dealResultId}
                        style={{width:'200px'}}
                        onChange={(value) => {
                          this.onQueryChange({dealResultId:value})
                        }}>
                  <Option value="ALL">全部</Option>
                  <Option value="done">已处理</Option>
                  <Option value="wait">待处理</Option>
                </Select>
              </li>
              <li>
                <span />
                <Button type='primary' onClick={()=>this.getList()}>查询</Button>
              </li>

            </ul>
          </div>

          <Table dataSource={list}
                 columns={columns}
                 rowKey='orderId'
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

export default UnusualOrder
