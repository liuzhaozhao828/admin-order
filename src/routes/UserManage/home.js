/**
 * Created by liuzhaozhao on 2017/12/29.
 */
import React from 'react';
import { connect } from 'dva';
import { Link, routerRedux } from 'dva/router';
import { Card, Table, Select, Input, Button, Modal, message } from 'antd'
import request from '../../utils/request'
import styles from './index.less'

const { Option } = Select
const ButtonGroup = Button.Group


@connect(({
            query: { userManage = {} },
          }) => ({
  query: userManage
}))
class UserManageHome extends React.Component {
  state = {

  }

  componentDidMount() {
    this.getList()
  }

  getList=(params={})=>{
    const { query } = this.props
    const { pageSize = 10, pageNum = 1} = this.state
    request('/admin/systemManage/userManage/getList', {...query, pageSize, pageNum, ...params}).then(({data: {code, msg, data={}}}) => {
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
        userManage:{
          ...query,
          ...params,
        }
      }
    })
  }


  render() {

    const { query={}, dispatch } = this.props
    const { total = 0, pageSize = 10, pageNum = 1, list=[] } = this.state

    const columns=[{
      title: '编号',
      dataIndex: 'userId',
      key: 'userId',
      render: (text, record, index)=>{
        return (pageNum-1)*pageSize+index+1
      }
    },{
      title: '账号',
      dataIndex: 'userName',
      key: 'userName',
    },{
      title: '注册时间',
      dataIndex: 'signInTime',
      key: 'signInTime',
    },{
      title: '最后登录时间',
      dataIndex: 'recentLoginTime',
      key: 'recentLoginTime',
    },{
      title: '状态',
      dataIndex: 'status',
      key: 'status',
    },{
      title: '操作',
      dataIndex: 'userName',
      key: 'handle',
      render: (text, record)=>{
        return <ButtonGroup className={styles["small-button-group"]}>
          <Button type='primary' size='small' onClick={()=>{
            dispatch(routerRedux.push({pathname: '/userManage/edit', query: record}))
          }}>
            修改资料
          </Button>
          <Button type='primary' size='small' onClick={()=>{
            dispatch(routerRedux.push({pathname: '/userManage/optionRecords', query: record}))
          }}>
            操作记录
          </Button>
          <Button type='primary' size='small' onClick={()=>{
            Modal.confirm({
              title: '重置密码',
              content: <span>确定重置登录账户<span style={{color: 'red'}}>{text}</span>的密码吗？</span>,
              okText: '确认',
              cancelText: '取消',
              onOk: ()=>{
                request('/admin/systemManage/userManage/resetPassword', {userName: text, userId: record.userId}).then(({data: {code}})=>{
                  if(code==='000000'){
                    message.success('重置成功')
                    this.getList()
                  }
                })
              }
            });
          }}>
            重置密码
          </Button>
          <Button type='primary' size='small' onClick={()=>{
            Modal.confirm({
              title: '冻结账号',
              content: <div>
                <p>确定冻结登录账户<span style={{color: 'red'}}>{text}</span>吗？</p>
                <p  style={{color: 'red'}}>注意：账号冻结后会立即终止该账号所有权限</p>
              </div>,
              okText: '确认',
              cancelText: '取消',
              onOk: ()=>{
                request('/admin/systemManage/userManage/freezeUser', {userName: text, userId: record.userId}).then(({data: {code}})=>{
                  if(code==='000000'){
                    message.success('账户已冻结')
                    this.getList()
                  }
                })
              }
            });
          }}>
            冻结账号
          </Button>
        </ButtonGroup>
      }
    }]

    return (
      <div className={styles["user-manage"]}>
        <Card title={<span className='title_1'>用户管理</span>}
              extra={
                <Link to={'/userManage/edit'}>
                  <Button type='primary' >新增用户</Button>
                </Link>
              }>
          <div style={{ overflow: 'hidden', marginBottom: '10px' }}>
            <ul className='query'>
              <li>
                <span>账号：</span>
                <Input
                  value={query.userName}
                  style={{ width: 200 }}
                  onChange={e => {
                    this.onQueryChange({userName:e.target.value.trim()})
                  }}
                />
              </li>
              <li>
                <span>权限级别：</span>
                <Select value={query.role}
                        style={{width:'200px'}}
                        onChange={(value) => {
                          this.onQueryChange({role:value})
                        }}>
                  <Option value="system">系统</Option>
                  <Option value="customer">客服</Option>
                  <Option value="business">运营</Option>
                  <Option value="merchant">商户</Option>
                </Select>
              </li>
              <li>
                <span />
                <Button type='primary' onClick={()=>this.getList()}>查询</Button>
              </li>

            </ul>
          </div>
          <Table dataSource={list}
                 rowKey='userId'
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

export default UserManageHome
