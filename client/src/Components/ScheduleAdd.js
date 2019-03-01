import React from 'react';
import { connect } from 'react-redux';
import { closeWindowAction } from '../actions'
import Icons from '../img/sprite.svg'

class ScheduleAdd extends React.Component {

	constructor(props){
		super(props)

		this.state = {
			popup: this.props.popup,
			displayS:false,
			displayM:false,
			displayT:false,
			displayW:false,
			displayTH:false,
			displayF:false,
			displaySA:false,
		}
	}

	addMember = () =>{
		
		const name = document.querySelector('#name').value
		let days = []
		const sunday = document.querySelector('#sunday')
		if(sunday.checked){
			const time = `${document.querySelector('#sunday__start').value} - ${document.querySelector('#sunday__finish').value}`
			days.push(time)
		}else{
			days.push('free')
		}
		const monday = document.querySelector('#monday')
		if(monday.checked){
			const time = `${document.querySelector('#monday__start').value} - ${document.querySelector('#monday__finish').value}`
			days.push(time)
		}else{
			days.push('free')
		}
		const tuesday = document.querySelector('#tuesday')
		if(tuesday.checked){
			const time = `${document.querySelector('#tuesday__start').value} - ${document.querySelector('#tuesday__finish').value}`
			days.push(time)
		}else{
			days.push('free')
		}
		const wednesday = document.querySelector('#wednesday')
		if(wednesday.checked){
			const time = `${document.querySelector('#wednesday__start').value} - ${document.querySelector('#wednesday__finish').value}`
			days.push(time)
		}else{
			days.push('free')
		}
		const thursday = document.querySelector('#thursday')
		if(thursday.checked){
			const time = `${document.querySelector('#thursday__start').value} - ${document.querySelector('#thursday__finish').value}`
			days.push(time)
		}else{
			days.push('free')
		}
		const friday = document.querySelector('#friday')
		if(friday.checked){
			const time = `${document.querySelector('#friday__start').value} - ${document.querySelector('#friday__finish').value}`
			days.push(time)
		}else{
			days.push('free')
		}
		const saturday = document.querySelector('#saturday')
		if(saturday.checked){
			const time = `${document.querySelector('#saturday__start').value} - ${document.querySelector('#saturday__finish').value}`
			days.push(time)
		}else{
			days.push('free')
		}
		const newMemberObject = {
			week: 0,
			data: [{
				name,
				days
			}]
		}

		fetch('/api/add_member', {
			method:'POST',
			credentials:'include',
			headers: {
				"Content-type":"application/json"
			},
			body: JSON.stringify(newMemberObject)
		}).then(data=>data.json())
		.then(updated => console.log(updated))
		.catch(err=>console.log(err))

		this.props.closeWindowAction()
		window.location.reload()
	}

