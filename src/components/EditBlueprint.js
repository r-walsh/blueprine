import React from 'react';
import PureComponent from 'react-pure-render/component';
import Radium from 'radium';
import { connect } from 'react-redux';
import request from 'superagent';
import { browserHistory } from 'react-router';

import { colors } from '../constants/styles';

import ItemHeader from './ItemHeader';

import BlueprintSrvc from '../services/blueprintSrvc';
import store from '../store';
import { setUser } from '../ducks/auth';

class EditBlueprint extends PureComponent {
	constructor( props ) {
		super( props );

		this.state = {
			blueprint: {}
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

		let dfd = new Promise( ( resolve, reject ) => {
			BlueprintSrvc.getBlueprintById( this.props.params.blueprintId, resolve, reject );
		})
		.then( ( res ) => {
			return this.setState({ blueprint: res });
		})
		.catch( ( err ) => {
			return console.error( err );
		});
	}

	render() {
		const styles = this.getStyles();

		return (
			<div style={ styles.wrapper }>
				<div style={ styles.planningItemWrapper }>
					<h2>{ this.state.blueprint.title }</h2>
					<p><b>Description:</b> { this.state.blueprint.description }</p>
				</div>
				<div style={ styles.planningItemWrapper }>
					<div style={ styles.ideaAndUsers }>
						<ItemHeader itemName="Idea" />
						{ this.state.blueprint.idea
							?
								<p>{ this.state.blueprint.idea }</p>
							:
								null
						}
					</div>
					<div style={ styles.ideaAndUsers }>
						<ItemHeader itemName="Users" />
						{ this.state.blueprint.users
							?
							<p>{ this.state.blueprint.users }</p>
							:
							null
						}
					</div>
				</div>
				<div style={ styles.planningItemWrapper }>
					<ItemHeader itemName="Features" />
				</div>
				<div style={ styles.planningItemWrapper }>
					<ItemHeader itemName="Views" />
				</div>
				<div style={ styles.planningItemWrapper }>
					<ItemHeader itemName="Endpoints" />
				</div>
				<div style={ styles.planningItemWrapper }>
					<ItemHeader itemName="Models" />
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
			}
		}
	}
}

export default connect( state => ({ user: state.auth }))( Radium( EditBlueprint ));