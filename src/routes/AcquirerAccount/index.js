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
            query: { acquirerAccount = {} },
          }) => ({
  query: acquirerAccount
}))
class AcquirerAccount extends React.Component {
  state = {}

  componentDidMount() {
    this.getList()
  }

  getList=(params={})=>{
    const { query } = this.props
    request('/admin/account/acquirerAccount', {...query, pageSize: 10, pageNum: 1, ...params}).then(({data: {code, msg, data={}}}) => {
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
        acquirerAccount:{
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
      title: '账户号',
      dataIndex: 'accountId',
      key: 'accountId',
    },{
      title: '账户类型',
      dataIndex: 'accountType',
      key: 'accountType',
    },{
      title: '状态',
      dataIndex: 'status',
      key: 'status',
    },{
      title: '最近变动时间',
      dataIndex: 'changeTime',
      key: 'changeTime',
    },{
      title: '可用余额',
      dataIndex: 'leftAmount',
      key: 'leftAmount',
    },{
      title: '冻结余额',
      dataIndex: 'freezeAmount',
      key: 'freezeAmount',
    },{
      title: '限额',
      dataIndex: 'limitAmount',
      key: 'limitAmount',
    },{
      title: '允许交易',
      dataIndex: 'permitTransaction',
      key: 'permitTransaction',
    },]

    return (
      <div>
        <Card title={<span className='title_1'>收单账户</span>}>
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
                <span />
                <Button type='primary' onClick={()=>this.getList()}>查询</Button>
              </li>

            </ul>
          </div>

          <Table dataSource={list}
                 rowKey='accountId'
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

export default AcquirerAccount
