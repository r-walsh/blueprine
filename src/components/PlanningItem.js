import React from 'react';
import PureComponent from 'react-pure-render/component';
import Radium from 'radium';

import store from '../store';
import { togglePlanningItemModal } from '../ducks/modal';

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

	openPlanningItemModal() {
		store.dispatch( togglePlanningItemModal( true, `feature`, {
			  name: this.props.name
			, feature: this.props.feature
			, mvp: this.props.mvp
		} ))
	}

	render() {
		const styles = this.getStyles();

		return (
			<div style={ styles.itemWrapper }>
				<div style={ styles.item } onClick={ this.openPlanningItemModal.bind( this ) }>
					<div style={ styles.innerItem }>{ this.props.name }</div>
					<div style={ styles.innerItem }>{ this.props.mvp ? <i style={ styles.check } className="fa fa-check" /> : null }</div>
				</div>
				<div
					onClick={ () => console.log(`test`) }
					style={ styles.completeWrapper }
				>
					<div style={ styles.complete }
						 onClick={ () => console.log(`test`) }
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
				, width: `66%`
				, textAlign: `center`
			}
			, innerItem: {
				display: `inline-block`
				, width: `50%`
			}
			, complete: {
				  width: `50%`
				, margin: `0 auto`
				, textAlign: `center`
			}
			, completeWrapper: {
				width: `33%`
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