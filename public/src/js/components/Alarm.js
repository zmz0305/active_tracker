/**
 * Created by zmz on 30/09/16.
 */
import React from "react";
import { connect } from "react-redux";

@connect((store) => {
    return {
        alarm: store.hingeState.alarm
    }
})
export default class Alarm extends React.Component{
    constructor() {
        super();
        this.style = {
            // background: 'red',
            opacity: 0.8,
            width: '100%',
            height: '100%',
            paddingTop: '20%',
            textAlign: 'center'
        }
    }



    render () {
        if(this.props.alarm){
            return (
                <div style={this.style}>
                    <img src="images/warning.jpg"/>
                    <h1>UNAUTHORIZED ACCESS</h1>
                </div>
            );
        } else {
            return (
                <div></div>
            );
        }

    }
}