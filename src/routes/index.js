import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './routes';
import Login from '../pages/Login';
import { PrivateRoutes } from './privateRoutes';
import CreateUpdateAlunos from '../pages/Alunos/CreateUpdate';
import ListAlunos from '../pages/Alunos/List';
import CreateUpdateDieta from '../pages/Dietas/CreateUpdate';
import CreateUpdateTreino from '../pages/Treinos/CreateUpdate';

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
                
            </Route>
            <Route
                    path="/cadastrar-aluno"
                    exact
                    component={CreateUpdateAlunos}
                />
                <Route
                    path="/cadastrar-dieta"
                    exact
                    component={CreateUpdateDieta}
                />
                <Route
                    path="/cadastrar-treino"
                    exact
                    component={CreateUpdateTreino}
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