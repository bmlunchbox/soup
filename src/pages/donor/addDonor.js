import React, {Component} from 'react';
import { Button, Form } from 'semantic-ui-react';
import './addDonor.css';

class DonorForm extends Component {
	static defaultProps = {
		onClose() {},
		onSave() {}
	}

	constructor(props) {
		super(props);
		this.state = {
			name: '',
			address: '',
			email: '',
			phone: ''
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
			name: '',
			address: '',
			email: '',
			phone: ''
		});
	}

	render() {
		const {name, address, email, phone} = this.state;
		const {onClose} = this.props;

		return(
			<Form className="donor-form" onSubmit={this.handleSubmit}>
				<button 
					className="close-button"
					onClick={onClose}
				>x</button>
				<Form.Field>
					<label>Name:</label>
					<input name="name" placeholder="Name" value={name} onChange={this.handleChange}/>
				</Form.Field>
				<Form.Field>
					<label>Address:</label>
					<input name="address" placeholder="Address" value={address} onChange={this.handleChange}/>
				</Form.Field>
				<Form.Field>
					<label>Email:</label>
					<input name="email" type="email" placeholder="Email" value={email} onChange={this.handleChange}/>
				</Form.Field>
				<Form.Field>
					<label>Phone Number:</label>
					<input name="phone" type="tel" placeholder="Number" value={phone} onChange={this.handleChange}/>
				</Form.Field>
				<Button className="save-button" color="green" type="submit">Save</Button>
			</Form>
		);
	}
}

export default DonorForm;