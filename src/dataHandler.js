class dataHandler {
    // for getting the events that last all day
    static async getAllDayEvents(dbRef, dates) {
        // gets all day events matching current dates
        let allDayWeekEvents = dbRef.where('isAllDay', '==', true).where('date', 'in', dates)
        // console.log('allDayWeekEvents => ', allDayWeekEvents)
        let response = await allDayWeekEvents.get()
        let documents = []
        response.forEach(doc => documents.push(doc.data()));
        let eventArray = ['', '', '', '', '', '', ''];
        for (let i in documents) {
            if (documents[i] === null || documents[i] === undefined) {continue;}
            for (let a in eventArray){   
                if (documents[i].date === dates[a]){eventArray[a] = (documents[i])}
            }
        }
        return eventArray;
    };

    static async getEvents(dbRef, dates) {
        // TODO: make sure all normal events have isAllDay set to false!!
        // gets events from current week for during the day
        // console.log(dates)
        let weekEvents = dbRef.where('isAllDay', '==', false).where('date', 'in', dates)
        // console.log('query => ', weekEvents)
        let response = await weekEvents.get();
        console.log('response =>', response)
        response.forEach(doc => console.log('doc data => ', doc.data()))


        /*

        [
            [ data for 00:00 ],
            [ data for 00:30 ],
            [ data for 01:00 ],
            [ data for 01:30 ],
            [ data for 02:00 ],
            [ data for 02:30 ],
            etc...
        ]

        */


    }

    // for using the event inspector / popup
    static getEventObjectFromName() {};
};
export default dataHandler;