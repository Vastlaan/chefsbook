import React from 'react';





class Landing extends React.Component{

	checkPosition = () => {
		const features =  document.querySelector('.landing__features');
		const featuresTopPosition =features.getBoundingClientRect().top;
		//const halfScreen = window.innerHeight/2;
		const currentPagePosition = window.pageYOffset
		if(currentPagePosition>=featuresTopPosition){
			features.className = features.className.replace('hide','show');
		}
	}
	componentDidMount(){
		window.addEventListener("scroll",this.checkPosition)
	}
	componentWillUnmount(){
		window.removeEventListener("scroll",this.checkPosition)
	}
	
	render(){
		
		
		return(
			<div className='landing'>
				<div className='landing__header'>
					<h1 className="landing__header--slogan">Be creative...</h1>
					<h1 className="landing__header--slogan">...be professional</h1>
				</div>
				<h1 className="landing__chapter">
					<span>All of that for free</span>
				</h1>
				<div className="landing__features hide">
					<div className="landing__features__text">
						<p className="landing__features__text--p">Create and store your recepies digital</p>
						<p className="landing__features__text--p">Add new or remove canceled events in the Calendar</p>
						<p className="landing__features__text--p">Manage team schedule</p>
						<p className="landing__features__text--p">Actualize your menu card</p>
					</div>
					<div className="landing__features__mission">
						<p className="landing__features__mission--p">This service is dedicated to all the chefs who want to manage their kitchen in easy and modern way.</p>
						<p className="landing__features__mission--p">Our mission is to consolidate all necessary tools in one place to help you organise your workplace.</p>
						<p className="landing__features__mission--p">We are free of charge. It means you can freely use all our features</p>
					</div>
					
				</div>

				
			</div>
		)
	}
	
}
export default Landing;