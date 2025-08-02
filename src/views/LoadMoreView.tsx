import React, { useState, useRef, useEffect, useCallback } from "react";
import { usePokemonList } from "../hooks/usePokemon";
import { useQueries, type UseQueryResult } from "@tanstack/react-query";
import { fetchPokemonDetail, type PokemonDetail } from "../api/pokemon";
import PokemonCard from "../components/PokemonCard";
import Spinner from "../components/Spinner";

const PAGE_SIZE = 20;

const LoadMoreView: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const [loadedPokemons, setLoadedPokemons] = useState<PokemonDetail[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const offset = (page - 1) * PAGE_SIZE;
  const { data, isLoading, isError, error } = usePokemonList(PAGE_SIZE, offset);

  const pokemonDetails: UseQueryResult<PokemonDetail, Error>[] = useQueries({
    queries:
      data?.results.map((pokemon) => ({
        queryKey: ["pokemonDetail", pokemon.name],
        queryFn: () => fetchPokemonDetail(pokemon.name),
        staleTime: 5 * 60 * 1000, // Cache for 5 minutes
      })) ?? [],
  });

  useEffect(() => {
    if (
      !isLoading &&
      data &&
      pokemonDetails.length > 0 &&
      pokemonDetails.every((q) => q.isSuccess)
    ) {
      const newPageData = pokemonDetails.map((q) => q.data!) as PokemonDetail[];
      setLoadedPokemons((prev) => {
        const prevNames = new Set(prev.map((p) => p.name));
        const filteredNew = newPageData.filter((p) => !prevNames.has(p.name));
        if (filteredNew.length === 0) return prev;
        return [...prev, ...filteredNew];
      });
      setHasMore(!!data.next);
    }
  }, [pokemonDetails, isLoading, data]);

  const observerRef = useRef<HTMLDivElement | null>(null);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && hasMore && !isLoading) {
        setPage((prevPage) => prevPage + 1);
      }
    },
    [hasMore, isLoading]
  );

  useEffect(() => {
    const element = observerRef.current;
    if (!element) return;

    const observerOptions = {
      root: null,
      rootMargin: "150px",
      threshold: 0.1,
    };
    const observer = new IntersectionObserver(handleObserver, observerOptions);

    observer.observe(element);

    // Cleanup on unmount or ref change
    return () => {
      observer.unobserve(element);
      observer.disconnect();
    };
  }, [handleObserver]);

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {loadedPokemons.map((poke) => (
          <PokemonCard
            key={poke.name}
            name={poke.name}
            id={poke.id}
            spriteUrl={poke.sprites.front_default}
          />
        ))}

        {(isLoading || pokemonDetails.some((q) => q.isLoading)) &&
          Array.from({ length: PAGE_SIZE }).map((_, i) => (
            <div
              key={`loading-${i}`}
              className="bg-white rounded-2xl shadow p-4 flex flex-col items-center animate-pulse"
            >
              <div className="w-20 h-20 bg-gray-200 rounded mb-2" />
              <div className="h-4 w-16 bg-gray-200 rounded mb-1" />
              <div className="h-3 w-10 bg-gray-100 rounded" />
            </div>
          ))}
      </div>

      {/* Anchor element for Intersection Observer */}
      <div
        ref={observerRef}
        style={{ height: "1px", marginTop: "24px", visibility: "hidden" }}
      />

      {/* Loading indicator */}
      {(isLoading || pokemonDetails.some((q) => q.isLoading)) && (
        <div className="flex justify-center items-center mt-3">
          <Spinner />
          <span className="ml-2 text-xs text-gray-500">
            Loading more Pokémon...
          </span>
        </div>
      )}

      {isError && (
        <div className="text-center mt-4 text-red-600">
          {(error as Error).message}
        </div>
      )}

      <p className="text-center mt-3 text-xs text-gray-500">
        Showing {loadedPokemons.length} Pokémon
      </p>
    </div>
  );
};

export default LoadMoreView;
