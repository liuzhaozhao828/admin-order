/**
 * Created by liuzhaozhao on 2017/12/29.
 */
import React from 'react';
import {Form, Input, Button} from 'antd'
import {connect} from "dva";

const FormItem = Form.Item

@connect()
class LimitForm extends React.Component {


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
    const {record={}, onCancel} = this.props
    const { getFieldDecorator } = this.props.form;
    const { accountId, cardId } = record
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
        md: { span: 6 },
        lg: { span: 6 },
        xl: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
        md: { span: 18 },
        lg: { span: 18 },
        xl: { span: 18 },
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
          span: 18,
          offset: 6,
        },
        lg: {
          span: 18,
          offset: 6,
        },
        xl: {
          span: 18,
          offset: 6,
        },
      },
    };

    getFieldDecorator('accountId', {
      initialValue: accountId,
    })

    return(
      <div >
        <Form onSubmit={this.onSubmit}>
          <FormItem key='cardId'
                    {...formItemLayout}
                    label="卡号"
          >
            {getFieldDecorator('cardId', {
              initialValue: cardId,
            })(
              <Input style={{width:'300px'}} disabled={true}/>
            )}
          </FormItem>
          <FormItem key='amountLimit'
                    {...formItemLayout}
                    label="金额限制"
          >
            {getFieldDecorator('amountLimit', {
              rules: [{
                required: true, message: '请填写金额限制！',
              },{
                pattern: /^\d+\.*\d{0,2}$/, message: '请输入正确的金额！'
              },],
            })(
              <Input style={{width:'300px'}}/>
            )}
          </FormItem>
          <FormItem key='singleDayLimit'
                    {...formItemLayout}
                    label="单日笔数限制"
          >
            {getFieldDecorator('singleDayLimit', {
              rules: [{
                required: true, message: '请填写单日笔数限制！',
              },{
                pattern: /^\d+$/, message: '请输入数字！'
              },],
            })(
              <Input style={{width:'300px'}}/>
            )}
          </FormItem>
          <FormItem key='singleMonthLimit'
                    {...formItemLayout}
                    label="每月笔数限制"
          >
            {getFieldDecorator('singleMonthLimit', {
              rules: [{
                required: true, message: '请填写每月笔数限制！',
              },{
                pattern: /^\d+$/, message: '请输入数字！'
              },],
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

export default Form.create()(LimitForm)
