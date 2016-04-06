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
			, blueprint: this.props.blueprints.get(`selectedBlueprint`).toJS()
		};

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

		if ( this.props.blueprints.get(`selectedBlueprint`) == Map() ) {
			BlueprintSrvc.getBlueprintById( this.props.params.blueprintId );
		}
	}

	editField( field, changed, newValue, blueprintId ) {
		this.setState({ [field]: !this.state[field] });

		if ( changed ) {
			BlueprintSrvc.updateTopLevel( changed, newValue, blueprintId );
		}
	}

	handleChange( field, event ) {
		this.setState({ [field]: event.target.value });
	}

	render() {
		const styles = this.getStyles();

		return (
			<div style={ styles.wrapper }>
				<div style={ styles.planningItemWrapper }>
					<h2 style={ styles.title }>{ this.state.blueprint.title }</h2>
					<p style={ styles.description }><b>Description:</b> { this.state.blueprint.description }</p>
				</div>
				<div style={ styles.planningItemWrapper }>
					<div style={ styles.ideaAndUsers }>
						<ItemHeader itemName="Idea" />
						{ this.state.blueprint.idea
							?
								<div>
									<p>{ this.state.blueprint.idea }</p>
									<button key="editIdea" style={ addButtonStyle }>Edit</button>
								</div>
							:
								this.state.editIdea
								?
									<div>
										<textarea style={ styles.textArea }
												  value={ this.state.blueprint.idea }
												  onChange={ this.handleChange.bind( this, `idea` ) }
												  rows="3" />
										<button key="saveIdea"
												onClick={ this.editField.bind( this, `editIdea`, `idea`, this.state.blueprint.idea, this.props.params.blueprintId ) }
												style={ addButtonStyle }>
											Save
										</button>
									</div>
								:
									<button key="addIdea"
											onClick={ this.editField.bind( this, `editIdea`, null ) }
											style={ addButtonStyle }>
										<i className="fa fa-plus" />
									</button>
						}
					</div>
					<div style={ styles.ideaAndUsers }>
						<ItemHeader itemName="Users" />
						{ this.state.blueprint.users
							?
								<p>{ this.state.blueprint.users }</p>
							:
								this.state.editUsers
								?
									<div>
										<textarea style={ styles.textArea }
												  value={ this.state.blueprint.users }
												  rows="3" />
										<button key="saveUsers"
												onClick={ this.editField.bind( this, `editUsers` ) }
												style={ addButtonStyle }>
											Save
										</button>
									</div>
								:
									<button key="addUsers"
											onClick={ this.editField.bind( this, `editUsers`, null ) }
											style={ addButtonStyle }>
										<i className="fa fa-plus" />
									</button>
						}
					</div>
				</div>
				<div style={ styles.planningItemWrapper }>
					<ItemHeader itemName="Features" />
					<PlanningItems item={ this.state.blueprint.features } />
				</div>
				<div style={ styles.planningItemWrapper }>
					<ItemHeader itemName="Views" />
					<PlanningItems item={ this.state.blueprint.features } />
				</div>
				<div style={ styles.planningItemWrapper }>
					<ItemHeader itemName="Endpoints" />
					<PlanningItems item={ this.state.blueprint.features } />
				</div>
				<div style={ styles.planningItemWrapper }>
					<ItemHeader itemName="Models" />
					<PlanningItems item={ this.state.blueprint.features } />
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