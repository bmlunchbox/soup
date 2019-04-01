import React, {Component} from 'react';
import { Input, Table, Icon, Button, Form } from 'semantic-ui-react'; 
import update from 'immutability-helper';
import * as recipeAPI from "../apis/recipes";
import * as inventoryAPI from "../apis/inventory";
import './menu.css';

const RecipeEntry = ({identifier, title, portion, restriction, selected, handleSelectRecipe, handlePortionIncrement}) => {
	return (
		<Table.Row>
			<Table.Cell>{title}</Table.Cell>
			<Table.Cell>{portion}</Table.Cell>
			<Table.Cell>{restriction}</Table.Cell>
			<Table.Cell>
				<Form 
					title={title}
					restriction={restriction}
					identifier={identifier}
					onSubmit={handleSelectRecipe}>
					<Form.Field className="portions-cell">
						<input 
						name={title}
						className="portions-num" min={0} 
						max={portion} type="number" 
						value={selected}
						onChange={handlePortionIncrement} />
					</Form.Field>
					<button 
						className="portions-button"
						type="submit"
					>
						<Icon.Group>
							<Icon name='check' />
							<Icon corner name='add' />
						</Icon.Group>
					</button>
				</Form>
			</Table.Cell>
		</Table.Row>
	);
}

const RestrictionEntry = ({description, quantity}) => {
	return (
		<Table.Row>
			<Table.Cell>{description}</Table.Cell>
			<Table.Cell>{quantity}</Table.Cell>
		</Table.Row>
	);
}

const MenuEntry = ({key, title, portion, restriction}) => {
	return (
		<Table.Row>
			<Table.Cell>{title}</Table.Cell>
			<Table.Cell>{portion}</Table.Cell>
			<Table.Cell>{restriction}</Table.Cell>
		</Table.Row>
	)
}

class Menu extends Component {
	constructor(props){
		super(props);
		this.state = {
			menu: [],
			recipes: [],
			inventory: {},
			restrictions: [],
			selected: []
		};

		this.handleSelectRecipe = this.handleSelectRecipe.bind(this);
		this.handlePortionIncrement = this.handlePortionIncrement.bind(this);
	}

	reset(){
		window.location.reload();
	}

	handlePortionIncrement(e){
		e.preventDefault();
		var recipe = e.target.name;
		var portion = e.target.value;
		
		let selected = this.state.selected.map((item) => {
			return (item.recipe == recipe) ? {recipe: recipe, portions: e.target.value} : item;
		});
		
		this.setState({selected});
	}

	handleSelectRecipe(e){
		e.preventDefault();
		var title = e.target.getAttribute("title");
		var restriction = e.target.getAttribute("restriction");
		var portion = 0;
		var identifier = e.target.getAttribute("identifier");

		this.state.selected.forEach((item) => {
			if (item.recipe == title){
				portion = item.portions;
			}
		});

		let selected = this.state.selected.map((item) => {
			return (item.recipe == title) ? {recipe: title, portions: 0} : item;
		});

		this.setState({selected});
		// update recipe available portions
		// update selected items

		const new_menu = {
			id: identifier,
			title: title,
			restriction: restriction,
			portion: portion
		}
		var in_menu = false;
		this.state.menu.forEach((menuItem) => {
			if (menuItem.title == title){
				in_menu = true;
			}
		});
		if (in_menu){
			let menu = this.state.menu.map((item) => {
				if (item.title == title){
					var newPortion = Number(item.portion) + Number(portion);
					var updated_menu = {
						id: identifier,
						title: title,
						restriction: restriction,
						portion: newPortion
					}
					return updated_menu;
				} else{
					return item;
				}
			});
			this.setState({menu}, function() {
				this.state.menu.forEach((menuItem) => {
					this.state.recipes.forEach((recipeItem) => {
						if (menuItem.id == recipeItem.id){
							var portionMade = menuItem.portion;
							var portion = recipeItem.portions;
							var newInventory = {};

							recipeItem.ingredients.forEach((ingredient) => {
								var ingredientUsed = ingredient.item;
								var amountUsed = Math.ceil((ingredient.amount/portion)*(portionMade));
								var currentInventory = 0;
								var amountLeft = this.state.inventory[ingredientUsed] - amountUsed;

								newInventory = update(this.state.inventory, {[ingredientUsed]: {$set: amountLeft}});
								this.setState({inventory: newInventory});
							})
						}
					});
				})
			});
		}
		else {
			this.setState(() => {
				return {
					menu: [...this.state.menu, new_menu]
				}
			}, function() {
				this.state.menu.forEach((menuItem) => {
					this.state.recipes.forEach((recipeItem) => {
						if (menuItem.id == recipeItem.id){
							var portionMade = menuItem.portion;
							var portion = recipeItem.portions;
							var newInventory = {};

							recipeItem.ingredients.forEach((ingredient) => {
								var ingredientUsed = ingredient.item;
								var amountUsed = Math.ceil((ingredient.amount/portion)*(portionMade));
								var currentInventory = 0;
								var amountLeft = this.state.inventory[ingredientUsed] - amountUsed;

								newInventory = update(this.state.inventory, {[ingredientUsed]: {$set: amountLeft}});
								this.setState({inventory: newInventory});
							})
						}
					});
				})
			})
		}
	}

	async loadInventory(){
		let response = await inventoryAPI.getInventory();
		if (response.status === 200 && response.response){
			var inventory = {}
			response.response.forEach((entry) => {
				if (inventory[entry.name]){
					inventory[entry.name] = inventory[entry.name] + entry.stock;
				} else {
					inventory[entry.name] = entry.stock;
				}
			});
			this.setState({inventory});
		}
	}

