import React from 'react';
import { connect } from 'dva';
import { Link, routerRedux } from 'dva/router';
import { Card, Table, Select, message, Button, Modal, Row, Col } from 'antd'
import request from '../../utils/request'
import styles from './index.less'
import EditChannel from './EditChannel'

const { Option } = Select
const ButtonGroup = Button.Group


@connect(({
            query: { merchant = {} },
          }) => ({
  query: merchant
}))
class MerchantSetting extends React.Component {
  state = {
    visible: false,
    value: {},

    visibleBind: false,
    type: '',
    selectedRowKeys:[]
  }

  componentDidMount() {
    const {dispatch} =this.props
    const { query={} } = this.props.location
    const {merchantId, merchantName, merchantAccount} = query
    if(!merchantId){
      dispatch(routerRedux.push('/merchant'))
    }
    this.setState({
      merchantId,
      merchantName,
      merchantAccount,
    }, ()=>{
      this.getChannel('injection');
      this.getChannel('balance');
      this.getAllChannel();
    })
  }

  getChannel=(type)=>{
    if(!type){
      return
    }
    const {merchantId} = this.state
    request('/admin/merchant/channel/getList', {merchantId, type:type}).then(({data: {code, msg, data=[]}}) => {
      this.setState({
        [type]: data
      })
    })
  }

  getAllChannel=()=>{
    request('/admin/channel/getList', {type:['injection','balance']}).then(({data: {code, msg, data={}}}) => {
      const {balance=[], injection=[]} = data
      this.setState({
        balanceAll: balance,
        injectionAll: injection,
      })
    })
  }

  onEditSubmit=(value)=>{
    const {type} = value
    if(!type){
      return
    }
    request('/admin/merchant/channel/edit', {...value}).then(({data: {code, msg}}) => {
      if(code==='000000'){
        message.success('修改成功')
        this.setState({
          visible: false,
          value: {},
        })
      }
      this.getChannel(type)
    })
  }


  onBindSubmit=()=>{
    const {type, merchantId, merchantName, merchantAccount, selectedRows: channels=[]} = this.state
    if(!type){
      return
    }
    request('/admin/merchant/channel/bind', {type, merchantId, merchantName, merchantAccount,channels}).then(({data: {code, msg}}) => {
      if(code==='000000'){
        message.success('绑定成功')
        this.setState({
          visibleBind: false,
          type: "",
          selectedRowKeys:[],
          selectedRows:[],
        })
      }
      this.getChannel(type)
      this.getAllChannel()
    })
  }

  onSelectChange=(selectedRowKeys, selectedRows)=>{
    this.setState({
      selectedRowKeys,
      selectedRows
    })
  }




  render() {

    const {
      merchantId='', merchantName = '', merchantAccount = '', injection=[], injectionAll=[], balance=[],balanceAll=[],
      visible = false, value={}, visibleBind = false, type, selectedRowKeys=[], selectedRows
    } = this.state

    let allChannelList = []
    if(type==='injection'){
      allChannelList=[...injectionAll]
    }else if(type==='balance'){
      allChannelList=[...balanceAll]
    }

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };

    const bindColumns=[{
      title: '渠道名称',
      dataIndex: 'channelName',
      key: 'channelName',
      width: '30%'
    },{
      title: '渠道类型',
      dataIndex: 'channelType',
      key: 'channelType',
      width: '20%'
    },{
      title: '费率',
      dataIndex: 'charge',
      key: 'charge',
      width: '20%'
    },{
      title: '已绑商户数',
      dataIndex: 'bindMerchantNum',
      key: 'bindMerchantNum',
      width: '20%'
    },]


    const columnsInjection=[{
      title: '渠道名',
      dataIndex: 'channelName',
      key: 'channelName',
      width: '12%'
    },{
      title: '渠道类型',
      dataIndex: 'channelType',
      key: 'channelType',
      width: '12%'
    },{
      title: '渠道代码',
      dataIndex: 'channelCode',
      key: 'channelCode',
      width: '12%'
    },{
      title: '手续费',
      dataIndex: 'charge',
      key: 'charge',
      width: '12%'
    },{
      title: '支付金额上限',
      dataIndex: 'amountUpper',
      key: 'amountUpper',
      width: '12%'
    },{
      title: '支付金额下限',
      dataIndex: 'amountFloor',
      key: 'amountFloor',
      width: '12%'
    },{
      title: '使用状态',
      dataIndex: 'status',
      key: 'status',
      width: '12%'
    },{
      title: '操作',
      dataIndex: 'channelName',
      key: 'handle',
      render: (channelName, record)=>{
        return <ButtonGroup className={styles["small-button-group"]}>
          <Button type='primary' size='small' onClick={()=>{
            this.setState({
              visible: true,
              value: { ...record, type: 'injection' }
            })
          }}>
            修改配置
          </Button>
          {
            record.status==='使用中'&&
            <Button type='primary' size='small' onClick={()=>{
              Modal.confirm({
                title: '停用渠道',
                content: <div>
                  <p>确定停用渠道<span style={{color: 'red'}}>{channelName}</span>吗？</p>
                </div>,
                okText: '确认',
                cancelText: '取消',
                onOk: ()=>{
                  request('/admin/merchant/channel/stop', {channelName, id: record.id, type: 'injection'}).then(({data: {code}})=>{
                    if(code==='000000'){
                      message.success('渠道停用成功')
                      this.getChannel('injection')
                    }
                  })
                }
              });
            }}>
              停用渠道
            </Button>
          }
        </ButtonGroup>
      }
    }]


