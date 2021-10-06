import React, {MouseEvent} from 'react';
import {IGoal} from '../GoalsPage/goal.interface';

type MoodboardProps = {
    goal: IGoal,
    updateMoodboard: (a: IGoal, b: string) => void;
}

const Moodboard:React.FC<MoodboardProps> = ({ goal, updateMoodboard }: MoodboardProps) => {
    //TODO:: replace key with random number
    function deleteClickHandler(e: MouseEvent<HTMLElement>, base64: string){
        e.preventDefault();
        updateMoodboard(goal, base64);
    }

    return (
        <ul>
            {goal.moodboard &&
                goal.moodboard.map((base64, i) =>
                    <li key={i}>
                        <img src={base64} width={100} height={100} alt="" />
                        <a href="#" onClick={e => deleteClickHandler(e, base64)}>Delete</a>
                    </li>
                )
            }
        </ul>
    );
};

export default Moodboard;