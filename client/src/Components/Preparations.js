import React from 'react';

class Preparations extends React.Component{

	state={
		preps: []
	}

	addToPreps= async ()=>{
		const value = document.querySelector('#prep_item').value
		await this.setState(prevState=>{
			preps: prevState.preps.push(value)
		})
		//this.state.preps.push(value)
		console.log(value, this.state.preps)
		document.querySelector('#prep_item').value =''
		this.forceUpdate();
	}

	render(){
		return(
			<div>
				<h1 className='preparations__header'>Preparations</h1>
				<div className='preparations'>
					<div className="preparations--inputs">
						<p>This is the card of preparations.
							Here you can make a list of items, which have to be
							done next day.
						</p>
						<input type='text' id='prep_item' onKeyDown={(e)=>e.keyCode===13?this.addToPreps():null} />
						<button onClick={()=>this.addToPreps()}>Add</button>
					</div>

					<div className="preparations--card">
						<ul>
						{this.state.preps.map((each,i)=>{
							console.log(each)
							return(
								<li key={i*0.3987}>{each}</li>
								)
						})}
						</ul>
					</div>
				</div>
			</div>
			)
	}
}

export default Preparations;