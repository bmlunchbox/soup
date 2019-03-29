import React, {Component} from 'react';
import { Button, Form } from 'semantic-ui-react';
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
			stock: ''
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(e) {
		this.setState({[e.target.name]: e.target.value});
	}

	handleSubmit(e){
		e.preventDefault();
		this.props.onSave({...this.state});
		this.setState({
			item: '',
			stock: ''
		});
	}

	render() {
		const {item, stock} = this.state;
		const {onClose} = this.props;

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
					<input name="stock" defaultValue="0" value={stock} placeholder="0" onChange={this.handleChange}/>
				</Form.Field>
				<Button className="save-button" color="green" type="submit">Save</Button>
			</Form>
		);
	}
}

export default InventoryForm;