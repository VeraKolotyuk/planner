import React, {useRef, useEffect} from 'react';
import * as d3 from 'd3';
import {PieArcDatum} from 'd3';
import {IBalanceWheel} from './balanceWheel.interface';
import './styles.css';

interface IMargin {
    left: number;
    right: number;
    top: number;
    bottom: number;
}

interface IDimensions {
    width: number;
    height: number;
    margin: IMargin;
}

type Props = {
    data: IBalanceWheel[];
    onLevelClickHandler?: (a: string, b: number) => void;
    tooltipHtmlRenderer: (a: number, b: number, c: string) => string
    dimensions: IDimensions;
}

enum Colors {
    STROKE_COLOR = '#d2d2d2',
    SELECTED_COLOR = '#7a7aff',
    DEFAULT_COLOR = '#fff'
}

const WheelChart = ({ data, onLevelClickHandler, tooltipHtmlRenderer, dimensions }: Props) => {
    const svgRef = useRef(null);
    const { width, height, margin } = dimensions;
    const svgWidth = width + margin.left + margin.right;
    const svgHeight = height + margin.top + margin.bottom;

    function useTooltip() {
        const tooltip = d3.select('body').append('div').attr('class', 'wheel-tooltip');
        tooltip.style('opacity', 0);
        tooltip.style('left', '0px').style('top', '0px');
        return {tooltip};
    }

    function getArcBackground(level: number, arcIndex: number) {
        return level > arcIndex  ? Colors.SELECTED_COLOR : Colors.DEFAULT_COLOR;
    }

    useEffect(() => {
        const scale = 10;

        const pie = d3.pie<IBalanceWheel>().value(1);

        const svg = d3.select(svgRef.current).append('g')
            .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

        const {tooltip} = useTooltip();

        const arcsWrap = svg.selectAll('.arc')
            .data(pie(data))
            .enter();

        data.forEach(() => {
            let l = 0;
            while(l < scale) {
                const arc = d3.arc<PieArcDatum<IBalanceWheel>>()
                    .innerRadius(l*scale)
                    .outerRadius(l*scale + scale);

                arcsWrap.append('path')
                    .attr('fill', function (d: PieArcDatum<IBalanceWheel>) {
                        return getArcBackground(d.data.level, l);
                    })
                    .attr('class', 'arc')
                    .attr('data-index', l)
                    .attr('stroke', Colors.STROKE_COLOR)
                    .attr('d', arc)
                    .on('mouseover', (event, d) => {
                        const i = event.currentTarget.getAttribute('data-index');
                        tooltip.html(tooltipHtmlRenderer(d.data.level, +i+1, d.data.name))
                            .style('left', (event.pageX + 7) + 'px')
                            .style('top', (event.pageY + 7) + 'px');
                        tooltip.style('opacity', .9);
                    })
                    .on('mouseout', function() {
                        tooltip.style('opacity', 0);
                        tooltip.style('left', '0px').style('top', '0px');
                    })
                    .on('click', (event, d) => {
                        if (onLevelClickHandler) {
                            onLevelClickHandler(d.data.name, event.currentTarget.getAttribute('data-index'));
                        }
                    });

                l++;
            }
        });

    }, [data]);

    return <svg ref={svgRef} width={svgWidth} height={svgHeight} />;
};

export default WheelChart;