import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import App from '../pages/App';
import Auth from '../pages/Auth';

class Router extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Route exact path="/" component={App} />
                    <Route path="/stores" component={App} />
                    <Route path='/auth/login' component={Auth} />
                    <Route path='/auth/register' component={Auth} />
                    <Route path='/auth/findPassword' component={Auth} />
                </div>
            </BrowserRouter>
        );
    }
}

export default Router;