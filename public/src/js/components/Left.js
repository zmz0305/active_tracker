/**
 * Created by zmz on 21/09/16.
 */
import React from "react";
import Particle from "../../../bower_components/particle-api-js/dist/particle.min"

export default class Left extends React.Component {
    listener(){
        var particle = new Particle();
        var devicesPr = particle.listDevices({auth: '4084f1aedf6260ab97aa59fb3bb0d5bce4cf9584'});
        devicesPr.then(
            (devices) => {
                console.log('devices: ', devices);
            },
            (err) => {
                console.log('failed with: ', err);
            }
        );
    }

    componentDidMount () {

        // setInterval(this.listener, 5000);
    }

    render() {
        return (
            <div style={{'background' : 'gray', 'height':'100%'}} className="col-sm-3">
                <p>adf</p>
            </div>
        );
    }
}