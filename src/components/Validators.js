import React from 'react';
import PureComponent from 'react-pure-render/component';

export default class Validators extends PureComponent {
	constructor( props ) {
		super( props );

		this.state = { validators: {} };
	}

	render() {
		return (
			<div>
				<label htmlFor="">Required</label>
				<input
					checked={ this.state.validators._required }
					type="checkbox"
					value={ this.state.validators._required }
				/>
				<label htmlFor="">Default</label>
				<input
					checked={ this.state.validators._default }
					type="checkbox"
					value={ this.state.validators._default }
				/>

				<label htmlFor="">Index</label>
				<input
					checked={ this.state.validators._index }
					type="checkbox"
					value={ this.state.validators._index }
				/>
				{ this.props.type === `String`
					?
						<span>
							<label htmlFor="">Enum</label>
							<input
								checked={ this.state.validators._enum }
								type="checkbox"
								value={ this.state.validators._enum }
								/>
			
								<label htmlFor="">Match</label>
								<input
								checked={ this.state.validators._match }
								type="checkbox"
								value={ this.state.validators._match }
								/>
			
								<label htmlFor="">Min Length</label>
								<input
								checked={ this.state.validators.minLength }
								type="checkbox"
								value={ this.state.validators.minLength }
								/>
			
								<label htmlFor="">Max Length</label>
								<input
								checked={ this.state.validators._maxLength }
								type="checkbox"
								value={ this.state.validators._maxLength }
								/>
						</span>
					:
						null
				}
				
				{ this.props.type === `Number`
					?
						<span>
							<label htmlFor="">Min</label>
							<input
								checked={ this.state.validators._min }
								type="checkbox"
								value={ this.state.validators._min }
							/>
			
							<label htmlFor="">Max</label>
							<input
								checked={ this.state.validators._max }
								type="checkbox"
								value={ this.state.validators._max }
							/>
						</span>
					:
						null
				}
			</div>
		)
	}
}