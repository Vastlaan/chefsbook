import React from 'react';
import Logo from '../img/logo2.png';
import Icons3 from '../img/sprite3.svg';

class Header extends React.Component {

	render(){
		
		return(
			<div className='header'>
				<div className='header__logo'><img src={Logo} alt='logo'/></div>
				{this.props.logged? 
					<div className='header__asLogged'>
						<a href='/' className='header__icon--box'>
							<svg className='header__icon'>
								<use xlinkHref={`${Icons3}#home`}></use>	
							</svg>
							<span>Home</span>
						</a>
						<a href='/recipes' className='header__icon--box'>
							<svg className='header__icon'>
								<use xlinkHref={`${Icons3}#cook`}></use>	
							</svg>
							<span>Recipes</span>
						</a>
						<a href='/calendar' className='header__icon--box'>
							<svg className='header__icon'>
								<use xlinkHref={`${Icons3}#calendar-1`}></use>	
							</svg>
							<span>Calendar</span>
						</a>
						<a href='/schedule' className='header__icon--box'>
							<svg className='header__icon'>
								<use xlinkHref={`${Icons3}#time-and-date`}></use>	
							</svg>
							<span>Schedule</span>
						</a>
						
						<a href="/api/logout" className='header__login header__login--width'>Log out</a>
					</div>
					:
					<a href="/login" className='header__login'>
						Log in
					</a>
				}
				
			</div>
			)
	}
}

export default Header;