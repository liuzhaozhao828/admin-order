import React from 'react';
import { connect } from 'dva';
import moment from 'moment'
import { Card, Table, Select, Input, Button, DatePicker, Modal, message} from 'antd'
import request from '../../utils/request'
import {dealQuery} from '../../utils/tools'
import SettleForm from './SettleForm'

const { Option } = Select
const { RangePicker } = DatePicker


@connect(({
            query: { financeSettlement = {} },
          }) => ({
  query: financeSettlement
}))
class FinanceSettlement extends React.Component {
  state = {
    visible: false
  }

  componentDidMount() {
    this.getList()
  }

  getList=(params={})=>{
    const { pageSize = 10, pageNum = 1} = this.state
    const { query } = this.props
    request('/admin/finance/financeSettlement/getList', {...query, pageSize, pageNum, ...params}).then(({data: {code, msg, data={}}}) => {
      const { total = 0, pageSize = 10, pageNum = 1, list=[] } = data
      this.setState({
        total,
        pageSize,
        pageNum,
        list,
      })
    })
  }

  getAvailableAmount=()=>{
    request('/admin/finance/financeSettlement/getAvailableAmount').then(({data: {code, msg, data={}}}) => {
      this.setState({
        availableAmount: data.amount||"0.00",
        visible: true
      })
    })
  }

  onQueryChange=(params)=>{
    const { dispatch, query } = this.props
    dispatch({
      type: 'query/save',
      payload: {
        financeSettlement:{
          ...query,
          ...params,
        }
      }
    })
  }


  render() {

    const { query={} } = this.props
    const { total = 0, pageSize = 10, pageNum = 1, list=[], visible, availableAmount } = this.state

    const columns=[{
      title: '商户号',
      dataIndex: 'merchantId',
      key: 'merchantId',
    },{
      title: '发起时间',
      dataIndex: 'date',
      key: 'date',
    },{
      title: '可用余额',
      dataIndex: 'availableAmount',
      key: 'availableAmount',
    },{
      title: '结算金额',
      dataIndex: 'settleAmount',
      key: 'settleAmount',
    },{
      title: '收款账户',
      dataIndex: 'account',
      key: 'account',
    },{
      title: '结算状态',
      dataIndex: 'status',
      key: 'status',
    },{
      title: '备注',
      dataIndex: 'remark',
      key: 'remark',
    },]

    return (
      <div>
        <Card title={<span className='title_1'>财务结算</span>}
              extra={
                <div>
                  <a
                    href={`/admin/finance/financeSettlement/exportData${dealQuery(query)}`}
                    rel="noopener noreferrer nofollow"
                    target="_blank"
                  >
                    <Button type="primary">导出</Button>
                  </a>
                  <Button type={'primary'}
                          style={{marginLeft: '10px'}}
                          onClick={()=>{
                            this.getAvailableAmount()
                          }} >发起结算</Button>
                </div>
              }>
          <div style={{ overflow: 'hidden', marginBottom: '10px' }}>
            <ul className='query'>
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
                <span>状态：</span>
                <Select value={query.statusId}
                        style={{width:'200px'}}
                        onChange={(value) => {
                          this.onQueryChange({statusId:value})
                        }}>
                  <Option value="ALL">全部</Option>
                  <Option value="1">待结算</Option>
                  <Option value="2">打款中</Option>
                  <Option value="3">已完成</Option>
                </Select>
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

        <Modal visible={visible}
               title={'发起结算'}
               onCancel={()=>{
                 this.setState({
                   visible: false,
                   availableAmount: '0.00'
                 })}
               }
               footer={null}
               key={(new Date()).getTime()}
        >
          <SettleForm availableAmount={availableAmount}
                      onCancel={()=>{
                        this.setState({
                          visible: false,
                          availableAmount: '0.00'
                        })}
                      }
                      onSubmit={(values)=>{
                        request('/admin/finance/financeSettlement/startSettle', values).then(({data: { code }}) => {
                            if(code==='000000'){
                              message.success('发起成功');
                              this.setState({
                                visible: false,
                                availableAmount: '0.00'
                              })
                              this.getList()
                            }
                          }
                        )}}/>
        </Modal>

      </div>
    );
  }
}

export default FinanceSettlement
