import React from 'react';
import { Card, Table, Button, Modal, message } from 'antd'
import request from '../../utils/request'
import styles from './index.less'

const ButtonGroup = Button.Group


class BalanceChannel extends React.Component {
  state = {
    visible: false,
    record: {}
  }

  componentDidMount() {
    this.getList()
  }

  getList=()=>{
    request('/admin/channel/getList', {type:['balance']}).then(({data: {code, msg, data={}}}) => {
      const {balance=[]} = data
      this.setState({
        list: balance
      })
    })
  }


  render() {

    const { list=[], visible=false, record={} } = this.state
    const { merchant=[] } = record
    const columns=[{
      title: '渠道名',
      dataIndex: 'channelName',
      key: 'channelName',
    },{
      title: '渠道类型',
      dataIndex: 'channelType',
      key: 'channelType',
    },{
      title: '渠道代码',
      dataIndex: 'channelCode',
      key: 'channelCode',
    },{
      title: '启用日期',
      dataIndex: 'startTime',
      key: 'startTime',
    },{
      title: '结算金额',
      dataIndex: 'amount',
      key: 'amount',
    },{
      title: '今日结算金额',
      dataIndex: 'amountToday',
      key: 'amountToday',
    },{
      title: '订单数量',
      dataIndex: 'orderNum',
      key: 'orderNum',
    },{
      title: '今日订单数',
      dataIndex: 'orderNumToday',
      key: 'orderNumToday',
    },{
      title: '手续费',
      dataIndex: 'charge',
      key: 'charge',
    },{
      title: '单笔结算下限',
      dataIndex: 'singleFloor',
      key: 'singleFloor',
    },{
      title: '单笔结算上限',
      dataIndex: 'singleUpper',
      key: 'singleUpper',
    },{
      title: '每日结算下限',
      dataIndex: 'dayFloor',
      key: 'dayFloor',
    },{
      title: '每日结算上限',
      dataIndex: 'dayUpper',
      key: 'dayUpper',
    },{
      title: '使用状态',
      dataIndex: 'status',
      key: 'status',
    },{
      title: '操作',
      dataIndex: 'status',
      key: 'handle',
      width: 150,
      render: (status, record)=>{
        return <ButtonGroup className={styles["small-button-group"]}>
          <Button size={'small'}
                  type={'primary'}
                  onClick={()=>{
                    this.setState({
                      visible: true,
                      record
                    })
                  }}>
            商户列表
          </Button>
          {
            status==='使用中'&&
            <Button type='primary' size='small' onClick={()=>{
              Modal.confirm({
                title: '停用渠道',
                content: <span>确定停用渠道<span style={{color: 'red'}}>{record.channelName}</span>吗？</span>,
                okText: '确认',
                cancelText: '取消',
                onOk: ()=>{
                  request('/admin/channel/action', { type: 'balance', action: 'stop', channelName: record.channelName, channelCode:record.channelCode }).then(({data: {code}})=>{
                    if(code==='000000'){
                      message.success('停用成功')
                    }
                    this.getList()
                  })
                }
              });
            }}>
             停用
            </Button>
          }
          {
            status==='已停用'&&
            <Button type='primary' size='small' onClick={()=>{
              Modal.confirm({
                title: '启用渠道',
                content: <span>确定启用渠道<span style={{color: 'red'}}>{record.channelName}</span>吗？</span>,
                okText: '确认',
                cancelText: '取消',
                onOk: ()=>{
                  request('/admin/channel/action', { type: 'balance', action: 'use', channelName: record.channelName, channelCode:record.channelCode }).then(({data: {code}})=>{
                    if(code==='000000'){
                      message.success('启用成功')
                    }
                    this.getList()
                  })
                }
              });
            }}>
              启用
            </Button>
          }
        </ButtonGroup>
      }
    }]


    const columnsMerchant=[{
      title: '商户号',
      dataIndex: 'merchantId',
      key: 'merchantId',
      width: '50%'
    },{
      title: '商户名称',
      dataIndex: 'merchantName',
      key: 'merchantName',
      width: '50%'
    },]

    return (
      <div className={styles.balance}>
        <Card title={<span className='title_1'>注资渠道</span>}>

          <Table dataSource={list}
                 columns={columns}
                />
        </Card>

        <Modal title={'商户列表'}
               className={styles.balance}
               visible={visible}
               footer={null}
               onCancel={()=>{
                 this.setState({
                   visible: false,
                   record: {}
                 })
               }}>
          <div className={styles["channel-detail"]}>
            <p>渠道名称：{record.channelName}</p>
            <p>渠道编号：{record.channelCode}</p>
            <p>渠道类型：{record.channelType}</p>
            <Table dataSource={merchant} columns={columnsMerchant} pagination={false} scroll={{y: 150}}/>
          </div>
        </Modal>

      </div>
    );
  }
}

export default BalanceChannel
