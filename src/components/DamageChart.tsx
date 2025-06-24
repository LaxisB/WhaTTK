import * as d3 from 'd3';
import { createEffect, createSignal } from 'solid-js';
import type { DamageEvent } from '../lib/sim';

export interface DamageChartProps {
    events: DamageEvent[];
    height?: number;
    width?: number;
}
export function DamageChart(props: DamageChartProps) {
    let ref!: SVGGElement;
    const margin = { top: 10, right: 10, bottom: 30, left: 60 };
    const dimensions = {
        width: props.width ?? 600,
        height: props.height ?? 400,
    };
    const containerDimensions = {
        width: dimensions.width - margin.left - margin.right,
        height: dimensions.height - margin.top - margin.bottom,
    };

    const xAcc = (d: DamageEvent) => d.time / 1000;
    const yAcc = (d: DamageEvent) => d.totalDamage;

    const [p, setP] = createSignal('');

    createEffect(() => {
        let svg = d3.select(ref);
        let lastEvent = props.events[props.events.length - 1];
        let xAxis = d3
            .scaleLinear()
            .domain([0, xAcc(lastEvent)])
            .range([0, containerDimensions.width])
            .nice();

        let yAxis = d3
            .scaleLinear()
            .domain([0, yAcc(lastEvent)])
            .range([containerDimensions.height, 0])
            .nice();

        svg.append('g').attr('transform', `translate(0, ${containerDimensions.height})`).call(d3.axisBottom(xAxis));
        svg.append('g').call(d3.axisLeft(yAxis).ticks(3));

        const lineGen = d3.line<DamageEvent>(
            (d) => xAxis(xAcc(d)),
            (d) => yAxis(yAcc(d)),
        );

        const line = lineGen(props.events);

        const l = (d3.create('svg:path')!.attr('d', line)!.node() as SVGPathElement)!.getTotalLength();

        svg.append('path')
            .datum(props.events)
            .attr('fill', 'none')
            .attr('stroke', 'white')
            .attr('stroke-width', 1.5)
            .attr('stroke-linejoin', 'round')
            .attr('stroke-linecap', 'round')
            .attr('stroke-dasharray', `0,${l}`)
            .attr('d', line)
            .transition()
            .delay(200)
            .duration(1000)
            .ease(d3.easeCubicOut)
            .attr('stroke-dasharray', `${l},${l}`);
        setP(line ?? '');
    });

    return (
        <svg width={dimensions.width} height={dimensions.height}>
            <g transform={'translate(' + margin.left + ',' + margin.top + ')'} ref={ref}>
                {/* <path fill="none" stroke="white" stroke-width={1.5} d={p()}></path> */}
            </g>
        </svg>
    );
}
