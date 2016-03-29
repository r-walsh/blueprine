import React from 'react';
import PureComponent from 'react-pure-render/component';
import Radium from 'radium';
import { connect } from 'react-redux';

import BlueprintSrvc from '../services/blueprintSrvc';

import BlueprintRecent from './BlueprintRecent';

import { colors } from '../constants/styles';

class Blueprints extends PureComponent {
	constructor( props ) {
		super( props );

		this.state = {
			  blueprints: []
			, recent: null
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

	render() {
		const styles = this.getStyles();

		if ( this.state.recent ) {
			var recent = this.state.recent.map( blueprint => <BlueprintRecent key={ blueprint.id } { ...blueprint } /> );
		}

		return (
			<div className="blueprints-wrapper">
				<div style={ styles.mostRecent } className="most-recent">
					<h2 style={ styles.header }>Most Recent Projects:</h2>
					<button style={ styles.newProject }>New Project</button>
					{ recent }
				</div>
				<div style={ styles.list } className="blueprints-list">
					
				</div>
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