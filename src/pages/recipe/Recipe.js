import React, {Component} from 'react';
import './Recipe.css';

class Recipe extends Component {
  render() {
    const {title, img, instructions, id, onDelete, portions} = this.props;
    const ingredients = this.props.ingredients.map((ing, index) => (
      <li key={index}>{ing.amount} {ing.item}</li> 
    ));
    return (
      <div className="recipe-card">
        <div className="remove" onClick={() => onDelete(id)}>x</div>
        <div className="recipe-card-img">
          <img src={img} alt={title} href="" />
        </div>
        <div className="recipe-card-content">
          <h3 className="recipe-title">{title}</h3>
          <h4>Ingredients:</h4>
          <ul>
            {ingredients}
          </ul>
          <h4>Instructions:</h4>
          <p>{instructions}</p>
          <p><b>Serves: </b>{portions}</p>
        </div>
      </div>
    );
  }
}

export default Recipe;