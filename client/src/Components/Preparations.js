import React from "react";
import moment from 'moment';
import Icons from '../img/sprite.svg'

class Preparations extends React.Component {
	state = {
		dateContext: moment(),
		preps: [],
		listOfPreps:[],

		displayPreps:false,
		prepsToDispaly:{}
	};

	componentWillMount(){
		fetch('/api/getPreps')
		.then(data=>data.json())
		.then(listOfPreps=>{
			return this.setState({
				listOfPreps
			})
		})
		.catch(err=>console.log(err))
	}

	addToPreps = async () => {
		const value = document.querySelector("#prep_item").value;
		await this.setState(prevState => {
			preps: prevState.preps.push(value);
		});
		document.querySelector("#prep_item").value = "";
		this.forceUpdate();
	};

	submitPreps=(date)=>{

		const data = {
			date,
			preps: this.state.preps
		}
		if(this.state.preps.length>0){

			fetch('/api/submitPreps', {
				method: "POST",
				credentials: "include",
				headers: {
					"Content-Type":"application/json"
				},

				body: JSON.stringify(data)
			})
			.then(data=>data.json())
			.then(res=>window.location.reload())
			.catch(err=>console.log(err))
		}
		

	}

	openPrep=(i)=>{
		this.setState({
			prepsToDispaly: this.state.listOfPreps[i],
			displayPreps:true
		})
	}

	render() {
		const {dateContext} = this.state
		let day = dateContext.format('D')
		day= Number(day)+1
		const date = moment(dateContext).set("date", day).format('DD-MM-YYYY')
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
							<li style={{ borderBottom: "1px solid #d3d3d3", color: "#fff" }} >Prep list for: {date}</li>
							{this.state.preps.map((each, i) => {
								return <li key={i * 0.3987}>{each}</li>;
							})}
							<button onClick={()=>this.submitPreps(date)}>Submit</button>
						</ul>
						<div className="preparations__card--lists">
							<h3>Preps history:</h3>
							{this.state.listOfPreps.map((each,i)=>{
								return <p key={`${i}@091${1}`} onClick={()=>this.openPrep(i)}>{each.date}</p>
							})}
							
						</div>
					</div>
				</div>
				{this.state.displayPreps?
					<div className="preparations__preps">
					<svg onClick={()=>this.setState({displayPreps:false})}>
						<use xlinkHref={`${Icons}#icon-close`}></use>
					</svg>
					{this.state.prepsToDispaly.date}
					{this.state.prepsToDispaly.preps.map((each,i)=>{
						return <p key={i*12.228877}>{each}</p>
					})}
					</div>
					:null
				}
			</div>
		);
	}
}

export default Preparations;
