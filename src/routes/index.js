import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './routes';
import Login from '../pages/Login';

const Routes = () => {
    return (
        <Switch>
            <Route
                path="/login"
                exact
                component={Login}
            />
        </Switch>
    );
};

export default Routes;