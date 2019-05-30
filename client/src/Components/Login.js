import React from 'react'
import Signin from '../img/btn_google_signin.png'
import {connect} from 'react-redux'


class Login extends React.Component{

	state ={
		confirmation:'',
		confirmationVisibility: false
	}

	login = (event) =>{

		event.preventDefault();
		const email = document.querySelector('.login__email').value
		const password = document.querySelector('.login__password').value

		fetch('/api/login', {
			method:'POST',
			credentials: "include",
			headers:{
				"Content-Type":"application/json"
			},
			body: JSON.stringify({
				email: email,
				password: password})
		}).then(res=>{
			if(res.status===401){
				this.setState({
					confirmation: "Wrong username or password!",
					confirmationVisibility: true
				})
			}
			return res.json()
		})
		.then(data=>{
			console.log(data)
			if(data==='yes'){
				window.location.href = '/'
			}else{
				this.setState({
					confirmation: data,
					confirmationVisibility: true
				})
			}
		})
		.catch(err=>console.log(err))
	}
	validateEmail =(email)=>{
		const re =/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		return re.test(email)
	}
	
	register = () =>{
		const email = document.querySelector('.login__email').value
		const password = document.querySelector('.login__password').value

		if(!this.validateEmail(email)){
			return this.setState({
					confirmation: "Invalid email address!",
					confirmationVisibility: true
				})
		}else{
			fetch('/api/register', {
				method:'POST',
				credentials: "include",
				headers:{
					"Content-Type":"application/json"
				},
				body: JSON.stringify({
					email: email,
					password: password})
			}).then(res=>res.json())
			.then(data=>this.setState({
				confirmation: data,
				confirmationVisibility: true
			}))
			.catch(err=>console.log(err))
		}
		
	}

	render(){
		this.login = this.login.bind(this);
		return(
			<div className='login'>
				<form className='login__form' onSubmit={this.login}>
					{this.state.confirmationVisibility?<div className='login__registerConfirmation'>{this.state.confirmation}</div>:null}
					
					<label>E-mail</label>
					<input className='login__email' type='email' name='email' autoComplete='email'></input>

					<label>Password</label>
					<input className='login__password' type='password' name='password' autoComplete='password'></input>

					<button className='login__submit' type='submit'>Log in</button>
					<div className='login__signup' onClick={()=>this.register()}>Register new account</div>
				</form>

				<p className='login__or'>or</p>
				<a className='login__google' href='/auth/google'><img src={Signin} alt='login'/></a>
			</div>
			)
	}
}


export default connect(null,null)(Login);