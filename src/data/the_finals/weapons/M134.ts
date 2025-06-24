import type { WeaponDefinition } from '../../../lib/domain';
import { rpmToShotDelay } from '../../../lib/weapon';
import { HEAVY } from '../tags';

export default {
    name: 'M134 Minigun',
    tags: [HEAVY],
    damage: {
        max: 11,
        min: 11,
        headshotMultiplier: 14.6 / 11,
    },
    fireRate: {
        name: 'Minigun',
        chargeTime: 1.6,
        shotDelay: rpmToShotDelay(1500),
    },
    magSize: 250,
    reload: {
        tactical: 5.0,
        full: 5.25,
    },
} satisfies WeaponDefinition;
