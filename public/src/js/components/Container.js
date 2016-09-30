/**
 * Created by zmz on 21/09/16.
 */
import React from "react";
import Subcontainer from './Subcontainer';
import WelcomeScreen from './WelcomeScreen'
import Header from './Header';
import Alarm from './Alarm';
import Particle from "../../../bower_components/particle-api-js/dist/particle.min";
import io from 'socket.io-client';


export default class Container extends React.Component {
    constructor(props) {
        super(props);
        this.initCount = 0;
        this.START_SLOT = 14;
        this.END_SLOT = 16;
        this.state = {
            initState : {finished: false, status: []},
            authorized: false,
            valid_timer: 0,
            alarm: false,
            user: null
        }

        for (var i = 0; i < 16; i++) {
            this.state.initState.status[i] = false;
        }
    }

    setCheckedOut(num){

    }

    checkState() {
        var particle = new Particle();
        var fnPr = particle.callFunction({
            deviceId: '1e0021000347343337373738',
            name: 'remoteCheck',
            argument: ":)",
            auth: '4084f1aedf6260ab97aa59fb3bb0d5bce4cf9584'
        });

        fnPr.then(
            function (data) {
                var res = data.body.return_value;
                for (var digit = this.END_SLOT - 1; digit >=0; digit--) {
                    this.state.initState.status[digit] = (res & 1 == 1);
                    res >>= 1;
                }

                this.state.initState.finished = true;
                console.log('Function called succesfully:', data);
            }.bind(this), function (err) {
                console.log(err);
                console.log('An error occurred:', err);
            });
    }

    componentDidMount() {
        this.checkState();
        var socket = io.connect('localhost:3000');

        socket.on('connect', () => {
            var id = socket.io.engine.id;
            console.log('Connect to socket.io: ' + id);
        });

        socket.on('valid_user_detected', (data) => {
            this.setState({user: data.user_name, authorized: true, valid_timer: 3});
            console.log('valid login');
        });

        setInterval(()=>{
            if(this.state.valid_timer < 0){
                this.setState({authorized: false, user: null});
            }
            var remain = this.state.valid_timer;
            if(remain < -10000){
                remain = -1;
            }
            this.setState({valid_timer: remain - 1});
            // console.log('remain:' + remain);
        }, 1000);


    }

    alarm(on) {
        if(on) this.setState({alarm: true});
        else this.setState({alarm: false});
    }

    render() {
        return (
            <div style={{'height': '100%'}}>
                <Header/>
                <Alarm authorized={this.state.authorized} ></Alarm>
                <WelcomeScreen initState={this.state.initState} authorized={this.state.authorized}></WelcomeScreen>
                <Subcontainer initState={this.state.initState} authorized={this.state.authorized} user={this.state.user} trigger={this.alarm}></Subcontainer>
            </div>
        );
    }
}