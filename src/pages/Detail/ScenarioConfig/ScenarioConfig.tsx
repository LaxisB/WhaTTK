import { createEffect, For, useContext } from "solid-js";
import { Button } from "../../../components/Button/Button";
import Field from "../../../components/Field";
import { StoreContext } from "../../../lib/store";
import classes from "./ScenarioConfig.module.css";

export interface Props {
  scenarioId: string;
}
export function ScenarioConfig(props: Props) {
  const { store, actions } = useContext(StoreContext)!;
  const scenario = store.scenarios[props.scenarioId];

  createEffect(() => {
    console.log(scenario);
  });

  return (
    <div>
      <div class={classes.controls}>
        <Field>
          <Field.Label>Name</Field.Label>
          <Field.Input
            type="text"
            value={scenario.name}
            onInput={(e) =>
              actions.updateScenario(props.scenarioId, (s) => {
                s.name = e.target.value;
              })
            }
          />
        </Field>
        <Field>
          <Field.Label>Weapon</Field.Label>
          <Field.Select
            value={scenario.weapon.name}
            onChange={(e) =>
              actions.updateScenario(props.scenarioId, (s) => {
                const weapon = store.game!.weapons.find(
                  (w) => w.name === e.target.value,
                );
                if (!weapon) {
                  throw new Error(`Weapon ${e.target.value} not found.`);
                }
                s.weapon = weapon;
              })
            }
          >
            <For each={store.game?.weapons || []}>
              {(weapon) => (
                <option
                  selected={scenario.weapon.name === weapon.name}
                  value={weapon.name}
                >
                  {weapon.name}
                </option>
              )}
            </For>
          </Field.Select>
        </Field>
        <Field>
          <Field.Label>Target</Field.Label>
          <Field.Select
            value={scenario.target.name}
            onChange={(e) =>
              actions.updateScenario(props.scenarioId, (s) => {
                const target = store.game!.targetTypes.find(
                  (t) => t.name === e.target.value,
                );
                if (!target) {
                  throw new Error(`Target type ${e.target.value} not found.`);
                }
                s.target = target;
              })
            }
          >
            <For each={store.game?.targetTypes || []}>
              {(target) => (
                <option
                  selected={scenario.target.name === target.name}
                  value={target.name}
                >
                  {target.name}
                </option>
              )}
            </For>
          </Field.Select>
        </Field>
        <Field>
          <Field.Label>Accuracy (%)</Field.Label>
          <Field.Input
            type="number"
            value={scenario.params.accuracy}
            min={0}
            max={100}
            onInput={(e) =>
              actions.updateScenario(props.scenarioId, (s) => {
                s.params.accuracy = parseInt(e.target.value);
              })
            }
          />
        </Field>
        <Field>
          <Field.Label>Headshot Rate (%)</Field.Label>
          <Field.Input
            type="number"
            value={scenario.params.headshotRate}
            min={0}
            max={100}
            onInput={(e) =>
              actions.updateScenario(props.scenarioId, (s) => {
                s.params.headshotRate = parseInt(e.target.value);
              })
            }
          />
        </Field>
        <Field>
          <Button
            kind="secondary"
            onClick={() => {
              actions.deleteScenario(props.scenarioId);
            }}
          >
            Delete Scenario
          </Button>
        </Field>
      </div>
    </div>
  );
}
