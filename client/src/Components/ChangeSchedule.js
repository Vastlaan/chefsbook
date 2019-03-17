import React from "react";
import Icons from "../img/sprite.svg";

class ChangeSchedule extends React.Component {
	state = {
		display: this.props.display
	};
	componentWillReceiveProps(nextProps) {
		this.setState({
			display: nextProps.display
		});
	}

	submitChanges = (member, week, weekday) => {

		const wd = ["Sunday","Monday", "Tuesday","Wednesday","Thursday","Friday","Saturday"]
		const weekDayNumber = wd.indexOf(weekday)
		const forWeekOfDefault = document.querySelector("#forWeek").checked
			? week
			: 0;
		const hours = document.querySelector("#free").checked
			? "free"
			: !document.querySelector("#from").value ||
			  !document.querySelector("#to").value
			? "free"
			: `${document.querySelector("#from").value} - ${
					document.querySelector("#to").value
			  }`;

		const newRooster = {
			member,
			week: forWeekOfDefault,
			hours,
			weekday: weekDayNumber
		};

		fetch("/api/change_schedule", {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(newRooster)
		})
			.then(res => res.json())
			.then(data => {
				console.log(data)
				return window.location.reload()
			})
			.catch(err => console.log(err));
	};
	render() {
		const { week, member, weekday, hours } = this.props;
		let { display } = this.state;
		return (
			<div className="change" style={{ display: display }}>
				<div
					className="change__close"
					onClick={() => {
						this.setState({
							display: "none"
						});
					}}
				>
					<svg>
						<use xlinkHref={`${Icons}#icon-close`} />
					</svg>
				</div>
				<div className="change__member">{member}</div>
				<div className="change__week">
					Schedule for <span>{weekday}</span> at week nr.{" "}
					<span>{week}</span>
				</div>
				<div className="change__weekday" />
				<div className="change__hours">
					Working hours: <span>{hours}</span>{" "}
				</div>
				<div className="change__question">
					Would you like to change working hours for default rooster
					or just for week {week}?
				</div>
				<div className="change__answer">
					<label>Default</label>
					<input type="radio" id="default" name="answer" />
					<label>{`For week: ${week}`}</label>
					<input type="radio" id="forWeek" name="answer" />
				</div>
				<div className="change__answer" />
				<div className="change__new">
					<p>Choose new working hours:</p>
					<input type="time" className="time" id="from" />
					<input type="time" className="time" id="to" />
					<span>Or</span>
					<label>Free</label>
					<input
						type="checkbox"
						id="free"
						onClick={() => {
							return document.querySelector("#free").checked
								? document
										.querySelectorAll(".time")
										.forEach(each => {
											return (each.value = "");
										})
								: null;
						}}
					/>
				</div>

				<div
					className="change__submit"
					onClick={() => this.submitChanges(member, week, weekday)}
				>
					Submit changes
				</div>
			</div>
		);
	}
}

export default ChangeSchedule;
