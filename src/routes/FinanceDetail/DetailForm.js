/**
 * Created by liuzhaozhao on 2017/12/29.
 */
import React from 'react';
import {connect} from "dva";
import {Form, Input, Select, Button, DatePicker} from 'antd'

const FormItem = Form.Item
const Option = Select.Option

@connect()
class DetailForm extends React.Component {


  onSubmit=(e)=>{
    e.preventDefault();
    const { onSubmit } = this.props
    this.props.form.validateFields((err, values) => {
      if (!err) {
        onSubmit({...values})
      }
    });
  }

  render(){
    const { onCancel} = this.props
    const { getFieldDecorator } = this.props.form;
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


    return(
      <div style={{marginLeft: '20px'}}>
        <Form onSubmit={this.onSubmit}>
          <FormItem key='orderId'
                    {...formItemLayout}
                    label="订单号"
          >
            {getFieldDecorator('orderId', {
              rules: [{
                required: true, message: '请填写订单号！',
              }],
            })(
              <Input style={{width:'300px'}}/>
            )}
          </FormItem>
          <FormItem key='accountId'
                    {...formItemLayout}
                    label="账户号"
          >
            {getFieldDecorator('accountId', {
              rules: [{
                required: true, message: '请填写账户号！',
              }],
            })(
              <Input style={{width:'300px'}}/>
            )}
          </FormItem>
          <FormItem key='tradeTime'
                    {...formItemLayout}
                    label="交易时间"
          >
            {getFieldDecorator('tradeTime', {
              rules: [{
                required: true, message: '请选择交易时间！',
              }],
            })(
              <DatePicker style={{width:'300px'}} />
            )}
          </FormItem>
          <FormItem key='payTypeId'
                    {...formItemLayout}
                    label="支付类型"
          >
            {getFieldDecorator('payTypeId', {
              rules: [{
                required: true, message: '请选择支付类型！',
              }],
            })(
              <Select style={{width:'300px'}}>
                <Option value="in">收入</Option>
                <Option value="out">支出</Option>
                <Option value="fre">冻结解冻</Option>
              </Select>
            )}
          </FormItem>
          <FormItem key='tradeTypeId'
                    {...formItemLayout}
                    label="支付类型"
          >
            {getFieldDecorator('tradeTypeId', {
              rules: [{
                required: true, message: '请选择交易类型！',
              }],
            })(
              <Select style={{width:'300px'}}>
                <Option value="1">收单入账</Option>
                <Option value="2">结算出款</Option>
                <Option value="3">调账转入</Option>
                <Option value="4">调账转出</Option>
                <Option value="5">余额冻结</Option>
                <Option value="6">余额解冻</Option>
              </Select>
            )}
          </FormItem>
          <FormItem key='tradeAmount'
                    {...formItemLayout}
                    label="交易金额"
          >
            {getFieldDecorator('tradeAmount', {
              rules: [{
                required: true, message: '请填写交易金额！',
              },{
                pattern: /^\d+\.*\d{0,2}$/, message: '请输入正确的金额！'
              },],
            })(
              <Input style={{width:'300px'}}/>
            )}
          </FormItem>
          <FormItem key='remark'
                    {...formItemLayout}
                    label="备注"
          >
            {getFieldDecorator('remark', {

            })(
              <Input style={{width:'300px'}}/>
            )}
          </FormItem>

          <FormItem  key='handle'   {...tailFormItemLayout} >
            <Button htmlType="submit" type="primary" size="large" >确认</Button>
            <Button htmlType="button" type="dash" size="large"  style={{ marginLeft: 8 }} onClick={onCancel}>取消</Button>
          </FormItem>
        </Form>
      </div>

    );
  }
}

export default Form.create()(DetailForm)
