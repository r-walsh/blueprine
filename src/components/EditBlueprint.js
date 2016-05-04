import React from 'react';
import PureComponent from 'react-pure-render/component';
import Radium from 'radium';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import { ModalContainer, ModalDialog } from 'react-modal-dialog'

import store from '../store';
import { togglePlanningItemModal } from '../ducks/modal';

import { colors, addButtonStyle } from '../constants/styles';

import ItemHeader from './ItemHeader';
import PlanningItems from './PlanningItems';
import FeatureModal from './FeatureModal';
import ViewModal from './ViewModal';
import EndpointModal from './EndpointModal';
import ModelModal from './ModelModal';

import BlueprintSrvc from '../services/blueprintSrvc';
import LoginSrvc from '../services/loginSrvc';


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
			LoginSrvc.verifyAuth();
		}

		if ( this.props.blueprints.get(`selectedBlueprint`) == Map() || this.props.blueprints.getIn([`selectedBlueprint`, `_id`]) !== this.props.params.blueprintId ) {
			new Promise( ( resolve, reject ) => {
				BlueprintSrvc.getBlueprintById( this.props.params.blueprintId, resolve, reject );
			})
			.then( blueprint => {
				this.setState({ blueprint })
			})
			.catch( err => console.error( err ));
		}
	}

	modalClose() {
		store.dispatch( togglePlanningItemModal( false, `` ) );
	}

	toggleEditField( field, changed, newValue, blueprintId ) {
		this.setState({ [ field ]: !this.state[ field ] });

		if ( changed && this.props.blueprints.getIn([`selectedBlueprint`, changed ]) !== newValue ) {
			BlueprintSrvc.updateTopLevel( changed, newValue, blueprintId );
		}
	}

	handleChange( field, event ) {
		this.setState({ blueprint: { ...this.state.blueprint, [ field ]: event.target.value } });
	}

	calculateCompletionTotal( items ) {
		const completion = ( ( BlueprintSrvc.checkCompletion( items ) / items.length ) * 100 ).toFixed( 2 );

		return isNaN( completion ) ? 0 : completion;
	}

	render() {
		const styles = this.getStyles();
		const modalItems = {
			  features: <FeatureModal
				  blueprint={ this.state.blueprint }
				  feature={ this.props.modal.getIn( [ `planningItemModal`, `item` ] ) }
			  />
			, views: <ViewModal
				blueprint={ this.state.blueprint }
				view={ this.props.modal.getIn( [ `planningItemModal`, `item` ] ) }
			/>
			, endpoints: <EndpointModal
				blueprint={ this.state.blueprint }
				endpoint={ this.props.modal.getIn( [ `planningItemModal`, `item` ] ) }
			/>
			, models: <ModelModal
				blueprint={ this.state.blueprint }
				model={ this.props.modal.getIn( [ `planningItemModal`, `item` ] ) }
			/>
		};


		// TODO Fix state management of this component so this nonsense isn't necessary
		let mvpCompletion = 0;
		let totalCompletion = 0;

		if ( this.state.blueprint.title ) {
			let all = [ ...this.state.blueprint.features, ...this.state.blueprint.models, ...this.state.blueprint.endpoints, ...this.state.blueprint.views ];

			totalCompletion = this.calculateCompletionTotal( all );

			mvpCompletion = this.calculateCompletionTotal( all.filter( item => item.mvp ) );
		}


		return (
			<div style={ styles.wrapper }>

				{ this.props.modal.getIn([ `planningItemModal`, `toggled` ]) &&
					<ModalContainer onClose={ this.modalClose.bind( this ) }>
						<ModalDialog onClose={ this.modalClose.bind( this ) }>
							{ modalItems[this.props.modal.getIn( [ `planningItemModal`, `type` ] ) ] }
						</ModalDialog>
					</ModalContainer>
				}

				<div style={ styles.planningItemWrapper }>
					<h2 style={ styles.title }>{ this.state.blueprint.title }</h2>
					<p style={ styles.description }><b>Description:</b> { this.state.blueprint.description }</p>

					<div style={ styles.completionWrapper }>
						<h4>MVP: { mvpCompletion }%</h4>
						<h4>Total: { totalCompletion }%</h4>
					</div>
				</div>

				<div style={ styles.planningItemWrapper }>
					<div style={ styles.ideaAndUsersWrapper }>
						<ItemHeader itemName="Idea" />
						{ this.state.blueprint.idea && !this.state.editIdea
							?
								<div>
									<p style={ styles.ideasAndUsers }>{ this.state.blueprint.idea }</p>
									<button key="editIdea"
											onClick={ this.toggleEditField.bind( this, `editIdea`, null ) }
											style={ addButtonStyle }>
										Edit
									</button>
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
												onClick={ this.toggleEditField.bind( this, `editIdea`, `idea`, this.state.blueprint.idea, this.props.params.blueprintId ) }
												style={ addButtonStyle }>
											Save
										</button>
										<button key="cancelIdea"
												style={ addButtonStyle }
												onClick={ this.toggleEditField.bind( this, `editIdea`, null ) }>
											Cancel
										</button>
									</div>
								:
									<button key="addIdea"
											onClick={ this.toggleEditField.bind( this, `editIdea`, null ) }
											style={ addButtonStyle }>
										<i className="fa fa-plus" />
									</button>
						}
					</div>

					<div style={ styles.ideaAndUsersWrapper }>
						<ItemHeader itemName="Users" />
						{ this.state.blueprint.users && !this.state.editUsers
							?
								<div>
									<p style={ styles.ideasAndUsers }>{ this.state.blueprint.users }</p>
									<button key="editUsers"
											onClick={ this.toggleEditField.bind( this, `editUsers`, null ) }
											style={ addButtonStyle }>
										Edit
									</button>
								</div>
							:
								this.state.editUsers
								?
									<div>
										<textarea style={ styles.textArea }
												  value={ this.state.blueprint.users }
												  onChange={ this.handleChange.bind( this, `users` ) }
												  rows="3" />
										<button key="saveUsers"
												onClick={ this.toggleEditField.bind( this, `editUsers`, `users`, this.state.blueprint.users, this.props.params.blueprintId ) }
												style={ addButtonStyle }>
											Save
										</button>
										<button key="cancelUsers"
												style={ addButtonStyle }
												onClick={ this.toggleEditField.bind( this, `editUsers`, null ) }>
											Cancel
										</button>
									</div>
								:
									<button key="addUsers"
											onClick={ this.toggleEditField.bind( this, `editUsers`, null ) }
											style={ addButtonStyle }>
										<i className="fa fa-plus" />
									</button>
						}
					</div>
				</div>

				<div style={ styles.planningItemWrapper }>
					<ItemHeader itemName="Features" />
					<PlanningItems
						blueprint={ this.state.blueprint }
						item={ this.props.blueprints.getIn([`selectedBlueprint`, `features`]) }
						type="features"
					/>
				</div>
				<div style={ styles.planningItemWrapper }>
					<ItemHeader itemName="Views" />
					<PlanningItems
						blueprint={ this.state.blueprint }
						item={ this.props.blueprints.getIn([`selectedBlueprint`, `views`]) }
						type="views"
					/>
				</div>
				<div style={ styles.planningItemWrapper }>
					<ItemHeader itemName="Endpoints" />
					<PlanningItems
						blueprint={ this.state.blueprint }
						item={ this.props.blueprints.getIn([`selectedBlueprint`, `endpoints`]) }
						type="endpoints"
					/>
				</div>
				<div style={ styles.planningItemWrapper }>
					<ItemHeader itemName="Models" />
					<PlanningItems
						blueprint={ this.state.blueprint }
						item={ this.props.blueprints.getIn([`selectedBlueprint`, `models`]) }
						type="models" />
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
				, height: `35%`
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
			, ideasAndUsers: {
				  height: 58
				, overflow: `scroll`
				, whiteSpace: `wrap`
				, wordBreak: `break-all`
				, marginBottom: -5
			}
			, ideaAndUsersWrapper: {
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
			, completionWrapper: {
				height: `35%`
				, width: `100%`
				, overflow: `hidden`
				, textAlign: `center`
			}
		}
	}
}

export default connect( state => ({ user: state.auth, blueprints: state.blueprint, modal: state.modal }))( Radium( EditBlueprint ));