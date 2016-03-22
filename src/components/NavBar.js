import React from 'react';
import PureComponent from '../../node_modules/react-pure-render/component';
import Radium, { Style } from 'radium';

import { colors } from '../constants/styles';

@Radium
export default class NavBar extends PureComponent {
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
					<li style={ styles.navItem }><a href="/#/login">Login</a></li>
					<li style={ styles.navItem }><a href="/#/">Settings</a></li>
					<li style={ styles.navItem }><a href="/#/">Home</a></li>
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