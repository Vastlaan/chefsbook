import React from 'react'
import Signin from '../img/btn_google_signin.png'


class Login extends React.Component{

	login = (event) =>{

		event.preventDefault();
		const email = document.querySelector('.login__email').value
		const password = document.querySelector('.login__password').value

		console.log(email,password)
	}

	render(){
		this.login = this.login.bind(this);
		return(
			<div className='login'>
				<form className='login__form' onSubmit={this.login}>
					<label>E-mail</label>
					<input className='login__email' type='email' name='email'></input>

					<label>Password</label>
					<input className='login__password' type='password' name='password'></input>

					<button className='login__submit' type='submit'>Log in</button>
				</form>

				<p className='login__or'>or</p>
				<a className='login__google' href='/auth/google'><img src={Signin} alt='login'/></a>
			</div>
			)
	}
}

export default Login;