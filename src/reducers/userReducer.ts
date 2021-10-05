import ACTION_TYPES from '../actions/actionTypes';
import {IGoal} from '../components/GoalsPage/goal.interface';
import { AnyAction } from 'redux';

type UserState = {
    goals: IGoal[],
    goal: IGoal | null,
    isShownCreateGoalModal: boolean
}

const userReducer = (
    state: UserState = {
        goals: [],
        goal: null,
        isShownCreateGoalModal: false
    },
    action: AnyAction
): UserState => {
    switch (action.type) {
        case ACTION_TYPES.FETCH_GOALS_SUCCESS:
            return {
                ...state,
                goals: action.goals
            };
        case ACTION_TYPES.FETCH_GOAL_SUCCESS:
            return {
                ...state,
                goal: action.goal
            };
        case ACTION_TYPES.TOGGLE_CREATE_GOAL_MODAL:
            return {
                ...state,
                isShownCreateGoalModal: action.isShown
            };
        default:
            return state;
    }
};

export default userReducer;