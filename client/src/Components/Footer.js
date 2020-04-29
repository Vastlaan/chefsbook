import React from 'react'

const Footer =({logged})=>{
	return(
		<div className='footer' style={logged?null:{marginBottom:0}}>
			
			<ul className='footer__list'>
				<a href='/privacy_policy' className='footer__list--item yellow'><span>Privacy</span></a>
				<a href='https://blog.michalantczak.com' className='footer__list--item brown'><span>Blog</span></a>
				<a href='/cookies' className='footer__list--item brown--dark'><span>Cookies</span></a>
				<a href='/author' className='footer__list--item green'><span>Contact</span></a>
			</ul>
			<p className='footer__text'>&copy; This website has been created by <span onClick={()=>window.location.href="https://www.michalantczak.com"}>Michał Antczak</span>. All rights reserved.</p>
		</div>
		)
}

export default Footer;