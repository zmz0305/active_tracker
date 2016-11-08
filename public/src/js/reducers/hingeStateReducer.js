/**
 * Created by zmz0305 on 11/7/16.
 */

export default function reducer (state = {
    status: [],
    fetching: false,
    fetched: false,
    err: null,
    authorized: false,
    valid_timer: 0,
    alarm: false,
    user: null,
    checkoutAmount: 0
}, action) {
    switch (action.type){
        case "FETCH_STATE_PENDING": {
            return {...state, fetching: true};
        }
        case "FETCH_STATE_REJECTED": {
            return {...state, fetching: false, err: action.payload}
        }
        case "FETCH_STATE_FULFILLED": {
            let END_SLOT = 16;
            let data = action.payload;
            let res = data.body.return_value;
            let count = 0;
            for (var digit = END_SLOT - 1; digit >=0; digit--) {
                var taken = !(res&1 == 1);
                if(taken){
                    count += 1;
                }
                this.state.initState.status[digit] = taken;
                res >>= 1;
            }

            return {
                ...state,
                fetching: false,
                fetched: true,
                checkoutAmount: count,
                status: action.payload
            }
        }
    }
    return state;
}
