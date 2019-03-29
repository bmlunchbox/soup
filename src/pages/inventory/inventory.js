import React, {Component} from 'react';
import { Table, Modal } from 'semantic-ui-react';
import InventoryForm from './form';
import './inventory.css';

const RowEntry = ({item, stock}) => {
	return(
		<Table.Row>
			<Table.Cell>{item}</Table.Cell>
			<Table.Cell>
				<div className="ui transparent input">
					<input type="text" defaultValue={stock}/>
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
			nextId: 3,
			showForm: false
		};

		this.handleOpenModal = this.handleOpenModal.bind(this);
		this.handleCloseModal = this.handleCloseModal.bind(this);
		this.handleSave = this.handleSave.bind(this);
	}

	handleOpenModal(){
		this.setState({showForm: true});
	}

	handleCloseModal(){
		this.setState({showForm: false});
	}

	handleSave(inventory){
		this.setState((prevState, props) => {
			const newInventory = {...inventory, id: this.state.nextId};
			return {
				nextId: prevState.nextId + 1,
				inventory: [...this.state.inventory, newInventory],
				showForm: false
			}
		});
	}

	render(){
		const entries = this.state.inventory.map((elem) => (
			<RowEntry key={elem.id} {...elem}/>
		));
		const {showForm} = this.state;

		return(
			<div className="container">
				
				<Modal
					trigger={<div><button className="button-inventory" onClick={this.handleOpenModal}>Add Item</button></div>}
					centered={true}
					open={this.state.showForm}
					onClose={this.handleCloseModal}
					basic
					size='mini'
				>
					<InventoryForm
						onSave={this.handleSave}
						onClose={this.handleCloseModal}
					/>
				</Modal>
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