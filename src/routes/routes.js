import React from 'react';
import {
    Route,
    Redirect,
} from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const PrivateRoute = ({ component: Component, ...rest }) => {

    const {userLogged} = useAuth();

    return(
        <Route
          {...rest}
          render={props =>
            !!userLogged ? (
              <Component {...props} />
            ) : (
              <Redirect to="/login" />
            )
          }
        />
      );
}

  export default PrivateRoute;