import React, {Component} from 'react';
import { Table, Modal } from 'semantic-ui-react';
import DonationForm from './addDonation';
import DonorForm from './addDonor';
import * as apiCalls from "../apis/donor";
import './donor.css';

const RowEntry = ({date, donor, amount}) => {
	return(
		<Table.Row>
			<Table.Cell>{date}</Table.Cell>
			<Table.Cell>{donor}</Table.Cell>
			<Table.Cell>{amount}</Table.Cell>
		</Table.Row>
	);
}

class Donor extends Component {
	constructor(props){
		super(props);
		this.state = {
			donors: [],
			donations: [],
			nextId: 3,
			showDonationForm: false,
			showDonorForm: false
		};

		this.handleOpenDonation = this.handleOpenDonation.bind(this);
		this.handleOpenDonor = this.handleOpenDonor.bind(this);
		this.handleCloseDonation = this.handleCloseDonation.bind(this);
		this.handleCloseDonor = this.handleCloseDonor.bind(this);

		this.handleSaveDonor = this.handleSaveDonor.bind(this);
		this.handleSaveDonation = this.handleSaveDonation.bind(this);
	}

	handleOpenDonation(){
		this.setState({showDonationForm: true});
	}

	handleOpenDonor(){
		this.setState({showDonorForm: true});
	}

	handleCloseDonation(){
		this.setState({showDonationForm: false});
	}

	handleCloseDonor(){
		this.setState({showDonorForm: false});
	}

	handleSaveDonor(donor){
		console.log(donor);
		// save it here and get donor_id
		this.setState((prevState, props) => {
			return {
				// get the donor_id as a response
				donors: [...this.state.donors, {name: donor.name}],
				showDonorForm: false
			}
		});
	}

	handleSaveDonation(donation){
		console.log(donation);
		this.setState((prevState, props) => {
			// get donation id as a response
			const newDonation ={...donation, id: this.state.nextId};
			return {
				nextId: prevState.nextId + 1,
				donations: [...this.state.donations, newDonation],
				showDonationForm: false
			}
		});
	}

	async loadDonations(){
		let response = await apiCalls.getDonations();
		if (response.status === 200 && response.response){
			const donations = response.response.map((entry) => (
				{
					id: entry.donation_id,
					date: new Date(entry.date).toDateString(),
					donor: entry.name,
					amount: entry.amount
				}
			));
			this.setState({donations});
		} 
	}

	async loadDonors(){
		let response = await apiCalls.getDonors();
		if (response.status === 200 && response.response){
			const donors = response.response.map((entry) => (
				{
					donor_id: entry.donor_id,
					name: entry.name
				}
			));
			this.setState({donors});
		}
	}

	componentWillMount(){
		this.loadDonations();
		this.loadDonors();
	}

	render(){
		const {donors} = this.state;
		const entries = this.state.donations.map((elem) =>(
			<RowEntry key={elem.id} {...elem}/>
		));

		// summary of donations and donors if there's time to implement
		// <button className="button-donor">View Summary</button>
		return(
			<div className="container">
				<div>
					<Modal 
						trigger={<button className="button-add" onClick={this.handleOpenDonor}>Add Donor</button>}
						centered={true}
						open={this.state.showDonorForm}
						basic
						size='mini'
					>
						<DonorForm onClose={this.handleCloseDonor} onSave={this.handleSaveDonor}/>
					</Modal>
					<Modal
						trigger={<button className="button-add" onClick={this.handleOpenDonation}>Add Donation</button>}
						centered={true}
						open={this.state.showDonationForm}
						basic
						size='mini'
					>
						<DonationForm donors={donors} onClose={this.handleCloseDonation} onSave={this.handleSaveDonation}/>
					</Modal>
				</div>
				<h2 className="title">Donations</h2>
				<div className="table-container">
					<Table celled className="ui table">
						<Table.Header>
							<Table.Row>
								<Table.HeaderCell className="six wide" textAlign='center'>Date</Table.HeaderCell>
								<Table.HeaderCell className="six wide" textAlign='center'>Donor</Table.HeaderCell>
								<Table.HeaderCell className="four wide" textAlign='center'>Amount ($)</Table.HeaderCell>
							</Table.Row>
						</Table.Header>

						<Table.Body>
							{entries}
						</Table.Body>
					</Table>
				</div>	
			</div>
		);
	}
}

export default Donor;