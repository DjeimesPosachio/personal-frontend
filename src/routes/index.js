import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from '../pages/Login';
import ListAlunos from '../pages/Alunos/List';
import CreateUpdateDieta from '../pages/Dietas/CreateUpdate';
import CreateUpdateTreino from '../pages/Treinos/CreateUpdate';
import ListExercicios from '../pages/Exercicios/List';
import CreateUpdateExercicio from '../pages/Exercicios/CreateUpdate';
import ListUsuarios from '../pages/Usuarios/List';
import CreateUpdateUsuario from '../pages/Usuarios/CreateUpdate';
import CreateUpdateAluno from '../pages/Alunos/CreateUpdate';
import PrivateRoute from './routes';

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route
                    path="/login"
                    exact
                    component={Login}
                />

                <PrivateRoute
                    path="/usuarios"
                    exact
                    component={ListUsuarios}
                />
                <PrivateRoute
                    path="/cadastrar-usuario"
                    exact
                    component={CreateUpdateUsuario}
                />
                <PrivateRoute
                    path="/editar-usuario/:usuarioId"
                    exact
                    component={CreateUpdateUsuario}
                />
                <PrivateRoute
                    path="/alunos"
                    exact
                    component={ListAlunos}
                />
                <PrivateRoute
                    path="/cadastrar-aluno"
                    exact
                    component={CreateUpdateAluno}
                />
                <PrivateRoute
                    path="/editar-aluno/:alunoId"
                    exact
                    component={CreateUpdateAluno}
                />
                <PrivateRoute
                    path="/exercicios"
                    exact
                    component={ListExercicios}
                />
                <PrivateRoute
                    path="/cadastrar-exercicio"
                    exact
                    component={CreateUpdateExercicio}
                />
                <PrivateRoute
                    path="/editar-exercicio/:exercicioId"
                    exact
                    component={CreateUpdateExercicio}
                />
                <PrivateRoute
                    path="/cadastrar-dieta/aluno/:alunoId"
                    exact
                    component={CreateUpdateDieta}
                />
                <PrivateRoute
                    path="/editar-dieta/:dietaId/aluno/:alunoId"
                    exact
                    component={CreateUpdateDieta}
                />
                <PrivateRoute
                    path="/cadastrar-treino/aluno/:alunoId"
                    exact
                    component={CreateUpdateTreino}
                />
                <PrivateRoute
                    path="/editar-treino/:treinoId/aluno/:alunoId"
                    exact
                    component={CreateUpdateTreino}
                />
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;
