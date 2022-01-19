import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators, Dispatch} from 'redux';
import {fetchBalanceWheel, updateBalanceWheel} from '../../actions/balanceWheelActions';
import {RootState} from '../../store';
import {IBalanceWheel} from './balanceWheel.interface';
import {WheelChart} from 'd3-wheel-chart';

const mapDispatchToProps = (dispatch:Dispatch) => ({
    fetchBalanceWheel: bindActionCreators(fetchBalanceWheel, dispatch),
    updateBalanceWheel: bindActionCreators(updateBalanceWheel, dispatch),
});

const mapStateToProps = (store: RootState) => ({
    balanceWheelItems: store.balanceWheelReducer.balanceWheel,
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = {
    balanceWheelItems: IBalanceWheel[],
    fetchBalanceWheel: () => void,
    updateBalanceWheel: (a: string, b: number, c: IBalanceWheel[]) => void
}

const BalanceWheel:React.FC<Props> = ({ balanceWheelItems, fetchBalanceWheel, updateBalanceWheel }: Props) => {
    useEffect(() => {
        fetchBalanceWheel();
    }, []);

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

    function onLevelClickHandler(name: string, levelIndex: number) {
        updateBalanceWheel(name, +levelIndex+1, balanceWheelItems);
    }

    //TODO:: replace key with random number
    return (
        <React.Fragment>
            <WheelChart data={balanceWheelItems}
                        levelHeight={20}
                        onLevelClickHandler={onLevelClickHandler}
                        tooltipHtmlRenderer={tooltipHtmlRenderer}
                        dimensions={{width:400, height: 400, margin: {top: 70, left: 70, right: 70, bottom: 70}}} />
        </React.Fragment>
    );
};

export default connector(BalanceWheel);