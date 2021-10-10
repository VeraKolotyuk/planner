import ACTION_TYPES from './actionTypes';
import { AppThunk } from '../store';
import { balanceWheelUrl } from '../utils/requestUtils';
import { IBalanceWheel } from '../components/BalanceWheel/balanceWheel.interface';


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

export const updateBalanceWheel = (name: string, level: number, balanceWheel: IBalanceWheel[]):AppThunk => {
    const updatedWheel = [...balanceWheel];
    const changed = updatedWheel.find(el=>el.name===name);

    return dispatch => {
        if (changed && changed.level !== level) {
            changed.level = level;
            fetch(`${balanceWheelUrl}/${changed.id}`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(changed)
            }).then(res => res.json()).then(() => {
                return dispatch(fetchBalanceWheel());
            }).catch(err => {
                console.log(err);
            });
        }
    };
};
