import React from 'react';
import PureComponent from 'react-pure-render/component';
import Radium from 'radium';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router'
import { ModalContainer, ModalDialog } from 'react-modal-dialog';

import store from '../store';
import { toggleBlueprintModal } from '../ducks/modal';
import BlueprintSrvc from '../services/blueprintSrvc';

import BlueprintRecent from './BlueprintRecent';
import BlueprintThumbnail from './BlueprintThumbnail';
import NewBlueprint from './NewBlueprint';

import { colors } from '../constants/styles';

class Blueprints extends PureComponent {
	constructor( props ) {
		super( props );

		this.state = {
			  recent: null
			, search: false
			, searchText: ``
			, showOwnedOrShared: `ownedBlueprints`
		}
	}

	componentWillMount() {
		if ( !this.props.user.get(`loggedIn`) ) {
			return browserHistory.push(`/login`);
		}
		if ( this.props.blueprints.get(`ownedBlueprints`).count() === 0 || this.props.blueprints.get(`sharedBlueprints`).count() === 0 ) {
			BlueprintSrvc.getBlueprints()
		}
	}

	handleChange( field, event ) {
		this.setState({ [field]: event.target.value })
	}

	toggleOwnedOrShared( showOwnedOrShared ) {
		this.setState({ showOwnedOrShared });
	}

	constructBlueprints( owned, shared, styles ) {
		let all = [...owned, ...shared];
		return all.filter( blueprint => blueprint.title.toLowerCase().indexOf(this.state.searchText.toLowerCase()) !== -1)
					.sort( this.sortBlueprintsById )
					.map( blueprint => {
						return (
							<Link key={ blueprint._id }
								  style={ styles.listLink }
								  to={ `/blueprints/${ blueprint._id }`}>
								<div key={ blueprint._id } style={ styles.listItemContainer }>
									<BlueprintThumbnail key={ blueprint._id } { ...blueprint } />
								</div>
							</Link>
						)
					});
	}

	toggleSearch() {
		if ( !this.state.search ) {
			setTimeout( () => this.refs.searchBar.focus(), 20 );
		}

		this.setState({
			  search: !this.state.search
			, searchText: ``
		});
	}

	modalClose() {
		store.dispatch( toggleBlueprintModal( false ) );
	}

	modalOpen() {
		store.dispatch( toggleBlueprintModal( true ) );
	}

	sortBlueprintsById( a, b ) {
		return a._id < b._id;
	}

	render() {
		const styles = this.getStyles();

		let recent, blueprints;
		if ( this.props.blueprints.get(`ownedBlueprints`).count() > 0 || this.props.blueprints.get(`sharedBlueprints`).count() > 0 ) {
			recent = [...this.props.blueprints.get(`ownedBlueprints`).toJS(), ...this.props.blueprints.get(`sharedBlueprints`).toJS()]
								.sort( this.sortBlueprintsById )
								.splice(0, 2)
								.map( blueprint => <BlueprintRecent key={ blueprint._id } { ...blueprint } /> );

			if ( this.state.search ) {
				blueprints = this.constructBlueprints(
					  this.props.blueprints.get(`ownedBlueprints`).toJS()
					, this.props.blueprints.get(`sharedBlueprints`).toJS()
					, styles
				)
			} else {
				blueprints = this.constructBlueprints(
					  this.props.blueprints.get( this.state.showOwnedOrShared ).toJS()
					, []
					, styles
				)
			}
		}

		return (
			<div className="blueprints-wrapper">
				{
					this.props.modal.get(`blueprintModal`) &&
					<ModalContainer onClose={ this.modalClose.bind( this ) }>
						<ModalDialog onClose={ this.modalClose.bind( this ) }>
							<NewBlueprint />
						</ModalDialog>
					</ModalContainer>
				}
				<div style={ styles.mostRecent } className="most-recent">
					<h2 style={ styles.header }>Most Recent Projects:</h2>
					<button style={ styles.newProject }
							onClick={ this.modalOpen.bind( this ) }>
						New Project
					</button>
					{ recent ? recent : <h3 style={ styles.header }>You have no projects!</h3> }
				</div>
				<aside style={ styles.list } className="blueprints-list">
					<div className="list-header-container">
						{ this.state.search
							?
								<div style={ styles.listButtonContainer }>
									<input style={ styles.search }
										   value={ this.state.searchText }
										   ref="searchBar"
										   onChange={ this.handleChange.bind(this, `searchText`) }
										   type="text"/>
									<i style={ styles.closeSearch }
									   onClick={ this.toggleSearch.bind(this) }
									   className="fa fa-times-circle">
									</i>
								</div>
							:
								<div style={ styles.listButtonContainer }>
									<button onClick={ this.toggleOwnedOrShared.bind( this, `ownedBlueprints` ) }
											key="ownedBlueprints"
											style={[
												  styles.listButton
												, this.state.showOwnedOrShared === `ownedBlueprints`
												?
													styles.selectedButton
												:	null
												]}>
										Mine
									</button>
									<button onClick={ this.toggleOwnedOrShared.bind( this, `sharedBlueprints` ) }
											key="sharedBlueprints"
											style={[
												  styles.listButton
												, this.state.showOwnedOrShared === `sharedBlueprints`
												?
													styles.selectedButton
												:	null
												]}>
										Shared
									</button>
									<button onClick={ this.toggleSearch.bind(this) }
											key="search"
											style={ styles.listButton }>
										Search All
									</button>
								</div>
						}

					</div>
					{ blueprints }
				</aside>
			</div>
		)
	}

	getStyles() {
		return {
			header: {
				  marginLeft: 20
				, display: `inline-block`
			}
			, newProject: {
				  float: `right`
				, margin: `10px 10px 0 0`
				, backgroundColor: colors.lightBlue
				, color: colors.white
				, padding: `4px 10px`
				, border: `none`
				, outline: `1px solid #3bd4d7`
				, ':hover': {
					outline: `2px solid #3bd4d7`
				}
			}
			, mostRecent: {
				  boxSizing: `border-box`
				, width: `70%`
				, height: window.innerHeight - 70
				, borderRight: `2px solid #D4D5D6`
				, display: `inline-block`
			}
			, list: {
				  float: `right`
				, boxSizing: `border-box`
				, height: window.innerHeight - 70
				, width: `29.5%`
				, overflow: `scroll`
			}
			, listLink: {
				  textDecoration: `none`
				, color: `black`
			}
			, listItemContainer: {
				':hover': {
					outline: `2px solid ${ colors.lightBlue }`
				}
			}
			, search: {
				  width: `87%`
				, margin: `0 5px 0 0`
				, boxSizing: `border-box`
				, borderRadius: 3
				, border: `1px solid ${ colors.gray }`
				, ':focus': {
					outlineWidth: 2
				}
			}
			, closeSearch: {
				  cursor: `pointer`
				, fontSize: `1.1em`
			}
			, listButtonContainer: {
				  width: `100%`
				, margin: `8px 0`
				, height: 20
			}
			, listButton: {
				  width: `32%`
				, boxSizing: `border-box`
				, backgroundColor: colors.lightBlue
				, color: colors.white
				, fontSize: `.9em`
				, border: `1px solid ${ colors.blue }`
				, margin: `0 1px`
				, ':focus': {
					outline: `none`
				}
			}
			, selectedButton: {
				boxShadow: `inset 0 0 14px ${ colors.blue }`
			}
		}
	}
}

export default connect( state => ({ user: state.auth, modal: state.modal, blueprints: state.blueprint }))( Radium(Blueprints) );