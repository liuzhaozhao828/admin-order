/**
 * Created by liuzhaozhao on 2017/12/29.
 */
import React from 'react';
import {Form, Input, Button, Checkbox} from 'antd'
import {connect} from "dva";

const FormItem = Form.Item
const TextArea = Input.TextArea

@connect()
class SettingForm extends React.Component {


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

    return(
      <div >
        <Form onSubmit={this.onSubmit}>
          <FormItem key='merchantId'
                    {...formItemLayout}
                    label="商户号"
          >
            {getFieldDecorator('merchantId', {
            })(
              <Input style={{width:'300px'}} disabled={true}/>
            )}
          </FormItem>
          <FormItem key='accountId'
                    {...formItemLayout}
                    label="商户账号"
          >
            {getFieldDecorator('accountId', {
            })(
              <Input style={{width:'300px'}} disabled={true}/>
            )}
          </FormItem>
          <FormItem key='investRate'
                    {...formItemLayout}
                    label="注资费率"
          >
            {getFieldDecorator('investRate', {
              rules: [{
                required: true, message: '请填写注资费率！',
              },{
                pattern: /^\d+\.*\d{0,2}$/, message: '请输入正确的费率！'
              },],
            })(
              <Input style={{width:'100px', marginRight: '5px'}}/>
            )}
            %
          </FormItem>
          <FormItem key='services'
                    {...formItemLayout}
                    label="注资费率"
          >
            {getFieldDecorator('services', {

            })(
              <Checkbox.Group style={{ width: '100%' }}>
                <Checkbox value="invest">注资</Checkbox>
                <Checkbox value="repay">代付</Checkbox>
              </Checkbox.Group>,
            )}
          </FormItem>
          <FormItem key='connectAccount'
                    {...formItemLayout}
                    label="注资关联账号"
          >
            {getFieldDecorator('connectAccount', {
              rules: [{
                required: true, message: '请填写注资关联账号！',
              }],
            })(
              <TextArea autosize={{ minRows: 2, maxRows: 6 }} />
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

export default Form.create({
  mapPropsToFields: ({ value = {} }) => {
    const r = {};
    for (const key in value) {
      if (Object.prototype.hasOwnProperty.call(value, key)) {
        r[key] = Form.createFormField({ value: value[key] });
      }
    }
    return r;
  } })(SettingForm)
