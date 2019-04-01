import React, {Component} from 'react';
import { TextArea, Dropdown, Button, Form } from 'semantic-ui-react';
import './recipeform.css';

class RecipeForm extends Component {
	static defaultProps = {
		onClose() {},
		onSave() {}				
	}

	constructor(props) {
		super(props);
		this.state = {
			title: '',
			instructions: "",
			ingredients: [{item:'', amount:''}],
			img: '',
			portions: ''
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleNewIngredient = this.handleNewIngredient.bind(this);
		this.handleAmountChange = this.handleAmountChange.bind(this);
		this.handleDropdownChange = this.handleDropdownChange.bind(this);
	}

	handleChange(e) {
		this.setState({[e.target.name]: e.target.value})
	}

	handleDropdownChange(e, data){
		const index = Number(data.name.split('-')[1]);
		const ingredients = this.state.ingredients.map((ing, i) => (
			i === index ? {item: data.value, amount: ing.amount} : ing
		));
		this.setState({ingredients});
	}

	handleAmountChange(e){
		const index = Number(e.target.name.split('-')[1]);
		const ingredients = this.state.ingredients.map((ing, i) => (
			i === index ? {item: ing.item, amount: e.target.value} : ing
		));
		this.setState({ingredients});
	}

	handleNewIngredient(e) {
		const {ingredients} = this.state;
		this.setState({ingredients: [...ingredients, {item: '', amount: ''}]})
	}

	handleSubmit(e){
		e.preventDefault();
		this.props.onSave({...this.state});
		this.setState({
			title: '',
			instructions: "",
			ingredients: [{item: '', amount: ''}],
			img: '',
			portions: ''
		})
	}

	render() {
		const {title, instructions, img, ingredients, portions} = this.state;
		const {inventory, onClose} = this.props;

		const inventoryOptions = inventory.map((item) => (
			{
				key: item.id,
				text: item.item,
				value: item.item
			}
		));

		let inputs = ingredients.map((ingredient, i) => (
			<div className="recipe-form-line" key={`ingredient-${i}`}>
				<Dropdown
					name={`dropdown-${i}`} placeholder="Ingredient" fluid selection
					options={inventoryOptions} defaultValue={ingredient.item} onChange={this.handleDropdownChange}
				/>
				<input 
					name={`amount-${i}`} type="number" value={ingredient.amount} onChange={this.handleAmountChange}
				/>
			</div>
		));

		return(
			<Form className="recipe-form" onSubmit={this.handleSubmit}>
				<button
					className="close-button"
					onClick={onClose}
				>x</button>
				<Form.Field>
					<label>Title</label>
					<input
						name="title" type="text" value={title} 
						placeholder="Recipe Name" onChange={this.handleChange}
					/>
				</Form.Field>
				<Form.Field>
					<label>Instructions</label>
					<TextArea 
						className="instruction-field" placeholder="Instructions" 
						name="instructions" value={instructions} onChange={this.handleChange}
					/>
				</Form.Field>
				<Form.Field>
					<label>Ingredients</label>
					{inputs}
				</Form.Field>
				<button
					type="button" onClick={this.handleNewIngredient} className="more-button"
				>+</button>
				<Form.Field>
					<label>Portions</label>
					<input
						name="portions" type="number" placeholder="Number of Portions"
						value={portions} onChange={this.handleChange}
					/>
				</Form.Field> 
				<Form.Field>
					<label>Image Url</label>
					<input
						name="img" type="url" placeholder="Image Url"
						value={img} onChange={this.handleChange}
					/>
				</Form.Field>
				<Button className="save-button" color="green" type="submit">Save</Button>
			</Form>	
		);
	}
}

export default RecipeForm;