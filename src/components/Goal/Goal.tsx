import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators, Dispatch} from 'redux';
import { createMatchSelector } from 'connected-react-router';
import {deleteGoal, addTodo, fetchGoal, updateMoodboard, updateTodo, deleteTodo} from '../../actions/userActions';
import {IGoal} from '../GoalsPage/goal.interface';
import {RootState} from '../../store';
import GoalChecklist from '../GoalChecklist/GoalChecklist';
import CreateGoalChecklist from '../CreateGoalChecklist/CreateGoalChecklist';
import SectionHeader from '../Template/SectionHeader';
import Button from '../Template/Button';
import AddMoodboardImage from '../AddMoodvoardImage/AddMoodboardImage';
import Moodboard from '../Moodboard/Moodboard';
import {ITodo} from '../GoalChecklist/todo.interface';

const mapDispatchToProps = (dispatch:Dispatch) => ({
    deleteGoal: bindActionCreators(deleteGoal, dispatch),
    addTodo: bindActionCreators(addTodo, dispatch),
    updateTodo: bindActionCreators(updateTodo, dispatch),
    deleteTodo: bindActionCreators(deleteTodo, dispatch),
    fetchGoal: bindActionCreators(fetchGoal, dispatch),
    updateMoodboard: bindActionCreators(updateMoodboard, dispatch),
});

type paramsProps = {
    id: string;
};

const mapStateToProps = (store: RootState) => {
    const matchSelector = createMatchSelector({ path: '/goal/:id' });
    const match = matchSelector(store);
    const id = match ? (match.params as paramsProps).id : null;
    return {
        id,
        goal: store.userReducer.goal,
    };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type GoalProps = {
    id: string | null,
    goal: IGoal | null,
    deleteGoal: (a: string) => void,
    addTodo: (a: IGoal, b: ITodo, c: ITodo[]) => void,
    updateTodo: (a: IGoal, b: ITodo) => void,
    deleteTodo: (a: IGoal, b: string) => void,
    fetchGoal: (a: string | null) => void,
    updateMoodboard: (a: IGoal, b: string) => void;
}

const Goal:React.FC<GoalProps> = ({ deleteGoal,
                                      addTodo,
                                      updateTodo,
                                      deleteTodo,
                                      updateMoodboard,
                                      goal,
                                      fetchGoal,
                                      id}: GoalProps) => {
    useEffect(() => {
        fetchGoal(id);
    }, [id]);

    function updateTodoForGoal(todo: ITodo) {
        if (goal) {
            updateTodo(goal, todo);
        }
    }

    return (
        <div>
            {goal && (
                <React.Fragment>
                    <SectionHeader>{goal.title}</SectionHeader>
                    <p>{goal.description}</p>
                    {goal.checklist && <GoalChecklist checklist={goal.checklist}
                                                      updateTodo={updateTodoForGoal}
                                                      goal={goal}
                                                      deleteTodo={deleteTodo}
                    />}
                    <CreateGoalChecklist addTodo={addTodo} goal={goal} />
                    <AddMoodboardImage updateMoodboard={updateMoodboard} goal={goal} />
                    <Moodboard updateMoodboard={updateMoodboard} goal={goal} />
                    <Button onClick={() => deleteGoal(goal.id)}>Delete Goal</Button>
                </React.Fragment>
            )}
        </div>
    );
};

export default connector(Goal);