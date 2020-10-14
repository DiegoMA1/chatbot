import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react'

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { user, isAuthenticated, loading } = useAuth0;

    return (
        <Route
            {...rest}
            render={(props) =>
                !isAuthenticated && !loading ? (
                    <Redirect to="/" />
                ) : (
                        <Component {...props} />
                    )
            }
        />
    );
};

export default PrivateRoute;