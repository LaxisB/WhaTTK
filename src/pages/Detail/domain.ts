import type { TargetDefinition, WeaponDefinition } from '../../lib/domain';
import type { SimulationParams } from '../../lib/sim';

export interface Scenario {
    id: string;
    name: string;
    weapon: WeaponDefinition;
    target: TargetDefinition;
    props: SimulationParams;
}
