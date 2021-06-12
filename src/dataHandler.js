class dataHandler {

    static importCheck() {
        console.log('Connection to Data Handler Established')
    }
    static async getWeekEvents(dbRef, dates) {
        // gets all day events matching current dates 
        let allDayWeekEvents = dbRef.where('isAllDay', '==', true).where('date', 'in', dates)
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
    static getEventFromName() {};
};
export default dataHandler;