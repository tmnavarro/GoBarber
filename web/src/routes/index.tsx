import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import Signin from '../pages/Signin';
import Signup from '../pages/Signup';
import Dashboard from '../pages/Dashboard';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route isPrivate={false} path="/" exact component={Signin} />
      <Route isPrivate={false} path="/signup" component={Signup} />
      <Route isPrivate={true} path="/dashboard" component={Dashboard} />
    </Switch>
  );
};

export default Routes;
