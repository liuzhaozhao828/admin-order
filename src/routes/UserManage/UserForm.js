/**
 * Created by liuzhaozhao on 2017/12/29.
 */
import React from 'react';
import { Link, routerRedux } from 'dva/router'
import {Form, Input, Select, Button, Card} from 'antd'
import request from '../../utils/request'
import {connect} from "dva";

const FormItem = Form.Item
const Option = Select.Option
const TextArea = Input.TextArea

@connect()
class UserForm extends React.Component {


  onSubmit=(e)=>{
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        request('/admin/systemManage/userManage/addAndEdit', {...values}).then(({data: {code}})=>{
          if(code==='000000'){
            this.props.dispatch(
              routerRedux.push('/userManage')
            )
          }
        })
      }
    });
  }


  render(){
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
        md: { span: 4 },
        lg: { span: 4 },
        xl: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
        md: { span: 20 },
        lg: { span: 20 },
        xl: { span: 20 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
        md: {
          span: 20,
          offset: 4,
        },
        lg: {
          span: 20,
          offset: 4,
        },
        xl: {
          span: 20,
          offset: 4,
        },
      },
    };

    getFieldDecorator('userId')
    return(
      <Card title={<span className='title_1'>{getFieldValue('userId')?'修改资料':'新增用户'}</span>}>
        <Form onSubmit={this.onSubmit}>
          <FormItem key='nickName'
            {...formItemLayout}
            label="用户昵称"
          >
            {getFieldDecorator('nickName', {
              rules: [{
                required: true, message: '请填写用户昵称！',
              }],
            })(
              <Input style={{width:'300px'}}/>
            )}
          </FormItem>
          <FormItem key='userName'
            {...formItemLayout}
            label="登录账号"
          >
            {getFieldDecorator('userName', {
              rules: [{
                required: true, message: '请填写登录账号！',
              }],
            })(
              <Input style={{width:'300px'}}/>
            )}
          </FormItem>
          <FormItem key='role'
            {...formItemLayout}
            label="角色"
          >
            {getFieldDecorator('role', {
              rules: [{
                required: true, message: '请选择角色！',
              }],
            })(
              <Select style={{width:'300px'}}>
                <Option value="system">系统</Option>
                <Option value="customer">客服</Option>
                <Option value="business">运营</Option>
                <Option value="merchant">商户</Option>
              </Select>
            )}
          </FormItem>
          <FormItem key='auth'
                    {...formItemLayout}
                    label="权限"
          >
            {getFieldDecorator('auth', {

            })(
              <TextArea autosize={{ minRows: 4, maxRows: 10 }} style={{width: '300px'}}/>
            )}
          </FormItem>
          <FormItem  key='handle'   {...tailFormItemLayout} >
            <Button htmlType="submit" type="primary" size="large" >确认</Button>
            <Link to='/userManage'>
              <Button htmlType="button" type="dash" size="large"  style={{ marginLeft: 8 }}>返回</Button>
            </Link>
          </FormItem>
        </Form>
      </Card>
    );
  }
}

export default Form.create({
  mapPropsToFields:({location: {query: value={}}})=> {
    let r={};
    for(let key in value){
      r[key]=Form.createFormField({value:value[key]});
    }
    return r;

  }
})(UserForm)
