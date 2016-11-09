/**
 * Created by zmz0305 on 11/7/16.
 */

export default function reducer (state = {
    status: [],
    unauthorized: new Set(),
    fetching: false,
    fetched: false,
    err: null,
    login: false,
    valid_timer: 0,
    alarm: false,
    user: null,
    checkoutAmount: 0
}, action) {
    switch (action.type){
        case "FETCH_STATE": {
            return {...state, fetching: true}
        }
        case "FETCH_STATE_PENDING": {
            return {...state, fetching: true};
        }
        case "FETCH_STATE_REJECTED": {
            return {...state, fetching: false, err: action.payload}
        }
        case "FETCH_STATE_FULFILLED": {
            let END_SLOT = 16;
            let res = action.payload.body.return_value;
            let count = 0;
            let hinge_status = new Array(END_SLOT);
            for (let digit = END_SLOT - 1; digit >=0; digit--) {
                let taken = !(res&1 == 1);
                if(taken){
                    count += 1;
                }
                hinge_status[digit] = {};
                hinge_status[digit].id = digit;
                hinge_status[digit].available = taken;
                res >>= 1;
            }
            let ret = {
                ...state,
                fetching: false,
                fetched: true,
                checkoutAmount: count,
                status: hinge_status,
                err: null
            };
            return ret;
        }
        case "TOOL_REMOVED": {
            console.log("TOOL_REMOVED");
            let idx = action.payload;
            let newHinge_status = {...state.status};
            let alarm = state.alarm;
            let newUnauthorized = new Set(state.unauthorized);
            newHinge_status[idx].available = false;
            if(!state.login) {
                alarm = true;
                newUnauthorized.add(idx);
            }
            return {
                ...state,
                status: newHinge_status,
                alarm: alarm,
                unauthorized:newUnauthorized
            };
        }
        case "TOOL_RETURNED": {
            console.log("TOOL_RETURNED");
            let idx = action.payload;
            let newHinge_status = {...state.status};
            let alarm = state.alarm;
            let newUnauthorized = new Set(state.unauthorized);
            newHinge_status[idx].available = true;
            if(!state.login) {
                newUnauthorized.delete(idx);
                if(newUnauthorized.size == 0){
                    alarm = false;
                }
            }
            return {
                ...state,
                status: newHinge_status,
                alarm: alarm,
                unautorized: newUnauthorized
            };
        }
    }
    return state;
}
