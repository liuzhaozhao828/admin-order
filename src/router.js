import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import App from './app';
import Login from './routes/Login';
import 'moment/locale/zh-cn';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/login" exact component={Login}/>
        <Route path="/" component={App}/>
      </Switch>
    </Router>
  );
}

export default RouterConfig;
