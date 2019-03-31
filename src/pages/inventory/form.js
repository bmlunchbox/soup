import React, {Component} from 'react';
import { Dropdown, Button, Form } from 'semantic-ui-react';
import './form.css';

class InventoryForm extends Component {
	static defaultProps = {
		onClose() {},
		onSave() {}
	}

	constructor(props) {
		super(props);
		this.state = {
			item: '',
			stock: 0,
			restriction: '',
			restriction_id: ''
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleDropdownChange = this.handleDropdownChange.bind(this);
	}

	handleChange(e) {
		this.setState({[e.target.name]: e.target.value});
	}

	handleDropdownChange(e, data){
		var key = ''
		var id = data.options.filter(function(item) {
			if (item.value === data.value){
				key = item.key
			}
		})
		this.setState({restriction: data.value, restriction_id: key});
	}

	handleSubmit(e){
		e.preventDefault();
		this.props.onSave({...this.state});
		this.setState({
			item: '',
			stock: 0,
			restriction: '',
			restriction_id: ''
		});
	}

	render() {
		const {item, stock} = this.state;
		const {restriction, onClose} = this.props;

		const restrictOptions = restriction.map((restriction) => (
			{
				key: restriction.id,
				text: restriction.description,
				value: restriction.description
			}
		));

		return(
			<Form className="inventory-form" onSubmit={this.handleSubmit}>
				<button 
					className="close-button"
					onClick={onClose}
				>x</button>
				<Form.Field>
					<label>Item</label>
					<input name="item" placeholder="Item Name" value={item} onChange={this.handleChange}/>
				</Form.Field>
				<Form.Field>
					<label>Stock</label>
					<input name="stock" type="number" min="0" value={stock} placeholder="0" onChange={this.handleChange}/>
				</Form.Field>
				<Form.Field>
					<label>Restriction</label>
					<Dropdown
						placeholder="Restriction" fluid selection
						options={restrictOptions} onChange={this.handleDropdownChange}
					/>
				</Form.Field>
				<Button className="save-button" color="green" type="submit">Save</Button>
			</Form>
		);
	}
}

export default InventoryForm;