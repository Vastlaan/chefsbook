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
					<h1>Welcome, Chef!</h1>
					<div>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
						tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
						quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
						consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
						cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
						proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
					</div>
					<img src={Chef} alt="chef"/>
				</div>
				<div className="dashboard__third">
					<a href={"/calendar"} className="dashboard__calendar">
						<Calendar date={date} />
					</a>
				</div>
			</div>
		);
	}
}

export default Dashboard;
