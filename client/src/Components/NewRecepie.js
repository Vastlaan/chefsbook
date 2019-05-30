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
		displayPhoto: "none",
		blackout: "none"
	};

	inputChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		});
	}
	async appendIngridient() {
		const ingridient = document.querySelector("#ingridient");
		if(ingridient.value){
			await this.setState(prevState => ({
				ingridients: [...prevState.ingridients, ingridient.value]
			}));
			ingridient.value = "";
		}
		
	}
	removeIngridient(element) {
		const newArray = this.state.ingridients.filter(el => {
			return el !== element;
		});
		this.setState({
			ingridients: newArray
		});
	}

	submitForm = async event => {
		event.preventDefault();
		this.setState({
			blackout: "block"
		});
		//console.log(this.state.name, this.state.ingridients, this.state.preparation)
		const data = new FormData();
		data.append("uploadFile", this.state.photo);
		const fileName = await fetch("/api/current_user/file", {
			method: "POST",
			credentials: "include",
			body: data
		});
		const fileURL = await fileName.json();

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
			blackout: "none"
		});
	};

	addPhoto(event) {
		const imageInput = document.querySelector("#file")
		const filePath = imageInput.value;
	    const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
	    if(!allowedExtensions.exec(filePath)){
	        alert('Please upload file having extensions .jpeg/.jpg/.png/.gif only.');
	        imageInput.value = '';
	        return false;
	    }
		const image = document.querySelector("#file").files[0];
		var output = document.querySelector("#output");
		if (image instanceof File) {
			this.setState({
				displayPhoto: "block"
			});
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
		window.location.href='/recipes';
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
					{/*areaName*/}
					<div id="areaName" className="newRecepie__form--area">
						<h1>Step 1.</h1>
						<h3>Enter a product's name.</h3>
						<label className="newRecepie__form--label">
							Product's name
						</label>
						<input
							name="name"
							type="text"
							className="newRecepie__form--input"
							id="name"
							value={this.state.name}
							onChange={this.inputChange}
							required
						/>
						<p
							className="newRecepie__form--next"
							id="next_area--1"
							onClick={() =>
								document.querySelector("#name").checkValidity()
									? (document.querySelector(
											"#areaName"
									  ).style.display = "none")
									: null
							}
						>
							Next
						</p>
					</div>
					{/*areaPhoto*/}
					<div id="areaPhoto" className="newRecepie__form--area">
						<h1>Step 2.</h1>
						<h3>Add a photo of your dish.</h3>
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
								<span>Only format JPG/JPEG/PNG/GIF allowed</span>
								<img
									id="output"
									alt="food"
									style={{
										display: `${this.state.displayPhoto}`
									}}
								/>
								{this.state.photo === null ||
								this.state.photo === undefined ? (
									<div>
										<span style={{color: 'red'}}>
											You haven't added a photo yet!
										</span>
									</div>
									) : (
									<div>
										<span style={{color: 'green'}}>
											{" "}
											You added a photo:{" "}
											{this.state.photo.name}
										</span>
									</div>
								)}
							</label>
						</div>
						<p
							className="newRecepie__form--next"
							id="next_area--2"
							onClick={() =>
								this.state.photo === null ||
								this.state.photo === undefined
									? null
									: (document.querySelector(
											"#areaPhoto"
									  ).style.display = "none")
							}
						>
							Next
						</p>
					</div>
					{/*areaIngridients*/}
					<div
						id="areaIngridients"
						className="newRecepie__form--area"
					>
						<h1>Step 3.</h1>
						<h3>Add the necessary ingredients.</h3>
						<label className="newRecepie__form--label">
							Ingredients
						</label>
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
											xlinkHref={`${Icons}#icon-close`}
										/>
									</svg>
								</div>
							);
						})}

						<p
							className="newRecepie__form--next"
							id="next_area--3"
							onClick={() =>
								(document.querySelector(
									"#areaIngridients"
								).style.display = "none")
							}
						>
							Next
						</p>
					</div>
					{/*areaPreparation*/}
					<div
						id="areaPreparation"
						className="newRecepie__form--area"
					>
						<h1>Step 4.</h1>
						<h3>Describe the preparation process.</h3>
						<label className="newRecepie__form--label">
							Preparation
						</label>
						<textarea
							name="preparation"
							type="text"
							id="prep"
							className="newRecepie__form--textarea"
							value={this.state.preparation}
							onChange={this.inputChange}
							required
						/>
						<p
							className="newRecepie__form--next"
							id="next_area--4"
							onClick={() =>
								document.querySelector("#prep").checkValidity()
									? (document.querySelector(
											"#areaPreparation"
									  ).style.display = "none")
									: null
							}
						>
							Next
						</p>
					</div>
					{/*end of shuffle*/}
					<div id="areaSubmit" className="newRecepie__form--area">
						<h2><span className='newRecepie__form--area--summary'>Name: </span><br/>{this.state.name}</h2>
						<h2>
							<span className='newRecepie__form--area--summary'>Ingredients: </span><br/> {" "}
							{this.state.ingridients.map((each,i) => {
								return <span key={i+99*0.121333}>{each}, </span>;
							})}
						</h2>
						<h2><span className='newRecepie__form--area--summary'>Preparation: </span><br/>{this.state.preparation}</h2>
						<h2>
							<span className='newRecepie__form--area--summary'>Photo:</span><br/>{" "}
							{this.state.photo ? this.state.photo.name : null}
						</h2>
						<button
							type="submit"
							className="newRecepie__form--submit"
						>
							{" "}
							Submit{" "}
						</button>
					</div>
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
						You successfully updated new Recipe!
					</h1>
				</div>
				<div
					className="blackout"
					style={{ display: `${this.state.blackout}` }}
				>
					<svg>
						<use xlinkHref={`${Icons2}#refresh`} />
					</svg>
				</div>
			</div>
		);
	}
}

export default NewRecepie;
