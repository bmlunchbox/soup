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

        this.recipes = this.recipes.bind(this);
        this.menu = this.menu.bind(this);
        this.inventory = this.inventory.bind(this);
        this.donor = this.donor.bind(this);
    }

    recipes = () => {
        this.setState({redirect: true, redirectTo: "recipe"});
    }

    menu = () => {
        this.setState({redirect: true, redirectTo: "menu"});
    }

    inventory = () => {
        this.setState({redirect:true, redirectTo: "inventory"});
    }

    donor = () => {
        this.setState({redirect:true, redirectTo: "donor"});
    }

    render() {
        return (
            <div className="container">
                <div className="button-container">
                    <button className="button menu" onClick={this.menu}>Menu</button>
                    <br></br>
                    <button className="button recipe" onClick={this.recipes}>Recipes</button>
                    <br></br>
                    <button className="button inventory" onClick={this.inventory}>Inventory</button>
                    <br></br>
                    <button className="button donor" onClick={this.donor}>Donors</button>
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