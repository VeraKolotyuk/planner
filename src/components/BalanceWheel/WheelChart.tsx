import React, {useRef, useEffect} from 'react';
import * as d3 from 'd3';
import {PieArcDatum} from 'd3';
import {IBalanceWheel} from './balanceWheel.interface';
import './styles.css';

interface ITheme {
    strokeColor: string;
    selectedColor: string;
    defaultColor: string;
}

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
    dimensions: IDimensions;
    data: IBalanceWheel[];
    levelHeight?: number;
    levelsCount?: number;
    theme?: ITheme;
    onLevelClickHandler?: (a: string, b: number) => void;
    tooltipHtmlRenderer?: (a: number, b: number, c: string) => string
}

const defaultTheme = {
    strokeColor: '#d2d2d2',
    selectedColor: '#7a7aff',
    defaultColor: '#fff'
};

enum DEFAULTS {
    LEVEL_HEIGHT = 20,
    LEVELS_COUNT = 10,
    TOOLTIP_SHIFT = 7,
}

const WheelChart = ({ data,
                      onLevelClickHandler,
                      tooltipHtmlRenderer,
                      dimensions,
                      theme = defaultTheme,
                      levelHeight = DEFAULTS.LEVEL_HEIGHT,
                      levelsCount = DEFAULTS.LEVELS_COUNT}: Props
) => {
    const svgRef = useRef(null);
    const { width, height, margin } = dimensions;
    const svgWidth = width + margin.left + margin.right;
    const svgHeight = height + margin.top + margin.bottom;

    function useTooltip() {
        const tooltip = d3.select('body').append('div').attr('class', 'wheel-tooltip');
        tooltip.style('opacity', 0);
        tooltip.style('left', '0px').style('top', '0px');
        return tooltip;
    }

    function getArcBackground(level: number, arcIndex: number) {
        return level > arcIndex  ? theme.selectedColor : theme.defaultColor;
    }

    useEffect(() => {
        const pie = d3.pie<IBalanceWheel>().value(1);

        const svg = d3.select(svgRef.current).append('g')
            .attr('transform', 'translate(' + svgWidth / 2 + ',' + svgHeight / 2 + ')');

        let tooltip: d3.Selection<HTMLDivElement, unknown, HTMLElement, any> | null = null;
        if (tooltipHtmlRenderer) {
            tooltip = useTooltip();
        }

        const arcsWrap = svg.selectAll('.arc')
            .data(pie(data))
            .enter();

        data.forEach(() => {
            let l = 0;
            while(l < levelsCount) {
                const arc = d3.arc<PieArcDatum<IBalanceWheel>>()
                    .innerRadius(l*levelHeight)
                    .outerRadius((1+l)*levelHeight);

                arcsWrap.append('path')
                    .attr('fill', function (d: PieArcDatum<IBalanceWheel>) {
                        return getArcBackground(d.data.level, l);
                    })
                    .attr('class', 'arc')
                    .attr('data-index', l)
                    .attr('stroke', theme.strokeColor)
                    .attr('d', arc)
                    .on('mouseover', (event, d) => {
                        if (tooltip && tooltipHtmlRenderer) {
                            const i = event.currentTarget.getAttribute('data-index');
                            tooltip.html(tooltipHtmlRenderer(d.data.level, +i+1, d.data.name))
                                .style('left', (event.pageX + DEFAULTS.TOOLTIP_SHIFT) + 'px')
                                .style('top', (event.pageY + DEFAULTS.TOOLTIP_SHIFT) + 'px');
                            tooltip.style('opacity', .9);
                        }
                    })
                    .on('mouseout', function() {
                        if (tooltip) {
                            tooltip.style('opacity', 0);
                            tooltip.style('left', '0px').style('top', '0px');
                        }
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