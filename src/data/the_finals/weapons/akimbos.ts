import type { WeaponDefinition } from '../../../lib/domain';
import { fireModes } from '../../../lib/weapon';
import { HEAVY } from '../tags';

export default {
    name: '.50 Akimbo',
    tags: [HEAVY],
    damage: {
        max: 44,
        min: 44,
        headshotMultiplier: 2,
    },
    fireRate: fireModes.fullAuto(230),
    magSize: 14,
    reload: {
        tactical: 2.2,
        full: 3.0,
    },
} satisfies WeaponDefinition;
