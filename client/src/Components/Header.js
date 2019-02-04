import React from 'react';
import Logo from '../img/logo2.png';
import Icons from '../img/sprite.svg';
import Icons2 from '../img/sprite2.svg';

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
								<use xlinkHref={`${Icons2}#internet`}></use>	
							</svg>
							<span>Home</span>
						</a>
						<a href='/new_recepie' className='header__icon--box'>
							<svg className='header__icon'>
								<use xlinkHref={`${Icons2}#cook`}></use>	
							</svg>
							<span>New Recipe</span>
						</a>
						<a href='/calendar' className='header__icon--box'>
							<svg className='header__icon'>
								<use xlinkHref={`${Icons2}#calendar`}></use>	
							</svg>
							<span>Calendar</span>
						</a>
						<a href='/schedule' className='header__icon--box'>
							<svg className='header__icon'>
								<use xlinkHref={`${Icons2}#calendar-1`}></use>	
							</svg>
							<span>Schedule</span>
						</a>
						
						<a href="/api/logout" className='header__login header__login--width'>Log out</a>
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