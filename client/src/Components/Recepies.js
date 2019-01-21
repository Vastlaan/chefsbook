import React from 'react';
import Icons from '../img/sprite.svg'

class Recepies extends React.Component {

	constructor(props){
		super(props)
		this.state = {
			display: 'none',
			recept: {}
		}
	}

	openRecepie(index){
		this.setState({display: 'block'})
		this.setState({recept: this.props.recepies[index]})
	}

	render(){
		const {recepies} = this.props;
		const { display, recept } = this.state;

		return(
			<div className='dashboard__recepies'>
			
				<h1 className='dashboard__recepies--header'>Recepies</h1>
				<div className='dashboard__recepies--content'>
					{
						recepies.length===0 ?
						<h1 className='dashboard__recepies--content-warning'>You havent created any recepie yet. Click the button below to create a new recepie.</h1>
						:
						recepies.map((element,i) =>{
							return (<div key={`${i}@@@`}className='dashboard__recepies--content-item' onClick={()=>this.openRecepie(i)}>
										<p className='dashboard__recepies--content-item-name'>{element.name}</p>
										<div className='dashboard__recepies--content-item-box'>
											<img src={element.photo} className='dashboard__recepies--content-item-photo' alt='food'/>
										</div>
										
									</div>)
						})
					}
				</div>
				<a className='dashboard__recepies--new' href='/new_recepie'>Create New Recepie</a>

				<div style={{display:`${display}`}}>
					{recept.name?
						<div className='dashboard__recepies__hidden'>

							<div className='dashboard__recepies__hidden-frame'>
								
								<svg className='dashboard__recepies__hidden-close-svg' onClick={()=>this.setState({display:'none'})}>
									<use xlinkHref={`${Icons}#icon-close`} />
								</svg>
								
								<p className='dashboard__recepies__hidden-name'>{recept.name}</p>
								<div className='dashboard__recepies__hidden-box'>
									<img src={recept.photo} className='dashboard__recepies__hidden-photo' alt='food'/>
								</div>
									
								<div className='dashboard__recepies__hidden-ingridients'>
									<h6>Ingridients:</h6>
									<p>
									{recept.ingridients.map((each,i)=>{
										return (<span key={`${i}%%%`}> {each}, </span>)
									})}
									</p>
								</div>
								<div className='dashboard__recepies__hidden-preparation'>
									<h6>Preparation:</h6>
									<p>{recept.preparation}</p>
								</div>
							</div>
						</div>
						:null
					}
				</div>
			</div>

			)
	}
}

export default Recepies