import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Cadastro from '../pages/Cadastro/index';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Cadastro} />
  </Switch>
);

export default Routes;
