import {FunctionComponent, useState} from 'react';
import {IGoal} from '../GoalsPage/goal.interface';
import Input from '../Template/Input';
import Button from '../Template/Button';
import {ITodo} from '../GoalChecklist/todo.interface';

type Props = {
    addTodo: (a:IGoal, b: ITodo, c: ITodo[]) => void,
    goal: IGoal
}

const CreateGoalChecklist: FunctionComponent<Props> = ({ addTodo, goal }: Props) => {
    const [text, setText] = useState('');
    return (
        <form>
            <Input type="text"
                   placeholder="Todo for checklist"
                   value={text}
                   onChange={(e) => setText(e.target.value)}
            />
            <Button onClick={() => addTodo(goal, {title: text, id: '', checked: false}, goal.checklist ? goal.checklist : [])}>Add</Button>
        </form>
    );
};

export default CreateGoalChecklist;