import React from 'react';
import PureComponent from '../../node_modules/react-pure-render/component';
import { Link } from 'react-router';
import Radium, { Style } from 'radium';
import { connect } from 'react-redux';

import { colors } from '../constants/styles';

class NavBar extends PureComponent {
	render() {
		const styles = this.getStyles();
		return (
			<nav className="nav-bar" style={ styles.navWrapper }>
				<Style scopeSelector=".nav-bar"
					   rules={ styles.navLink } />
				<div style={ styles.logoWrapper }>
					<a href="/#/">
						<img style={ styles.logo } src="./assets/DevMtnLogo.png" alt="DevMtn"/>
					</a>
				</div>
				<ul style={ styles.navList }>
					{ this.props.user.get( `loggedIn` )
						?
							<span>
								<li style={ styles.navItem }><Link to="/groups">Groups</Link></li>
								<li style={ styles.navItem }><Link to="/blueprints">Blueprints</Link></li>
							</span>
						:
							<li style={ styles.navItem }><Link to="/login">Login</Link></li>
					}
					<li style={ styles.navItem }><Link to="/">Home</Link></li>
				</ul>
			</nav>
		);
	}

	getStyles() {
		return {
			navWrapper: {
				  background: colors.blue
				, width: `100%`
				, height: 70
			}
			, navList: {
				  float: `right`
				, listStyleType: `none`
			}
			, navItem: {
				  float: `right`
				, margin: `10px 15px 0 0`
				, color: colors.white
				, fontSize: `1.1em`
			}
			, navLink: {
				  a: {
					    color: colors.white
					  , textDecoration: `none`
				  }
				, 'a:visited': { color: colors.white }
				, 'a:hover': { textDecoration: `underline` }
			}
			, logoWrapper: {
				  height: 63
				, width: 63
				, marginLeft: 15
				, display: `inline-block`
			}
			, logo: {
				  height: `95%`
				, width: `auto`
				, marginTop: `7.5%`
			}
		}
	}
}

export default connect( state => ({ user: state.auth }))( Radium( NavBar ) );
