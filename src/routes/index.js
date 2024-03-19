import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './routes';
import Home from '../pages/Home';
import Login from '../pages/Login';
import { PrivateRoutes } from './privateRoutes';
import CreateUpdateAlunos from '../pages/Alunos/CreateUpdate';
import ListAlunos from '../pages/Alunos/List';

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
            <Route
                path="/cadastrar-aluno"
                exact
                component={CreateUpdateAlunos}
            />
            <Route
                path="/alunos"
                exact
                component={ListAlunos}
            />
        </Switch>
    );
};

export default Routes;