import React from "react";
import { connect } from "react-redux";
import { closeMemberAction } from "../actions";

class Member extends React.Component {

	deleteMember = (name) =>{

		const nameObj = {name:name}

		fetch('/api/delete_member',{
			method: "POST",
			credentials: "include",
			headers: {
				"Content-type": "application/json"
			},
			body: JSON.stringify(nameObj)
		})
		.then(data => data.json())
		.then(res =>
			console.log(res)
		)
		.catch(err => console.log(err))

		window.location.reload()
	}

	render() {

		const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
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
					{this.props.scheduleMember.map((each,i)=>{
						return(
							<div key={i*25.33} className="member__box--cell">
								<h3>{weekdays[i]}</h3>
								<p>{each}</p>
							</div>
							)
					})}
					<button onClick={()=>this.deleteMember(this.props.member)}>Delete member</button>
				</div>
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
