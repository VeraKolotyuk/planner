import {FunctionComponent, useState} from 'react';
import {IGoal} from '../GoalsPage/goal.interface';
import Input from '../Template/Input';
import Button from '../Template/Button';

type Props = {
    addTodo: (a:IGoal, b: string, c: string[]) => void,
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
            <Button onClick={() => addTodo(goal, text, goal.checklist ? goal.checklist : [])}>Add</Button>
        </form>
    );
};

export default CreateGoalChecklist;