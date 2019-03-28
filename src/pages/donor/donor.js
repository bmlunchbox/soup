import React, {Component} from 'react';
import { Table } from 'semantic-ui-react';
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
			donations: [
				{
					id: 0,
					date: "mar 3, 2019",
					donor: "brandon",
					amount: "$1"
				},
				{
					id: 1,
					date: "mar 28, 2019",
					donor: "brandon",
					amount: "$3"
				},
				{
					id: 2,
					date: "mar 31, 2018",
					donor: "aaaaaaaaaaaaaaa",
					amount: "$123"
				}
			],
			nextId: 3,
			showForm: false
		};
	}

	render(){
		const entries = this.state.donations.map((elem) =>(
			<RowEntry key={elem.id} {...elem}/>
		));

		return(
			<div className="container">
				<div>
					<button className="button-add">Add Donor</button>
					<button className="button-add">Add Donation</button>
				</div>
				<button className="button-donor">View Summary</button>
				<h2 className="title">Donations</h2>
				<div className="table-container">
					<Table celled className="ui table">
						<Table.Header>
							<Table.Row>
								<Table.HeaderCell className="six wide" textAlign='center'>Date</Table.HeaderCell>
								<Table.HeaderCell className="six wide" textAlign='center'>Donor</Table.HeaderCell>
								<Table.HeaderCell className="four wide" textAlign='center'>Amount</Table.HeaderCell>
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