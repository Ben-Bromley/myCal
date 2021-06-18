import React, { Component } from 'react';

class TableCell extends Component {
    constructor(props) {
        super(props)
        this.state = {
            day: this.props.day,
            timeSlot: this.props.timeSlot,
            eventData: this.props.eventData
        }
    }

    handleClick() {
        // handle the click
        /*
        1. open event creation form
        2. get info from form
        -  add it to local data
        -  add to firebase
        -  display data
        */
       console.log('element clicked!')
    }

    render() {
        return (
                <td className={this.props.status} onClick={()=>this.handleClick()}>
                    {/* this.state.eventData.name */} 
                    {this.props.display}
                </td>
        )
    }
}
export default TableCell;