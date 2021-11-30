import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Router, Redirect, Switch } from 'wouter';

import { checkAuth } from '../actions/auth';
import { LoginScreen } from '../components/auth/LoginScreen';
import { CalendarScreen } from '../components/calendar/CalendarScreen';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export const AppRouter = () => {
  const dispatch = useDispatch();
  const { isChecking, user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isChecking) {
    return <h5>Wait..</h5>;
  }

  return (
    <Router>
      <div>
        <Switch>
          <PublicRoute
            exact
            path="/login"
            component={LoginScreen}
            isAuthenticated={!!user}
          />
          <PrivateRoute
            exact
            path="/"
            component={CalendarScreen}
            isAuthenticated={!!user}
          />
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  );
};
