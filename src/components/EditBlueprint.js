import React from 'react';
import PureComponent from 'react-pure-render/component';
import Radium from 'radium';
import { connect } from 'react-redux';
import request from 'superagent';
import { browserHistory } from 'react-router';
import { Map } from 'immutable';

import { colors, addButtonStyle } from '../constants/styles';

import ItemHeader from './ItemHeader';
import PlanningItems from './PlanningItems';

import BlueprintSrvc from '../services/blueprintSrvc';
import store from '../store';
import { setUser } from '../ducks/auth';

class EditBlueprint extends PureComponent {
	constructor( props ) {
		super( props );

		this.state = {
			  editIdea: false
			, editUsers: false
		}
	}

	componentWillMount() {
		if ( !this.props.user.get(`loggedIn`) ) {
			request.get(`/api/verify-auth`, ( err, user ) => {
				if ( err ) {
					return browserHistory.push(`/login`);
				}

				store.dispatch( setUser( user.body ) );
			});
		}

		if ( !this.props.blueprints.get(`selectedBlueprint`) ) {
			BlueprintSrvc.getBlueprintById( this.props.params.blueprintId );
		}
	}

	editField( field ) {
		this.setState({ [field]: !this.state[field] })
	}

	render() {
		const styles = this.getStyles();
		let blueprint = {};

		if ( this.props.blueprints.get( `selectedBlueprint` ) ) {
			blueprint = this.props.blueprints.get( `selectedBlueprint` ).toJS();
		}

		return (
			<div style={ styles.wrapper }>
				<div style={ styles.planningItemWrapper }>
					<h2 style={ styles.title }>{ blueprint.title }</h2>
					<p style={ styles.description }><b>Description:</b> { blueprint.description }</p>
				</div>
				<div style={ styles.planningItemWrapper }>
					<div style={ styles.ideaAndUsers }>
						<ItemHeader itemName="Idea" />
						{ blueprint.idea
							?
								<div>
									<p>{ blueprint.idea }</p>
									<button key="editIdea" style={ addButtonStyle }>Edit</button>
								</div>
							:
								this.state.editIdea
								?
									<div>
										<textarea style={ styles.textArea }
													  value={ blueprint.idea }
													  rows="3" />
										<button key="saveIdea"
												onClick={ this.editField.bind( this, `editIdea` ) }
												style={ addButtonStyle }>
											Save
										</button>
									</div>
								:
									<button key="addIdea"
											onClick={ this.editField.bind( this, `editIdea` ) }
											style={ addButtonStyle }>
										<i className="fa fa-plus" />
									</button>
						}
					</div>
					<div style={ styles.ideaAndUsers }>
						<ItemHeader itemName="Users" />
						{ blueprint.users
							?
								<p>{ blueprint.users }</p>
							:
								this.state.editUsers
								?
									<div>
										<textarea style={ styles.textArea }
												  value={ blueprint.users }
												  rows="3" />
										<button key="saveUsers"
												onClick={ this.editField.bind( this, `editUsers` ) }
												style={ addButtonStyle }>
											Save
										</button>
									</div>
								:
									<button key="addUsers"
											onClick={ this.editField.bind( this, `editUsers` ) }
											style={ addButtonStyle }>
										<i className="fa fa-plus" />
									</button>
						}
					</div>
				</div>
				<div style={ styles.planningItemWrapper }>
					<ItemHeader itemName="Features" />
					<PlanningItems item={ blueprint.features } />
				</div>
				<div style={ styles.planningItemWrapper }>
					<ItemHeader itemName="Views" />
					<PlanningItems item={ blueprint.features } />
				</div>
				<div style={ styles.planningItemWrapper }>
					<ItemHeader itemName="Endpoints" />
					<PlanningItems item={ blueprint.features } />
				</div>
				<div style={ styles.planningItemWrapper }>
					<ItemHeader itemName="Models" />
					<PlanningItems item={ blueprint.features } />
				</div>
			</div>
		);
	}

	getStyles() {
		return {
			wrapper: {
				  height: window.innerHeight - 70
				, overflow: `hidden`
				, display: `flex`
				, flexFlow: `row wrap`
				, justifyContent: `space-around`
			}
			, title: {
				textAlign: `center`
			}
			, description: {
				lineHeight: `1.2em`
			}
			, planningItemWrapper: {
				  width: `33%`
				, height: `50%`
				, borderLeft: `1px solid ${ colors.gray }`
				, borderRight: `1px solid ${ colors.gray }`
				, overflow: `hidden`
				, flexGrow: 1
				, boxSizing: `border-box`
				, padding: 10
				, overflow: `scroll`
			}
			, ideaAndUsers: {
				  height: `50%`
				, overflow: `scroll`
			}
			, addButton: {
				  border: `none`
				, borderRadius: 4
				, backgroundColor: colors.paleBlue
				, color: colors.white
				, margin: `15px 0 0 15px`
				, display: `block`
				, ':focus': {
					outline: `none`
				}
				, ':hover': {
					backgroundColor: colors.lightBlue
				}
			}
			, textArea: {
				  width: `98%`
				, height: `90%`
				, marginTop: 10
				, resize: `none`
				, borderRadius: 2
				, borderColor: colors.blue
			}
		}
	}
}

export default connect( state => ({ user: state.auth, blueprints: state.blueprint }))( Radium( EditBlueprint ));