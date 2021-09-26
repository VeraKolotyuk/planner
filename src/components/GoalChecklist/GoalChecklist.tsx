import React from 'react';

type GoalChecklistProps = {
    checklist: string[];
}

const GoalChecklist = ({checklist}: GoalChecklistProps) => {
    return (
        <ul className="goal-checklist">
            {checklist.map((todo, index) =>
                //TODO:: replace index with uuid
                <li key={index}>
                    <label>
                        <input type="checkbox" />
                        {todo}
                    </label>
                </li>
            )}
        </ul>
    );
};

export default GoalChecklist;