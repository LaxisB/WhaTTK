import type { WeaponDefinition } from '../../../lib/domain';
import { rpmToShotDelay } from '../../../lib/weapon';
import { HEAVY } from '../tags';

export default {
    name: 'ShAK-50',
    tags: [HEAVY],
    damage: {
        max: 15,
        min: 15,
        headshotMultiplier: 1.5,
    },
    fireRate: {
        name: 'Shotgun',
        burstCount: 2,
        burstDelay: 0,
        shotDelay: rpmToShotDelay(420),
    },
    magSize: 40,
    reload: {
        tactical: 2.4,
        full: 3.2,
    },
} satisfies WeaponDefinition;
