import React from 'react'

const Footer =()=>{
	return(
		<div className='footer'>
			
			<ul className='footer__list'>
				<a href='/privacy_policy' className='footer__list--item'>Privacy policy</a>
				<li className='footer__list--item'>Author</li>
				<li className='footer__list--item'>Cookies</li>
				<li className='footer__list--item'>Contact</li>
			</ul>
			<p className='footer__text'>&copy; This website has been created by <span>Michał Antczak</span> . All rights reserved.</p>
		</div>
		)
}

export default Footer;