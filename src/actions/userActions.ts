import ACTION_TYPES from './actionTypes';
import { IGoal } from '../components/GoalsPage/goal.interface';
import { AppThunk } from '../store';
import { goalsUrl } from '../utils/requestUtils';
import {toogleMoodboardImage} from '../utils/goalUtils';

export function fetchGoalsSuccess(goals: IGoal[]):AppThunk {
    return dispatch => {
        dispatch({
            type: ACTION_TYPES.FETCH_GOALS_SUCCESS,
            goals
        });
    };
}

export function fetchGoalSuccess(goal: IGoal | null):AppThunk {
    return dispatch => {
        dispatch({
            type: ACTION_TYPES.FETCH_GOAL_SUCCESS,
            goal
        });
    };
}

export const fetchGoal = (goalId: string | null):AppThunk => {
    return dispatch => {
        if (!goalId) {
            return dispatch(fetchGoalSuccess(null));
        }

        fetch(`${goalsUrl}/${goalId}`).then(res => res.json()).then(response => {
            return dispatch(fetchGoalSuccess(response));
        }).catch(err => {
            console.log(err);
        });
    };
};

export const fetchGoals = ():AppThunk => {
    return dispatch => {
        fetch(goalsUrl).then(res => res.json()).then(response => {
            return dispatch(fetchGoalsSuccess(response));
        }).catch(err => {
            console.log(err);
        });
    };
};

export function toggleCreateGoalModal(isShown: boolean):AppThunk {
    return dispatch => {
        dispatch({
            type: ACTION_TYPES.TOGGLE_CREATE_GOAL_MODAL,
            isShown
        });
    };
}

export function saveGoal(title: string, description: string):AppThunk {
    return dispatch => {
        fetch(goalsUrl, {method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({title, description})})
        .then(res => res.json()).then(() => {
            dispatch({
                type: ACTION_TYPES.TOGGLE_CREATE_GOAL_MODAL,
                isShown: false
            });
            return dispatch(fetchGoals());
        }).catch(err => {
            console.log(err);
        });
    };
}

export function saveGoalsSuccess():AppThunk {
    return dispatch => {
        dispatch({
            type: ACTION_TYPES.SAVE_GOAL_SUCCESS
        });
    };
}

export function deleteGoal(goalId: string):AppThunk {
    return dispatch => {
        fetch(`${goalsUrl}/${goalId}`, {method: 'DELETE',
            headers: {'Content-Type': 'application/json'}})
            .then(res => res.json()).then(() => {
            return dispatch(fetchGoals());
        }).catch(err => {
            console.log(err);
        });
    };
}

export function addTodo(goal: IGoal, todo: string, todos: string[]):AppThunk {
    return dispatch => {
        fetch(`${goalsUrl}/${goal.id}`, {method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({...goal, checklist: [...todos, todo]})
        })
        .then(res => res.json()).then(() => {
            return dispatch(fetchGoals());
        }).catch(err => {
            console.log(err);
        });
    };
}

export function updateMoodboard(goal: IGoal, moodboardImage: string):AppThunk {
    goal.moodboard = toogleMoodboardImage(goal.moodboard, moodboardImage);
    return dispatch => {
        fetch(`${goalsUrl}/${goal.id}`, {method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(goal)
        }).then(res => res.json()).then(() => {
            return dispatch(fetchGoal(goal.id));
        }).catch(err => {
            console.log(err);
        });
    };
}