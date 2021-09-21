import ACTION_TYPES from '../actions/actionTypes';
import {IGoal} from '../components/GoalsPage/goal.interface';
import { AnyAction } from 'redux';

type UserState = {
    goals: IGoal[]
}

const userReducer = (
    state: UserState = {
        goals: []
    },
    action: AnyAction
): UserState => {
    switch (action.type) {
        case ACTION_TYPES.FETCH_GOALS_SUCCESS:
            return {
                ...state,
                goals: action.goals
            };
        default:
            return state;
    }
};

export default userReducer;