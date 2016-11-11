/**
 * Created by zmz0305 on 11/11/16.
 */
import io from "socket.io-client";

export function monitorLogin () {
    return function(dispatch) {
        let socket = io.connect('localhost:3000');
        socket.on('connect', () => {
            let id = socket.io.engine.id;
            console.log('Connect to socket.io: ' + id);
        })

        socket.on('valid_user_detected', (data) => {
            dispatch({type: "USER_LOGIN", payload: data});
        })
    }
}

export function tick() {
    return function(dispatch) {
        dispatch({type: "TICK", payload: null});
    }
}

export function logout(){
    return function(dispatch) {
        dispatch({type: "USER_LOGOUT", payload: null});
    }
}