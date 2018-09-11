/**
 * Created by liuzhaozhao on 2017/12/29.
 */
import React from 'react';
import {Form, Input, Select, Button} from 'antd'
import {connect} from "dva";

const FormItem = Form.Item
const Option = Select.Option

@connect()
class SettleForm extends React.Component {


  onSubmit=(e)=>{
    e.preventDefault();
    const { onSubmit } = this.props
    this.props.form.validateFields((err, values) => {
      if (!err) {
        onSubmit({...values})
      }
    });
  }

  checkPayAmount = (rule, value, callback) => {
    const {availableAmount='0.00'} = this.props
    if (Number(value)>Number(availableAmount)) {
      callback('拨款金额不能大于可用余额！');
    } else {
      callback();
    }
  }


  render(){
    const {availableAmount='0.00', onCancel} = this.props
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
      <div >
        <Form onSubmit={this.onSubmit}>
          <FormItem key='merchantId'
                    {...formItemLayout}
                    label="商户号"
          >
            {getFieldDecorator('merchantId', {
              rules: [{
                required: true, message: '请填写商户号！',
              }],
            })(
              <Input style={{width:'300px'}}/>
            )}
          </FormItem>
          <FormItem key='availableAmount'
                    {...formItemLayout}
                    label="可用余额"
          >
            {getFieldDecorator('availableAmount', {
              initialValue: availableAmount,
            })(
              <Input style={{width:'300px'}} disabled={true}/>
            )}
          </FormItem>
          <FormItem key='payAmount'
                    {...formItemLayout}
                    label="打款金额"
          >
            {getFieldDecorator('payAmount', {
              rules: [{
                required: true, message: '请填写打款金额！',
              },{
                validator: this.checkPayAmount
              },{
                pattern: /^\d+\.*\d{0,2}$/, message: '请输入正确的金额！'
              },],
            })(
              <Input style={{width:'300px'}}/>
            )}
          </FormItem>
          <FormItem key='receiveAccountId'
                    {...formItemLayout}
                    label="收款账户"
          >
            {getFieldDecorator('receiveAccountId', {
              rules: [{
                required: true, message: '请填写收款账户！',
              }],
            })(
              <Input style={{width:'300px'}}/>
            )}
          </FormItem>
          <FormItem key='payChannel'
                    {...formItemLayout}
                    label="出款渠道"
          >
            {getFieldDecorator('payChannel', {
              rules: [{
                required: true, message: '请选择出款渠道！',
              }],
            })(
              <Select style={{width:'300px'}}>
                <Option value="0">不限</Option>
              </Select>
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

export default Form.create()(SettleForm)
