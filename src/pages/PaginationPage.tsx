import { useState } from 'react';
import { usePokemonList } from '../hooks/usePokemon';

export default function PaginationPage() {
  const limit = 20;
  const [offset, setOffset] = useState(0);
  const { data } = usePokemonList(limit, offset);

  return (
    <div>
      <div className="grid grid-cols-4 gap-4">
        {data?.results.map(pokemon => (
          <div key={pokemon.name} className="border p-4 rounded">
            <p>{pokemon.name}</p>
          </div>
        ))}
      </div>
      <div className="flex gap-4 mt-4">
        <button onClick={() => setOffset(Math.max(offset - limit, 0))} disabled={offset === 0}>
          Previous
        </button>
        <button onClick={() => setOffset(offset + limit)}>
          Next
        </button>
      </div>
    </div>
  );
}
