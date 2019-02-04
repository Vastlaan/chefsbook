import React from 'react'

const Footer =()=>{
	return(
		<div className='footer'>
			<p className='footer__text'>&copy; This website has been created by <span>Michał Antczak</span> . All rights reserved.</p>
			<ul className='footer__list'>
				<li className='footer__list--item'>License</li>
				<li className='footer__list--item'>Author</li>
				<li className='footer__list--item'>Cookies</li>
				<li className='footer__list--item'>Contact</li>
			</ul>
		</div>
		)
}

export default Footer;