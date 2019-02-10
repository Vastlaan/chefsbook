import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux'
import Icons from '../img/sprite.svg'
import ScheduleAdd from './ScheduleAdd'
import { openWindowAction } from '../actions'

class Schedule extends React.Component {

	state={
		dateContext:moment(),
		schedule:[],
		popup:'none'
		
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
				this.setState({schedule:schedule})
			})
		.catch(err=>console.log(err))
		
	}
	

	render(){

		const { dateContext, schedule} = this.state
		const currentWeek = dateContext.week()	
		const weekdaysShort = moment.weekdaysShort()

		

		let startOfWeek = moment(dateContext).startOf('week');
		let endOfWeek = moment(dateContext).endOf('week');
		let days = [];
		let day = startOfWeek;

		while (day <= endOfWeek) {
		    days.push(day.date());
		    day = day.clone().add(1, 'd');
		    
		}

		console.log(this.props.addMember)
		
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
								<div className='schedule__graph--name' onClick={()=>console.log(each.name)}>
									<svg className='schedule__icon--2'>
										<use xlinkHref={`${Icons}#icon-user-tie`}></use>
									</svg>
									{each.name}
								</div>
								{each.days.map((day,i)=>{
									return(
										<div className='schedule__graph--day' key={`!#$${i*3.332}`} onClick={()=>{console.log(each.name, day, currentWeek, i)}}>
											{day}
										</div>
										)
								})}
							</div>
						)
				})
				}
				
				<div className='schedule__options'>

					<button className='schedule__options__btn' onClick={()=>{
						this.props.openWindowAction()
						console.log(this.props.addMember)
					}
					}>Add a team member</button>
				</div>

				<ScheduleAdd popup={this.state.popup} />

			</div>
		)
	}
}

const mapStateToProps = (state) =>({
	addMember: state.addMember.display
})
export default connect(mapStateToProps, {openWindowAction})(Schedule);