/**
 * Created by zmz0305 on 11/9/16.
 */
import React from "react";
import { fetchHingeStates } from "../actions/hingeStatusActions"
import { monitorHinge } from "../actions/monitorHingeActions"
import { monitorLogin, tick, logout } from "../actions/loginActions"
import { connect } from "react-redux"

@connect((store)=>{
    return {
        state: store.hingeState
    }
})

export default class TestContainer extends React.Component {
    constructor(props){
        super(props);
    }

    componentWillMount() {
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
            <textarea cols="100" rows="50" value={JSON.stringify(this.props.state, null, '\t')}></textarea>
        );
    }
}