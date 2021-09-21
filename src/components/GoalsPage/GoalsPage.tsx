import React, {useEffect} from 'react';
import {connect, ConnectedProps} from 'react-redux';
import {bindActionCreators, Dispatch} from 'redux';
//import './styles.css';
import {fetchGoals} from '../../actions/userActions';
import {IGoal} from './goal.interface';
import {RootState} from '../../store';

const mapDispatchToProps = (dispatch:Dispatch) => ({
    fetchGoals: bindActionCreators(fetchGoals, dispatch),
});

const mapStateToProps = (store: RootState) => ({
    goals: store.userReducer.goals,
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>

type GoalProps = PropsFromRedux & {
    goals: IGoal[],
    fetchGoals: () => void
}

const GoalsPage:React.FC<GoalProps> = ({goals, fetchGoals}: GoalProps) => {
    useEffect(() => {
        fetchGoals();
    }, []);

    return (
        <ul className="goals-list">
            {goals.map((goal: IGoal) =>
                <li key={goal.id}>
                    <h3>{goal.title}</h3>
                    <p>{goal.description}</p>
                </li>
            )}
        </ul>
    );
};

export default connector(GoalsPage);