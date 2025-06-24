import type { WeaponDefinition } from '../../../lib/domain';
import { fireModes } from '../../../lib/weapon';
import { HEAVY } from '../tags';

export default {
    name: 'M60',
    tags: [HEAVY],
    damage: {
        max: 19,
        min: 19,
        headshotMultiplier: 1.5,
    },
    fireRate: fireModes.fullAuto(580),
    magSize: 70,
    reload: {
        tactical: 3.55,
        full: 3.55,
    },
} satisfies WeaponDefinition;
