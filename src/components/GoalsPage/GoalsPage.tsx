import React, {useEffect} from 'react';
import {connect, ConnectedProps} from 'react-redux';
import {bindActionCreators, Dispatch} from 'redux';
//import './styles.css';
import {fetchGoals, toggleCreateGoalModal, saveGoal, deleteGoal} from '../../actions/userActions';
import {IGoal} from './goal.interface';
import {RootState} from '../../store';
import CreateGoal from '../CreateGoal/CreateGoal';

const mapDispatchToProps = (dispatch:Dispatch) => ({
    fetchGoals: bindActionCreators(fetchGoals, dispatch),
    toggleCreateGoalModal: bindActionCreators(toggleCreateGoalModal, dispatch),
    saveGoal: bindActionCreators(saveGoal, dispatch),
    deleteGoal: bindActionCreators(deleteGoal, dispatch),
});

const mapStateToProps = (store: RootState) => ({
    goals: store.userReducer.goals,
    isShownCreateGoalModal: store.userReducer.isShownCreateGoalModal
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>

type GoalProps = PropsFromRedux & {
    goals: IGoal[],
    fetchGoals: () => void,
    saveGoal: (a: string, b: string) => void,
    deleteGoal: (a: string) => void,
    isShownCreateGoalModal: boolean
}

const GoalsPage:React.FC<GoalProps> = ({ goals,
                                         fetchGoals,
                                         isShownCreateGoalModal,
                                         toggleCreateGoalModal,
                                         saveGoal,
                                         deleteGoal
}: GoalProps) => {
    useEffect(() => {
        fetchGoals();
    }, []);

    return (
        <div>
            <button onClick={() => toggleCreateGoalModal(true)}>Create Goal</button>
            <CreateGoal showModal={isShownCreateGoalModal}
                        toggleCreateGoalModal={toggleCreateGoalModal}
                        saveGoal={saveGoal}
            />
            <ul className="goals-list">
                {goals.map((goal: IGoal) =>
                    <li key={goal.id}>
                        <h3>{goal.title}</h3>
                        <p>{goal.description}</p>
                        <button onClick={() => deleteGoal(goal.id)}>Delete Goal</button>
                    </li>
                )}
            </ul>
        </div>
    );
};

export default connector(GoalsPage);