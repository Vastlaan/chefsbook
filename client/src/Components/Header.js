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
				<div className='header__logo'><img src={Logo} alt='logo'/></div>
				{this.props.logged? 
					<div className='header__asLogged'>
						<a href='/' className='header__icon--box'>
							<svg className='header__icon'>
								<use xlinkHref={`${Icons}#icon-home1`}></use>	
							</svg>
							<span>Home</span>
						</a>
						<a href='/new_recepie' className='header__icon--box'>
							<svg className='header__icon'>
								<use xlinkHref={`${Icons}#icon-book`}></use>	
							</svg>
							<span>New Recepie</span>
						</a>
						<a href='/calendar' className='header__icon--box'>
							<svg className='header__icon'>
								<use xlinkHref={`${Icons}#icon-event_available`}></use>	
							</svg>
							<span>Calendar</span>
						</a>
						<a href='/schedule' className='header__icon--box'>
							<svg className='header__icon'>
								<use xlinkHref={`${Icons}#icon-assignment`}></use>	
							</svg>
							<span>Schedule</span>
						</a>
						
						<a href="/api/logout" className='header__login'>Log out</a>
					</div>
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