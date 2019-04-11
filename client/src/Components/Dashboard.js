import React from "react";
import { connect } from 'react-redux' 
import { fetchProfile } from "../actions";
import CookiesPopup from './CookiesPopup'


import Calendar from "./Calendar";


import Chef from '../img/little_chef.svg'

class Dashboard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			date: "" //this goes to Calendar
		};
		this.timer = null;
	}

	toDisplay = () => {
		let date = new Date(Date.now()).toString().split("GMT")[0];
		return this.setState({ date });
	};

	componentWillMount(){
		this.props.fetchProfile()
	}

	componentDidMount() {
		this.timer = setInterval(this.toDisplay, 1000);
	}
	componentWillUnmount() {
		clearInterval(this.timer);
	}

	render() {

		let { date } = this.state;

		return (
			<div className="dashboard">
				<div className="dashboard__landing">
					<h1>Welcome, Chef!</h1>
					<div className="dashboard__landing--wall">
						
						<div className="dashboard__landing--wall-1" onClick={()=>window.location.href="/calendar#events"}>
							<h3>Comming events</h3>
							{
								this.props.prof.events?
								<div>
									{this.props.prof.events.map((event,i)=>{
										return <p key={`${i} $frrr`}><span>{event.day} {event.month} {event.year}: </span>{event.description}</p>
									})}

								</div>
								:<p key={`00$frrr`}><span>No events in Calendar. </span>You haven't created any events yet. Click to navigate to the calendar</p>
							}

						</div>

						<div className="dashboard__landing--wall-2"  onClick={()=>window.location.href="/preparations"}>
							<h3>Preparation</h3>
							{
								this.props.prof.preps?
								this.props.prof.preps.length>0?
								<div>
									{this.props.prof.preps.map((prep,i)=>{
										return <p key={`${i} $f4443r`}><span>{prep.date}: </span>{prep.preps.map((p,i)=>{
											return <i key={`iooe${i}`}>{p}, </i>
										})}</p>
									})}

								</div>
								:<p key={`00$frrr`}><span>No preparation list. </span>You haven't created any preparations yet. Click to navigate to the preparations section.</p>
								:null
							}
						</div>
					</div>
					<img src={Chef} alt="chef"/>
				</div>
				<div className="dashboard__third">
					<a href={"/calendar"} className="dashboard__calendar">
						<Calendar date={date} />
					</a>
					<div className="dashboard__third--recipes">
						<h3>recent recipes</h3>
						{
							this.props.prof.recepies?
							
							<div>
								{this.props.prof.recepies.map((recep,i)=>{
									return <p key={`${i} $f4443r`} onClick={()=>window.location.href="/recipes"}><i>{recep.name}</i><span><img src={recep.photo} alt='food'/></span></p>
								})}

							</div>
							:<p key={`00$frrr`}><span>No recipes has been created yet. </span>Click to navigate to the recipes section.</p>
							
						}
					</div>
				</div>

				<CookiesPopup />
			</div>
		);
	}
}

const mapStateToProps= (state)=>({
  prof: state.fetchProfile.profile
})

export default connect( mapStateToProps, { fetchProfile } )(Dashboard);
