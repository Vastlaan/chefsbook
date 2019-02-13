import React from "react";
import moment from "moment";
import Icons from "../img/sprite.svg";

class CalendarComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			dateContext: moment(),
			dateEvent: {
				day: "",
				month: "",
				year: "",
				display: "none"
			},
			events: []
		};
	}

	componentWillMount() {
		fetch("/api/events", { credentials: "include" })
			.then(res => res.json())
			.then(events => {
				this.setState({ events });
			})
			.catch(err => console.log(err));
	}

	firstDayOfMonth = () => {
		return Number(
			moment(this.state.dateContext)
				.startOf("month")
				.format("d")
		);
	};

	prevMonth = (month, months, year) => {
		const currentMonthIndex = months.indexOf(month);
		let newMonthIndex = 0;
		if (currentMonthIndex === 0) {
			newMonthIndex = 11;
			const newYear = year - 1;
			const newMonth = months[newMonthIndex];
			let monthNo = months.indexOf(newMonth);
			let dateContext = Object.assign({}, this.state.dateContext);
			dateContext = moment(dateContext).set("year", newYear);
			dateContext = moment(dateContext).set("month", monthNo);
			this.setState({ dateContext });
		} else {
			newMonthIndex = currentMonthIndex - 1;
			const newMonth = months[newMonthIndex];
			let monthNo = months.indexOf(newMonth);
			let dateContext = Object.assign({}, this.state.dateContext);
			dateContext = moment(dateContext).set("month", monthNo);
			this.setState({ dateContext });
		}
	};

	nextMonth = (month, months, year) => {
		const currentMonthIndex = months.indexOf(month);
		let newMonthIndex = 0;
		if (currentMonthIndex === 11) {
			newMonthIndex = 0;
			const newYear = Number(year) + Number(1);
			const newMonth = months[newMonthIndex];
			let monthNo = months.indexOf(newMonth);
			let dateContext = Object.assign({}, this.state.dateContext);
			dateContext = moment(dateContext).set("year", newYear);
			dateContext = moment(dateContext).set("month", monthNo);
			this.setState({ dateContext });
		} else {
			newMonthIndex = currentMonthIndex + 1;
			const newMonth = months[newMonthIndex];
			let monthNo = months.indexOf(newMonth);
			let dateContext = Object.assign({}, this.state.dateContext);
			dateContext = moment(dateContext).set("month", monthNo);
			this.setState({ dateContext });
		}
	};
	addEvent = (day, month, year) => {
		this.setState({
			dateEvent: {
				day,
				month,
				year,
				display: "block"
			}
		});
	};
	closeEvent = () => {
		this.setState({
			dateEvent: {
				day: "",
				month: "",
				year: "",
				display: "none"
			}
		});
	};
	appendEvent = () => {
		const time = document.querySelector("#time").value;
		const des = document.querySelector("#description");
		const description = document.querySelector("#description").value;
		if (description === "") {
			console.log("you have to add description");
			des.style.border = "1px solid red";
			return;
		}
		const event = {
			day: this.state.dateEvent.day,
			month: this.state.dateEvent.month,
			year: this.state.dateEvent.year,
			time,
			description
		};
		fetch("api/new_event", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(event)
		})
			.then(data => data.json())
			.then(events => this.setState({ events }));
		this.closeEvent();
	};

	removeEvent = (year, month, day, time, description) => {
		const toDelete = {
			day,
			month,
			year,
			time,
			description
		};
		fetch("/api/remove_event", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(toDelete)
		})
			.then(data => data.json())
			.then(events => this.setState({ events }))
			.catch(err => console.log(err));
	};

	compare = (a, b) => {
		if (a.day < b.day) {
			return -1;
		} else if (a.day > b.day) {
			return 1;
		}
		return 0;
	};
	render() {
		const { dateContext, dateEvent, events } = this.state;

		const weekdays = moment.weekdaysShort(); //gives us array ['Sun','Mon','Tue'....]
		const months = moment.months();
		const year = dateContext.format("Y");
		const month = dateContext.format("MMMM");
		const day = dateContext.format("D");
		const daysInMonth = dateContext.daysInMonth();
		const eventsSorted = events.sort(this.compare);
		let arrayOfDays = [];
		eventsSorted.forEach(each => {
			if (each.year === year && each.month === month) {
				arrayOfDays.push(each.day);
				return arrayOfDays;
			}
			return arrayOfDays;
		});
		let blanks = [];
		for (let i = 0; i < this.firstDayOfMonth(); i++) {
			blanks.push(
				<div
					className="calendar__table__weekday calendar__table__weekday--blank"
					key={i * 0.1798}
				>
					&nbsp;
				</div>
			);
		}
		let daysNumbers = [];
		for (let i = 1; i <= daysInMonth; i++) {
			const sunday = 8 - this.firstDayOfMonth();
			if (i === Number(day)) {
				daysNumbers.push(
					<div
						className="calendar__table__weekday calendar__table__weekday--green calendar__table__weekday--day "
						key={i * 2.998}
						onClick={() => this.addEvent(i, month, year)}
					>
						{i}
					</div>
				);
			} else if (
				i === sunday ||
				i === sunday + 7 ||
				i === sunday + 14 ||
				i === sunday + 21 ||
				i === sunday + 28 ||
				(this.firstDayOfMonth() === 0 && i === 1)
			) {
				daysNumbers.push(
					<div
						className="calendar__table__weekday calendar__table__weekday--red calendar__table__weekday--day "
						key={i * 2.998}
						onClick={() => this.addEvent(i, month, year)}
					>
						{i}
					</div>
				);
			} else if (arrayOfDays.includes(i)) {
				daysNumbers.push(
					<div
						className="calendar__table__weekday calendar__table__weekday--yellow calendar__table__weekday--day "
						key={i * 2.998}
						onClick={() => this.addEvent(i, month, year)}
					>
						{i}
					</div>
				);
			} else {
				daysNumbers.push(
					<div
						className="calendar__table__weekday calendar__table__weekday--day"
						key={i * 2.998}
						onClick={() => this.addEvent(i, month, year)}
					>
						{i}
					</div>
				);
			}
		}
		return (
			<div className="calendar">
				<h1 className="calendar__header">Calendar</h1>

				<div className="calendar__table">
					<svg
						className="calendar__table--icon calendar__table--icon__before"
						onClick={() => this.prevMonth(month, months, year)}
					>
						<use xlinkHref={`${Icons}#icon-navigate_before`} />
					</svg>
					<div className="calendar__table__header">
						{month} {year}
					</div>
					<svg
						className="calendar__table--icon calendar__table--icon__next"
						onClick={() => this.nextMonth(month, months, year)}
					>
						<use xlinkHref={`${Icons}#icon-navigate_next`} />
					</svg>
					{weekdays.map((day, i) => {
						return (
							<div
								className={`calendar__table__weekday calendar__table__weekday-${i}`}
								key={i * 0.157}
							>
								{day}
							</div>
						);
					})}
					{blanks.concat(daysNumbers)}
				</div>

				<div className="calendar__comming">
					<h1 className="calendar__comming--header">
						Comming events:
					</h1>
					<div className="calendar__comming__box">
						{eventsSorted.map((event, i) => {
							if (event.year === year && event.month === month) {
								return (
									<div
										className="calendar__comming__box--each"
										key={i * 91.332323}
									>
										<h2>{`${event.day} ${event.month} ${
											event.year
										} at ${event.time}`}</h2>
										<p>{event.description}</p>
										<svg
											onClick={() =>
												this.removeEvent(
													event.year,
													event.month,
													event.day,
													event.time,
													event.description
												)
											}
										>
											<use
												xlinkHref={`${Icons}#icon-bin`}
											/>
										</svg>
									</div>
								);
							}
							return null;
						})}
					</div>
				</div>

				<div
					className="calendar__event"
					style={{ display: dateEvent.display }}
				>
					<div className="calendar__event__box">
						<svg
							className="calendar__event__box--icon"
							onClick={() => this.closeEvent()}
						>
							<use xlinkHref={`${Icons}#icon-close`} />
						</svg>
						<h1>
							Events on {dateEvent.day} {dateEvent.month}{" "}
							{dateEvent.year}
						</h1>

						{events.map((event, i) => {
							if (
								event.year === dateEvent.year &&
								event.month === dateEvent.month &&
								event.day === dateEvent.day
							) {
								return (
									<div
										className="calendar__event__box__current"
										key={i * 77.12}
									>
										<svg className="calendar__event__box__current--icon">
											<use
												xlinkHref={`${Icons}#icon-event_available`}
											/>
										</svg>
										<p key={i * 391.891}>
											At {event.time} {event.description}
										</p>
									</div>
								);
							}
							return null;
						})}

						<div className="calendar__event__box__add">
							<h2>Add Event</h2>
							<p>Time</p>
							<input
								className="calendar__event__box__add--time"
								type="time"
								name="time"
								id="time"
							/>
							<p>Description</p>
							<textarea
								className="calendar__event__box__add--description"
								type="text"
								name="description"
								id="description"
								required
							/>
							<button
								className="calendar__event__box__add--add"
								onClick={() => this.appendEvent()}
							>
								Add Event
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
export default CalendarComponent;
