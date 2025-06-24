import type { TargetDefinition, WeaponDefinition } from './domain';

export interface DamageEvent {
    time: number;
    damage: number;
    totalDamage: number;
}

export interface SimulationParams {
    label?: string;
    accuracy?: number;
    headshotRate?: number;
    runs?: number;
}

export interface SimulationResult {
    label?: string;
    totalDamage: number;
    hits: number;
    time: number;
    damageEvents: DamageEvent[];
}
export interface Result {
    label?: string;
    weapon: WeaponDefinition;
    target: TargetDefinition;
    params: SimulationParams;
    results: SimulationResult[];
}

export function simulate(weapon: WeaponDefinition, target: TargetDefinition, params: SimulationParams): Result {
    function run(): SimulationResult {
        let t = 0;
        let result: SimulationResult = {
            label: params.label,
            totalDamage: 0,
            time: 0,
            hits: 0,
            damageEvents: [],
        };

        let state = {
            mag: weapon.magSize,
            damage: 0,
            targetHp: target.health,
        };

        const pushHit = (params: { headshot: boolean }) => {
            const damage =
                weapon.damage.max *
                (params?.headshot ? 1 * weapon.damage.headshotMultiplier : 1) *
                (target.modifiers?.damageTaken ?? 1);
            result.damageEvents.push({
                time: t,
                totalDamage: (result.totalDamage += damage),
                damage: damage,
            });
            result.hits += 1;
            state.mag -= 1;
            state.targetHp -= damage;
        };

        const acc = params.accuracy ?? 1;
        const hs = params.headshotRate ?? 0;

        while (state.targetHp > 0) {
            if (state.mag == 0) {
                t += weapon.reload.full * 1000;
                state.mag = weapon.magSize;
                continue;
            }

            t += weapon.fireRate.chargeTime ?? 0;

            const isHit = Math.random() > 1 - acc;
            const isHeadshot = Math.random() > 1 - hs;
            isHit && pushHit({ headshot: isHeadshot });

            if (isHit && weapon.fireRate.burstCount) {
                let remainingBurst = weapon.fireRate.burstCount - 1;
                while (remainingBurst) {
                    t += weapon.fireRate.burstDelay ?? 0;
                    pushHit({ headshot: isHeadshot });
                    remainingBurst--;
                }
            }
            t += weapon.fireRate.shotDelay;
        }
        result.time = t;
        return result;
    }

    const results: SimulationResult[] = [];
    for (let i = 0; i < (params.runs ?? 1); i++) {
        results.push(run());
    }

    return {
        label: params.label,
        weapon,
        target,
        params,
        results,
    };
}
