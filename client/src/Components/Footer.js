import React from 'react'

const Footer =()=>{
	return(
		<div className='footer'>
			
			<ul className='footer__list'>
				<a href='/privacy_policy' className='footer__list--item'>Privacy</a>
				<a href='/author' className='footer__list--item'>Author</a>
				<a href='/cookies' className='footer__list--item'>Cookies</a>
				<a href='/contact' className='footer__list--item'>Contact</a>
			</ul>
			<p className='footer__text'>&copy; This website has been created by <span>Michał Antczak</span>. All rights reserved.</p>
		</div>
		)
}

export default Footer;