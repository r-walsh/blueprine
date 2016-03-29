import React from 'react';
import PureComponent from 'react-pure-render/component';
import Radium from 'radium';

class Blueprint extends PureComponent {
	constructor( props ) {
		super( props );
	}

	render() {
		const styles = this.getStyles();

		return (
			<div style={ styles.wrapper } className="blueprint-wrapper">
				<div style={ styles.previewWrapper } className="preview-wrapper">
					<img src={ this.props.preview } alt="Blueprint preview"/>
				</div>
			</div>
		)
	}

	getStyles() {
		return {
			  wrapper: {
				  width: `80%`
				, margin: `0 auto`
			}
			, previewWrapper: {
				  width: `40%`
				, height: this.props.preview ? `auto` : 100
				, border: `1px solid black`
				, margin: `0 auto`
			}
			, preview: {
				  height: `100%`
				, width: `auto`
			}
		}
	}
}

export default Radium( Blueprint );