import db from './firebase.js';
import faker from 'faker';


export default class dataGenerator {

	static async addData() {
		const eventNames = ['Anniversary', 'Show Day', 'Flight']
		let randNum = Math.floor(Math.random()*3)
		console.log(randNum)

		const data = {
  			name: eventNames[randNum],
			isAllDay: false,
			date: '6/17',
			startTime: '11:00',
			endTime: '16:00', 
		};
		const res = await db.collection('userData').add(data);
	}
}

