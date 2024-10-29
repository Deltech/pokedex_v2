// Sprites Interface
export interface Sprites {
  other: {
    dream_world: {
      front_default: string | null;
    };
    "official-artwork": {
      front_default: string;
    };
  };
}

// Type Interface
export interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

// Ability Interface
export interface Ability {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

// Stat Interface
export interface Stat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

// Pokémon Data Interface
export interface PokemonData {
  id: number;
  name: string;
  sprites: Sprites;
  types: PokemonType[];
  abilities: Ability[];
  stats: Stat[];
  isOverviewOpen: boolean;
  isModalOpen: boolean;
}

// API Response Interface
export interface PokemonApiResponse {
  id: number;
  name: string;
  sprites: Sprites;
  types: PokemonType[];
  stats: Stat[];
  abilities: Ability[];
}

// Ability Data Interface
export interface EffectEntry {
  language: { name: string };
  short_effect: string;
}

export interface AbilityData {
  name: string;
  effect_entries: EffectEntry[];
}

// Type API Response Interface
export interface DamageRelation {
  name: string;
  url: string;
}

export interface TypeApiResponse {
  damage_relations: {
    double_damage_from: DamageRelation[];
    double_damage_to: DamageRelation[];
    half_damage_from: DamageRelation[];
    half_damage_to: DamageRelation[];
    no_damage_from: DamageRelation[];
    no_damage_to: DamageRelation[];
  };
  id: number;
  name: string;
}

// Color Type
export type ColorType = {
  name: string;
  value: string;
};

// Pokémon Display Interface
export interface PokemonDisplay {
  first: number;
  last: number;
}
