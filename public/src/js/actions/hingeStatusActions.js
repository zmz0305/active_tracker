/**
 * Created by zmz0305 on 11/7/16.
 */
import Particle from "../../../bower_components/particle-api-js/dist/particle.min"
export function fetchHingeStates() {
    return function(dispatch) {
        dispatch({type: "FETCH_STATE"});
        let particle = new Particle();
        let fnPr = particle.callFunction({
            deviceId: '1e0021000347343337373738',
            name: 'remoteCheck',
            argument: ":)",
            auth: '4084f1aedf6260ab97aa59fb3bb0d5bce4cf9584'
        });
        fnPr.then((data) => {
            dispatch({type: "FETCH_STATE_FULFILLED", payload: data})
        }).catch((err)=>{
            dispatch({type: "FETCH_STATE_REJECTED", payload: err})
        });
    }
}
