import React from 'react';
import PureComponent from 'react-pure-render/component';
import Radium from 'radium';

import blueprintSrvc from '../services/blueprintSrvc';

import { colors } from '../constants/styles';

class BlueprintRecent extends PureComponent {
	constructor( props ) {
		super( props );

		this.state = {
			  features: blueprintSrvc.checkCompletion( this.props.features )
			, views: blueprintSrvc.checkCompletion( this.props.views )
			, endpoints: blueprintSrvc.checkCompletion( this.props.endpoints )
			, models: blueprintSrvc.checkCompletion( this.props.models )
		};

	}

	calculateCompletionTotal() {
		const planningItems = [ ...this.props.features, ...this.props.views, ...this.props.endpoints, ...this.props.models ];
		return ( ( blueprintSrvc.checkCompletion( planningItems ) / planningItems.length ) * 100 ).toFixed( 2 );
	}

	render() {
		const styles = this.getStyles();

		return (
			<div style={ styles.wrapper } className="blueprint-wrapper">
				<h2 style={ styles.title }>{ this.props.title }</h2>
				<p>
					<span style={ styles.completion }>Overall Completion: </span>{ this.calculateCompletionTotal() }%
				</p>
				<p style={ styles.description }>
					<span style={ styles.completion }>Description: </span>{ this.props.description }
				</p>
				<section style={ styles.planningItemWrapper }>
					<div style={ styles.planningItem }>
						<p style={ styles.planningItemTitle }>Features</p>
						<span>
							{ this.state.features }/{ this.props.features.length }
						</span>
					</div>
					<div style={ styles.planningItem }>
						<p style={ styles.planningItemTitle }>Views</p>
						<span>
							{ this.state.views }/{ this.props.views.length }
						</span>
					</div>
					<div style={ styles.planningItem }>
						<p style={ styles.planningItemTitle }>Endpoints</p>
						<span>
						{ this.state.endpoints }/{ this.props.endpoints.length }
						</span>
					</div>
					<div style={ styles.planningItem }>
						<p style={ styles.planningItemTitle }>Models</p>
						<span>
							{ this.state.models }/{ this.props.models.length }
						</span>
					</div>
				</section>
			</div>
		);
	}

	getStyles() {
		return {
			wrapper: {
				  width: `75%`
				, height: window.innerHeight / 3
				, margin: `15px auto`
				, border: `2px solid ${ colors.blue }`
				, borderRadius: 2
				, padding: 10
			}
			, title: {
				  textAlign: `center`
				, textDecoration: `underline`
			}
			, completion: {
				fontWeight: `bold`
			}
			, description: {
				  height: 60
				, textOverflow: `ellipsis`
				, marginBottom: 10
			}
			, planningItemWrapper: {
				marginTop: 5
			}
			, planningItem: {
				  textAlign: `center`
				, display: `inline-block`
				, width: `25%`
			}
			, planningItemTitle: {
				  margin: `0 0 5px 0`
				, fontWeight: `bold`
			}
		};
	}
}

export default Radium( BlueprintRecent );