import React, {Component} from 'react';
import { Table, Modal } from 'semantic-ui-react';
import InventoryForm from './form';
import * as apiCalls from "../apis/inventory";
import './inventory.css';

const RowEntry = ({item, stock, restriction}) => {
	return(
		<Table.Row>
			<Table.Cell>{item}</Table.Cell>
			<Table.Cell>
				<div className="ui transparent input">
					<input type="number" min="0" defaultValue={stock}/>
				</div>
			</Table.Cell>
			<Table.Cell>{restriction}</Table.Cell>
		</Table.Row>
	);
}

class Inventory extends Component {
	constructor(props){
		super(props);
		this.state = {
			restriction: [],
			inventory: [],
			showForm: false
		};

		this.handleOpenModal = this.handleOpenModal.bind(this);
		this.handleCloseModal = this.handleCloseModal.bind(this);
		this.handleSave = this.handleSave.bind(this);
	}

	async loadInventory(){
		let response = await apiCalls.getInventory();
		if (response.status === 200 && response.response) {
			const inventory = response.response.map((entry) => (
				{
					id: entry.name,
					item: entry.name,
					stock: entry.stock,
					restriction: entry.description
				}
			));
			this.setState({inventory});	
		}
	}

	async loadRestrictions(){
		let response = await apiCalls.getRestrictions();
		if (response.status === 200 && response.response) {
			const restriction = response.response.map((entry) => (
				{
					id: entry.restriction_id,
					description: entry.description
				}
			));
			this.setState({restriction});
		}
	}

	componentWillMount(){
		this.loadRestrictions();
		this.loadInventory();
	}

	handleOpenModal(){
		this.setState({showForm: true});
	}

	handleCloseModal(){
		this.setState({showForm: false});
	}

	async handleSave(inventory){
		const api_obj = {
			item: inventory.item,
			restriction_id: inventory.restriction_id,
			stock: inventory.stock
		};
		await apiCalls.addInventory(api_obj);
		this.setState((prevState, props) => {
			const newInventory = {...inventory, id: inventory.item};
			return {
				inventory: [...this.state.inventory, newInventory],
				showForm: false
			}
		});
	}

	render(){
		const entries = this.state.inventory.map((elem) => (
			<RowEntry key={elem.id} {...elem}/>
		));
		const {restriction, showForm} = this.state;

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
						restriction={restriction}
						onSave={this.handleSave}
						onClose={this.handleCloseModal}
					/>
				</Modal>
				<h2 className="title">Inventory</h2>
				<div className="table-container">
					<Table celled className="ui table">
						<Table.Header>
							<Table.Row>
								<Table.HeaderCell className="ten wide" textAlign='center'>Item</Table.HeaderCell>
								<Table.HeaderCell className="three wide" textAlign='center'>Stock</Table.HeaderCell>
								<Table.HeaderCell className="three wide" textAlign='center'>Restriction</Table.HeaderCell>
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