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

    function tooltipHtmlRenderer(currentLevel: number, hoveredIndex: number, sectorName: string) {
        let html = '';
        if (currentLevel >= hoveredIndex) {
            html = `<div>${sectorName} - ${currentLevel}. Установить на уровень ${hoveredIndex}.</div>`;
        } else {
            html = `<div>Установить сферу '${sectorName}' на уровень ${hoveredIndex}.</div>`;
        }
        return html;
    }

    //TODO:: replace key with random number
    return (
        <React.Fragment>
            <WheelChart data={balanceWheelItems}
                        tooltipHtmlRenderer={tooltipHtmlRenderer}
                        dimensions={{width:200, height: 200, margin: {top: 0, left: 0, right: 0, bottom: 0}}} />
        </React.Fragment>
    );
};

export default connector(BalanceWheel);