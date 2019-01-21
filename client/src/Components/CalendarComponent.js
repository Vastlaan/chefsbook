import React from 'react';
import moment from 'moment';
import Icons from '../img/sprite.svg'

class CalendarComponent extends React.Component {
	constructor(props){
		super(props);
		this.state  = {
			dateContext: moment(),
			dateEvent:{
				day: '',
				month:'',
				year:'',
				display: 'none'
			},
			events:[]
		}
	}

	componentWillMount(){
		fetch('/api/events').then(res=>res.json()).then(events=>{this.setState({events})})
	}

	firstDayOfMonth = () =>{
		return Number(moment(this.state.dateContext).startOf('month').format('d')) 
	}

	prevMonth=(month, months,year)=>{
		const currentMonthIndex = months.indexOf(month)
		let newMonthIndex=0
		if(currentMonthIndex===0){
			newMonthIndex=11
			const newYear = year-1
			const newMonth=months[newMonthIndex]
			let monthNo = months.indexOf(newMonth)
			let dateContext = Object.assign({},this.state.dateContext)
			dateContext = moment(dateContext).set('year',newYear)
			dateContext = moment(dateContext).set('month',monthNo)
			this.setState({dateContext})
		}else{
			newMonthIndex=currentMonthIndex-1
			const newMonth=months[newMonthIndex]
			let monthNo = months.indexOf(newMonth)
			let dateContext = Object.assign({},this.state.dateContext)
			dateContext = moment(dateContext).set('month',monthNo)
			this.setState({dateContext})
		}	
	}

	nextMonth=(month, months, year)=>{
		const currentMonthIndex = months.indexOf(month)
		let newMonthIndex=0
		if(currentMonthIndex===11){
			newMonthIndex=0
			const newYear = Number(year)+Number(1)
			const newMonth=months[newMonthIndex]
			let monthNo = months.indexOf(newMonth)
			let dateContext = Object.assign({},this.state.dateContext)
			dateContext = moment(dateContext).set('year',newYear)
			dateContext = moment(dateContext).set('month',monthNo)
			this.setState({dateContext})
		}else{
			newMonthIndex=currentMonthIndex+1
			const newMonth=months[newMonthIndex]
			let monthNo = months.indexOf(newMonth)
			let dateContext = Object.assign({},this.state.dateContext)
			dateContext = moment(dateContext).set('month',monthNo)
			this.setState({dateContext})
		}
	}
	addEvent=(day,month,year)=>{	
		this.setState({
			dateEvent: {
				day,
				month,
				year,
				display:'block'
			}
		})
	}
	closeEvent=()=>{	
		this.setState({
			dateEvent: {
				day:'',
				month:'',
				year:'',
				display:'none'
			}
		})
	}
	appendEvent = () =>{
		const time = document.querySelector('#time').value;
		const des = document.querySelector('#description')
		const description = document.querySelector('#description').value
		if(description===''){
			console.log('you have to add description')
			des.style.border="1px solid red"
			return
		}
		const event = {
			day:this.state.dateEvent.day,
			month:this.state.dateEvent.month,
			year:this.state.dateEvent.year,
			time,
			description

		}
		fetch('api/new_event',{
			method: "POST",
			headers: {
				"Content-Type":"application/json"
			},
			body: JSON.stringify(event)
		})
		.then(data=>data.json()).then(message=>console.log(message))
		des.style.border="none";
	}
	render(){
		const {dateContext, dateEvent, events} = this.state
		const weekdays = moment.weekdaysShort() 			//gives us array ['Sun','Mon','Tue'....]
		const months = moment.months() 			
		const year = dateContext.format('Y');
		const month = dateContext.format('MMMM')
		const day = dateContext.format('D')
		const daysInMonth = dateContext.daysInMonth()
		console.log(events)
		let blanks = [];
		for(let i =0 ; i< this.firstDayOfMonth(); i++){
			blanks.push(<div className='calendar__table__weekday calendar__table__weekday--blank' key={i*0.1798}>&nbsp;</div>)
		}
		let daysNumbers = [];
		for(let i =1 ; i<= daysInMonth; i++){
			const sunday = 8-this.firstDayOfMonth()

			if(i===Number(day)){
				daysNumbers.push(<div className='calendar__table__weekday calendar__table__weekday--green calendar__table__weekday--day ' key={i*2.998} onClick={()=>this.addEvent(i,month,year)}>{i}</div>)
			}else if(i===sunday||i===sunday+7||i===sunday+14||i===sunday+21||i===sunday+28||(this.firstDayOfMonth()===0 && i===1) ){
				daysNumbers.push(<div className='calendar__table__weekday calendar__table__weekday--red calendar__table__weekday--day ' key={i*2.998} onClick={()=>this.addEvent(i,month,year)}>{i}</div>)
			}
			else{
				daysNumbers.push(<div className='calendar__table__weekday calendar__table__weekday--day' key={i*2.998} onClick={()=>this.addEvent(i,month,year)}>{i}</div>)
			}
			
		}
		return(
			<div className='calendar'>
				<h1 className='calendar__header'>Calendar</h1>
				
				<div className='calendar__table'>
					<svg className='calendar__table--icon calendar__table--icon__before' onClick={()=>this.prevMonth(month, months,year)}>
						<use xlinkHref={`${Icons}#icon-navigate_before`}></use>
					</svg>
					<div className='calendar__table__header'>{month} {year}</div>
					<svg className='calendar__table--icon calendar__table--icon__next' onClick={()=>this.nextMonth(month, months,year)}>
						<use xlinkHref={`${Icons}#icon-navigate_next`}></use>
					</svg>
					{weekdays.map((day,i)=>{
						return(
							<div className={`calendar__table__weekday calendar__table__weekday-${i}`} key={i*0.157}>
								{day}
							</div>
							)
					})}
					{blanks.concat(daysNumbers)}
				</div>
				
				<div className='calendar__event' style={{display:dateEvent.display}}>
					<div className='calendar__event__box'>
						<svg className='calendar__event__box--icon' onClick={()=>this.closeEvent()}>
							<use xlinkHref={`${Icons}#icon-close`}></use>
						</svg>
						<h1>Event on {dateEvent.day} {dateEvent.month} {dateEvent.year}</h1>
						<p>Time</p>
						<input className='calendar__event__box--time' type='time' name='time' id='time' />
						<p>Description</p>
						<input className='calendar__event__box--description' type='text' name='description' id='description' required />
						<button className='calendar__event__box--add' onClick={()=>this.appendEvent()}>Add Event</button>
					</div>
				</div>
			</div> 
			)
	}
}
export default CalendarComponent;