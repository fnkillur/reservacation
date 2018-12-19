import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import App from '../App';
import Test from '../pages/Test';

class Router extends Component {
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