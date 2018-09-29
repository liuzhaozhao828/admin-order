import React from 'react';
import { connect } from 'dva';
import moment from 'moment'
import { Card, Table, Input, Button, DatePicker } from 'antd'
import request from '../../utils/request'



@connect(({
            query: { yifubaoOrder = {} },
          }) => ({
  query: yifubaoOrder
}))
class YifubaoOrder extends React.Component {
  state = {}

  componentDidMount() {
    this.getList()
  }

  getList=(params)=>{
    const { query } = this.props
    request('/admin/order/yifubaoOrder', {...query, pageSize: 10, pageNum: 1, ...params}).then(({data: {code, msg, data={}}}) => {
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
        yifubaoOrder:{
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
      title: '易付宝订单号',
      dataIndex: 'yifubaoOrderId',
      key: 'yifubaoOrderId',
    },{
      title: '代付时间',
      dataIndex: 'time',
      key: 'time',
    },{
      title: '成功时间',
      dataIndex: 'successTime',
      key: 'successTime',
    },{
      title: '客户姓名',
      dataIndex: 'name',
      key: 'name',
    },{
      title: '客户卡号',
      dataIndex: 'cardNo',
      key: 'cardNo',
    },{
      title: '代付金额',
      dataIndex: 'amount',
      key: 'amount',
    },{
      title: '状态',
      dataIndex: 'orderStatus',
      key: 'orderStatus',
    },]

    return (
      <div>
        <Card title={<span className='title_1'>易付宝订单明细</span>}>
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
                <span style={{width: '90px'}}>易付宝订单号：</span>
                <Input
                  value={query.yifubaoOrderId}
                  style={{ width: 200 }}
                  onChange={e => {
                    this.onQueryChange({yifubaoOrderId:e.target.value.trim()})
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
                <span style={{width: '80px'}}>客户卡号：</span>
                <Input
                  value={query.cardNo}
                  style={{ width: 200 }}
                  onChange={e => {
                    this.onQueryChange({cardNo:e.target.value.trim()})
                  }}
                />
              </li>
              <li>
                <span style={{width: '80px'}}>客户姓名：</span>
                <Input
                  value={query.name}
                  style={{ width: 200 }}
                  onChange={e => {
                    this.onQueryChange({name:e.target.value.trim()})
                  }}
                />
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

export default YifubaoOrder
