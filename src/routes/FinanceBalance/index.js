import React from 'react';
import { connect } from 'dva';
import moment from 'moment'
import { Card, Table, Input, Button, DatePicker } from 'antd'
import request from '../../utils/request'
import {dealQuery} from '../../utils/tools'

const { RangePicker } = DatePicker


@connect(({
            query: { financeBalance = {} },
          }) => ({
  query: financeBalance
}))
class FinanceBalance extends React.Component {
  state = {}

  componentDidMount() {
    this.getList()
  }

  getList=(params={})=>{
    const { query } = this.props
    request('/admin/finance/financeBalance/getList', {...query, pageSize: 10, pageNum: 1, ...params}).then(({data: {code, msg, data={}}}) => {
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
        financeBalance:{
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

    const { query={}, dispatch } = this.props
    const { total = 0, pageSize = 10, pageNum = 1, list=[] } = this.state

    const columns=[{
      title: '账户号',
      dataIndex: 'accountId',
      key: 'accountId',
    },{
      title: '商户号',
      dataIndex: 'merchantId',
      key: 'merchantId',
    },{
      title: '账单日',
      dataIndex: 'billDate',
      key: 'billDate',
    },{
      title: '总收入',
      dataIndex: 'totalIncome',
      key: 'totalIncome',
    },{
      title: '总支出',
      dataIndex: 'totalExpend',
      key: 'totalExpend',
    },{
      title: '期初余额',
      dataIndex: 'startAmount',
      key: 'startAmount',
    },{
      title: '期末余额',
      dataIndex: 'endAmount',
      key: 'endAmount',
    },{
      title: '操作',
      dataIndex: 'accountId',
      key: 'handle',
      render: (text, {merchantId})=>{
        return <Button type='primary' size='small' style={{lineHeight: '20px'}} onClick={()=>{
            dispatch({
              type: 'query/toDetail',
              payload: {
                financeDetail:{
                  accountId: text,
                  merchantId
                }
              }
            })
          }}>
            收支明细
          </Button>
      }
    },]

    return (
      <div>
        <Card title={<span className='title_1'>财务对账</span>}
              extra={
                <a
                  href={`/admin/finance/financeBalance/exportData${dealQuery(query)}`}
                  rel="noopener noreferrer nofollow"
                  target="_blank"
                >
                  <Button type="primary">导出</Button>
                </a>
              }>
          <div style={{ overflow: 'hidden', marginBottom: '10px' }}>
            <ul className='query'>
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
                <span />
                <Button type='primary' onClick={()=>this.getList()}>查询</Button>
              </li>

            </ul>
          </div>

          <Table dataSource={list}
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

export default FinanceBalance
