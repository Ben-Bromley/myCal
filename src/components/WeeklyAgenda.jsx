import React from 'react';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import db from '../firebase.js';
import TableCell from './TableCell';
import dataHandler from '../dataHandler';
import dateGenerator from '../dateGenerators';
import dataGenerator from '../dataGenerator';

class WeeklyAgenda extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			day: this.props.date,
			weekDates: [],
		}
		this.dbRef = db.collection('userData')
		this.weekDates = dateGenerator.generateWeekDates(this.state.day);
		// dataGenerator.addData();
	};

	componentDidMount() {
		// adds table headers using state
		this.addHeaders()
		// adds all day events
		this.addAllDayEvents()
	};
	addHeaders() {
		// updates current weekDates
		this.weekDates = dateGenerator.generateWeekDates(this.state.day);
		// matches date and weekday to match in array
		this.tableHeaderArray = moment.weekdaysShort().map((day, index) => {
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
			()=>{console.log('prev Clicked!');this.addHeaders();this.addAllDayEvents()}
		);
	};
	nextWeek() {
		this.setState(prevState => ({day: prevState.day.add(1, 'week')}), 
			()=>{console.log('next Clicked!');this.addHeaders();this.addAllDayEvents()}
		);
	};
	// rename this to add all data
	addAllFields() {
		this.timeSlots = dateGenerator.createTimeSlots();
		this.timeSlotElements = [];
		// TODO: first add the all day event data
		dataHandler.getEvents(this.dbRef, this.weekDates)
		for (let d = 0; d < 48; d++){
			this.timeSlotElements.push(
				// adding events row by row
				<tr key={d} className="timeSlot">
					<td key={d}>{this.timeSlots[d]}</td>
					{/* the below elements must be rendered with the data */}
					<TableCell key={'Sunday'+this.timeSlots[d]}day='Sunday' timeSlot={this.timeSlots[d]}/>
					<TableCell key={'Monday'+this.timeSlots[d]}day='Monday' timeSlot={this.timeSlots[d]}/>
					<TableCell key={'Tuesday'+this.timeSlots[d]}day='Tuesday' timeSlot={this.timeSlots[d]}/>
					<TableCell key={'Wednesday'+this.timeSlots[d]}day='Wednesday' timeSlot={this.timeSlots[d]}/>
					<TableCell key={'Thursday'+this.timeSlots[d]}day='Thursday' timeSlot={this.timeSlots[d]}/>
					<TableCell key={'Friday'+this.timeSlots[d]}day='Friday' timeSlot={this.timeSlots[d]}/>
					<TableCell key={'Saturday'+this.timeSlots[d]}day='Saturday' timeSlot={this.timeSlots[d]}/>
				</tr>
			);
		}
		return this.timeSlotElements;
	}
	// add all day events :)
	async addAllDayEvents() {
		// get allDay events for this week
		const dataArray = await dataHandler.getAllDayEvents(this.dbRef, this.weekDates)
		this.allDayArray = dataArray.map((data, index) => {
			if (data){
				return <TableCell key={moment.weekdays(index)+'AllDay'} status="active" display={data.name} day={moment.weekdays(index)} eventData={data}/>;
				
			} else {
				return <TableCell key={moment.weekdays(index)+'AllDay'} day={moment.weekdays(index)}/>
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
						<tr><TableCell display="All Day"/>{this.state.allDayData}</tr>
						{this.addAllFields()}
					</tbody>
				</table>
			</div>
		)
	}
};
export default WeeklyAgenda;