    const columnsBalance=[{
      title: '渠道名',
      dataIndex: 'channelName',
      key: 'channelName',
      width: '12%'
    },{
      title: '渠道类型',
      dataIndex: 'channelType',
      key: 'channelType',
      width: '12%'
    },{
      title: '渠道代码',
      dataIndex: 'channelCode',
      key: 'channelCode',
      width: '12%'
    },{
      title: '手续费',
      dataIndex: 'charge',
      key: 'charge',
      width: '12%'
    },{
      title: '结算金额上限',
      dataIndex: 'amountUpper',
      key: 'amountUpper',
      width: '12%'
    },{
      title: '结算金额下限',
      dataIndex: 'amountFloor',
      key: 'amountFloor',
      width: '12%'
    },{
      title: '使用状态',
      dataIndex: 'status',
      key: 'status',
      width: '12%'
    },{
      title: '操作',
      dataIndex: 'channelName',
      key: 'handle',
      render: (channelName, record)=>{
        return <ButtonGroup className={styles["small-button-group"]}>
          <Button type='primary' size='small' onClick={()=>{
            this.setState({
              visible: true,
              value: { ...record, type: 'balance' }
            })
          }}>
            修改配置
          </Button>
          {
            record.status==='使用中'&&
            <Button type='primary' size='small' onClick={()=>{
              Modal.confirm({
                title: '停用渠道',
                content: <div>
                  <p>确定停用渠道<span style={{color: 'red'}}>{channelName}</span>吗？</p>
                </div>,
                okText: '确认',
                cancelText: '取消',
                onOk: ()=>{
                  request('/admin/merchant/channel/stop', {channelName, id: record.id, type: 'balance'}).then(({data: {code}})=>{
                    if(code==='000000'){
                      message.success('渠道停用成功')
                      this.getChannel('balance')
                    }
                  })
                }
              });
            }}>
              停用渠道
            </Button>
          }
        </ButtonGroup>
      }
    }]

    return (
      <div>
        <Card title={<span className='title_1'>商户配置</span>} >
          <Row style={{ margin: '0 20px 20px', fontSize: '14px', fontWeight: 'bold' }}>
            <Col span={8}>商户号：{merchantId}</Col>
            <Col span={8}>商户名称：{merchantName}</Col>
            <Col span={8}>商户号：{merchantAccount}</Col>
          </Row>

          <div>
            <div className={styles["setting-table-title"]}>
              <p>注资渠道</p>
              <Button type={'primary'}
                      size={'small'}
                      onClick={()=>{
                        const selectedRowKeys=[]
                        const selectedRows =[]
                        injectionAll.forEach((item, index)=>{
                          const {merchant=[]} = item
                          const r = merchant.filter(({merchantId: id})=>id===merchantId)
                          if(r.length>0){
                            selectedRowKeys.push(index)
                            selectedRows.push(item)
                          }
                        })
                        this.setState({
                          visibleBind: true,
                          type: 'injection',
                          selectedRowKeys,
                          selectedRows
                        })
                      }}>绑定注资渠道</Button>
            </div>
            <Table dataSource={injection}
                   columns={columnsInjection}
                   pagination={false}
                   scroll={{ y: 240 }}/>
          </div>

          <div style={{marginTop: '30px'}}>
            <div className={styles["setting-table-title"]}>
              <p>结算渠道</p>
              <Button type={'primary'}
                      size={'small'}
                      onClick={()=>{
                        const selectedRowKeys=[]
                        const selectedRows =[]
                        balanceAll.forEach((item, index)=>{
                          const {merchant=[]} = item
                          const r = merchant.filter(({merchantId: id})=>id===merchantId)
                          if(r.length>0){
                            selectedRowKeys.push(index)
                            selectedRows.push(item)
                          }
                        })
                        this.setState({
                          visibleBind: true,
                          type: 'balance',
                          selectedRowKeys,
                          selectedRows
                        })
                      }}>绑定注资渠道</Button>
            </div>
            <Table dataSource={balance}
                   columns={columnsBalance}
                   pagination={false}
                   scroll={{ y: 240 }}/>
          </div>

        </Card>


        <Modal visible={visible}
               title={"修改配置"}
               footer={null}
               onCancel={()=>{this.setState({
                 visible: false,
                 value: {}
               })}}>
          <EditChannel onSubmit={(value)=>{this.onEditSubmit(value)}}
                       value={value}
                       onCancel={()=>{this.setState({
                         visible: false,
                         value: {}
                       })}}/>
        </Modal>


        <Modal visible={visibleBind}
               title={"绑定渠道"}
               className={styles.merchant}
               onOk={()=>{this.onBindSubmit()}}
               onCancel={()=>{
                 this.setState({
                   visibleBind: false,
                   type: "",
                   selectedRowKeys:[],
                   selectedRows:[],
               })}}>
          <div className={styles["merchant-bind-detail"]}>
            <p>商户号：{merchantId}</p>
            <p>商户名称：{merchantName}</p>
            <p>商户账号：{merchantName}</p>
            <Table rowSelection={rowSelection} dataSource={allChannelList} columns={bindColumns} pagination={false} scroll={{y: 300}}/>
          </div>
        </Modal>
      </div>
    );
  }
}

export default MerchantSetting
