/**
 * Created by zmz on 26/09/16.
 */
import React from "react";


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
            checkoutNumber: 0,
            hello: 'hello'
        }
    }

    componentDidMount(){
        setInterval(()=>{
            this.initCheckoutNumber();
        }, 1000)
    }

    initCheckoutNumber () {
        var state = this.props.initState;
        var count = 0;
        for(var i = 0; i < state.status.length; i++){
            if(state.status[i]==1){
                count ++;
            }
        }
        // console.log(this.props.initState);
        this.setState({checkoutNumber: count});
        // console.log(this.state.checkoutNumber);
        return count;
    }

    render() {
        if(this.props.authorized){
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
                                {this.state.checkoutNumber}
                                <span style={{'fontSize': '30%'}}> OF 16</span>
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