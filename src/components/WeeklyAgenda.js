import React from 'react';
// import ReactDOM from 'react-dom';
import moment from 'moment';
import dayjs from 'dayjs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';

class WeeklyAgenda extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			day: this.props.date,
			weekDates: [],
			tableHeaders: [],
			// weekDaysShort: moment.weekdaysShort()
			// month: this.props.date.format('MMMM/YYYY'),
		}

		// essentially a constant
		this.weekDaysShort = moment.weekdaysShort()

		this.getHeaderDates()
		this.addHeaders()

	};
	getHeaderDates() {
		// updates values before running
		this.weekStart = this.state.day.startOf('week')
		this.weekEnd = this.state.day.endOf('week')
		// initalises array
		this.weekDates = [];
		// adds all dates for the week to array
		for (let i = 0; i < 7; i++){
			// Push day
		 	this.weekDates.push(this.weekStart.format('M/D'));
		 	// Adds a day
			this.weekStart = this.weekStart.add(1, 'days'); 
		};

		this.setState(()=>({weekDates: this.weekDates}));
		// returns list of dates for the work
		console.log('weekdates', this.weekDates)
		return this.weekDates;
	}
	addHeaders() {
		console.log("weekDays", this.weekDaysShort)
		console.log("state dates", this.weekDates)
		// matches date and weekday to match in array
		this.tableHeaderArray = this.weekDaysShort.map((day, index) => {
			return (
				<th key={day} className="week-day">
				{day}<br />{this.weekDates[index]}
				</th>
			);
		})
		this.setState(() => ({tableHeaders: this.tableHeaderArray}), 
			console.log(this.state.tableHeaders)
		)

		console.log("weekDaysShortName(elements)", this.tableHeaderArray)
		console.log("state.tableHeaders", this.state.tableHeaders)
		return this.tableHeaderArray;
	};
	prevWeek() {
		this.setState(prevState => ({day: prevState.day.subtract(1, 'week')}), 
			()=>{
				console.log(this.state.day);
				this.getHeaderDates();
				this.addHeaders()
			}
		);
	}
	nextWeek() {
		this.setState(prevState => ({day: prevState.day.add(1, 'week')}), 
			()=>{
				console.log(this.state.day);
				this.getHeaderDates();
				this.addHeaders();
			}
		);
	}
	createTimeSlots() {
		let x = {slotInterval: 30, openTime: '0:00', closeTime: '24:00'};
		// format times
		let startTime = moment(x.openTime, "HH:mm");
		let endTime = moment(x.closeTime, "HH:mm")
		// init array for all ,times
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
					<td key={d}>{this.timeSlots[d]}</td>
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
	render(){
		return (
			<div id="cal-container">
				<div id="header-container">
					<h2>My Weekly Agenda</h2>
					<div id="month-selector-container">
						<FontAwesomeIcon icon={faAngleLeft} id="prev-icon"
						onClick={() => this.prevWeek()}
						/>
						<span>Week Of: {this.state.day.startOf('week').format('DD/MM/YY')}</span>
						<FontAwesomeIcon icon={faAngleRight} id="next-icon"
						onClick={() => this.nextWeek()}
						/>
					</div>
				</div>
				<table>
					<thead>{<tr><td></td>{this.tableHeaderArray}</tr>}</thead>
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
		)
	}
};
export default WeeklyAgenda;