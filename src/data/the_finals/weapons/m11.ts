import type { WeaponDefinition } from '../../../lib/domain';
import { fireModes } from '../../../lib/weapon';
import { LIGHT } from '../tags';

export default {
    name: 'M11',
    tags: [LIGHT],
    damage: {
        max: 16,
        min: 16,
        headshotMultiplier: 1.5,
    },
    fireRate: fireModes.fullAuto(1000),
    magSize: 40,
    reload: {
        tactical: 1.55,
        full: 1.85,
    },
} satisfies WeaponDefinition;
