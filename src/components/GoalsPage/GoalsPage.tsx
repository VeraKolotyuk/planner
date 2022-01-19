import React, {useEffect} from 'react';
import {connect, ConnectedProps} from 'react-redux';
import { Link } from 'react-router-dom';
import {bindActionCreators, Dispatch} from 'redux';
import {fetchGoals, toggleCreateGoalModal, saveGoal, deleteGoal, addTodo, deleteTodo, updateTodo} from '../../actions/userActions';
import {IGoal} from './goal.interface';
import {RootState} from '../../store';
import CreateGoal from '../CreateGoal/CreateGoal';
import GoalChecklist from '../GoalChecklist/GoalChecklist';
import CreateGoalChecklist from '../CreateGoalChecklist/CreateGoalChecklist';
import styled from 'styled-components';
import SectionHeader from '../Template/SectionHeader';
import Button from '../Template/Button';
import BalanceWheel from '../BalanceWheel/BalanceWheel';
import {IBalanceWheel} from '../BalanceWheel/balanceWheel.interface';
import {ITodo} from '../GoalChecklist/todo.interface';

const mapDispatchToProps = (dispatch:Dispatch) => ({
    fetchGoals: bindActionCreators(fetchGoals, dispatch),
    toggleCreateGoalModal: bindActionCreators(toggleCreateGoalModal, dispatch),
    saveGoal: bindActionCreators(saveGoal, dispatch),
    deleteGoal: bindActionCreators(deleteGoal, dispatch),
    addTodo: bindActionCreators(addTodo, dispatch),
    updateTodo: bindActionCreators(updateTodo, dispatch),
    deleteTodo: bindActionCreators(deleteTodo, dispatch),
});

const mapStateToProps = (store: RootState) => ({
    goals: store.userReducer.goals,
    balanceWheel: store.balanceWheelReducer.balanceWheel,
    isShownCreateGoalModal: store.userReducer.isShownCreateGoalModal
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>

type GoalProps = PropsFromRedux & {
    goals: IGoal[],
    fetchGoals: () => void,
    saveGoal: (a: string, b: string) => void,
    deleteGoal: (a: string) => void,
    isShownCreateGoalModal: boolean,
    addTodo: (a: IGoal, b: ITodo, c: ITodo[]) => void,
    updateTodo: (a: IGoal, b: ITodo) => void,
    deleteTodo: (a: IGoal, b: string) => void
}

const GoalsList = styled.ul`
  list-style: none;
  display: grid;
  row-gap: 1rem;
`;

const GoalsPage:React.FC<GoalProps> = ({ goals,
                                         fetchGoals,
                                         isShownCreateGoalModal,
                                         toggleCreateGoalModal,
                                         saveGoal,
                                         deleteGoal,
                                         addTodo,
                                         updateTodo,
                                         deleteTodo,
                                         balanceWheel
}: GoalProps) => {
    useEffect(() => {
        fetchGoals();
    }, []);

    function updateTodoForGoal(goal: IGoal, todo: ITodo) {
        if (goal) {
            updateTodo(goal, todo);
        }
    }

    return (
        <div className="main-content">
            <div>
                <Button onClick={() => toggleCreateGoalModal(true)}>Новая Цель</Button>
                <CreateGoal showModal={isShownCreateGoalModal}
                            toggleCreateGoalModal={toggleCreateGoalModal}
                            saveGoal={saveGoal}
                            wheelSectors={balanceWheel.map((el: IBalanceWheel)=>el.name)}
                />
                <GoalsList>
                    {goals.map((goal: IGoal) =>
                        <li key={goal.id}>
                            <SectionHeader><Link to={`/goal/${goal.id}`}>{goal.title}</Link></SectionHeader>
                            <p>{goal.description}</p>
                            {/*{goal.checklist && <GoalChecklist checklist={goal.checklist}*/}
                            {/*                                  updateTodo={(todo) => updateTodoForGoal(goal, todo)}*/}
                            {/*                                  deleteTodo={deleteTodo}*/}
                            {/*                                  goal={goal}*/}
                            {/*/>}*/}
                            {/*<CreateGoalChecklist addTodo={addTodo} goal={goal} />*/}
                            {/*<Button onClick={() => deleteGoal(goal.id)}>Удалить</Button>*/}
                        </li>
                    )}
                </GoalsList>
            </div>
            <div><BalanceWheel /></div>
        </div>
    );
};

export default connector(GoalsPage);