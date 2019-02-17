import React from "react";

class Warning extends React.Component {
	

	removeEvent = (year,month,day,time,description) => {

		const toDelete = {
			year,month,day,time,description
		}
		fetch("/api/remove_event", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(toDelete)
		})
			.then(data => data.json())
			.then(events => this.setState({ events }))
			.catch(err => console.log(err));

		window.location.href = "/calendar";
	};
	render() {
		const { props } = this;
		
		return (
			<div className="warning" style={{ display: `${props.display}` }}>
				<h2 className="warning__question">
					Are you sure you want to delete this record?
				</h2>
				<p
					className="warning__yes"
					onClick={() =>
						this.removeEvent(
							props.toDelete.year,
							props.toDelete.month,
							props.toDelete.day,
							props.toDelete.time,
							props.toDelete.description
						)
					}
				>
					Yes
				</p>
				<a className="warning__no" href='/calendar'>No</a>
			</div>
		);
	}
}

export default Warning;
