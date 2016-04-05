import React from 'react';
import PureComponent from 'react-pure-render/component';
import Radium from 'radium';

class PlanningItem extends PureComponent {
	constructor( props ) {
		super( props );
	}

	render() {
		const styles = this.getStyles();

		return (
			<div style={ styles.itemWrapper }>
				<div style={ styles.item }>{ this.props.name }</div>
				<div style={ styles.item }>{ this.props.mvp ? <i style={ styles.check } className="fa fa-check" /> : <i style={ style.cross } className="fa fa-times" /> }</div>
				<div style={ styles.item }>{ this.props.mvp ? <i style={ styles.check } className="fa fa-check" /> : <i style={ style.cross } className="fa fa-times" /> }</div>
			</div>
		);
	}

	getStyles() {
		return {
			itemWrapper: {
				  display: `flex`
				, justifyContent: `space-around`
			}
			, item: {
				  display: `inline-block`
				, width: `33%`
				, textAlign: `center`
			}
			, check: {
				color: `green`
			}
			, cross: {
				color: `red`
			}
		}
	}
}

export default Radium( PlanningItem );