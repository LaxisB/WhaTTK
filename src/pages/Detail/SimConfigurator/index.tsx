import { For, useContext } from 'solid-js';
import { Button } from '../../../components/Button/Button';
import { Collapsible } from '../../../components/Collapsible/Collapsible';
import { StoreContext } from '../../../lib/store';
import { ScenarioConfig } from '../ScenarioConfig/ScenarioConfig';
import classes from './index.module.css';

export interface Props {
    onRun?: () => void;
}

export function SimConfigurator(props: Props) {
    const { store, actions } = useContext(StoreContext)!;

    return (
        <Collapsible open title="Scenarios" class={classes.wrapper}>
            <For each={Object.values(store.scenarios)}>{(scenario) => <ScenarioConfig scenarioId={scenario.id} />}</For>
            <div class={classes.actions}>
                <Button kind="secondary" outline onClick={() => actions.addScenario()}>
                    Add Scenario
                </Button>
                <Button kind="primary" onClick={() => props.onRun?.()}>
                    Run Simulations
                </Button>
            </div>
        </Collapsible>
    );
}
