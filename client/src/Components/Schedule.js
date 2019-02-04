import React from 'react';
import moment from 'moment';
import Icons from '../img/sprite.svg'

class Schedule extends React.Component {

	state={
		dateContext:moment(),
		schedule:[],
		popup:'none',
		displayS:false,
		displayM:false,
		displayT:false,
		displayW:false,
		displayTH:false,
		displayF:false,
		displaySA:false,
	}

	componentWillMount(){
		fetch('/api/schedule')
		.then(data=>data.json())
		.then(sch=> {
				const schedule = this.checkWeek(sch)
				this.setState({schedule:schedule})
			})
		.catch(err=>console.log(err))
		
	}

	checkWeek = (schedule) =>{

		let selected = []
		schedule.map(each=>{
			
			if(each.week===this.state.dateContext.week()){

				selected = each.data
			}
			if(each.week===0 && selected.length<1){
				selected = each.data
			}
		})
		return selected
	}
	changeWeek = async (a) => {
		const currentWeek = this.state.dateContext.week()
		await  this.setState({dateContext:moment(moment().week(currentWeek + a))})
		
		fetch('/api/schedule')
		.then(data=>data.json())
		.then(sch=> {
				const schedule = this.checkWeek(sch)
				console.log(schedule)
				this.setState({schedule:schedule})
			})
		.catch(err=>console.log(err))
		
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
			headers: {
				"Content-type":"application/json"
			},
			body: JSON.stringify(newMemberObject)
		}).then(data=>data.json())
		.then(updated => console.log(updated))
		.catch(err=>console.log(err))

		this.setState({
			popup:'none'
		})
	}

	render(){

		const { dateContext, schedule, displayS, displayM, displaySA, displayF, displayTH,displayT,displayW } = this.state
		const currentWeek = dateContext.week()	
		const weekdaysShort = moment.weekdaysShort()

		let displaySu = displayS?'flex':'none'
		let displayMo = displayM?'flex':'none'
		let displayTu = displayT?'flex':'none'
		let displayWe = displayW?'flex':'none'
		let displayTh = displayTH?'flex':'none'
		let displayFr = displayF?'flex':'none'
		let displaySa = displaySA?'flex':'none'

		let startOfWeek = moment(dateContext).startOf('week');
		let endOfWeek = moment(dateContext).endOf('week');
		let days = [];
		let day = startOfWeek;

		while (day <= endOfWeek) {
		    days.push(day.date());
		    day = day.clone().add(1, 'd');
		    
		}
		
		return(
			<div className='schedule'>
				<h1 className='schedule__header'>Team schedule</h1>
				<svg className='schedule__icon'>
					<use xlinkHref={`${Icons}#icon-assignment`}></use>
				</svg>
				<h2 className='schedule__weekNumber'>This is week nr. {currentWeek}</h2>
				<div className='schedule__buttons'>
					<div className='schedule__buttons--btn'  onClick={()=>this.changeWeek(-1)}>&#60; Prev week</div>
					<div className='schedule__buttons--btn' onClick={()=>this.changeWeek(1)}>Next week &#62;</div>
				</div>
				<div className='schedule__head'>
					<div className='schedule__head--name'>Name</div>
					{weekdaysShort.map((day,i)=>{
						let dn = days[i]
						let th = 'th'
						if(dn===1){
							th='st'
						}else if(dn===2){
							th='nd'
						}
						return(
							<div className='schedule__head--day' key={`@#$${i*7.213}`}>
								<p>{day}</p>
								<p>{dn} <sup>{th}</sup></p>
							</div>
							)
					})}
				</div>
				{schedule.map((each,i)=>{
					return(
							<div key={i*0.249} className='schedule__graph'>
								<div className='schedule__graph--name'>
									<svg className='schedule__icon--2'>
										<use xlinkHref={`${Icons}#icon-user-tie`}></use>
									</svg>
									{each.name}
								</div>
								{each.days.map((day,i)=>{
									return(
										<div className='schedule__graph--day' key={`!#$${i*3.332}`} onClick={()=>{console.log(each.name, i)}}>
											{day}
										</div>
										)
								})}
							</div>
						)
				})
				}
				
				<div className='schedule__options'>

					<button className='schedule__options__btn' onClick={()=>this.setState({popup:'block'})}>Add a team member</button>
				</div>

				<div className='schedule__add' style={{display:`${this.state.popup}`}}>
					<svg className='schedule__icon--3' onClick={()=>this.setState({popup:'none'})}>
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
			</div>
		)
	}
	
}

export default Schedule;