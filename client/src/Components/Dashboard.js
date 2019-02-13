import React from 'react';
import Calendar from './Calendar';
import Recepies from './Recepies';


class Dashboard extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			date: "",			//this goes to Calendar

			display: 'none',	
			recept: {},

			recepies : []
		}
		this.timer = null;
	}
	
	toDisplay=()=>{
	    let date = new Date(Date.now()).toString().split('GMT')[0]
	    return this.setState({date})
	}
	componentDidMount(){
	    this.timer = setInterval(this.toDisplay,1000);


	    fetch('/api/current_user/recepies',{credentials: 'include'})
	    .then(res =>{
	    	
	    	return res.json();
	    })
	    .then(data =>{
	    	this.setState({recepies: data})
	    })
	    .catch(err=>{
	    	console.log(err)
	    })
	}
	componentWillUnmount(){
	    clearInterval(this.timer);
	}
	openRecepie(index){
		this.setState({display: 'block'})
		this.setState({recept: this.state.recepies[index]})
	}

	render(){
		let { date, recepies } = this.state;
		return(
			<div className='dashboard'>

				<a href={'/calendar'} className='dashboard__calendar'><Calendar date={date}/></a>

				<Recepies  />

				
				<div className='dashboard__schedule'>
					<a  href='/schedule' className='dashboard__schedule__header'>Manage team schedule</a>
				</div>

				<div className='dashboard__preparation'>
					Preparation
				</div>
			</div>
			)
	}
}

export default Dashboard;