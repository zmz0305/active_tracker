/**
 * Created by zmz0305 on 11/9/16.
 */
import Particle from "../../../bower_components/particle-api-js/dist/particle.min"

export function monitorHinge(){
    return function(dispatch) {
        let particle = new Particle();
        particle.getEventStream({ deviceId: '1e0021000347343337373738', auth: '4084f1aedf6260ab97aa59fb3bb0d5bce4cf9584'}).then(function(stream) {
            stream.on('toolReturned', function(data) {
                let idx = Number(data.data);
                console.log('tool returned: ' + idx);
                dispatch({type: "TOOL_RETURNED", payload: idx});
            }.bind(this));

            stream.on('toolRemoved', function(data){
                let idx = Number(data.data);
                console.log('tool removed: ' + idx);
                dispatch({type: "TOOL_REMOVED", payload: idx});
            }.bind(this));
        });
    }
}