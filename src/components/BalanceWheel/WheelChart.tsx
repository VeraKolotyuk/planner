import React, {useRef, useEffect} from 'react';
import * as d3 from 'd3';
import {PieArcDatum} from 'd3';
import {IBalanceWheel} from './balanceWheel.interface';

type Props = {
    data: IBalanceWheel[];
}

const WheelChart = ({ data }: Props) => {
    const svgRef = useRef(null);
    //const { width, height, margin } = dimensions;
    // const svgWidth = width + margin.left + margin.right;
    // const svgHeight = height + margin.top + margin.bottom;

    useEffect(() => {
        const width = 500,
            height = 500,
            radius = Math.min(width, height) / 2,
            innerRadius = 0.3 * radius;

        const pie = d3.pie<IBalanceWheel>().value(function(d: IBalanceWheel) { return d.level; });

        // const tip = d3.tip()
        //     .attr('class', 'd3-tip')
        //     .offset([0, 0])
        //     .html(function(d: IBalanceWheel) {
        //         return d.name + ": <span style='color:orangered'>" + d.level + '</span>';
        //     });

        const arc = d3.arc<PieArcDatum<IBalanceWheel>>()
            .innerRadius(innerRadius)
            .outerRadius(function (d: PieArcDatum<IBalanceWheel>) {
                return (radius - innerRadius) * (d.data.level / 100.0) + innerRadius;
            });

        const outlineArc = d3.arc<PieArcDatum<IBalanceWheel>>()
            .innerRadius(innerRadius)
            .outerRadius(radius);

        const svg = d3.select('body').append('svg')
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

        //svg.call(tip);

        const path = svg.selectAll('.solidArc')
            .data(pie(data))
            .enter().append('path')
            .attr('fill', function () {
                return 'green';
            })
            .attr('class', 'solidArc')
            .attr('stroke', 'gray')
            .attr('d', arc)
            // .on('mouseover', tip.show)
            // .on('mouseout', tip.hide);

        const outerPath = svg.selectAll('.outlineArc')
            .data(pie(data))
            .enter().append('path')
            .attr('fill', 'none')
            .attr('stroke', 'gray')
            .attr('class', 'outlineArc')
            .attr('d', outlineArc);


        // // calculate the weighted mean score
        // const score =
        //     data.reduce(function (a, b) {
        //         //console.log('a:' + a + ', b.score: ' + b.score + ', b.weight: ' + b.weight);
        //         return a + (b.score * b.weight);
        //     }, 0) /
        //     data.reduce(function (a, b) {
        //         return a + b.weight;
        //     }, 0);
        //
        // svg.append('svg:text')
        //     .attr('class', 'aster-score')
        //     .attr('dy', '.35em')
        //     .attr('text-anchor', 'middle') // text-align: right
        //     .text(Math.round( score));

    }, [data]);

    return <svg ref={svgRef} width={500} height={500} />;
};

export default WheelChart;