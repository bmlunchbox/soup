import React, {Component} from 'react';
import './Navbar.css';

class Navbar extends Component {
  render() {
    return (
      <header>
        <h2><a>Kitchen Soup</a></h2>
        <nav>
          <li><a href="/">Home</a></li>
          <li><a href="/menu">Create Menu</a></li>
          <li><a href="/recipe">Recipes</a></li>
          <li><a href="/inventory">Inventory</a></li>
          <li><a href="/donor">Donor</a></li>
          <li><a href="/about">About</a></li>
        </nav>
      </header>
    );
  }
}

export default Navbar;