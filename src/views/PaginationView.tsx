import { useState } from "react";
import { usePokemonList } from "../hooks/usePokemon";
import { useQueries, type UseQueryResult } from "@tanstack/react-query";
import { fetchPokemonDetail, type PokemonDetail } from "../api/pokemon";
import PaginationControls from "../components/PaginationControls";
import PokemonCard from "../components/PokemonCard";

const PAGE_SIZE = 20;

const PaginationView = () => {
  const [page, setPage] = useState<number>(1);
  const offset = (page - 1) * PAGE_SIZE;

  const { data, isLoading, isError, error } = usePokemonList(PAGE_SIZE, offset);

  const pokemonDetails: UseQueryResult<PokemonDetail, Error>[] = useQueries({
    queries:
      data?.results.map((pokemon) => ({
        queryKey: ["pokemonDetail", pokemon.name],
        queryFn: () => fetchPokemonDetail(pokemon.name),
        staleTime: 5 * 60 * 1000, // Cache 5 minutes
      })) ?? [],
  });

  const totalPages: number = data ? Math.ceil(data.count / PAGE_SIZE) : 0;

  return (
    <div className="max-w-6xl mx-auto p-8">
      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {Array.from({ length: PAGE_SIZE }).map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-lg shadow p-4 flex flex-col items-center animate-pulse"
            >
              <div className="w-20 h-20 bg-gray-200 rounded mb-2" />
              <div className="h-4 w-16 bg-gray-200 rounded mb-1" />
              <div className="h-3 w-10 bg-gray-100 rounded" />
            </div>
          ))}
        </div>
      ) : isError ? (
        <div className="p-4 text-red-600 text-center">
          Error: {(error as Error).message}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {data?.results.map((pokemon, idx) => {
            const query = pokemonDetails[idx];
            if (!query || query.isLoading || query.isError || !query.data) {
              return (
                <div
                  key={pokemon.name}
                  className="bg-white rounded-lg shadow p-4 flex flex-col items-center animate-pulse"
                >
                  <div className="w-20 h-20 bg-gray-200 rounded mb-2" />
                  <div className="h-4 w-16 bg-gray-200 rounded mb-1" />
                  <div className="h-3 w-10 bg-gray-100 rounded" />
                </div>
              );
            }
            const detail = query.data;
            return (
              <PokemonCard
                key={pokemon.name}
                name={detail.name}
                id={detail.id}
                spriteUrl={detail.sprites.front_default}
              />
            );
          })}
        </div>
      )}

      <PaginationControls
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />

      <p className="text-center text-xs text-gray-500">
        Page {page} of {totalPages} ({PAGE_SIZE} Pokémon shown)
      </p>
    </div>
  );
};

export default PaginationView;
