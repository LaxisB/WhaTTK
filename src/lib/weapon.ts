import type { FiringModeDefinition } from './domain';

export function rpmToShotDelay(rpm: number) {
    return (1 / (rpm / 60)) * 1000;
}

export const fireModes = {
    fullAuto: (rpm: number) =>
        ({
            name: 'Full Auto',
            shotDelay: rpmToShotDelay(rpm),
        } satisfies FiringModeDefinition),
};
