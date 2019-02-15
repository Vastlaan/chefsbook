import React from "react";
import Icons from "../img/sprite.svg";
import Icons2 from "../img/sprite4.svg";

class NewRecepie extends React.Component {
	state = {
		photo: null,
		name: "",
		ingridients: [],
		preparation: "",
		url: "",
		display: "none",
		displayPhoto:'none',
		blackout:'none'
	};

	inputChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		});
	}
	async appendIngridient() {
		const ingridient = document.querySelector("#ingridient");
		await this.setState(prevState => ({
			ingridients: [...prevState.ingridients, ingridient.value]
		}));
		ingridient.value = "";
	}
	removeIngridient(element) {
		const newArray = this.state.ingridients.filter(el => {
			return el !== element;
		});
		this.setState({
			ingridients: newArray
		});
	}

	submitForm = async (event) => {
		event.preventDefault();
		this.setState({
			blackout:'block'
		})
		//console.log(this.state.name, this.state.ingridients, this.state.preparation)
		const data = new FormData();
		data.append("uploadFile", this.state.photo);
		const fileName = await fetch("/api/current_user/file", {
			method: "POST",
			credentials: "include",
			body: data
		})
		const fileURL = await fileName.json()
		
		await this.setState({ url: fileURL });

		const recept = {
			name: this.state.name,
			ingridients: this.state.ingridients,
			preparation: this.state.preparation,
			photo: this.state.url
		};
		fetch("/api/current_user/recepies", {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(recept)
		})
			.then(user => user.json())
			.then(data => {
				this.setState({
					photo: null,
					name: "",
					ingridients: [],
					preparation: "",
					url: "",
					display: "block"
				});
				console.log(document.querySelectorAll("input"));
			})
		.catch(err => console.log(err));
			

		this.setState({
			blackout:'none'
		})
	};

	addPhoto(event) {
		const image = document.querySelector("#file").files[0];
		var output = document.querySelector('#output')
		if(image instanceof File){
			this.setState({
				displayPhoto:'block'
			})
			output.src = URL.createObjectURL(image);

		}
   		
		this.setState({
			photo: image
		});
	}

	closeMessage = () => {
		this.setState({
			display: "none"
		});
	};
	render() {
		this.inputChange = this.inputChange.bind(this);
		this.submitForm = this.submitForm.bind(this);
		this.appendIngridient = this.appendIngridient.bind(this);
		this.removeIngridient = this.removeIngridient.bind(this);
		this.addPhoto = this.addPhoto.bind(this);

		return (
			<div className="newRecepie">
				<h1 className="newRecepie__header">Create new recipe</h1>
				<form className="newRecepie__form" onSubmit={this.submitForm}>
					<div className="newRecepie__form--area">
						<label className="newRecepie__form--label">
							Product's name
						</label>
						<input
							name="name"
							type="text"
							className="newRecepie__form--input"
							value={this.state.name}
							onChange={this.inputChange}
							required
						/>
					</div>
					<div className="newRecepie__form--area">
						<label className="newRecepie__form--label">Photo</label>
						<div>
							<input
								name="photo"
								type="file"
								id="file"
								className="newRecepie__form--photo"
								onChange={this.addPhoto}
								required
							/>
							<label
								className="newRecepie__form--photo-label"
								htmlFor="file"
							>
								<svg>
									<use xlinkHref={`${Icons}#icon-upload`} />
								</svg>
								<span>Choose file to upload</span>
								<span>Only format JPG/JPEG allowed</span>
								<img id="output" alt='food' style={{display: `${this.state.displayPhoto}`}}/>
								{this.state.photo === null ||
								this.state.photo === undefined ? null : (
									<div>
										
										<span>
											{" "}
											You added a photo:{" "}
											{this.state.photo.name}
										</span>
									</div>
								)}
							</label>
						</div>
					</div>
					<div className="newRecepie__form--area">
						<label className="newRecepie__form--label">
							Ingidients
						</label>
						{this.state.ingridients.map((element, i) => {
							return (
								<div
									key={`${element}!${i}`}
									className="newRecepie__form--ingridient"
								>
									<span>{element}</span>
									<svg
										onClick={() =>
											this.removeIngridient(element)
										}
									>
										<use
											xlinkHref={`${Icons}#icon-delete`}
										/>
									</svg>
								</div>
							);
						})}
						<div
							className="newRecepie__form--add"
							onClick={this.appendIngridient}
						>
							<svg className="newRecepie__form--add-icon">
								<use xlinkHref={`${Icons}#icon-add_circle`} />
							</svg>
						</div>
						<input
							name="ingridients"
							type="text"
							className="newRecepie__form--input"
							id="ingridient"
						/>
					</div>
					<div className="newRecepie__form--area">
						<label className="newRecepie__form--label">
							Preparation
						</label>
						<textarea
							name="preparation"
							type="text"
							className="newRecepie__form--textarea"
							value={this.state.preparation}
							onChange={this.inputChange}
							required
						/>
					</div>
					
					<button type="submit" className="newRecepie__form--submit">
						{" "}
						Submit{" "}
					</button>
				</form>

				<div
					className="newRecepie__success"
					style={{ display: this.state.display }}
				>
					<svg
						className="newRecepie__success--icon"
						onClick={() => this.closeMessage()}
					>
						<use xlinkHref={`${Icons}#icon-close`} />
					</svg>
					<h1 className="newRecepie__success--header">
						You sucessfully updated new Recipe!
					</h1>
				</div>
				<div className='blackout' style={{display:`${this.state.blackout}`}}>
					
					<svg>
						<use xlinkHref={`${Icons2}#refresh`}></use>
					</svg>
				</div>
			</div>
		);
	}
}

export default NewRecepie;
