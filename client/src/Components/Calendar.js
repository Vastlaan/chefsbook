import React from 'react';


const Calendar = ({date}) =>{

	return(
		
			<div className='dashboard__calendar--flex'>
				<div className='dashboard__calendar--year'>
					{date.slice(11,15)}
				</div>
				<div className='dashboard__calendar--month'>
					{date.slice(4,8)}
				</div>
				<div className='dashboard__calendar--day'>
					{date.slice(8,10)}
				</div>
				<div className='dashboard__calendar--dayname'>
					{date.slice(0,3)}
				</div>
				<div className='dashboard__calendar--time'>
					{date.slice(16,24)}
				</div>
			</div>
		
		)
}

export default Calendar