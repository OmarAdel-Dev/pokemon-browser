import { useQuery } from "@tanstack/react-query";
import {
  fetchPokemonList,
  fetchPokemonDetail,
  type PokemonListResponse,
  type PokemonDetail,
} from "../api/pokemon";

export function usePokemonList(limit: number, offset: number) {
  return useQuery<PokemonListResponse, Error>({
    queryKey: ["pokemonList", { limit, offset }],
    queryFn: () => fetchPokemonList(limit, offset),
  });
}

export function usePokemonDetail(nameOrId: string) {
  return useQuery<PokemonDetail, Error>({
    queryKey: ["pokemonDetail", nameOrId],
    queryFn: () => fetchPokemonDetail(nameOrId),
  });
}
