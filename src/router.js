import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/Home/IndexPage';
import Header from './components/Header'

function RouterConfig({ history }) {
  return (
    <div>
      <Header></Header>
      <Router history={history}>
        <Switch>
          <Route path="/" exact component={IndexPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default RouterConfig;
