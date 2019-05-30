import React from 'react';
import { connect } from 'react-redux'
import { hidePopup } from '../actions'

class CookiesPopup extends React.Component {


	render(){
		
		const hide =() =>{
			const checkbox = document.querySelector('.cookiesPopup__checkbox')
		
			if(checkbox.checked){
				this.props.hidePopup()
				this.forceUpdate()
			}else{
				document.querySelector('.cookiesPopup').style.display='none'
			}

		}
		return(
			<div className="cookiesPopup" style={{display: this.props.cookiesPopup}}>
				<p>This website uses cookies to provide you great user experiance. By using this website you accept our <a href='/privacy_policy'>Privacy</a> and <a href='/cookies'>Cookies</a>  Policies.</p>
				<div>
					<input className="cookiesPopup__checkbox" type='checkbox'/>
					<label forhtml='checkbox'>Don't show this message again.</label>
				</div>
				<button className="cookiesPopup__dismiss" onClick={()=>{hide()}}>Yes, I'm aware of that.</button>
			</div>
			)
	}
	
}

const mapStateToProps = (state) =>({
	cookiesPopup: state.hidePopup.cookiesPopup
})

export default connect(mapStateToProps, { hidePopup })(CookiesPopup)