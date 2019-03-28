import React, {Component} from 'react';
import Recipe from './Recipe';
import './RecipeList.css';

class RecipeList extends Component {
  render() {
    const {onDelete} = this.props;
    const recipes = this.props.recipes.map((r,index) => (
      <Recipe key={r.id} {...r} onDelete={onDelete} recipes={r} />
    ));
    
    return (
      <div className="recipe-list">
        {recipes}
      </div>
    )
  
  }
}

export default RecipeList;