import moment from 'moment';
class dateGenerator {
    // generates an array of weekdates for the current week
    static generateWeekDates(date) {
        // updates values before running
		let weekStart = date.startOf('week')
		// initalises array
		let weekDates = [];
		// adds all dates for the week to array
		for (let i = 0; i < 7; i++){
		 	weekDates.push(weekStart.format('M/D'));
			weekStart = weekStart.add(1, 'days'); 
		};
        return weekDates;
    }
    // generates array of dates
    static createTimeSlots() {
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
};
export default dateGenerator;