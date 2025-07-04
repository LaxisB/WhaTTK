import { createContext, createUniqueId } from "solid-js";
import { createStore, produce, unwrap } from "solid-js/store";
import type { Scenario } from "../../pages/Detail/domain";
import type { Game } from "../domain";
import { simulate, type Result } from "../sim";

export const [store, setStore] = createStore({
  scenarios: {} as Record<string, Scenario>,
  simResults: [] as Result[],
  game: null as Game | null,
});

export const initialState: typeof store = {
  scenarios: {},
  simResults: [],
  game: null,
};

export const StoreContext = createContext<{
  store: typeof store;
  actions: Actions;
}>();

export const actions = {
  loadGame,
  addScenario,
  updateScenario,
  deleteScenario,
  runSimulation,
};
export type Actions = typeof actions;

export function loadGame(game: Game) {
  setStore("game", game);
}
export function addScenario() {
  if (!store.game) {
    throw new Error("Game not loaded. Please load a game before adding scenarios.");
  }
  const scenario = {
    id: createUniqueId(),
    name: "New Scenario",
    weapon: Object.entries(unwrap(store).game!.weapons)[0][1],
    target: Object.entries(unwrap(store).game!.targetTypes)[0][1],
    params: {
      accuracy: 100,
      headshotRate: 20,
      runs: 1000,
    },
  } satisfies Scenario;
  setStore(
    produce((s) => {
      s.scenarios[scenario.id] = scenario;
    }),
  );
}

export function updateScenario(id: string, updater: (s: Scenario) => void) {
  setStore(
    produce<typeof store>((s) => {
      const scenario = s.scenarios[id];
      if (!scenario) {
        throw new Error(`Scenario with id ${id} not found.`);
      }
      updater(scenario);
    }),
  );
}
export function deleteScenario(id: string) {
  setStore(
    produce((s) => {
      delete s.scenarios[id];
    }),
  );
}

export function runSimulation() {
  if (!store.game) {
    throw new Error("Game not loaded. Please load a game before running simulations.");
  }
  const results: Result[] = [];
  for (const scenario of Object.values(store.scenarios)) {
    // Simulate the scenario and push the result
    const result = simulate(scenario.weapon, scenario.target, {
      label: scenario.name,
      accuracy: scenario.params.accuracy! / 100,
      headshotRate: scenario.params.headshotRate! / 100,
      runs: scenario.params.runs,
    });
    results.push(result);
  }
  setStore("simResults", results);
}
