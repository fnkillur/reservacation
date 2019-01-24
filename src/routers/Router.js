import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import App from '../pages/App';
import Login from '../pages/Login';

class Router extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Route exact path="/" component={App} />
                    <Route path="/stores" component={App} />
                    <Route path='/login' component={Login} />
                </div>
            </BrowserRouter>
        );
    }
}

export default Router;