import ACTION_TYPES from '../actions/actionTypes';
import { AnyAction } from 'redux';
import {IBalanceWheel} from '../components/BalanceWheel/balanceWheel.interface';

type UBalanceWheelState = {
    balanceWheel: IBalanceWheel[]
}

const balanceWheelReducer = (
    state: UBalanceWheelState = {
        balanceWheel: [],
    },
    action: AnyAction
): UBalanceWheelState => {
    switch (action.type) {
        case ACTION_TYPES.FETCH_BALANCE_WHEEL_SUCCESS:
            return {
                ...state,
                balanceWheel: action.balanceWheel
            };
        default:
            return state;
    }
};

export default balanceWheelReducer;