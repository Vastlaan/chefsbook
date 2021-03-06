import React from "react";
import { connect } from "react-redux";
import { closeMemberAction } from "../actions";
import ChangeSchedule from "./ChangeSchedule";
import WarningDeleteMember from "./WarningDeleteMember";

class Member extends React.Component {
	state = {
		weekday: "",
		hours: "",
		displayChange: "none",
		displayWarning:"none"
	};
	deleteMember = async name => {
		const nameObj = { name: name };

		await fetch("/api/delete_member", {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-type": "application/json"
			},
			body: JSON.stringify(nameObj)
		})
			.then(data => data.json())
			.then(res => console.log(res))
			.catch(err => console.log(err));

		window.location.reload();
	};

	viewSchedule = (weekday, hours) => {

		this.setState({
			weekday,
			hours,
			displayChange: "block"
		})
	};

	render() {
		const weekdays = [
			"Sunday",
			"Monday",
			"Tuesday",
			"Wednesday",
			"Thursday",
			"Friday",
			"Saturday"
		];
		return (
			<div
				className="member"
				style={{ display: `${this.props.displayMember}` }}
			>
				<div
					className="member__close"
					onClick={() => this.props.closeMemberAction()}
				>
					Close
				</div>
				<div className="member__box">
					<p className="member__box--name">{this.props.member}</p>
					{this.props.scheduleMember.map((each, i) => {
						return (
							<div key={i * 25.33} className="member__box--cell">
								<h3>{weekdays[i]}</h3>
								<p
									onClick={() =>
										this.viewSchedule(weekdays[i], each)
									}
								>
									{each}
								</p>
							</div>
						);
					})}
					<button
						onClick={() => this.setState({
							displayWarning:"block"
						})}
					>
						Delete member
					</button>
				</div>
				<ChangeSchedule
					week={this.props.week}
					member={this.props.member}
					weekday={this.state.weekday}
					hours={this.state.hours}
					display={this.state.displayChange}
				/>
				<WarningDeleteMember
						display={`${this.state.displayWarning}`}
						name={this.props.member}
					/>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	displayMember: state.openMember.displayMember
});
export default connect(
	mapStateToProps,
	{ closeMemberAction }
)(Member);
