import {ITodo} from '../GoalChecklist/todo.interface';

export interface IGoal {
    id: string;
    title: string;
    description: string;
    checklist: ITodo[];
    moodboard: string[];
}