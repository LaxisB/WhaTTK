import type { WeaponDefinition } from '../../../lib/domain';
import { fireModes } from '../../../lib/weapon';
import { HEAVY } from '../tags';

export default {
    name: 'Lewis Gun',
    tags: [HEAVY],
    damage: {
        max: 22,
        min: 22,
        headshotMultiplier: 1.5,
    },
    fireRate: fireModes.fullAuto(500),
    magSize: 47,
    reload: {
        tactical: 3.25,
        full: 3.55,
    },
} satisfies WeaponDefinition;
