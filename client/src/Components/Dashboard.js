import React from "react";
import Calendar from "./Calendar";
import Recipes from "./Recipes";
import Camera from "../img/video-camera.svg";

class Dashboard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			date: "", //this goes to Calendar

			display: "none",
			recept: {},

			recepies: [],

			preps: []
		};
		this.timer = null;
	}

	toDisplay = () => {
		let date = new Date(Date.now()).toString().split("GMT")[0];
		return this.setState({ date });
	};

	addToPreps=()=>{
		const value = document.querySelector('#prep_item').value
		this.state.preps.push(value)

		document.querySelector('#prep_item').value =''
	}
	componentDidMount() {
		this.timer = setInterval(this.toDisplay, 1000);

		fetch("/api/current_user/recepies", { credentials: "include" })
			.then(res => {
				return res.json();
			})
			.then(data => {
				this.setState({ recepies: data });
			})
			.catch(err => {
				console.log(err);
			});
	}
	componentWillUnmount() {
		clearInterval(this.timer);
	}
	openRecepie(index) {
		this.setState({ display: "block" });
		this.setState({ recept: this.state.recepies[index] });
	}

	render() {
		let { date } = this.state;
		return (
			<div className="dashboard">
				<a href={"/calendar"} className="dashboard__calendar">
					<Calendar date={date} />
				</a>

				<Recipes />

				<div className="dashboard__schedule">
					<a href="/schedule" className="dashboard__schedule__header">
						Manage team schedule
					</a>
				</div>

				<div className="dashboard__preparation" id="preparations">
					
					<div className="dashboard__preparation--inputs">
						<p>This is the card of preparations.
							Here you can make a list of items, which have to be
							done next day.
						</p>
						<input type='text' id='prep_item' onKeyDown={(e)=>e.keyCode===13?this.addToPreps():null} />
						<button onClick={()=>this.addToPreps()}>Add</button>
					</div>

					<div className="dashboard__preparation--card">
						<ul>
						{this.state.preps.map((each,i)=>{
							return(
								<li key={i*0.3987}>{each}</li>
								)
						})}
						</ul>
					</div>
				</div>
			</div>
		);
	}
}

export default Dashboard;
