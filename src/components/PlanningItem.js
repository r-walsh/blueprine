import React from 'react';
import PureComponent from 'react-pure-render/component';
import Radium from 'radium';

import { colors } from '../constants/styles';

class PlanningItem extends PureComponent {
	constructor( props ) {
		super( props );

		this.state = {
			hovering: false
		};
	}

	crossToCheck() {
		this.setState({ hovering: !this.state.hovering });
	}

	render() {
		const styles = this.getStyles();

		return (
			<div style={ styles.itemWrapper }>
				<div style={ styles.item }>{ this.props.name }</div>
				<div style={ styles.item }>{ this.props.mvp ? <i style={ styles.check } className="fa fa-check" /> : null }</div>
				<div style={ styles.item }>
					<div style={ styles.complete }
						 onMouseEnter={ this.crossToCheck.bind( this ) }
						 onMouseLeave={ this.crossToCheck.bind( this ) }>
						{ this.props.complete || this.state.hovering ? <i style={ styles.check } className="fa fa-check" /> : <i style={ styles.cross } className="fa fa-times" /> }
					</div>
				</div>
			</div>
		);
	}

	getStyles() {
		return {
			itemWrapper: {
				  display: `flex`
				, justifyContent: `space-around`
				, cursor: `pointer`
				, borderBottom: `1px solid ${ colors.gray }`
				, ':hover': {
					outline: `1px solid ${ colors.lightBlue }`
				}
			}
			, item: {
				  display: `inline-block`
				, width: `33%`
				, textAlign: `center`
			}
			, complete: {
				  borderRadius: 2
				, width: `50%`
				, margin: `0 auto`
			}
			, check: {
				color: `#56AF56`
			}
			, cross: {
				color: `#D03939`
			}
		}
	}
}

export default Radium( PlanningItem );