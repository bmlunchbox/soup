import './App.css';
import React, {Component} from 'react';
import {Router, Route, Switch, Redirect} from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';

import Navbar from '../src/components/Navbar';
import Home from '../src/pages/home/home';
import Recipe from '../src/pages/recipe/RecipePage';

const browserHistory = createBrowserHistory();

export default class App extends Component {
    render() {
        return (
            <div className="App">
                <Navbar />
                <Router history={browserHistory}>
                    <div>
                        <Switch>
                            <Route exact={true} path="/" component={Home}/>
                            <Route path="/recipe" component={Recipe}/>
                        </Switch>
                    </div>
                </Router>
            </div>
        );
    }
}
