/**
 * Created by liuzhaozhao on 2017/12/29.
 */
import React from 'react';
import { connect } from 'dva';
import moment from 'moment'
import { Card, Table, Select, Input, Button, DatePicker } from 'antd'
import request from '../../utils/request'

const { Option } = Select
const { RangePicker } = DatePicker


@connect(({
            query: { financeDetail = {} },
          }) => ({
  query: financeDetail
}))
class FinanceDetail extends React.Component {
  state = {}

  componentDidMount() {
    this.getList()
  }

  getList=(params={})=>{
    const { query } = this.props
    request('/admin/finance/financeDetail/getList', {...query, pageSize: 10, pageNum: 1, ...params}).then(({data: {code, msg, data={}}}) => {
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
        financeDetail:{
          ...query,
          ...params,
        }
      }
    })
  }

  dealQuery=() => {
    const { query } = this.props
    let params = '';
    for (const key in query) {
      if (Object.prototype.hasOwnProperty.call(query, key)) {
        params = `${params}&${key}=${query[key]}`;
      }
    }
    return params ? `?${params}` : '';
  }


  render() {

    const { query={} } = this.props
    const { total = 0, pageSize = 10, pageNum = 1, list=[] } = this.state

    const columns=[{
      title: '订单号',
      dataIndex: 'orderId',
      key: 'orderId',
    },{
      title: '账户号',
      dataIndex: 'accountId',
      key: 'accountId',
    },{
      title: '交易时间',
      dataIndex: 'tradeTime',
      key: 'tradeTime',
    },{
      title: '支付类型',
      dataIndex: 'payType',
      key: 'payType',
    },{
      title: '交易类型',
      dataIndex: 'tradeType',
      key: 'tradeType',
    },{
      title: '支付前余额',
      dataIndex: 'beforePayAmount',
      key: 'beforePayAmount',
    },{
      title: '支付金额',
      dataIndex: 'payAmount',
      key: 'payAmount',
    },{
      title: '支付后余额',
      dataIndex: 'afterPayAmount',
      key: 'afterPayAmount',
    },{
      title: '备注',
      dataIndex: 'remark',
      key: 'remark',
    },]

    return (
      <div>
        <Card title={<span className='title_1'>收支明细</span>}
              extra={
                <a
                  href={`/admin/finance/financeDetail/exportData${this.dealQuery()}`}
                  rel="noopener noreferrer nofollow"
                  target="_blank"
                >
                  <Button type="primary">导出</Button>
                </a>
              }>
          <div style={{ overflow: 'hidden', marginBottom: '10px' }}>
            <ul className='query'>
              <li>
                <span>日期：</span>
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
                <span>支付类型：</span>
                <Select value={query.payTypeId}
                        style={{width:'200px'}}
                        onChange={(value) => {
                          this.onQueryChange({payTypeId:value})
                        }}>
                  <Option value="ALL">全部</Option>
                  <Option value="in">收入</Option>
                  <Option value="out">支出</Option>
                  <Option value="fre">冻结解冻</Option>
                </Select>
              </li>
              <li>
                <span>交易类型：</span>
                <Select value={query.tradeTypeId}
                        style={{width:'200px'}}
                        onChange={(value) => {
                          this.onQueryChange({tradeTypeId:value})
                        }}>
                  <Option value="ALL">全部</Option>
                  <Option value="1">收单入账</Option>
                  <Option value="2">结算出款</Option>
                  <Option value="3">调账转入</Option>
                  <Option value="4">调账转出</Option>
                  <Option value="5">余额冻结</Option>
                  <Option value="6">余额解冻</Option>
                </Select>
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

export default FinanceDetail
