import * as Plot from '@observablehq/plot';
import { createEffect } from 'solid-js';
import type { Result } from '../lib/sim';

export interface DamagePlotProps {
    results: Result[];
    height?: number;
    width?: number;
}
export function DamagePlot(props: DamagePlotProps) {
    let ref!: HTMLDivElement;

    createEffect(() => {
        console.log('results', props.results);
        ref.innerHTML = '';
        const data = props.results.flatMap((r) => r.results);
        const plot = Plot.plot({
            width: props.width,
            height: props.height,
            x: {
                label: 'Time (sec)',
                transform: (x) => x / 1000,
            },
            marginLeft: 200,
            y: { label: null },
            // r: {
            //     range: [0, 12],
            // },
            color: { scheme: 'Reds', type: 'linear' },
            marks: [
                Plot.tickX(data, { x: 'time', y: 'label', strokeOpacity: 0.05, stroke: 'time' }),
                Plot.ruleX([0]),
                Plot.tickX(
                    data,
                    Plot.groupY(
                        { x: 'median' },
                        {
                            x: 'time',
                            y: 'label',
                            stroke: 'red',
                            strokeWidth: 4,
                            sort: { y: 'x' },
                            tip: true,
                        },
                    ),
                ),
                // Plot.dot(data, { x: 'time', y: 'label', stroke: 'hits', tip: true }),
                // Plot.dot(data, {
                //     x: 'time',
                //     y: 'hits',
                //     stroke: 'label',
                // }),
            ],
        });
        ref.append(plot);
    });

    return <div class="damage-plot" ref={ref}></div>;
}
