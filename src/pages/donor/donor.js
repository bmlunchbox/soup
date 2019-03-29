import React, {Component} from 'react';
import { Table, Modal } from 'semantic-ui-react';
import DonationForm from './addDonation';
import DonorForm from './addDonor';
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
			donors: ["Brandon", "Julian", "Victoria", "Maylene"],
			donations: [
				{
					id: 0,
					date: "mar 3, 2019",
					donor: "brandon",
					amount: "1"
				},
				{
					id: 1,
					date: "mar 28, 2019",
					donor: "brandon",
					amount: "3"
				},
				{
					id: 2,
					date: "mar 31, 2018",
					donor: "aaaaaaaaaaaaaaa",
					amount: "123"
				}
			],
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
		this.setState((prevState, props) => {
			return {
				donors: [...this.state.donors, donor.name],
				showDonorForm: false
			}
		});
	}

	handleSaveDonation(donation){
		this.setState((prevState, props) => {
			const newDonation ={...donation, id: this.state.nextId};
			return {
				nextId: prevState.nextId + 1,
				donations: [...this.state.donations, newDonation],
				showDonationForm: false
			}
		});
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