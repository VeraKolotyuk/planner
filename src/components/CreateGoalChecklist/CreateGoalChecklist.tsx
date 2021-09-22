import {FunctionComponent, useState} from 'react';
import {IGoal} from '../GoalsPage/goal.interface';

type Props = {
    addTodo: (a:IGoal, b: string, c: string[]) => void,
    goal: IGoal
}

const CreateGoalChecklist: FunctionComponent<Props> = ({ addTodo, goal }: Props) => {
    const [text, setText] = useState('');
    return (
        <form>
            <input type="text"
                   value={text}
                   onChange={(e) => setText(e.target.value)}
            />
            <button onClick={() => addTodo(goal, text, goal.checklist ? goal.checklist : [])}>Add</button>
        </form>
    );
};

export default CreateGoalChecklist;