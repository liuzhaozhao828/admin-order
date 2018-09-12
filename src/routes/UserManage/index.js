import React from 'react';
import {Route, Switch } from 'dva/router';
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
