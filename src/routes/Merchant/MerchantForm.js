import React from 'react';
import { Link, routerRedux } from 'dva/router'
import {Form, Input, Button, Card} from 'antd'
import request from '../../utils/request'
import {connect} from "dva";

const FormItem = Form.Item
const TextArea = Input.TextArea

@connect()
class MerchantForm extends React.Component {


  onSubmit=(e)=>{
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        request('/admin/merchant/add', {...values}).then(({data: {code}})=>{
          if(code==='000000'){
            this.props.dispatch(
              routerRedux.push('/merchant')
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
          <FormItem key='merchantName'
            {...formItemLayout}
            label="商户名称"
          >
            {getFieldDecorator('merchantName', {
              rules: [{
                required: true, message: '请填写商户名称！',
              }],
            })(
              <Input style={{width:'300px'}}/>
            )}
          </FormItem>
          <FormItem key='contactName'
            {...formItemLayout}
            label="联系人姓名"
          >
            {getFieldDecorator('contactName', {
              rules: [{
                required: true, message: '请填写联系人姓名！',
              }],
            })(
              <Input style={{width:'300px'}}/>
            )}
          </FormItem>
          <FormItem key='phone'
            {...formItemLayout}
            label="联系电话"
          >
            {getFieldDecorator('phone', {
              rules: [{
                required: true, message: '请填写联系电话！',
              },{
                pattern: /^\d{11}$/, message: '请输入正确的电话号码！'
              }],
            })(
              <Input style={{width:'300px'}}/>
            )}
          </FormItem>
          <FormItem key='qq'
            {...formItemLayout}
            label="QQ"
          >
            {getFieldDecorator('qq', {

            })(
              <Input style={{width:'300px'}}/>
            )}
          </FormItem>
          <FormItem key='address'
                    {...formItemLayout}
                    label="联系地址"
          >
            {getFieldDecorator('address', {

            })(
              <TextArea autosize={{ minRows: 4, maxRows: 10 }} style={{width: '300px'}}/>
            )}
          </FormItem>
          <FormItem  key='handle'   {...tailFormItemLayout} >
            <Button htmlType="submit" type="primary" size="large" >确认</Button>
            <Link to='/merchant'>
              <Button htmlType="button" type="dash" size="large"  style={{ marginLeft: 8 }}>返回</Button>
            </Link>
          </FormItem>
        </Form>
      </Card>
    );
  }
}

export default Form.create()(MerchantForm)
