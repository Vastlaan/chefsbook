import React from 'react'
import Signin from '../img/btn_google_signin.png'
import {connect} from 'react-redux'


class Login extends React.Component{

	login = (event) =>{

		event.preventDefault();
		const email = document.querySelector('.login__email').value
		const password = document.querySelector('.login__password').value

		fetch('/api/login', {
			method:'POST',
			headers:{
				"Content-Type":"application/json"
			},
			body: JSON.stringify({
				email: email,
				password: password})
		}).then(res=>res.json())
		.then(data=>{
			if(data==='yes'){
				window.location.href = '/'
			}
		})
		.catch(err=>console.log(err))
	}

	register = () =>{
		const email = document.querySelector('.login__email').value
		const password = document.querySelector('.login__password').value

		fetch('/api/register', {
			method:'POST',
			headers:{
				"Content-Type":"application/json"
			},
			body: JSON.stringify({
				email: email,
				password: password})
		}).then(res=>res.json())
		.then(data=>console.log(data))
		.catch(err=>console.log(err))
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
					<button className='login__signup' onClick={()=>this.register()}>Register new account</button>
				</form>

				<p className='login__or'>or</p>
				<a className='login__google' href='/auth/google'><img src={Signin} alt='login'/></a>
			</div>
			)
	}
}


export default connect(null,null)(Login);