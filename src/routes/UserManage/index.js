/**
 * Created by liuzhaozhao on 2017/12/29.
 */
import React from 'react';
import {Route, Switch, Redirect } from 'dva/router';
//import styles from './index.less'
import UserManageHome from "./home";
import UserForm from "./UserForm";
import OptionRecords from "./OptionRecords";


class UserManage extends React.Component {
    render(){
      const {match} = this.props
        return(
            <div>
              <Switch>
                <Route path={`${match.url}/`} exact component={UserManageHome} />
                <Route path={`${match.url}/edit`} component={UserForm} />
                <Route path={`${match.url}/optionRecords`} component={OptionRecords} />
              </Switch>

            </div>
        );
    }
}

export default UserManage
