import React from 'react';
// import ReactDOM from 'react-dom';
import moment from 'moment'

class Calendar extends React.Component {

	constructor(props) {
		super(props)
		this.state = {dateObject: moment()}

		this.weekdayShort = moment.weekdaysShort();
		this.weekDaysShortName = this.weekdayShort.map(day => {
			return (
				<th key={day} className="week-day">{day}</th>
			);
		});
	};
	render() {
		return (
			<div id="cal-container">
				<h2>My Weekly Agenda</h2>
				<table>
					<tr>{this.weekDaysShortName}</tr>
					<tr></tr>
				</table>
			</div>
		);
	}
}

export default Calendar;