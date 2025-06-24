import { createEffect, Show, useContext } from 'solid-js';
import { unwrap } from 'solid-js/store';
import { DamagePlot } from '../../components/DamagePlot';
import game from '../../data/the_finals';
import { StoreContext } from '../../lib/store';
import classes from './Detail.module.css';
import { SimConfigurator } from './SimConfigurator';

export default function Detail() {
    const { store, actions } = useContext(StoreContext)!;
    actions.loadGame(game); // Ensure the game is loaded

    createEffect(() => {
        const res = unwrap(store.simResults); // Trigger reactivity on simResults
        console.log('Simulation results updated:', res);
    });
    return (
        <main class={classes.app}>
            <SimConfigurator onRun={() => actions.runSimulation()} />
            <Show when={store.simResults?.length}>
                <DamagePlot results={store.simResults} />
            </Show>
        </main>
    );
}
