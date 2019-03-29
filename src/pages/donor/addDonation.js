import React, {Component} from 'react';
import { Button, Form } from 'semantic-ui-react';
import './addDonation.css';

class DonationForm extends Component {
	static defaultProps = {
		onClose() {},
		onSave() {}
	}

	constructor(props) {
		super(props);
		this.state = {
			donorName: '',
			amount: ''
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
			donorName: '',
			stock: ''
		});
	}

	render() {
		const {donorName, amount} = this.state;
		const {donors, onClose} = this.props;

		const donorOptions = donors.map((donor) => (
			{
				key: {donor},
				text: {donor},
				value: {donor}
			}
		));

		console.log(donorOptions);

		return(
			<Form className="donation-form" onSubmit={this.handleSubmit}>
				<button 
					className="close-button"
					onClick={onClose}
				>x</button>
				<Form.Field>
					<label>Donor</label>
					<input name="donorName" placeholder="Donor" value={donorName} onChange={this.handleChange}/>
				</Form.Field>
				<Form.Field>
					<label>Amount</label>
					<input 
						name="amount" type="number"
						value={amount} placeholder="0" onChange={this.handleChange}
					/>
				</Form.Field>
				<Button className="save-button" color="green" type="submit">Save</Button>
			</Form>
		);
	}
}

export default DonationForm;