import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Icon, Input, Button } from 'antd';
import styles from './index.less';

class Login extends React.Component {

  componentDidMount(){
    const {login, dispatch} = this.props
    if(login){
      dispatch(routerRedux.push(`/`))
    }

  }

  onSubmit=()=>{

  }


  render() {
    const {login} = this.props
    if(login){
      return null
    }
    return (
        <div className={styles.login}>
          <div className={styles.content}>
            <p className={styles["sys-name"]}>管理后台</p>

            <Input value={1}
                   className={styles["login-input"]}
                   placeholder='用户名'
                   suffix={<Icon type='user'/>}
            />
            <Input type='password'
                   // value={}
                   className={styles["login-input"]}
                   placeholder='密码'
                   onPressEnter={this.onSubmit}
                   suffix={<Icon type="lock" theme="outlined" />}
            />
            <div className={styles["login-button"]}>
              <Button type='primary' onClick={this.onSubmit} loading={false} >登录</Button>
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
