import React from 'react';
import { connect } from 'dva';
import { Link, routerRedux } from 'dva/router';
import { Card, Table, Input, Button, Modal, message } from 'antd'
import request from '../../utils/request'
import InvestForm from './InvestForm'
import styles from './index.less'

const ButtonGroup = Button.Group


@connect(({
            query: { merchant = {} },
          }) => ({
  query: merchant
}))
class Merchant extends React.Component {
  state = {
    visible: false
  }

  componentDidMount() {
    this.getList()
  }

  getList=(params={})=>{
    const { query } = this.props
    const { pageSize = 10, pageNum = 1} = this.state
    request('/admin/merchant/getList', {...query, pageSize, pageNum, ...params}).then(({data: {code, msg, data={}}}) => {
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
        merchant:{
          ...query,
          ...params,
        }
      }
    })
  }


  render() {

    const { query={}, dispatch } = this.props
    const { total = 0, pageSize = 10, pageNum = 1, list=[], visible } = this.state

    const columns=[{
      title: '商户号',
      dataIndex: 'merchantId',
      key: 'merchantId',
    },{
      title: '商户名称',
      dataIndex: 'merchantName',
      key: 'merchantName',
    },{
      title: '联系方式',
      dataIndex: 'contactTel',
      key: 'contactTel',
    },{
      title: '开户时间',
      dataIndex: 'openAccountTime',
      key: 'openAccountTime',
    },{
      title: '最后登录时间',
      dataIndex: 'lastLoginTime',
      key: 'lastLoginTime',
    },{
      title: '冻结金额',
      dataIndex: 'frozenAmount',
      key: 'frozenAmount',
    },{
      title: '可用余额',
      dataIndex: 'availableAmount',
      key: 'availableAmount',
    },{
      title: '操作',
      dataIndex: 'merchantId',
      key: 'handle',
      render: (merchantId, record)=>{
        return <ButtonGroup className={styles["small-button-group"]}>
          <Button type='primary' size='small' onClick={()=>{
            dispatch(routerRedux.push({pathname: '/merchant/setting', query: {merchantId, merchantName: record.merchantName, merchantAccount: record.merchantAccount}}))
          }}>
            商户配置
          </Button>
          <Button type='primary' size='small' onClick={()=>{
            Modal.confirm({
              title: '重置密码',
              content: <span>确定重置商户<span style={{color: 'red'}}>{record.merchantName}</span>的密码吗？</span>,
              okText: '确认',
              cancelText: '取消',
              onOk: ()=>{
                request('/admin/merchant/resetPassword', { merchantId }).then(({data: {code, data={}}})=>{
                  if(code==='000000'){
                    Modal.info({
                      title: '重置密码',
                      content: (
                        <div style={{padding: '20px 0 0', color: '14px'}}>
                          <p>新密码为：<span style={{color: 'red'}}>{data.newPassword}</span></p>
                        </div>
                      ),
                    });
                  }
                })
              }
            });
          }}>
            重置密码
          </Button>
        </ButtonGroup>
      }
    }]

    return (
      <div>
        <Card title={<span className='title_1'>商户管理</span>}
              extra={
                <div>
                  <Link to={'/merchant/add'}>
                    <Button type='primary' >商户开户</Button>
                  </Link>
                  <Button type='primary' style={{marginLeft: '10px'}} onClick={()=>{this.setState({visible: true})}}>商户注资</Button>
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
                <span>商户名：</span>
                <Input
                  value={query.merchantName}
                  style={{ width: 200 }}
                  onChange={e => {
                    this.onQueryChange({merchantName:e.target.value.trim()})
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
                 rowKey='merchantId'
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
               title={'商户注资'}
               onCancel={()=>{
                 this.setState({
                   visible: false,
                 })}
               }
               footer={null}
               key={(new Date()).getTime()}
        >
          <InvestForm  onCancel={()=>{
            this.setState({
              visible: false,
            })}
          }
                      onSubmit={(values)=>{
                        request('/admin/account/acquirerAccount/merchantInvest', values).then(({data: { code }}) => {
                            if(code==='000000'){
                              message.success('设置成功');
                              this.setState({
                                visible: false,
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

export default Merchant
