/**
 * Created by liuzhaozhao on 2017/12/29.
 */
import React from 'react';
import {Form, Input, Button, Upload, Icon, message} from 'antd'
import {connect} from "dva";

const FormItem = Form.Item

@connect()
class InvestForm extends React.Component {


  onSubmit=(e)=>{
    e.preventDefault();
    const { onSubmit } = this.props
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const {files={}} = values
        onSubmit({...values, files:files.fileList})
      }
    });
  }



  render(){
    const {record={}, onCancel} = this.props
    const { getFieldDecorator } = this.props.form;
    const { accountId, merchantId } = record
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
              initialValue: merchantId,
            })(
              <Input style={{width:'300px'}} disabled={true}/>
            )}
          </FormItem>
          <FormItem key='accountId'
                    {...formItemLayout}
                    label="商户账号"
          >
            {getFieldDecorator('accountId', {
              initialValue: accountId,
            })(
              <Input style={{width:'300px'}} disabled={true}/>
            )}
          </FormItem>
          <FormItem key='amount'
                    {...formItemLayout}
                    label="注资金额"
          >
            {getFieldDecorator('amount', {
              rules: [{
                required: true, message: '请填写注资金额！',
              },{
                pattern: /^\d+\.*\d{0,2}$/, message: '请输入正确的金额！'
              },],
            })(
              <Input style={{width:'300px'}}/>
            )}
          </FormItem>
          <FormItem key='files'
                    {...formItemLayout}
                    label="凭证"
          >
            {getFieldDecorator('files', {

            })(
              <Upload name='file'
                      action='address'
                      headers={{
                        authorization: 'authorization-text',
                      }}
                      onChange={(info)=>{
                        if (info.file.status === 'done') {
                          message.success(`${info.file.name} 上传成功`);
                        } else if (info.file.status === 'error') {
                          message.error(`${info.file.name} 上传失败.`);
                        }
                        }
                      }>
                <Button>
                  <Icon type="upload" />
                </Button>
              </Upload>,
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

export default Form.create()(InvestForm)
