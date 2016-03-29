import React from 'react';
import PureComponent from 'react-pure-render/component';
import Radium from 'radium';
import { connect } from 'react-redux';

import BlueprintSrvc from '../services/blueprintSrvc';

import Blueprint from './blueprint';

class Blueprints extends PureComponent {
	constructor( props ) {
		super( props );
	}

	render() {
		const styles = this.getStyles();
		let dfd = new Promise( ( resolve, reject ) => {
			BlueprintSrvc.getBlueprints( resolve, reject )
		});
		let recent, blueprints;

		dfd.then( res => {
			recent = res.recent;
			blueprints = res.blueprints.map( blueprint => {
				return (
					<div>
						<Blueprint recent={ false } { ...blueprint } />
					</div>
				);
			});
		});

		return (
			<div className="blueprints-wrapper">
				<div style={ styles.mostRecent } className="most-recent">
					<Blueprint recent={ true } { ...recent } />
				</div>
				<div style={ styles.list } className="blueprints-list">
					{ blueprints }
				</div>
			</div>
		)
	}

	getStyles() {
		return {
			mostRecent: {
				  boxSizing: `border-box`
				, width: `74.5%`
				, height: window.innerHeight - 70
				, borderRight: `2px solid #D4D5D6`
				, display: `inline-block`
			}
			, list: {
				  float: `right`
				, boxSizing: `border-box`
				, height: window.innerHeight - 70
				, width: `24.5%`
				, overflow: `scroll`
			}
		}
	}
}

export default connect( state => ({ user: state.auth }))( Radium(Blueprints) );