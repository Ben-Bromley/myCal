import React from 'react';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import db from '../firebase.js';
import TableCell from './TableCell'

class WeeklyAgenda extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			day: this.props.date,
		}
		// essentially a constant
		this.weekDaysShort = moment.weekdaysShort()
		this.getHeaderDates()
		this.addHeaders()
		this.addAllDayEvents()

		// get firestore data!

		// const db = firebase.firestore()
		// let docRef = db.collection('userData')
		// console.log(docRef)

		// const fetchEvents = async () => {
		// 	const response = db.collection('userData')
		// 	const data = await response.get()
		// 	console.log(data.docs);
		// }
		// // calls function twice for some reason
		// fetchEvents();

		this.snapshot = async () => {
			this.collection = await db.collection('userData').get()
			this.collection.forEach(doc => console.log(doc.id, '=>', doc.data()));
		}
		
	};

	// getData () {

	// 	this.collection = await db.collection('userData').get()
	// 	this.collection.forEach(doc => console.log(doc.name, '=>', doc.data()));
		
	// }

	componentDidMount() {
		// this.getData();
		this.snapshot();
	}

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
		// this.setState(()=>({weekDates: this.weekDates}));
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
		// this.setState(() => ({tableHeaders: this.tableHeaderArray}))
		// return this.tableHeaderArray;
	};
	prevWeek() {
		this.setState(prevState => ({day: prevState.day.subtract(1, 'week')}), 
			()=>{this.getHeaderDates();this.addHeaders()}
		);
	}
	nextWeek() {
		this.setState(prevState => ({day: prevState.day.add(1, 'week')}), 
			()=>{this.getHeaderDates();this.addHeaders();}
		);
	}
	// creates an array ofr times from 00:00 - 23:30 as strings
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
		// consider use of state for the array
		this.timeSlots = this.createTimeSlots();
		this.timeSlotElements = [];
		// TODO: first add the all day event data
		for (let d = 0; d < 48; d++){
			this.timeSlotElements.push(
				<tr key={d} className="timeSlot">
					<td key={d}>{this.timeSlots[d]}</td>
					{/* the below elements must be rendered with the data */}
					<TableCell />
					<TableCell />
					<TableCell />
					<TableCell />
					<TableCell />
					<TableCell />
					<TableCell />
				</tr>
			);
		}
		return this.timeSlotElements;
	}
	addAllDayEvents() {
		let allDayArray = [];
		const dataArray = ['', '', '', '', '', '', '']; // pull firebase data
		this.allDayArray = dataArray.map((data, index) => {
			return <TableCell key={'AllDay' + index} eventData={data} />;
		}) 
		// console.log('array: ', allDayArray)
		this.setState({allDayData: allDayArray});
		// console.log('post statechange:', this.state.allDayData)

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
						{/* add all day event */}
						<tr><TableCell eventData="All Day"/>{this.allDayArray}</tr>
						{this.addTimesToTable()}
					</tbody>
				</table>
			</div>
		)
	}
};
export default WeeklyAgenda;