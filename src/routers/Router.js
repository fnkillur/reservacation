import React, { component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import App from 'App';
import Test from 'pages';

class Router extends component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Route exact path="/" component={App} />
                    <Route path="/Test" component={Test} />
                </div>
            </BrowserRouter>
        );
    }
}

export default Router;