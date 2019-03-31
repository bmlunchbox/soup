import React, {Component} from 'react';
import { Dropdown, Button, Form } from 'semantic-ui-react';
import './addDonation.css';

class DonationForm extends Component {
	static defaultProps = {
		onClose() {},
		onSave() {}
	}

	constructor(props) {
		super(props);
		var date = new Date();
		this.state = {
			donor: '',
			donor_id: '',
			amount: '',
			date: date.toDateString()
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleDropdownChange = this.handleDropdownChange.bind(this);
	}

	handleChange(e) {
		this.setState({[e.target.name]: e.target.value});
	}

	handleDropdownChange (e, data){
		var key = '';
		var id = data.options.filter(function(item) {
			if (item.value === data.value){
				key = item.key
			}
		})
		this.setState({donor: data.value, donor_id: key})
	}

	handleSubmit(e){
		e.preventDefault();
		this.props.onSave({...this.state});
		var date = new Date();
		this.setState({
			donor: '',
			donor_id: '',
			amount: '',
			date: date.toDateString()
		});
	}

	render() {
		const {donorName, amount} = this.state;
		const {donors, onClose} = this.props;

		const donorOptions = donors.map((donor) => (
			{
				key: donor.donor_id,
				text: donor.name,
				value: donor.name
			}
		));

		return(
			<Form className="donation-form" onSubmit={this.handleSubmit}>
				<button 
					className="close-button"
					onClick={onClose}
				>x</button>
				<Form.Field>
					<label>Donor</label>
					<Dropdown
						placeholder="Donor Name" fluid selection
						options={donorOptions} onChange={this.handleDropdownChange}
					/>
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