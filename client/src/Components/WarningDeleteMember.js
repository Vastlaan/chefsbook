import React from "react";

class WarningDeleteMember extends React.Component {
	

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
						this.deleteMember(
							props.name
						)
					}
				>
					Yes
				</p>
				<a className="warning__no" href='/schedule'>No</a>
			</div>
		);
	}
}

export default WarningDeleteMember;