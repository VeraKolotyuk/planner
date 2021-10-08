import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators, Dispatch} from 'redux';
import {fetchBalanceWheel, updateBalanceWheel} from '../../actions/balanceWheelActions';
import {RootState} from '../../store';
import {IBalanceWheel} from './balanceWheel.interface';
import WheelChart from './WheelChart';

const mapDispatchToProps = (dispatch:Dispatch) => ({
    fetchBalanceWheel: bindActionCreators(fetchBalanceWheel, dispatch),
    updateBalanceWheel: bindActionCreators(updateBalanceWheel, dispatch),
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
        if (currentLevel > hoveredIndex) {
            html = `<div>Сфера '${sectorName}' - уровень ${currentLevel}. Установить на уровень ${hoveredIndex}.</div>`;
        } else if (currentLevel === hoveredIndex) {
            html = `<div>Сфера '${sectorName}' - уровень ${currentLevel}</div>`;
        } else {
            html = `<div>Установить сферу '${sectorName}' на уровень ${hoveredIndex}.</div>`;
        }
        return html;
    }

    function onLevelClickHandler(name: string, level: number) {
        updateBalanceWheel(name, level);
    }

    //TODO:: replace key with random number
    return (
        <React.Fragment>
            <WheelChart data={balanceWheelItems}
                        levelHeight={20}
                        onLevelClickHandler={onLevelClickHandler}
                        tooltipHtmlRenderer={tooltipHtmlRenderer}
                        dimensions={{width:400, height: 400, margin: {top: 10, left: 10, right: 10, bottom: 10}}} />
        </React.Fragment>
    );
};

export default connector(BalanceWheel);