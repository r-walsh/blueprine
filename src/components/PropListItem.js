import React from 'react';
import PureComponent from 'react-pure-render/component';
import Radium from 'radium';

import { colors } from '../constants/styles';

class PropListItem extends PureComponent {
	render() {
		const styles = this.getStyles();

		return (
			<div style={ styles.wrapper }>
				<section style={ styles.section }>
					{ this.props.propName }
				</section>
				<section style={ [ styles.section, styles.middleSection ] }>
					Type: { this.props._type }
				</section>
				<section style={ [ styles.section, styles.description ] }>
					{ this.props.description }
				</section>
			</div>
		);
	}

	getStyles() {
		return {
			wrapper: {
				width: `100%`
				, height: 20
				, marginTop: 20
			}
			, section: {
				width: `33%`
				, display: `inline-block`
				, boxSizing: `border-box`
				, paddingLeft: 20
				, height: `100%`
				, overflow: `hidden`
			}
			, middleSection: {
				borderLeft: `1px solid ${ colors.gray }`
				, borderRight: `1px solid ${ colors.gray }`
			}
			, description: {
				textOverflow: `ellipsis`
			}
		};
	}
}

export default Radium( PropListItem );