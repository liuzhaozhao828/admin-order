import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Icon, Input, Button, message } from 'antd';
import styles from './index.less';
import request from '../../utils/request'


class Login extends React.Component {

  state={

  }

  componentDidMount(){
    const {login, dispatch} = this.props
    if(login){
      dispatch(routerRedux.push(`/`))
    }

  }

  onSubmit=(params={})=>{
    const { dispatch } = this.props
    const {userName, password} = this.state
    if(!(userName&&password)){
      message.warn('请输入账号名和密码！')
      return false
    }
    request('/admin/common/login', {userName, password, userType:0, ...params}).then(({data: {code, msg, data={}}}) => {
      if(code==='000000'){
        const { userName, nickName, login=false, userType='0' } = data
        console.warn('data', data)
        if(login){
          dispatch({
            type: 'app/save',
            payload: {
              userName,
              nickName,
              login,
              userType
            }
          })
          dispatch(routerRedux.push(`/`))
        }
      }
    })
  }


  render() {
    const {login} = this.props
    const {userName, password} = this.state
    if(login){
      return null
    }
    return (
        <div className={styles.login}>
          <div className={styles.content}>
            <p className={styles["sys-name"]}>管理后台</p>

            <Input value={userName}
                   onChange={(e)=>{
                     this.setState({
                       userName: e.target.value.trim()
                     })
                   }}
                   className={styles["login-input"]}
                   placeholder='用户名'
                   suffix={<Icon type='user'/>}
            />
            <Input type='password'
                   value={password}
                   onChange={(e)=>{
                     this.setState({
                       password: e.target.value.trim()
                     })
                   }}
                   className={styles["login-input"]}
                   placeholder='密码'
                   onPressEnter={this.onSubmit}
                   suffix={<Icon type="lock" theme="outlined" />}
            />
            <div className={styles["login-button"]}>
              <span onClick={()=>this.onSubmit({userType: 1})} className={styles["merchant-login"]}>商户入口</span>
              <Button type='primary' onClick={()=>this.onSubmit()} loading={false} >登录</Button>
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
})(Login);
