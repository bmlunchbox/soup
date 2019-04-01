import React, { Component } from 'react';
import { Modal } from 'semantic-ui-react';
import RecipeForm from './recipeform';
import RecipeList from './RecipeList';
import * as inventoryAPI from "../apis/inventory";
import * as recipeAPI from "../apis/recipes";
import './RecipePage.css';

class RecipePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inventory: [],
      recipes: [],
      nextRecipeId: 3,
      showForm: false
    }
    
    this.handleSave = this.handleSave.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  async loadInventory(){
    let response = await inventoryAPI.getInventory();
    if (response.status === 200 && response.response) {
      const inventory = response.response.map((entry) => (
        {
          id: entry.item_id,
          item: entry.name,
          restriction: entry.description
        }
      ));
      this.setState({inventory}); 
    }
  }

  async loadRecipes(){
    let response = await recipeAPI.getRecipes();
    var recipes = [];
    var seen_ids = [];

    // for each API result
    response.response.forEach(function(entry){

      // if the recipe is not in the database, add it
      if (!(seen_ids.includes(entry.recipe_id))){
        var new_object = {
          id: entry.recipe_id,
          img: entry.url,
          title: entry.name,
          portions: entry.Serves,
          instructions: entry.description,
          ingredients: [{item: entry.Ingredient, amount: entry.Required}]
        }
        recipes.push(new_object);
        seen_ids.push(entry.recipe_id);
      }
      // otherwise add the ingredients to the right recipe
      else{
        let temp = recipes.map((recipe) => {
          return (recipe.hasOwnProperty("id") && recipe.id == entry.recipe_id) ? 
            {
              id: entry.recipe_id,
              img: entry.url,
              title: entry.name,
              portions: entry.Serves,
              instructions: entry.description,
              ingredients: [...recipe.ingredients, {item: entry.Ingredient, amount: entry.Required}]
            } : recipe
        });

        recipes = temp;
      }
    });

    this.setState({recipes})
  }

  handleOpenModal(){
    this.setState({ showForm: true });
  }

  handleCloseModal(){
    this.setState({ showForm: false });
  }
  
  async handleSave(recipe) {
    var recipe_obj = {
      title: recipe.title,
      instructions: recipe.instructions,
      img: recipe.img,
      portions: recipe.portions
    }
    let response = await recipeAPI.addRecipe(recipe_obj);
    var recipe_id = response.response.insertId;

    recipe.ingredients.forEach(async function(ingredient){
      var ing_obj = {
        item: ingredient.item,
        amount: ingredient.amount,
        recipe_id: recipe_id
      }
      await recipeAPI.addIngredient(ing_obj);
    });

    this.setState((prevState, props) => {
      const newRecipe = {...recipe, id: recipe_id};
      return {
        recipes: [...this.state.recipes, newRecipe],
        showForm: false
      }
    });
  }
  
  componentWillMount(){
    this.loadRecipes();
    this.loadInventory();
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