import React from 'react';
import moment from 'moment';

const week = moment.weekdays()
const weekdaysShort = moment.weekdaysShort()
const day = moment().format('dddd')
const dayNr = moment().format('D');
const ind = week.indexOf(day)
const start = dayNr - ind
let th = 'th'
if(start===1){
	th='st'
}else if( start ===2){
	th='nd'
}
console.log(week, day, dayNr, ind, start) 

const Schedule = () =>{

	return(
		<div className='dashboard__schedule'>
			<h1 className='dashboard__schedule__header'>Manage team schedule</h1>

			<div className='dashboard__schedule__graph'>
				<div className='dashboard__schedule__graph--name'>Name</div>
				{weekdaysShort.map((day,i)=>{
					return(
						<div className='dashboard__schedule__graph--day' key={`@#$${i*7.213}`}>
							<p>{day}</p>
							<p>{start+i} <sup>{th}</sup></p>
						</div>
						)
				})}
			</div>
		</div>
		)
}

export default Schedule;