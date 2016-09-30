/**
 * Created by zmz on 21/09/16.
 */
import React from "react";
import _ from 'lodash'

export default class Container extends React.Component {
    constructor(props) {
        super(props);
        this.style = {'textAlign':'center', 'padding':'10px', 'marginTop': '5px'};
        this.availableStyle = {'boxShadow': '0 4px 8px 0 rgba(0, 255, 0, 0.2), 0 6px 20px 0 rgba(0, 255, 0, 0.19)'};
        this.unavailableStyle = {'boxShadow': '0 4px 8px 0 rgba(255, 0, 0, 0.2), 0 6px 20px 0 rgba(255, 0, 0, 0.19)'};
        this.labelAvailStyle = {'background':'green', 'verticleAlign':'middle', 'height':'100%'};
        this.labelUnavailStyle = {'background':'red', 'verticleAlign':'middle', 'height':'100%'};
    }
    render() {
        var style;
        var labelStyle;
        var availableLable;
        // console.log(this.props.available);
        if(this.props.available == true){
            style = this.availableStyle;
            labelStyle = this.labelAvailStyle;
            availableLable = 'Available';
        } else {
            style = this.unavailableStyle;
            labelStyle = this.labelUnavailStyle;
            availableLable = 'Unavailable';
        }
        return (
            <div className="col-sm-3 " style={this.style}>
                <div className="ccard" style={style}>
                    <h4>{'Tool No.'+this.props.cardId}</h4>
                    <hr/>
                    <img className="itemphoto" src="../../../images/driver.jpg"/>
                    <div style={labelStyle}>
                        <div>{availableLable}</div>
                    </div>
                </div>
            </div>
        );
    }
}