	render(){
		const{ displayS, displayM, displaySA, displayF, displayTH,displayT,displayW } = this.state

		let displaySu = displayS?'flex':'none'
		let displayMo = displayM?'flex':'none'
		let displayTu = displayT?'flex':'none'
		let displayWe = displayW?'flex':'none'
		let displayTh = displayTH?'flex':'none'
		let displayFr = displayF?'flex':'none'
		let displaySa = displaySA?'flex':'none'
		return(
			<div className='schedule__add' style={{display:`${this.props.addMember}`}}>
					<svg className='schedule__icon--3' onClick={()=> this.props.closeWindowAction() }>
						<use xlinkHref={`${Icons}#icon-close`}></use>
					</svg>
					<div className='schedule__add__person' >
						<h1 className='schedule__add__person--name'>Name</h1>
						<input className='schedule__add__person--name--input' type='text' id='name' required/>
						<h2>Default working days</h2>
						<p>these days can be changed later on schedule itself</p>

						<div className='schedule__add__person--day'>
							<label className='schedule__add__person--day--checkbox' htmlFor="sunday">
								<input className='schedule__add__person--day--checkbox--input' type='checkbox' name='sunday' id='sunday' onClick={()=>this.setState(prevState=>({displayS:!prevState.displayS}))}/>
								<span className='schedule__add__person--day--checkbox--span'>Sunday</span>
								<span className='schedule__add__person--day--checkbox--custom' >&nbsp;</span>
							</label>
							<div className='schedule__add__person--day--div' style={{display:`${displaySu}`}}>
								<p>Start at:</p>
								<input type='time' id='sunday__start'/>
							</div>
							<div className='schedule__add__person--day--div' style={{display:`${displaySu}`}}>
								<p>Finish at:</p>
								<input type='time' id='sunday__finish'/>
							</div>
						</div>

						<div className='schedule__add__person--day'>
							<label className='schedule__add__person--day--checkbox' htmlFor="monday">
								<input className='schedule__add__person--day--checkbox--input' type='checkbox' name='monday' id='monday' onClick={()=>this.setState(prevState=>({displayM:!prevState.displayM}))} />
								<span className='schedule__add__person--day--checkbox--span'>Monday</span>
								<span className='schedule__add__person--day--checkbox--custom' >&nbsp;</span>
							</label>
							<div className='schedule__add__person--day--div' style={{display:`${displayMo}`}}>
								<p>Start at:</p>
								<input type='time' id='monday__start'/>
							</div>
							<div className='schedule__add__person--day--div' style={{display:`${displayMo}`}}>
								<p>Finish at:</p>
								<input type='time' id='monday__finish'/>
							</div>
						</div>
						
						<div className='schedule__add__person--day'>
							<label className='schedule__add__person--day--checkbox' htmlFor="tuesday">
								<input className='schedule__add__person--day--checkbox--input' type='checkbox' name='tuesday' id='tuesday' onClick={()=>this.setState(prevState=>({displayT:!prevState.displayT}))}/>
								<span className='schedule__add__person--day--checkbox--span'>Tuesday</span>
								<span className='schedule__add__person--day--checkbox--custom' >&nbsp;</span>
							</label>
							<div className='schedule__add__person--day--div' style={{display:`${displayTu}`}}>
								<p>Start at:</p>
								<input type='time' id='tuesday__start'/>
							</div>
							<div className='schedule__add__person--day--div' style={{display:`${displayTu}`}}>
								<p>Finish at:</p>
								<input type='time' id='tuesday__finish'/>
							</div>
						</div>

						<div className='schedule__add__person--day'>
							<label className='schedule__add__person--day--checkbox' htmlFor="wednesday">
								<input className='schedule__add__person--day--checkbox--input' type='checkbox' name='wednesday' id='wednesday' onClick={()=>this.setState(prevState=>({displayW:!prevState.displayW}))}/>
								<span className='schedule__add__person--day--checkbox--span'>Wednesday</span>
								<span className='schedule__add__person--day--checkbox--custom' >&nbsp;</span>
							</label>
							<div className='schedule__add__person--day--div' style={{display:`${displayWe}`}}>
								<p>Start at:</p>
								<input type='time' id='wednesday__start'/>
							</div>
							<div className='schedule__add__person--day--div' style={{display:`${displayWe}`}}>
								<p>Finish at:</p>
								<input type='time' id='wednesday__finish'/>
							</div>
						</div>

						<div className='schedule__add__person--day'>
							<label className='schedule__add__person--day--checkbox' htmlFor="thursday">
								<input className='schedule__add__person--day--checkbox--input' type='checkbox' name='thursday' id='thursday' onClick={()=>this.setState(prevState=>({displayTH:!prevState.displayTH}))} />
								<span className='schedule__add__person--day--checkbox--span'>Thursday</span>
								<span className='schedule__add__person--day--checkbox--custom' >&nbsp;</span>
							</label>
							<div className='schedule__add__person--day--div' style={{display:`${displayTh}`}}>
								<p>Start at:</p>
								<input type='time' id='thursday__start'/>
							</div>
							<div className='schedule__add__person--day--div' style={{display:`${displayTh}`}}>
								<p>Finish at:</p>
								<input type='time' id='thursday__finish'/>
							</div>
						</div>
						
						<div className='schedule__add__person--day'>
							<label className='schedule__add__person--day--checkbox' htmlFor="friday">
								<input className='schedule__add__person--day--checkbox--input' type='checkbox' name='friday' id='friday' onClick={()=>this.setState(prevState=>({displayF:!prevState.displayF}))} />
								<span className='schedule__add__person--day--checkbox--span'>Friday</span>
								<span className='schedule__add__person--day--checkbox--custom' >&nbsp;</span>
							</label>
							<div className='schedule__add__person--day--div' style={{display:`${displayFr}`}}>
								<p>Start at:</p>
								<input type='time' id='friday__start'/>
							</div>
							<div className='schedule__add__person--day--div' style={{display:`${displayFr}`}}>
								<p>Finish at:</p>
								<input type='time' id='friday__finish'/>
							</div>
						</div>

						<div className='schedule__add__person--day'>
							<label className='schedule__add__person--day--checkbox' htmlFor="saturday" >
								<input className='schedule__add__person--day--checkbox--input' type='checkbox' name='saturday' id='saturday' onClick={()=>this.setState(prevState=>({displaySA:!prevState.displaySA}))} />
								<span className='schedule__add__person--day--checkbox--span'>Saturday</span>
								<span className='schedule__add__person--day--checkbox--custom' >&nbsp;</span>
							</label>
							<div className='schedule__add__person--day--div' style={{display:`${displaySa}`}}>
								<p>Start at:</p>
								<input type='time' id='saturday__start'/>
							</div>
							<div className='schedule__add__person--day--div' style={{display:`${displaySa}`}}>
								<p>Finish at:</p>
								<input type='time' id='saturday__finish'/>
							</div>
						</div>
					</div>
					<button className='schedule__add__submit' onClick={()=>this.addMember()}>Add member</button>
				</div>
			)
	}
}

const mapStateToProps = (state) =>({
	addMember: state.addMember.display
})

export default connect(mapStateToProps,{closeWindowAction})(ScheduleAdd);