import React from 'react';
import {Route, Switch } from 'dva/router';
import styles from './index.less'
import Merchant from "./home";
import MerchantSetting from "./MerchantSetting";
import MerchantForm from "./MerchantForm";


class UserManage extends React.Component {
    render(){
      const {match} = this.props
        return(
            <div className={styles["merchant"]}>
              <Switch>
                <Route path={`${match.url}/`} exact component={Merchant} />
                <Route path={`${match.url}/setting`} component={MerchantSetting} />
                <Route path={`${match.url}/add`} component={MerchantForm} />
              </Switch>

            </div>
        );
    }
}

export default UserManage
