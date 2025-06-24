import type { WeaponDefinition } from '../../../lib/domain';
import { fireModes } from '../../../lib/weapon';
import { HEAVY } from '../tags';

export default {
    name: 'KS-23',
    tags: [HEAVY],
    damage: {
        max: 100,
        min: 100,
        headshotMultiplier: 1,
    },
    fireRate: fireModes.fullAuto(78),
    magSize: 6,
    reload: {
        tactical: 5.55,
        full: 5.55,
    },
} satisfies WeaponDefinition;
