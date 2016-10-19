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
            user: null,
            checkoutAmount: 0
        }

        for (var i = 0; i < 16; i++) {
            this.state.initState.status[i] = false;
        }
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
                var count = 0;
                for (var digit = this.END_SLOT - 1; digit >=0; digit--) {
                    var taken = !(res&1 == 1);
                    if(taken){
                        count += 1;
                    }
                    this.state.initState.status[digit] = taken;
                    res >>= 1;
                }

                this.state.initState.finished = true;
                this.setState({checkoutAmount: count});
                console.log('Function called succesfully:', data);
            }.bind(this), function (err) {
                console.log(err);
                console.log('An error occurred:', err);
            });
    }

    updateCheckoutCount(num) {
        this.setState({checkoutAmount: num});
    }

    componentDidMount() {
        this.checkState();
        var socket = io.connect('localhost:3000');

        socket.on('connect', () => {
            var id = socket.io.engine.id;
            console.log('Connect to socket.io: ' + id);
        });

        socket.on('valid_user_detected', (data) => {
            if(!this.state.alarm) {
                this.setState({user: data.user_name, authorized: true, valid_timer: 2});
                console.log('valid login');
            } else {
                console.log('cannot login when alarmed!');
            }
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
        if(on) {
            this.setState({alarm: true});
            console.log('Alarm triggered');
        } else {
            this.setState({alarm: false});
            console.log('Alarm turned off');
        }

    }

    renderHelper() {
        var res = [];
        if(this.state.alarm){
            res.push (
                <Alarm alarm={this.state.alarm} ></Alarm>
            )
        }
        if(!this.state.alarm && !this.state.authorized){
            res.push (
                <WelcomeScreen alarm={this.state.alarm} initState={this.state.initState} authorized={this.state.authorized} checkoutAmount={this.state.checkoutAmount}></WelcomeScreen>
            );
        }
        if(this.state.authorized && !this.state.alarm){
            res.push (
                <Subcontainer updateCheckoutCount={this.updateCheckoutCount.bind(this)} initState={this.state.initState} authorized={this.state.authorized} user={this.state.user}  trigger={this.alarm.bind(this)}></Subcontainer>
            )
        }
        // console.log(res);

        return res;
    }

    render() {

        return (
            <div style={{'height': '100%'}}>
                <Header/>
                <Alarm alarm={this.state.alarm} ></Alarm>
                <WelcomeScreen alarm={this.state.alarm} initState={this.state.initState} authorized={this.state.authorized} checkoutAmount={this.state.checkoutAmount}></WelcomeScreen>
                <Subcontainer updateCheckoutCount={this.updateCheckoutCount.bind(this)} initState={this.state.initState} authorized={this.state.authorized} user={this.state.user}  trigger={this.alarm.bind(this)}></Subcontainer>
            </div>
        );
    }
}