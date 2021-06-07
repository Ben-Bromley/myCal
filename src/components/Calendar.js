import React from 'react';
// import ReactDOM from 'react-dom';
import moment from 'moment'

class Calendar extends React.Component {

	constructor(props) {
		super(props)
		// this.state = {dateObject: moment()}
		// generates days of the week as th elements


		// firstDayOfMonth() => {
		// 	let dateObject = this.state.dateObject;
		// 	let firstDay = moment(dateObject).startOf('month').format.'d';
		// }

	};

	addHeaders() {
		this.weekdayShort = moment.weekdaysShort();
		this.weekDaysShortName = this.weekdayShort.map(day => {
			return <th key={day} className="week-day">{day}</th>;
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
		//Loop over the times - only pushes time with 30 minutes interval
		while (startTime < endTime) {
		  //Push times
		  allTimes.push(startTime.format("HH:mm")); 
		  //Add interval of 30 minutes
		  startTime.add(x.slotInterval, 'minutes');
		}
		console.log(allTimes);
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

	render() {
		return (
			<div id="cal-container">
				<h2>My Weekly Agenda</h2>
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
	}
}

export default Calendar;