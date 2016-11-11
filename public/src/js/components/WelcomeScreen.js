/**
 * Created by zmz on 26/09/16.
 */
import React from "react";
import { connect } from "react-redux"


@connect((store) => {
    return {
        checkoutAmount: store.hingeState.checkoutAmount,
        authorized: store.hingeState.authorized,
        alarm: store.hingeState.alarm
    }
})
export default class WelcomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.style = {
            'background': '',
            'margin': '15% 20% 0px 27%',
            'textAlign': 'center',
            'height': '55%',
            'width': '45%',
            'borderRadius': '50%',
            'boxShadow': '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
        };
        this.state = {
            hello: 'hello'
        }
    }

    componentDidMount(){

    }

    render() {
        if(this.props.authorized || this.props.alarm){
            return (
                <div></div>
            );
        }
        return (
            <div className="container-fluid" style={{'height': '100%'}}>
                <div className="row" style={{'height': '100%'}}>
                    {/*<div className="col-sm-4" style={{'height':'100%', 'width':"33%"}}></div>*/}
                    <div className="col-sm-12" style={{'height': '100%'}}>
                        <div style={this.style}>
                            <p style={{
                                'position': 'relative',
                                'top': '28%',
                                'marginTop': '20%',
                                'fontSize': '100px'
                            }}>
                                {this.props.checkoutAmount}
                                <span style={{'fontSize': '30%'}}> OF 8</span>
                            </p>
                            <p style={{'position': 'relative', 'top': '28%', 'fontSize': '40px'}}>CHECKED OUT</p>
                        </div>
                    </div>
                    {/*<div className="col-sm-4" style={{'height':'100%', 'width':'33%'}}></div>*/}
                </div>
            </div>
        );
    }
}