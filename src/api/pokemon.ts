// src/api/pokemon.ts

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: { name: string; url: string }[];
}

export interface PokemonDetail {
  id: number;
  name: string;
  sprites: { front_default: string | null };
  height: number;
  weight: number;
  types: { type: { name: string } }[];
}

export async function fetchPokemonList(limit: number, offset: number): Promise<PokemonListResponse> {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
  if (!res.ok) throw new Error('Failed to fetch Pokémon list');
  return res.json();
}

export async function fetchPokemonDetail(nameOrId: string): Promise<PokemonDetail> {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${nameOrId}`);
  if (!res.ok) throw new Error('Failed to fetch Pokémon detail');
  return res.json();
}
