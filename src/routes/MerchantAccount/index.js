/**
 * Created by liuzhaozhao on 2017/12/29.
 */
import React from 'react';
import { connect } from 'dva';
import { Card, Table, Input, Button, Modal } from 'antd'
import request from '../../utils/request'
import InvestForm from './InvestForm'
import SettingForm from './SettingForm'
import {message} from "antd/lib/index";

const ButtonGroup = Button.Group


@connect(({
            query: { merchantAccount = {} },
          }) => ({
  query: merchantAccount
}))
class MerchantAccount extends React.Component {
  state = {
    visibleInvest: false,
    visibleSetting: false
  }

  componentDidMount() {
    this.getList()
  }

  getList=(params={})=>{
    const { query } = this.props
    const { pageSize=10, pageNum = 1 } = this.state
    request('/admin/account/merchantAccount/getList', {...query, pageSize, pageNum, ...params}).then(({data: {code, msg, data={}}}) => {
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
        merchantAccount:{
          ...query,
          ...params,
        }
      }
    })
  }


  render() {

    const { query={}, dispatch } = this.props
    const { total = 0, pageSize = 10, pageNum = 1, list=[], visibleInvest, visibleSetting, recordInvest={}, recordSetting } = this.state

    const columns=[{
      title: '账户号',
      dataIndex: 'accountId',
      key: 'accountId',
    },{
      title: '商户号',
      dataIndex: 'merchantId',
      key: 'merchantId',
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
              visibleInvest: true,
              recordInvest: record
            })
          }}>
            商户注资
          </Button>
          <Button type='primary' size='small' style={{lineHeight: '20px'}} onClick={()=>{
            this.setState({
              visibleSetting: true,
              recordSetting: record
            })
          }}>
            商户配置
          </Button>
          <Button type='primary' size='small' style={{lineHeight: '20px'}} onClick={()=>{
            dispatch({
              type: 'query/toDetail',
              payload: {
                financeDetail:{
                  accountId: text,
                  merchantId: record.merchantId
                }
              }
            })
          }}>
            收支明细
          </Button>
        </ButtonGroup>
      }
    }]

    return (
      <div>
        <Card title={<span className='title_1'>商户账户</span>}>
          <div style={{ overflow: 'hidden', marginBottom: '10px' }}>
            <ul className='query'>
              <li>
                <span>订单号：</span>
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

        <Modal visible={visibleInvest}
               title={'设置限额'}
               onCancel={()=>{
                 this.setState({
                   visibleInvest: false,
                   recordInvest: {}
                 })}
               }
               footer={null}
               key={(new Date()).getTime()}
        >
          <InvestForm record={recordInvest} onCancel={()=>{
            this.setState({
              visibleInvest: false,
              recordInvest: {}
            })}
          }
                     onSubmit={(values)=>{
                       request('/admin/account/acquirerAccount/merchantInvest', values).then(({data: { code }}) => {
                           if(code==='000000'){
                             message.success('设置成功');
                             this.setState({
                               visibleInvest: false,
                               recordInvest: {}
                             })
                             this.getList()
                           }
                         }
                       )}}/>
        </Modal>
        <Modal visible={visibleSetting}
               title={'商户配置'}
               onCancel={()=>{
                 this.setState({
                   visibleSetting: false,
                   recordSetting: {}
                 })}
               }
               footer={null}
               key={(new Date()).getTime()+1}
        >
          <SettingForm value={recordSetting} onCancel={()=>{
            this.setState({
              visibleSetting: false,
              recordSetting: {}
            })}
          }
                     onSubmit={(values)=>{
                       request('/admin/account/acquirerAccount/merchantInvest', values).then(({data: { code }}) => {
                           if(code==='000000'){
                             message.success('设置成功');
                             this.setState({
                               visibleSetting: false,
                               recordSetting: {}
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

export default MerchantAccount
