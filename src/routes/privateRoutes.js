import { Redirect, Route, Switch } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import ListAlunos from "../pages/Alunos/List";

export const PrivateRoutes = () => {
    const { signed } = useAuth();

    return (
        <Switch>
            {signed ? (
                <>
                    <Route path="/alunos" component={ListAlunos} />
                </>
            ) : (
                <Redirect to="/login" />
            )}
        </Switch>
    );
};
