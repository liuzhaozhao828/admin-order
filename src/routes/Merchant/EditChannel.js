import React from 'react';
import {Form, Input, Select, Button} from 'antd'
import {connect} from "dva";

const FormItem = Form.Item
const Option = Select.Option

@connect()
class EditChannel extends React.Component {


  onSubmit=(e)=>{
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { onSubmit } = this.props
        onSubmit(values)
      }
    });
  }


  render(){
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const { onCancel } = this.props
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

    getFieldDecorator('id')
    getFieldDecorator('type')
    return(
        <Form onSubmit={this.onSubmit}>
          <FormItem key='channelName'
            {...formItemLayout}
            label="渠道名称"
          >
            {getFieldDecorator('channelName', {
              rules: [{
                required: true, message: '请填写渠道名称！',
              }],
            })(
              <Input style={{width:'300px'}}/>
            )}
          </FormItem>
          <FormItem key='chargeType'
                    {...formItemLayout}
                    label="手续费类型"
          >
            {getFieldDecorator('chargeType', {
              rules: [{
                required: true, message: '请选择手续费类型！',
              }],
            })(
              <Select style={{width:'300px'}}>
                <Option value="1">逐笔固定收取</Option>
                <Option value="2">交易额费率</Option>
              </Select>
            )}
          </FormItem>
          {
            getFieldValue('chargeType')==="1"&&
            <FormItem key='charge'
                      {...formItemLayout}
                      label="手续费"
            >
              {getFieldDecorator('charge', {
                rules: [{
                  required: true, message: '请填写手续费！',
                },{
                  pattern: /^\d+\.*\d{0,2}$/, message: '请输入正确的手续费！'
                }],
              })(
                <Input style={{width:'300px'}}/>
              )}
            </FormItem>
          }
          {
            getFieldValue('chargeType')==="2"&&
            <div>
              <FormItem key='charge'
                        {...formItemLayout}
                        label="费率"
              >
                {getFieldDecorator('charge', {
                  rules: [{
                    required: true, message: '请填写费率！',
                  },{
                    pattern: /^\d+\.*\d{0,2}$/, message: '请输入正确的费率！'
                  }],
                })(
                  <Input style={{width:'280px'}}/>
                )}
                <span style={{marginLeft: '5px'}}>%</span>
              </FormItem>
              <FormItem key='amountFloor'
                        {...formItemLayout}
                        label="最小"
              >
                {getFieldDecorator('amountFloor', {
                  rules: [{
                    pattern: /^\d+\.*\d{0,2}$/, message: '请输入正确的金额！'
                  }],
                })(
                  <Input style={{width:'280px'}}/>
                )}
                <span style={{marginLeft: '5px'}}>元/笔</span>
              </FormItem>
              <FormItem key='amountUpper'
                        {...formItemLayout}
                        label="最大"
              >
                {getFieldDecorator('amountUpper', {
                  rules: [{
                    pattern: /^\d+\.*\d{0,2}$/, message: '请输入正确的金额！'
                  }],
                })(
                  <Input style={{width:'280px'}}/>
                )}
                <span style={{marginLeft: '5px'}}>元/笔</span>
              </FormItem>
            </div>
          }


          <FormItem  key='handle'   {...tailFormItemLayout} >
            <Button htmlType="submit" type="primary" size="large" >确认</Button>
            <Button htmlType="button" type="dash" size="large"  style={{ marginLeft: 8 }} onClick={onCancel}>返回</Button>
          </FormItem>
        </Form>
    );
  }
}

export default Form.create({
  mapPropsToFields:({value={}})=> {
    let r={};
    for(let key in value){
      r[key]=Form.createFormField({value:value[key]});
    }
    return r;

  }
})(EditChannel)
