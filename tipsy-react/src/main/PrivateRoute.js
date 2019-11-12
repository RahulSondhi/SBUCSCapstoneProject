import React from 'react';
import { Route, Redirect } from 'react-router-dom'
import renderMergedProps from './renderMergedProps';

const PrivateRoute = ({ component, authed, redirectTo, ...rest }) => {
    return (
        <Route {...rest} render={ props => {
            return authed ? (
                renderMergedProps(component, props, rest)
            ) : (
                <Redirect to={{
                    pathname: redirectTo,
                    state: { from: props.location }
                }}/>
            );
        }}/>
    );
};

export default PrivateRoute;