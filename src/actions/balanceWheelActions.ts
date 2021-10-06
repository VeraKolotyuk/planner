import ACTION_TYPES from './actionTypes';
import { AppThunk } from '../store';
import { balanceWheelUrl } from '../utils/requestUtils';
import {IBalanceWheel} from '../components/BalanceWheel/balanceWheel.interface';


export function fetchBalanceWheelSuccess(balanceWheel: IBalanceWheel):AppThunk {
    return dispatch => {
        dispatch({
            type: ACTION_TYPES.FETCH_BALANCE_WHEEL_SUCCESS,
            balanceWheel
        });
    };
}

export const fetchBalanceWheel = ():AppThunk => {
    return dispatch => {
        fetch(`${balanceWheelUrl}`).then(res => res.json()).then(response => {
            return dispatch(fetchBalanceWheelSuccess(response));
        }).catch(err => {
            console.log(err);
        });
    };
};