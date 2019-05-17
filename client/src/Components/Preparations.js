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
		fetch('/api/getPreps',{credentials:"include"})
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
		if(value===""){
			return null
		}else{
			await this.setState(prevState => {
				preps: prevState.preps.push(value);
			});
			document.querySelector("#prep_item").value = "";
			this.forceUpdate();
		}
		
	};

	deleteFromPreps = async (prep) =>{
	
		const newPrep = this.state.preps.filter(each=>{
			return each !== prep
		})

		await this.setState( {
			preps: newPrep
		})
	}

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

	deletePrep = () =>{

		const {date, preps} = this.state.prepsToDispaly
		const prepToDelete = {
			date,
			preps
		}
		fetch('/api/deletePrep',{
			method:"POST",
			credentials: "include",
			headers: {
				"Content-Type" : "application/json"
			},
			body: JSON.stringify(prepToDelete)
		})
			.then(res => res.json())
			.then(data=> {
				return window.location.reload()
			})
			.catch(err=> console.log(err))
	}

	render() {
		const {dateContext} = this.state
		let day = dateContext.format('D')
		day= Number(day)+1
		const date = moment(dateContext).set("date", day).format('DD-MM-YYYY')
		return (
			<div>
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
							<li style={{color:"snow"}}>Prep list for: {date}</li>
							{this.state.preps.map((each, i) => {
								return <li key={i * 0.3987}>
									{each}	
									<span onClick={()=>this.deleteFromPreps(each)}>
										<svg>
											<use xlinkHref={`${Icons}#icon-delete`}></use>
										</svg>
									</span>
								</li>;
							})}
							<button onClick={()=>this.submitPreps(date)}>Create new</button>
						</ul>
						<div className="preparations__card--lists">
							<h3>Preps history:</h3>
							{this.state.listOfPreps.map((each,i)=>{
								return <p key={`${i}@091${1}`} onClick={()=>this.openPrep(i)}>{each.date}</p>
							})}
							
						</div>
					</div>
				</div>
			{/*Hidden preparation list element*/}
				{this.state.displayPreps?
					<div className="preparations__preps">
					<svg onClick={()=>this.setState({displayPreps:false})}>
						<use xlinkHref={`${Icons}#icon-close`}></use>
					</svg>

					<p className="preparations__preps--date">{this.state.prepsToDispaly.date}</p>

					{this.state.prepsToDispaly.preps.map((each,i)=>{
						return <p key={i*12.228877}>{each}</p>
					})}

					<button onClick={()=>this.deletePrep()}>Delete</button>
					</div>
					:null
				}
			</div>
		);
	}
}

export default Preparations;
