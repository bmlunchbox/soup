import React, {Component} from 'react';
import Recipe from './Recipe';
import './RecipeList.css';

class RecipeList extends Component {
  render() {
    const recipes = this.props.recipes.map((r,index) => (
      <Recipe key={r.id} {...r} recipes={r} />
    ));
    
    return (
      <div className="recipe-list">
        {recipes}
      </div>
    )
  
  }
}

export default RecipeList;