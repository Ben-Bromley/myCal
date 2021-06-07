import React from 'react';
// import ReactDOM from 'react-dom';
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'

class Calendar extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			// dateObject: moment(),
			currentmonth: moment(),
			month: moment().format("MMMM"),
			today: moment(),
			weekStart: moment().startOf('week').format("M/D"),
			weekEnd: moment().endOf('week').format("M/D"),

		};
		// this.weekStart = moment().startOf('week').format("M/D")
		// this.weekEnd = moment().endOf('week').format("M/D")
		this.weekStart = moment().startOf('week')
		this.weekEnd = moment().endOf('week')
	};

	getHeaderDates() {
		// initalises array
		const weekDates = [];
		// adds all dates for the week to array
		for (let i = 0; i < 7; i++){
		  //Push day
		  weekDates.push(this.weekStart.format('M/D')); 
		  //Adds a day
		  this.weekStart.add(1, 'days');
		};
		// returns list of dates for the work
		return weekDates;
	}

	addHeaders() {

		// pulls header names from other method
		this.weekdayShort = moment.weekdaysShort();
		// pulls header dates from other method
		this.dateArray = this.getHeaderDates();
		// matches date and weekday to match in array
		this.weekDaysShortName = this.weekdayShort.map((day, index) => {
			return (
				<th key={day} className="week-day">
				{day}<br />{this.dateArray[index]}
				</th>
			);
		});
		return this.weekDaysShortName;
	}

	createTimeSlots() {

		let x = {
		  slotInterval: 30,
		  openTime: '0:00',
	  	  closeTime: '24:00'
		};

		//Format the time
		let startTime = moment(x.openTime, "HH:mm");
		//Format the end time
		let endTime = moment(x.closeTime, "HH:mm")
		//Times
		let allTimes = [];
		//Loops over times - pushes times with 30 mins interval
		while (startTime < endTime) {
		  //Push times
		  allTimes.push(startTime.format("HH:mm")); 
		  //Add interval of 30 minutes
		  startTime.add(x.slotInterval, 'minutes');
		}
		// console.log(allTimes);
		return allTimes;
	}

	addTimesToTable() {
		this.timeSlots = this.createTimeSlots();
		this.timeSlotElements = [];
		for (let d = 0; d < 48; d++){
			this.timeSlotElements.push(
				<tr key={d} className="timeSlot">
					<td>{this.timeSlots[d]}</td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
				</tr>
			);
		}
		return this.timeSlotElements;
	}

	prevMonth() {
		console.log('previous clicked!')
		// this.setState({month: })
	};
	nextMonth() {
		console.log('next clicked!')
	};

	render() {
		return (
			<div id="cal-container">
				<div id="header-container">
					<h2>My Weekly Agenda</h2>
					<div id="month-selector-container">
						<FontAwesomeIcon icon={faAngleLeft}id="prev-icon"
						onClick={() => this.prevMonth()}/>
						<span>{this.state.month}</span>
						<FontAwesomeIcon icon={faAngleRight} id="next-icon"
						onClick={() => this.nextMonth()}/>
					</div>
				</div>
				<table>
					<thead>
						<tr><th>(Times)</th>{this.addHeaders()}</tr>
					</thead>
					<tbody>
						<tr>
							<td>All Day</td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
						</tr>
						{this.addTimesToTable()}
					</tbody>
				</table>
			</div>
		);
	};
};

export default Calendar;