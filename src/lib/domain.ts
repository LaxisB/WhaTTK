export type Tag = string;
export type Identifier = string;
export type Time = number;

export interface TargetModifiers {
    damageTaken: number;
}

export interface TargetDefinition {
    name: string;
    tags: Tag[];
    health: number;
    modifiers?: Partial<TargetModifiers>;
}

export interface Game {
    name: string;

    targetTypes: TargetDefinition[];
    weapons: WeaponDefinition[];
}

export interface Shot {
    time: number;
    pos: [number, number];
}
export interface FiringModeDefinition {
    name: string;
    /** time required before the first shot */
    chargeTime?: number;
    /** time between shots
     * this is different from the charge time, as it only applies after the first shot
     * with burst fire weapons, this is the time between bursts, not between shots
     */
    shotDelay: number;
    /** number of shots fired in one burst */
    burstCount?: number;
    /** time between shots in the burst */
    burstDelay?: number;
}

export interface FalloffDefinition {
    start: number;
    end: number;
}

export interface DamageDefinition {
    max: number;
    min: number;
    headshotMultiplier: number;
}

export interface ReloadDefinition {
    tactical: number;
    full: number;
}

export interface WeaponDefinition {
    name: string;
    tags: Tag[];
    damage: DamageDefinition;
    falloff?: FalloffDefinition;
    fireRate: FiringModeDefinition;
    magSize: number;
    reload: ReloadDefinition;
}

export interface Weapon {
    definition: WeaponDefinition;
    shotTimings: number[];
    ttk: Record<Identifier, number>;
}
