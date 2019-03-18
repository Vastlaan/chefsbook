import React from "react";
import moment from 'moment'

class Preparations extends React.Component {
	state = {
		dateContext: moment(),
		preps: []
	};

	addToPreps = async () => {
		const value = document.querySelector("#prep_item").value;
		await this.setState(prevState => {
			preps: prevState.preps.push(value);
		});
		document.querySelector("#prep_item").value = "";
		this.forceUpdate();
	};

	render() {
		const {dateContext} = this.state
		let day = dateContext.format('D')
		day= Number(day)+1
		const date = moment(dateContext).set("day", day).format('DD-MM-YYYY')
		return (
			<div>
				<h1 className="preparations__header">Preparations</h1>
				<div className="preparations">
					<div className="preparations--inputs">
						<p>
							This is the card of preparations. Here you can make
							a list of items, which have to be done next day.
						</p>
						<input
							type="text"
							id="prep_item"
							onKeyDown={e =>
								e.keyCode === 13 ? this.addToPreps() : null
							}
						/>
						<button onClick={() => this.addToPreps()}>Add</button>
					</div>

					<div className="preparations__card">
						<ul>
							<li style={{ borderBottom: "1px solid #000", color: "#fff" }} >Prep list for: {date}</li>
							{this.state.preps.map((each, i) => {
								return <li key={i * 0.3987}>{each}</li>;
							})}
						</ul>
						<div className="preparations__card--lists">
							<h3>Preps history:</h3>
							<a href="/">Preps 22.03.2019</a>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Preparations;
