import React from 'react';
import PureComponent from 'react-pure-render/component'
import Radium from 'radium';

import store from '../store';
import { togglePlanningItemModal } from '../ducks/modal';

import { addButtonStyle } from '../constants/styles';

import PlanningItem from './PlanningItem';

class PlanningItems extends PureComponent {
	constructor( props ) {
		super( props );
	}
	
	openModal() {
		store.dispatch( togglePlanningItemModal( true, this.props.type, {} ));
	}

	render() {
		const styles = this.getStyles();

		let items;
		if ( this.props.item ) {
			items = this.props.item.map( item => {
				return (
					<PlanningItem name={ item.name } mvp={ item.mvp } complete={ item.complete } />
				);
			});
		}

		return (
			<div style={ styles.wrapper }>
				<button onClick={ this.openModal.bind( this ) }
						style={ [addButtonStyle, styles.buttonStyle] }>
					<i className="fa fa-plus" />
				</button>
				<div style={ styles.currentItemsOuterWrapper }>
					<div style={ styles.itemWrapper }>
						<div style={ styles.item }>Name</div>
						<div style={ styles.item }>MVP</div>
						<div style={ styles.item }>Complete</div>
					</div>
					<div style={ styles.currentItemsInnerWrapper}>
						{ items }
					</div>
				</div>
			</div>
		);
	}

	getStyles() {
		return {
			wrapper: {
				height: `85%`
			}
			, currentItemsOuterWrapper: {
				  width: `95%`
				, height: `86.5%`
				, boxSizing: `border-box`
				, margin: `10px auto`
				, border: `1px solid rgba(44, 71, 112, 0.6)`
				, borderRadius: 3
				, padding: 3
			}
			,  itemWrapper: {
				  display: `flex`
				, justifyContent: `space-around`
				, borderBottom: `1px solid rgba(44, 71, 112, 0.6)`
			}
			, item: {
				  display: `inline-block`
				, width: `33%`
				, textAlign: `center`
			}
			, buttonStyle: {
				fontSize: `.7em`
			}
			, currentItemsInnerWrapper: {
				  height: `100%`
				, width: `100%`
				, overflow: `scroll`
			}
		}
	}
}

export default Radium( PlanningItems );