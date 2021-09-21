import ACTION_TYPES from './actionTypes';
import { IGoal } from '../components/GoalsPage/goal.interface';
import { AppThunk } from '../store';

export function fetchGoalsSuccess(goals: IGoal[]):AppThunk {
    return dispatch => {
        dispatch({
            type: ACTION_TYPES.FETCH_GOALS_SUCCESS,
            goals
        });
    };
}

export const fetchGoals = ():AppThunk => {
    return dispatch => {
        fetch('http://localhost:3001/goals').then(res => res.json()).then(response => {
            return dispatch(fetchGoalsSuccess(response));
        }).catch(err => {
            console.log(err);
        });
    };
};

