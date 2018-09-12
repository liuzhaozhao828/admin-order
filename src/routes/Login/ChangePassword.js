import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Icon, Input, Button, message } from 'antd';
import styles from './index.less';
import request from '../../utils/request'


class ChangePassword extends React.Component {

  state={
    error: false
  }

  componentDidMount(){
    const {login, dispatch, userName} = this.props
    this.setState({
      userName
    })

  }

  onSubmit=()=>{
    const { dispatch } = this.props
    const {userName, oldPassword, newPassword, confirmPassword} = this.state

    request('/admin/common/changePassword', {userName, oldPassword, newPassword, confirmPassword}).then(({data: {code, msg, data={}}}) => {
      if(code==='000000'){
        message.success('修改成功')
        dispatch(routerRedux.goBack())
      }
    })
  }


  onChange=(key, value)=>{
    this.setState({
      [key]: value
    }, ()=>{
      if(key==='newPassword'||key==='confirmPassword'){
        const { newPassword, confirmPassword} = this.state
        if(newPassword!==confirmPassword){
          this.setState({
            error: true
          })
        }else {
          this.setState({
            error: false
          })
        }
      }
    })
  }


  render() {
    const {login, dispatch} = this.props
    const {userName, oldPassword, newPassword, confirmPassword, error} = this.state

    return (
        <div className={styles.login}>
          <div className={`${styles.content} ${styles["change-pass-content"]}`}>
            <p className={styles["sys-name"]}>修改密码</p>

            <Input value={userName}
                   className={styles["login-input"]}
                   placeholder='用户名'
                   disabled={true}
            />
            <Input type='password'
                   value={oldPassword}
                   onChange={(e)=>{
                     this.onChange('oldPassword', e.target.value.trim())
                   }}
                   className={styles["login-input"]}
                   placeholder='旧密码'
            />
            <Input type='password'
                   value={newPassword}
                   onChange={(e)=>{
                     this.onChange('newPassword', e.target.value.trim())
                   }}
                   className={styles["login-input"]}
                   placeholder='新密码'
            />
            <Input type='password'
                   value={confirmPassword}
                   onChange={(e)=>{
                     this.onChange('confirmPassword', e.target.value.trim())
                   }}
                   className={styles["login-input"]}
                   placeholder='确认新密码'
            />
            {error&&<p className={styles['change-password-confirm-error']}>确认密码与新密码不一致</p>}
            <div className={styles["login-button"]}>
              <span onClick={()=>dispatch(routerRedux.goBack())} className={styles["go-back"]}><Icon type="backward" theme="outlined" style={{marginRight: '5px'}}/>返回</span>
              <Button type='primary' onClick={this.onSubmit} loading={false} disabled={!(oldPassword&&newPassword&&(!error))}>修改</Button>
            </div>
          </div>
        </div>

    );
  }

}



export default connect((state)=>{
  return{
    ...state.app
  }
})(ChangePassword);
