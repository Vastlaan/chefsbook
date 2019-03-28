import React from "react";
import Calendar from "./Calendar";
import Recipes from "./Recipes";

import Chef from '../img/chef.jpg'

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
			
				<a href={"/calendar"} className="dashboard__calendar">
					<Calendar date={date} />
				</a>

				<div className="dashboard__news">

					<h1>News Feed</h1>

					<div className="dashboard__news--quote">

						<div className="dashboard__news--quote-1">
							Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
							tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
							quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
							consequat. 
						</div>

						<div className="dashboard__news--quote-2">
							Duis aute irure dolor in reprehenderit in voluptate velit esse
							cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
							proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
						</div>

					</div>

					<div className="dashboard__news--image">
						<img src={Chef} alt="person" />
					</div>
				</div>

				<div className="dashboard__extra">
					<h1>Extra</h1>
					<h1>Extra</h1>
					<h1>Extra</h1>
					<h1>Extra</h1>
				</div>
				<div className="dashboard__extra">
					<h1>Extra</h1>
					<h1>Extra</h1>
					<h1>Extra</h1>
					<h1>Extra</h1>
				</div>
			</div>
		);
	}
}

export default Dashboard;
