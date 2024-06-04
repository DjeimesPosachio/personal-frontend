import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './routes';
import Login from '../pages/Login';
import { PrivateRoutes } from './privateRoutes';
import ListAlunos from '../pages/Alunos/List';
import CreateUpdateDieta from '../pages/Dietas/CreateUpdate';
import CreateUpdateTreino from '../pages/Treinos/CreateUpdate';
import ListExercicios from '../pages/Exercicios/List';
import CreateUpdateExercicio from '../pages/Exercicios/CreateUpdate';
import ListUsuarios from '../pages/Usuarios/List';
import CreateUpdateUsuario from '../pages/Usuarios/CreateUpdate';
import CreateUpdateAluno from '../pages/Alunos/CreateUpdate';

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
                path="/usuarios"
                exact
                component={ListUsuarios}
            />
            <Route
                path="/cadastrar-usuario"
                exact
                component={CreateUpdateUsuario}
            />
            <Route
                path="/alunos"
                exact
                component={ListAlunos}
            />
            <Route
                path="/editar-aluno/:alunoId"
                exact
                component={CreateUpdateAluno}
            />
            <Route
                path="/exercicios"
                exact
                component={ListExercicios}
            />
            <Route
                path="/cadastrar-exercicio"
                exact
                component={CreateUpdateExercicio}
            />
            <Route
                path="/editar-exercicio/:exercicioId"
                exact
                component={CreateUpdateExercicio}
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
        </Switch>
    );
};

export default Routes;
