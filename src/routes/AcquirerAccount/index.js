import React from 'react';
import { connect } from 'dva';
import { Card, Table, Input, Button, Modal } from 'antd'
import request from '../../utils/request'
import LimitForm from './LimitForm'
import {message} from "antd/lib/index";

const { Group: ButtonGroup } = Button


@connect(({
            query: { acquirerAccount = {} },
          }) => ({
  query: acquirerAccount
}))
class AcquirerAccount extends React.Component {
  state = {
    visible: false
  }

  componentDidMount() {
    this.getList()
  }

  getList=(params={})=>{
    const { query } = this.props
    const { pageSize=10, pageNum = 1 } =this.state
    request('/admin/account/acquirerAccount/getList', {...query, pageSize, pageNum, ...params}).then(({data: {code, msg, data={}}}) => {
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

    const { query={}, dispatch } = this.props
    const { total = 0, pageSize = 10, pageNum = 1, list=[], visible, record={} } = this.state

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
    },{
      title: '操作',
      dataIndex: 'accountId',
      key: 'handle',
      render: (text, record)=>{
        return <ButtonGroup>
          <Button type='primary' size='small' style={{lineHeight: '20px'}} onClick={()=>{
            this.setState({
              visible: true,
              record: record
            })
          }}>
            设定限额
          </Button>
          <Button type='primary' size='small' style={{lineHeight: '20px'}} onClick={()=>{
            dispatch({
              type: 'query/toDetail',
              payload: {
                financeDetail:{
                  accountId: text
                }
              }
            })
          }}>
            收支明细
          </Button>
        </ButtonGroup>
      }
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

        <Modal visible={visible}
               title={'设置限额'}
               onCancel={()=>{
                 this.setState({
                   visible: false,
                   record: {}
                 })}
               }
               footer={null}
               key={(new Date()).getTime()}
        >
          <LimitForm record={record} onCancel={()=>{
            this.setState({
              visible: false,
              record: {}
            })}
          }
                      onSubmit={(values)=>{
                        request('/admin/account/acquirerAccount/setLimit', values).then(({data: { code }}) => {
                            if(code==='000000'){
                              message.success('设置成功');
                              this.setState({
                                visible: false,
                                record: {}
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

export default AcquirerAccount
