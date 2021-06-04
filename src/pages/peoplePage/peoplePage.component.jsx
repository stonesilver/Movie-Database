import React from 'react';

import { Switch, Route } from 'react-router-dom';

import PopularPeople from '../../components/popularPeople/popularPeople.component';

import PersonDetail from '../../components/personDetail/personDetail.component'

import './peoplePage.styles.scss';

const PeoplePage = ({ match }) => {
  return (
    <Switch>
      <Route exact path={match.path} component={PopularPeople} />
      <Route exact path={`${match.path}/:person`} component={PersonDetail} />
    </Switch>
  );
};

export default PeoplePage;
