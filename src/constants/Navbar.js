import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './Navbar.css';

class Navbar extends Component {
  static defaultProps = {
    onNewRecipe() {}
  }
  
  static propTypes = {
    onNewRecipe: PropTypes.func
  }
  
  render() {
    return (
      <header>
        <h2><a>Kitchen Soup</a></h2>
        <nav>
          <li><a onClick={this.props.onNewRecipe}>New Recipe</a></li>
          <li><a>Home</a></li>
          <li><a>Menu</a></li>
          <li><a>Recipes</a></li>
          <li><a>Donors</a></li>
          <li><a>Contact Us</a></li>
        </nav>
      </header>
    );
  }
}

export default Navbar;