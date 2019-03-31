import React, { Component } from 'react';
import { Modal } from 'semantic-ui-react';
import RecipeForm from './recipeform';
import RecipeList from './RecipeList';
import './RecipePage.css';

class RecipePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inventory: ["pasta", "water", "tomato", "spaghetti", "slice of bread", "scoops ice cream", "milk"],
      recipes: [
        {
          id: 0,
          title: "Spaghetti",
          instructions: "Open jar of Spaghetti sauce.  Bring to simmer.  Boil water.  Cook pasta until done.  Combine pasta and sauce",
          ingredients: [{item: "pasta", amount: 2}, {item: "spaghetti", amount: 3}],
          img: "https://images.unsplash.com/photo-1548247661-3d7905940716?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1053&q=80",
          dietary: ["nuts", "halal"],
          portions: 10
        },
        {
          id: 1,
          title: "Milkshake",
          instructions: "Combine ice cream and milk.  Blend until creamy",
          ingredients: [{item: "scoops ice cream", amount: 4}, {item: "milk", amount: 2}],
          img: "https://images.unsplash.com/photo-1541658016709-82535e94bc69?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
          dietary: ["nuts"],
          portions: 10
        },
        { 
          id: 2,
          title: "Avocado Toast",
          instructions: "Toast bread.  Slice avocado and spread on bread.  Add salt, oil, and pepper to taste.",
          ingredients: [{item: "slice of bread", amount: 3}],
          img: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1053&q=80",
          dietary: '',
          portions: 5
        }
      ],
      nextRecipeId: 3,
      showForm: false
    }
    
    this.handleSave = this.handleSave.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleOpenModal(){
    this.setState({ showForm: true });
  }

  handleCloseModal(){
    this.setState({ showForm: false });
  }
  
  handleSave(recipe) {
    this.setState((prevState, props) => {
      const newRecipe = {...recipe, id: this.state.nextRecipeId};
      return {
        nextRecipeId: prevState.nextRecipeId + 1,
        recipes: [...this.state.recipes, newRecipe],
        showForm: false
      }
    });
  }
  
  render() {
    const {showForm, inventory} = this.state;
    return (
      <div>
        <Modal 
          trigger={<button className="button-save" onClick={this.handleOpenModal}>Add New</button>}
          centered={true}
          open={this.state.showForm}
          basic
          size='mini'
        >
          <RecipeForm
            inventory={inventory}
            onSave={this.handleSave} 
            onClose={this.handleCloseModal}
          />
        </Modal>     
        <h2 className="title">Recipes</h2>
        <RecipeList recipes={this.state.recipes} />
      </div>
    );
  }
}

export default RecipePage;