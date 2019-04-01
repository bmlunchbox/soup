import React, {Component} from 'react';
import { Input, Table, Button } from 'semantic-ui-react'; 
import './menu.css';

class Menu extends Component {
	constructor(props){
		super(props);
		this.state = {
			menu: [],
			recipe: [],
			restrictions: []
		};

		this.loadRecipes = this.loadRecipes.bind(this);
	}

	loadRecipes(){

	}

	componentWillMount(){
		this.loadRecipes();
	}

	render(){
		return(
			<div>
				<h1 className="main-title">Menu</h1>
				<div className="portion-container">
					<label className="sub-title">Target Portions: </label>
					<span className="portion-target-input">
						<Input className="portion-target-input" type="number" defaultValue={100}></Input>
					</span>
				</div>
				<div className="section-one">
					<div className="menu-table">
						<Table className="ui table">
							<Table.Header>
								<Table.Row>
									<Table.HeaderCell className="eight wide" textAlign='center'>Menu Item</Table.HeaderCell>
									<Table.HeaderCell className="four wide" textAlign='center'>Portions</Table.HeaderCell>
									<Table.HeaderCell className="four wide" textAlign='center'>Restriction</Table.HeaderCell>
								</Table.Row>
							</Table.Header>
							<Table.Body>
							</Table.Body>
						</Table>
					</div>
					<div className="restriction-table">
						<Table className="ui table celled">
							<Table.Header>
								<Table.Row>
									<Table.HeaderCell className="ten wide" textAlign='center'>Restriction Type</Table.HeaderCell>
									<Table.HeaderCell className="six wide" textAlign='center'>Estimated</Table.HeaderCell>
								</Table.Row>
							</Table.Header>
							<Table.Body>
							</Table.Body>
						</Table>
					</div>
					<Button>Reset</Button>
				</div>
				<h1>Recipes</h1>
				<div className="recipe-table">
					<Table className="ui table celled">
						<Table.Header>
							<Table.Row>
								<Table.HeaderCell className="six wide" textAlign='center'>Recipe</Table.HeaderCell>
								<Table.HeaderCell className="three wide" textAlign='center'>Available</Table.HeaderCell>
								<Table.HeaderCell className="four wide" textAlign='center'>Restriction</Table.HeaderCell>
								<Table.HeaderCell className="three wide" textAlign='center'>Portions</Table.HeaderCell>
							</Table.Row>
						</Table.Header>
						<Table.Body>
						</Table.Body>
					</Table>
				</div>
			</div>
		);
	}
}

export default Menu;