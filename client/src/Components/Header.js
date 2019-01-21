import React from 'react';
import Logo from '../img/logo2.png';
import Icons from '../img/sprite.svg';

class Header extends React.Component {
	state = {
		logged: false
	}

	render(){
		//console.log(this.props)
		return(
			<div className='header'>
				<a href="/" className='header__logo'><img src={Logo} alt='logo'/></a>
				{this.props.logged? 
					<a href="/api/logout" className='header__login'>Log out</a>
					:
					<a href="/auth/google" className='header__login'>
						<svg className='header__login-icon'>
							<use xlinkHref={`${Icons}#icon-google3`} />
						</svg>
						Log in with Google
					</a>
				}
				
			</div>
			)
	}
}

export default Header;