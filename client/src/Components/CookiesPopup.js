import React from 'react';

class CookiesPopup extends React.Component {

	render(){
		return(
			<div className="cookiesPopup">
				<p>This website uses cookies to provide you great user experiance. By using this website you accept our <a href='/privacy_policy'>Privacy</a> and <a href='/cookies'>Cookies</a>  Policies.</p>
				<button onClick={()=>{document.querySelector('.cookiesPopup').style.display="none"}}>Yes, I'm aware of that.</button>
			</div>
			)
	}
	
}

export default CookiesPopup