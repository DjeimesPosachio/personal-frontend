import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './routes';
import Home from '../pages/Home';
import Login from '../pages/Login';
import { PrivateRoutes } from './privateRoutes';

const Routes = () => {
    return (
        <Switch>
            <Route
                path="/login"
                exact
                component={Login}
            />
            <Route 
                path="/home" 
                element={<PrivateRoutes />}
            >
                <Route
                    path="/home"
                    exact
                    component={{Home}}
                />
            </Route>
        </Switch>
    );
};

export default Routes;