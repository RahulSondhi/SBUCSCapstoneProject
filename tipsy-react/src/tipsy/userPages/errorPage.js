import React, {Component} from 'react';

const ErrorPage = (props) => {

    const errorType = props.location.state.serverError
        ? <h1 className="caption align-center-middle">
                Server Error
            </h1>
        : <h1 className="caption align-center-middle">
            404 not found
        </h1>

    return (
        <div>
            {errorType}
            <h3 className="errorCaption align-center-middle">Oops. Something went terribly wrong!</h3>
            <h4 className="errorCaption align-center-middle"> Try refreshing the page.</h4>
        </div>
    );
}

export default ErrorPage;