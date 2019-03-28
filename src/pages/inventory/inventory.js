import React, {Component} from 'react';
import { Table } from 'semantic-ui-react';
import './inventory.css';

const RowEntry = ({item, stock}) => {
	return(
		<Table.Row>
			<Table.Cell>{item}</Table.Cell>
			<Table.Cell>
				<div className="ui transparent input">
					<input type="text" placeholder={stock}/>
				</div>
			</Table.Cell>
		</Table.Row>
	);
}

class Inventory extends Component {
	constructor(props){
		super(props);
		this.state = {
			inventory: [
				{
					id: 0,
					item: "carrots",
					stock: 1000
				},
				{
					id: 1,
					item: "yes",
					stock: 123
				},
				{
					id: 2,
					item: "no",
					stock: 0
				}
			],
			nextId: 3
		};
	}

	render(){
		const entries = this.state.inventory.map((elem) => (
			<RowEntry key={elem.id} {...elem}/>
		));

		return(
			<div className="container">
				<div>
					<button className="button-inventory">Add Item</button>
				</div>
				<h2 className="title">Inventory</h2>
				<div className="table-container">
					<Table celled className="ui table">
						<Table.Header>
							<Table.Row>
								<Table.HeaderCell className="twelve wide" textAlign='center'>Item</Table.HeaderCell>
								<Table.HeaderCell className="four wide" textAlign='center'>Stock</Table.HeaderCell>
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

export default Inventory;