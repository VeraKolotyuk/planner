import ACTION_TYPES from '../actions/actionTypes';
import { AnyAction } from 'redux';
import {IBalanceWheel} from '../components/BalanceWheel/balanceWheel.interface';
import {balanceWheelItemsDefaults} from '../utils/goalUtils';

type UBalanceWheelState = {
    balanceWheel: IBalanceWheel[]
}

const balanceWheelReducer = (
    state: UBalanceWheelState = {
        balanceWheel: balanceWheelItemsDefaults,
    },
    action: AnyAction
): UBalanceWheelState => {
    switch (action.type) {
        case ACTION_TYPES.FETCH_BALANCE_WHEEL_SUCCESS:
            return {
                ...state,
                balanceWheel: action.goals
            };
        default:
            return state;
    }
};

export default balanceWheelReducer;