import React from 'react';
import PureComponent from 'react-pure-render/component';
import Radium from 'radium';
import { connect } from 'react-redux';
import { Link } from 'react-router'
import { ModalContainer, ModalDialog } from 'react-modal-dialog';

import BlueprintSrvc from '../services/blueprintSrvc';

import BlueprintRecent from './BlueprintRecent';
import BlueprintThumbnail from './BlueprintThumbnail';
import NewBlueprint from './NewBlueprint';

import { colors } from '../constants/styles';

class Blueprints extends PureComponent {
	constructor( props ) {
		super( props );

		this.state = {
			  blueprints: []
			, recent: null
			, search: false
			, searchText: ``
			, isShowingModal: false
		}
	}

	componentWillMount() {
		let dfd = new Promise( ( resolve, reject ) => {
			BlueprintSrvc.getBlueprints( resolve, reject )
		});

		dfd.then( res => {
			this.setState({
				  blueprints: res.blueprints
				, recent: res.recent
			})
		});
	}

	handleChange( field, event ) {
		this.setState({ [field]: event.target.value })
	}

	toggleSearch() {
		this.setState({
			  search: !this.state.search
			, searchText: ``
		});
	}

	modalClose() {
		this.setState({ isShowingModal: false });
	}

	modalOpen() {
		this.setState({ isShowingModal: true });
	}

	render() {
		const styles = this.getStyles();

		let recent, blueprints;
		if ( this.state.recent ) {
			recent = this.state.recent.map( blueprint => <BlueprintRecent key={ blueprint.id } { ...blueprint } /> );
			blueprints = this.state.blueprints.filter( blueprint => blueprint.title.toLowerCase().indexOf(this.state.searchText.toLowerCase()) !== -1)
												.map( blueprint => <Link key={ blueprint.id } style={ styles.listLink } to="/blueprints"><BlueprintThumbnail key={ blueprint.id } { ...blueprint } /></Link>);
		}

		return (
			<div className="blueprints-wrapper">
				{
					this.state.isShowingModal &&
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
										   onChange={ this.handleChange.bind(this, `searchText`) }
										   type="text"/>
									<i style={ styles.closeSearch }
									   onClick={ this.toggleSearch.bind(this) }
									   className="fa fa-times-circle">
									</i>
								</div>
							:
								<div style={ styles.listButtonContainer }>
									<button style={ styles.listButton }>Mine</button>
									<button style={ styles.listButton }>Shared</button>
									<button style={ styles.listButton } onClick={ this.toggleSearch.bind(this) }>Search</button>
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
			, search: {
				  width: `87%`
				, margin: `0 5px 0 0`
				, boxSizing: `border-box`
			}
			, closeSearch: {
				  cursor: `pointer`
				, fontSize: `1.1em`
			}
			, listButtonContainer: {
				  width: `100%`
				, marginTop: 8
				, height: 20
			}
			, listButton: {
				  width: `32%`
				, backgroundColor: colors.lightBlue
				, color: colors.white
				, fontSize: `.9em`
				, border: `none`
				, margin: `0 1px`
			}
		}
	}
}

export default connect( state => ({ user: state.auth }))( Radium(Blueprints) );