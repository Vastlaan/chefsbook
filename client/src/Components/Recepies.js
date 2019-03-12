import React from "react";
import Icons from "../img/sprite.svg";
import { connect } from "react-redux";
import { fetchRecepies } from "../actions";
import WarningRecepies from "./WarningRecepies";
import Delete from "../img/delete.svg";

class Recepies extends React.Component {
	state = {
		display: "none",
		recept: {},
		displayWarning: "none",
		toRemove:{}
	};

	componentWillMount() {
		this.props.fetchRecepies();
	}

	openRecepie = index => {
		this.setState({ display: "block" });
		this.setState({ recept: this.props.recepies[index] });
	};

	removeRecepie = (name, photo, ingridients, preparation) => {
		const toRemove = {
			name,
			photo,
			ingridients,
			preparation
		};
		this.setState({toRemove})
		this.setState({ displayWarning: "block" });		
	};

	render() {
		const { recepies } = this.props;
		const { display, recept } = this.state;

		return (
			<div className="recepies">
				
				<h1 className="recepies--header">Recipes</h1>
				<div className="recepies--content">
					{recepies.length === 0 ? (
						<h1 className="recepies--content-warning">
							You haven't created any recipes yet. Click the
							button below to create a new recipe.
						</h1>
					) : (
						recepies.map((element, i) => {
							return (
								<div
									key={`${i}@@@`}
									className="recepies--content-item"
									onClick={() => this.openRecepie(i)}
								>
									<p className="recepies--content-item-name">
										{element.name}
									</p>
									<div className="recepies--content-item-box">
										<img
											src={element.photo}
											className="recepies--content-item-photo"
											alt="food"
										/>
									</div>
								</div>
							);
						})
					)}
				</div>
				<a className="recepies--new" href="/new_recepie">
					Create New Recipe
				</a>

				<div style={{ display: `${display}` }}>


					{recept.name ||recept.name==='' ? (
						<div className="recepies__hidden">
							<div className="recepies__hidden-frame">
								<div
									className="recepies__hidden-close-svg-2"
									onClick={() =>
										this.removeRecepie(
											recept.name,
											recept.photo,
											recept.ingridients,
											recept.preparation
										)
									}
								>
									<svg>
										<use xlinkHref={`${Delete}#Capa_1`} />
									</svg>
									<span>Delete</span>
								</div>
								
								<div
									className="recepies__hidden-close-svg"
									id="close"
									onClick={() =>
										this.setState({ display: "none" })
									}
								>
									<svg>
										<use xlinkHref={`${Icons}#icon-close`} />
									</svg>
									<span>Close</span>
								</div>

								<p className="recepies__hidden-name">
									{recept.name}
								</p>
								<div className="recepies__hidden-box">
									<img
										src={recept.photo}
										className="recepies__hidden-photo"
										alt="food"
									/>
								</div>

								<div className="recepies__hidden-ingridients">
									<h6>Ingridients:</h6>
									<p>
										{recept.ingridients.map((each, i) => {
											return (
												<span key={`${i}%%%`}>
													{" "}
													{each},{" "}
												</span>
											);
										})}
									</p>
								</div>
								<div className="recepies__hidden-preparation">
									<h6>Preparation:</h6>
									<p>{recept.preparation}</p>
								</div>
							</div>
						</div>
					) : null}
				</div>
					<WarningRecepies
						display={`${this.state.displayWarning}`}
						toRemove={this.state.toRemove}
					/>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	recepies: state.fetchRecepies.recepies,

});

export default connect(
	mapStateToProps,
	{ fetchRecepies }
)(Recepies);
