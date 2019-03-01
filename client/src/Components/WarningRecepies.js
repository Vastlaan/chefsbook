import React from "react";

class WarningRecepies extends React.Component {
	remove = toRemove => {
		fetch("/api/current_user/remove_recepie", {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(toRemove)
		})
			.then(data => data.json())
			.then(recept => window.location.reload())
			.catch(err => console.log(err));
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
					onClick={() => this.remove(this.props.toRemove)}
				>
					Yes
				</p>
				<p
					className="warning__no"
					onClick={() => window.location.reload()}
				>
					No
				</p>
			</div>
		);
	}
}

export default WarningRecepies;
