import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Homepage from '../../components/homepage/homepages.component';

import './homepage.styles.css';

const HomepagePages = ({ match: { path } }) => (
  <div className='homepage'>
    <Switch>
      <Route exact path={path} component={Homepage} />
    </Switch>
  </div>
);

export default HomepagePages;
