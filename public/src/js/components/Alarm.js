/**
 * Created by zmz on 30/09/16.
 */
import React from "react";

export default class Alarm extends React.Component(){
    constructor(props) {
        super(props);
        this.style = {
            background: 'red',
            opacity: 0.8,
            width: '100%',
            height: '100%'
        }
    }



    render () {
        return (
            <div style={this.style}>
                <h1>PUT IT BACK!</h1>
            </div>
        );
    }
}