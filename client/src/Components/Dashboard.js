import React from "react";
import Calendar from "./Calendar";
import Recipes from "./Recipes";

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
			</div>
		);
	}
}

export default Dashboard;
