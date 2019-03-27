import React, {Component} from 'react';
import './Navbar.css';

class Navbar extends Component {
  render() {
    return (
      <header>
        <h2><a>Kitchen Soup</a></h2>
        <nav>
          <li><a href="/">Home</a></li>
          <li><a>Menu</a></li>
          <li><a href="/recipe">Recipes</a></li>
          <li><a>Inventory</a></li>
          <li><a>About</a></li>
        </nav>
      </header>
    );
  }
}

export default Navbar;