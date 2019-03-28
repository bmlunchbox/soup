import React, {Component} from 'react';
import { Table } from 'semantic-ui-react';
import './donor.css';

const RowEntry = (elem) => {

}

class Donor extends Component {
	constructor(props){
		super(props);
		this.state = {};
	}

	render(){
		return(
			<div className="container">
				<div>
					<button className="button-donor">Add Donor</button>
					<button className="button-donor">Add Donation</button>
				</div>
				<h2 className="title">Donations</h2>
				<div className="table-container">
					<Table celled className="ui table">
						<Table.Header>
							<Table.Row>
								<Table.HeaderCell textAlign='center'>Date</Table.HeaderCell>
								<Table.HeaderCell textAlign='center'>Donor</Table.HeaderCell>
								<Table.HeaderCell textAlign='center'>Amount</Table.HeaderCell>
							</Table.Row>
						</Table.Header>

						<Table.Body>
							<Table.Row>
								<Table.Cell>Today</Table.Cell>
								<Table.Cell>Donor Name</Table.Cell>
								<Table.Cell>$$$$</Table.Cell>
							</Table.Row>
							<Table.Row>
								<Table.Cell>Today</Table.Cell>
								<Table.Cell>Donor Name</Table.Cell>
								<Table.Cell>$$$$</Table.Cell>
							</Table.Row>
						</Table.Body>
					</Table>
				</div>	
			</div>
		);
	}
}

export default Donor;