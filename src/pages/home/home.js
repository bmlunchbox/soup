import React, {Component} from 'react';
import {Router, Route, Switch, Redirect} from 'react-router';
import './home.css';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            redirectTo: "/"
        };
    }

    recipes = () => {
        this.setState({redirect: true, redirectTo: "recipe"});
    }

    render() {
        return (
            <div className="container">
                <div className="button-container">
                    <button className="button menu">Menu</button>
                    <br></br>
                    <button className="button recipe" onClick={this.recipes}>Recipes</button>
                    <br></br>
                    <button className="button inventory">Inventory</button>
                    {
                        this.state.redirect
                            ? <Redirect to={(this.state.redirectTo)}/>
                            : null
                    }
                </div>
            </div>
        );
    }
}