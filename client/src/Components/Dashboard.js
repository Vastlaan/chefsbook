import React from "react";
import Calendar from "./Calendar";
import Recipes from "./Recipes";

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
					Jakis Landing wyjebany
					<img src={Chef} alt="chef"/>
				</div>
				<div className="dashboard__second">
					<a href={"/calendar"} className="dashboard__calendar">
						<Calendar date={date} />
					</a>
				</div>
			</div>
		);
	}
}

export default Dashboard;
