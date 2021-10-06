import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators, Dispatch} from 'redux';
import {fetchBalanceWheel} from '../../actions/balanceWheelActions';
import {RootState} from '../../store';
import {IBalanceWheel} from './balanceWheel.interface';
import WheelChart from './WheelChart';

const mapDispatchToProps = (dispatch:Dispatch) => ({
    fetchBalanceWheel: bindActionCreators(fetchBalanceWheel, dispatch),
});

const mapStateToProps = (store: RootState) => ({
    balanceWheelItems: store.balanceWheelReducer.balanceWheel,
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = {
    balanceWheelItems: IBalanceWheel[]
}

const BalanceWheel:React.FC<Props> = ({ balanceWheelItems }: Props) => {

    //TODO:: replace key with random number
    return (
        <React.Fragment>
            <ul>
                {
                    balanceWheelItems.map((item, i) =>
                        <li key={i}>{item.name} - {item.level}</li>
                    )
                }
            </ul>
            <WheelChart data={balanceWheelItems} />
        </React.Fragment>
    );
};

export default connector(BalanceWheel);