	async loadRestrictions(){
		let response = await inventoryAPI.getRestrictions();
		if (response.status === 200 && response.response) {

			const restrictions = response.response.map((entry) => (
				{
					id: entry.restriction_id,
					description: entry.description,
					quantity: entry.quantity
				}
			));
			this.setState({restrictions});
		}
	}

	async loadRecipes(){
		let response = await recipeAPI.getMenuRecipes();
		if (response.status === 200 && response.response) {
	    	var recipes = [];
	    	var seen_ids = [];

	    	// for each API result
	    	response.response.forEach(function(entry){
	    		if (entry.Restriction == null){
	    			entry.Restriction = "None";
	    		}

		      	// if the recipe is not in the database, add it
		      	if (!(seen_ids.includes(entry.recipe_id))){
		        	var new_object = {
		          		id: entry.recipe_id,
				    	title: entry.name,
				    	portions: entry.Serves,
				     	ingredients: [{item: entry.Ingredient, amount: entry.Required}],
				     	restrictions: [entry.Restriction]
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
		            		title: entry.name,
		            		portions: entry.Serves,
		            		ingredients: [...recipe.ingredients, {item: entry.Ingredient, amount: entry.Required}],
		            		restrictions: [...recipe.restrictions, entry.Restriction]
		            	} : recipe
		        	});

		        	recipes = temp;
		      	}
	    	});

	    	let selected = recipes.map((elem) => (
	    		{
	    			recipe: elem.title,
	    			portions: 0
	    		}
	    	));
			this.setState({recipes, selected});
	    }
	}

	componentWillMount(){
		this.loadInventory();
		this.loadRestrictions();
		this.loadRecipes();
	}

	render(){
		const restrictionItems =  this.state.restrictions.map((elem) => {
			if (elem.description != "None"){
				return	(<RestrictionEntry key={elem.id} {...elem} />)
			}
		});

		const menuItems = this.state.menu.map((elem) => (
			<MenuEntry key={elem.id} {...elem} />
		));

		const portions = {}
		const restrictions = {}

		this.state.recipes.forEach((elem) => {
			// calculate the restricting ingredient
			var ing_limits = [];
			elem.ingredients.forEach((ingredient) => {
				var need = ingredient.amount;
				var have = this.state.inventory[ingredient.item];
				ing_limits.push(Math.floor(have/need));
			});
			// calculate the maximum amount of portions
			var max = Math.min(...ing_limits);
			var max_portions = max*elem.portions;

			portions[elem.title] = max_portions;

			// get the true restrictions
			var unique = [];
			elem.restrictions.forEach((restriction) => {
				if (!(unique.includes(restriction)) && restriction != 'None'){
					unique.push(restriction);
				}
			});
			restrictions[elem.title] = unique;
		});

		const recipeItems = this.state.recipes.map((elem) => {
			var selected = 0;
			this.state.selected.forEach((item) => {
				if (item.recipe == elem.title){
					selected = item.portions;
				}
			})
			return(
			<RecipeEntry 
				key={elem.id} title={elem.title} 
				identifier={elem.id}
				portion={portions[elem.title]} 
				selected={selected}
				restriction={restrictions[elem.title].join(", ")}
				handleSelectRecipe={this.handleSelectRecipe}
				handlePortionIncrement={this.handlePortionIncrement}
			/>)
		});

		return(
			<div>
				<h1 className="main-title">Menu</h1>
				<div className="portion-container">
					<label className="sub-title">Target Portions: </label>
					<span className="portion-target-input">
						<Input className="portion-target-input" type="number" defaultValue={200}></Input>
					</span>
				</div>
				<div className="section-one">
					<div className="menu-table">
						<h3>Selected Items</h3>
						<Table className="ui celled table">
							<Table.Header>
								<Table.Row>
									<Table.HeaderCell className="seven wide" textAlign='center'>Menu Item</Table.HeaderCell>
									<Table.HeaderCell className="three wide" textAlign='center'>Portions</Table.HeaderCell>
									<Table.HeaderCell className="six wide" textAlign='center'>Restriction</Table.HeaderCell>
								</Table.Row>
							</Table.Header>
							<Table.Body>
								{menuItems}
							</Table.Body>
						</Table>
					</div>
					<div className="restriction-table">
						<h3>Restrictions</h3>
						<Table className="ui table celled">
							<Table.Header>
								<Table.Row>
									<Table.HeaderCell className="ten wide" textAlign='center'>Type</Table.HeaderCell>
									<Table.HeaderCell className="six wide smaller" textAlign='center'>Estimate</Table.HeaderCell>
								</Table.Row>
							</Table.Header>
							<Table.Body>
								{restrictionItems}
							</Table.Body>
						</Table>
					</div>
					<Button onClick={this.reset} color="teal">Reset</Button>
				</div>
				<h1>Recipes</h1>
				<div className="recipe-table">
					<Table className="ui table celled">
						<Table.Header>
							<Table.Row>
								<Table.HeaderCell className="six wide" textAlign='center'>Recipe</Table.HeaderCell>
								<Table.HeaderCell className="three wide smaller" textAlign='center'>Available Portions</Table.HeaderCell>
								<Table.HeaderCell className="four wide" textAlign='center'>Restriction</Table.HeaderCell>
								<Table.HeaderCell className="three wide" textAlign='center'>Portions</Table.HeaderCell>
							</Table.Row>
						</Table.Header>
						<Table.Body>
							{recipeItems}
						</Table.Body>
					</Table>
				</div>
			</div>
		);
	}
}

export default Menu;