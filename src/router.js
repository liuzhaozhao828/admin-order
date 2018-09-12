import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import App from './app';
import Login from './routes/Login/Login';
import ChangePassword from './routes/Login/ChangePassword';
import 'moment/locale/zh-cn';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/login" component={Login}/>
        <Route path="/changePassword" component={ChangePassword}/>
        <Route path="/" component={App}/>
      </Switch>
    </Router>
  );
}

export default RouterConfig;
