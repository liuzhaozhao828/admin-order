import React from 'react';
import { connect } from 'dva';
import moment from 'moment'
import { Card, Table, Input, Button, DatePicker } from 'antd'
import request from '../../utils/request'



@connect(({
            query: { bpOrder = {} },
          }) => ({
  query: bpOrder
}))
class BPOrder extends React.Component {
  state = {}

  componentDidMount() {
    this.getList()
  }

  getList=(params={})=>{
    const { query } = this.props
    request('/admin/order/bpOrder', {...query, pageSize: 10, pageNum: 1, ...params}).then(({data: {code, msg, data={}}}) => {
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
        bpOrder:{
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
      title: 'bp订单号',
      dataIndex: 'bpOrderId',
      key: 'bpOrderId',
    },{
      title: '支付时间',
      dataIndex: 'payTime',
      key: 'payTime',
    },{
      title: '成功时间',
      dataIndex: 'successTime',
      key: 'successTime',
    },{
      title: '收款银行',
      dataIndex: 'gatherBank',
      key: 'gatherBank',
    },{
      title: '收款姓名',
      dataIndex: 'gatherName',
      key: 'gatherName',
    },{
      title: '实收金额',
      dataIndex: 'amount',
      key: 'amount',
    },{
      title: '客户姓名',
      dataIndex: 'name',
      key: 'name',
    },{
      title: '客户银行',
      dataIndex: 'bank',
      key: 'bank',
    },{
      title: '客户卡号',
      dataIndex: 'cardNo',
      key: 'cardNo',
    },{
      title: '客户附言',
      dataIndex: 'remark',
      key: 'remark',
    },{
      title: '状态',
      dataIndex: 'orderStatus',
      key: 'orderStatus',
    },]

    return (
      <div>
        <Card title={<span className='title_1'>BP订单明细</span>}>
          <div style={{ overflow: 'hidden', marginBottom: '10px' }}>
            <ul className='query'>
              <li>
                <span style={{width: '80px'}}>付款卡姓名：</span>
                <Input
                  value={query.payCardName}
                  style={{ width: 200 }}
                  onChange={e => {
                    this.onQueryChange({payCardName:e.target.value.trim()})
                  }}
                />
              </li>
              <li>
                <span style={{width: '80px'}}>付款卡卡号：</span>
                <Input
                  value={query.payCardNo}
                  style={{ width: 200 }}
                  onChange={e => {
                    this.onQueryChange({payCardNo:e.target.value.trim()})
                  }}
                />
              </li>
              <li>
                <span style={{width: '80px'}}>收款卡姓名：</span>
                <Input
                  value={query.gatherCardName}
                  style={{ width: 200 }}
                  onChange={e => {
                    this.onQueryChange({gatherCardName:e.target.value.trim()})
                  }}
                />
              </li>
              <li>
                <span style={{width: '80px'}}>收款卡卡号：</span>
                <Input
                  value={query.gatherCardNo}
                  style={{ width: 200 }}
                  onChange={e => {
                    this.onQueryChange({gatherCardNo:e.target.value.trim()})
                  }}
                />
              </li>
              <li>
                <span style={{width: '80px'}}>BP订单号：</span>
                <Input
                  value={query.bpOrderId}
                  style={{ width: 200 }}
                  onChange={e => {
                    this.onQueryChange({bpOrderId:e.target.value.trim()})
                  }}
                />
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
                 rowKey='bpOrderId'
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

export default BPOrder
