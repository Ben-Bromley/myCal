import React, { Component } from 'react';

class TableCell extends Component {

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
                <td onClick={()=>this.handleClick()}>{this.props.eventData}</td>
        )
    }
}
export default TableCell;