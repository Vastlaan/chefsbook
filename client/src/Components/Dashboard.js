import React from "react";
import Calendar from "./Calendar";
import Recipes from "./Recipes";


class Dashboard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			date: "", //this goes to Calendar

			display: "none",
			recept: {},

			recepies: [],

		};
		this.timer = null;
	}

	toDisplay = () => {
		let date = new Date(Date.now()).toString().split("GMT")[0];
		return this.setState({ date });
	};

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

				<div className="dashboard__preparations" id="preparations">
					<a href='/preparations'>Preparations</a>	
				</div>
			</div>
		);
	}
}

export default Dashboard;
