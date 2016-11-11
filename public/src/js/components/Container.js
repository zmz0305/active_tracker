/**
 * Created by zmz on 21/09/16.
 */
import React from "react";
import Subcontainer from './Subcontainer';
import WelcomeScreen from './WelcomeScreen'
import Header from './Header';
import Alarm from './Alarm';
import { connect } from "react-redux"
import { monitorLogin, logout, tick } from "../actions/loginActions"
import { fetchHingeStates } from "../actions/hingeStatusActions"
import { monitorHinge } from "../actions/monitorHingeActions"
@connect((store)=>{
    return {
        state: store.hingeState
    }
})
export default class Container extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.dispatch(fetchHingeStates());
        this.props.dispatch(monitorHinge());
        this.props.dispatch(monitorLogin());
        setInterval(()=>{
            console.log(this.props.state.valid_timer);
            if(this.props.state.valid_timer < 0){
                this.props.dispatch(logout());
            }
            this.props.dispatch(tick());
        }, 1000);
    }

    render() {

        return (
            <div style={{'height': '100%'}}>
                <Header/>
                <Alarm></Alarm>
                <WelcomeScreen></WelcomeScreen>
                <Subcontainer></Subcontainer>
            </div>
        );
    }
}