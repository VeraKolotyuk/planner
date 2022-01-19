import React from 'react';
import {ITodo} from './todo.interface';
import {IGoal} from '../GoalsPage/goal.interface';

type GoalChecklistProps = {
    checklist: ITodo[];
    updateTodo: (a: ITodo) => void;
    goal: IGoal;
    deleteTodo: (a: IGoal, b: string) => void;
}

const GoalChecklist = ({checklist, updateTodo, deleteTodo, goal}: GoalChecklistProps) => {
    return (
        <ul className="goal-checklist">
            {checklist.map((todo, index) =>
                //TODO:: replace index with uuid
                <li key={index}>
                    <label>
                        <input type="checkbox" checked={todo.checked} onChange={() => {
                            const newTodo = {...todo, ...{checked: !todo.checked}};
                            updateTodo(newTodo);
                        }}/>
                        {todo.title}
                        <a href='#' onClick={() => deleteTodo(goal, todo.id)}>Remove</a>
                    </label>
                </li>
            )}
        </ul>
    );
};

export default GoalChecklist;