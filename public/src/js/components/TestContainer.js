/**
 * Created by zmz0305 on 11/9/16.
 */
import React from "react";
import { fetchHingeStates } from "../actions/hingeStatusActions"
import { monitorHinge } from "../actions/monitorHingeActions"
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
    }

    render() {
        return (
            <p>{JSON.stringify(this.props.state)}</p>

        );
    }
}