/**
 * Created by liuzhaozhao on 2017/12/29.
 */
import React from 'react';
import { connect } from 'dva';
import { Card, Table, Input, Button, DatePicker } from 'antd'
import request from '../../utils/request'
import styles from './index.less'
import moment from "moment/moment";

const RangePicker = DatePicker.RangePicker


@connect()
class OptionRecords extends React.Component {
  state = {
    query:{

    }
  }

  componentDidMount() {
    const {location: {query={}}} = this.props
    const { userName } = query
    this.setState({
      query: {
        userName
      }
    }, ()=>{
      this.getList()
    })
  }

  getList=(params={})=>{
    const { query } = this.state
    request('/admin/systemManage/userManage/optionRecords', {...query, pageSize: 10, pageNum: 1, ...params}).then(({data: {code, msg, data={}}}) => {
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
    const { query } = this.state
    this.setState({
      query: {
        ...query,
        ...params
      },
    })
  }


  render() {

    const { total = 0, pageSize = 10, pageNum = 1, list=[], query={} } = this.state

    const columns=[{
      title: '编号',
      dataIndex: 'userName',
      key: 'index',
      render: (text, record, index)=>{
        return (pageNum-1)*pageSize+index+1
      }
    },{
      title: '操作时间',
      dataIndex: 'optTime',
      key: 'optTime',
    },{
      title: '操作内容',
      dataIndex: 'optContent',
      key: 'optContent',
    }]

    return (
      <div className={styles["user-manage"]}>
        <Card title={<span className='title_1'>操作记录</span>}>
          <div style={{ overflow: 'hidden', marginBottom: '10px' }}>
            <ul className='query'>
              <li>
                <span>登录账号：</span>
                <Input
                  value={query.userName}
                  style={{ width: 200 }}
                  onChange={e => {
                    this.onQueryChange({userName:e.target.value.trim()})
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
                      startDate: value[0] ? value[0].format('YYYY-MM-DD') : undefined,
                      endDate: value[1] ? value[1].format('YYYY-MM-DD') : undefined,
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

export default OptionRecords
