import React, {Component} from 'react';
import { Table } from 'semantic-ui-react';
import './inventory.css';

const RowEntry = (elem) => {

}

class Inventory extends Component {
	constructor(props){
		super(props);
		this.state = {};
	}

	render(){
		return(
			<div className="container">
				<h2 className="title">Inventory</h2>
				<div>
					<button className="button-inventory">Add Item</button>
				</div>
				<div className="table-container">
					<Table celled className="ui table">
						<Table.Header>
							<Table.Row>
								<Table.HeaderCell textAlign='center' className="item-col">Item</Table.HeaderCell>
								<Table.HeaderCell textAlign='center'>Stock</Table.HeaderCell>
							</Table.Row>
						</Table.Header>

						<Table.Body>
							<Table.Row>
								<Table.Cell>Item Name</Table.Cell>
								<Table.Cell>
									<div className="ui transparent input">
										<input type="text" placeholder="0"/>
									</div>
								</Table.Cell>
							</Table.Row>
							<Table.Row>
								<Table.Cell>Item Name</Table.Cell>
								<Table.Cell>
									<div className="ui transparent input">
										<input type="text" placeholder="0"/>
									</div>
								</Table.Cell>
							</Table.Row>
						</Table.Body>
					</Table>
				</div>	
			</div>
		);
	}
}

export default Inventory;