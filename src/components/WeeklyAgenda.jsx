import React from 'react';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import db from '../firebase.js';
import TableCell from './TableCell';
import dataHandler from '../dataHandler';
class WeeklyAgenda extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			day: this.props.date,
			weekDates: [],
			
		}
		// essentially a constant
		this.weekDaysShort = moment.weekdaysShort()

		this.getData = async () => {
			this.dbRef = db.collection('userData')
			this.allData = await this.dbRef.get()
			// this.allData.forEach(doc => console.log(doc.id, '=>', doc.data()));

			// logs all documents with 
			this.documentEx = await this.dbRef.where('isAllDay', '==', true).get()
			// this.documentEx.forEach(doc => {console.log(doc.data())})
		}
		dataHandler.importCheck()
		
	};

	componentDidMount() {
		// gets data from firebase
		this.getData();
		// adds table headers using state
		this.getHeaderDates()
		this.addHeaders()
		// adds all day events
		this.addAllDayEvents()
	}

	getHeaderDates() {
		// updates values before running
		this.weekStart = this.state.day.startOf('week')
		this.weekEnd = this.state.day.endOf('week')
		// initalises array
		this.weekDates = [];
		// adds all dates for the week to array
		for (let i = 0; i < 7; i++){
			// Push current day
		 	this.weekDates.push(this.weekStart.format('M/D'));
		 	// Add a day
			this.weekStart = this.weekStart.add(1, 'days'); 
		};
		this.setState(()=>({weekDates: this.weekDates}));
		// return this.weekDates;
	}
	addHeaders() {
		// matches date and weekday to match in array
		this.tableHeaderArray = this.weekDaysShort.map((day, index) => {
			return (
				<th key={day} className="week-day">
				{day}<br />{this.weekDates[index]}
				</th>
			);
		})
		this.setState(() => ({tableHeaders: this.tableHeaderArray}))
		// return this.tableHeaderArray;
	};
	prevWeek() {
		this.setState(prevState => ({day: prevState.day.subtract(1, 'week')}), 
			()=>{this.getHeaderDates();this.addHeaders();this.addAllDayEvents()}
		);
	}
	nextWeek() {
		this.setState(prevState => ({day: prevState.day.add(1, 'week')}), 
			()=>{this.getHeaderDates();this.addHeaders();this.addAllDayEvents()}
		);
	}
	// creates an array of times from 00:00 - 23:30 as strings
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
		return allTimes;
	}
	// rename this to add all data
	addTimesToTable() {
		// maybe refactor into 2/3 functions
		this.timeSlots = this.createTimeSlots();
		this.timeSlotElements = [];
		// TODO: first add the all day event data
		for (let d = 0; d < 48; d++){
			// get elements for this time slot

			this.timeSlotElements.push(
				// adding events row by row
				<tr key={d} className="timeSlot">
					<td key={d}>{this.timeSlots[d]}</td>
					{/* the below elements must be rendered with the data */}
					<TableCell day='Sunday' timeSlot={this.timeSlots[d]}/>
					<TableCell day='Monday' timeSlot={this.timeSlots[d]}/>
					<TableCell day='Tuesday' timeSlot={this.timeSlots[d]}/>
					<TableCell day='Wednesday' timeSlot={this.timeSlots[d]}/>
					<TableCell day='Thursday' timeSlot={this.timeSlots[d]}/>
					<TableCell day='Friday' timeSlot={this.timeSlots[d]}/>
					<TableCell day='Saturday' timeSlot={this.timeSlots[d]}/>
				</tr>
			);
		}
		return this.timeSlotElements;
	}
	// add all day events :)
	async addAllDayEvents() {
		// get allDay events for this week
		const dataArray = await dataHandler.getWeekEvents(this.dbRef, this.weekDates)
		this.allDayArray = dataArray.map((data, index) => {
			if (data){
				return <TableCell status="active" display={data.name} day={moment.weekdays(index)}/>;
				
			} else {
				return <TableCell day={moment.weekdays(index)}/>
			}
		})
		this.setState({allDayData: this.allDayArray});
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
					<thead>{<tr><td></td>{this.state.tableHeaders}</tr>}</thead>
					<tbody>
						{/* add all day event */}
						<tr><TableCell display="All Day"/>{this.state.allDayData}</tr>
						{this.addTimesToTable()}
					</tbody>
				</table>
			</div>
		)
	}
};
export default WeeklyAgenda;