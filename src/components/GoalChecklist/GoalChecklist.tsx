import React from 'react';

type GoalChecklistProps = {
    checklist: string[];
}

const GoalChecklist = ({checklist}: GoalChecklistProps) => {
    return (
        <ul className="goal-checklist">
            {checklist.map((todo, index) =>
                //TODO:: replace index with uuid
                <li key={index}>{todo}</li>
            )}
        </ul>
    );
};

export default GoalChecklist;