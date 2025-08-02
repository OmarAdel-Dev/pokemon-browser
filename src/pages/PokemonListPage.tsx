import { useState } from "react";
import PaginationView from "../views/PaginationView";
import LoadMoreView from "../views/LoadMoreView";

const mainBg =
  "bg-gradient-to-tr from-blue-100 via-blue-50 to-blue-100 min-h-screen";

const PokemonListPage = () => {
  const [mode, setMode] = useState<"pagination" | "infinite">("pagination");

  return (
    <div className={mainBg + " flex flex-col items-center justify-center"}>
      <div className="w-full max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl mt-10 mb-16 px-8 py-10">
        <div className="flex flex-col items-center">
          <div className="text-4xl font-bold text-gray-800 flex items-center gap-3 mb-1">
            <span>⚡️</span>
            Pokédex
          </div>
          <p className="text-base text-gray-500 mb-6">
            Discover and explore Pokémon with page controls
          </p>
        </div>

        <div className="flex justify-center gap-2">
          <button
            onClick={() => setMode("pagination")}
            className={`px-5 py-2 rounded-sm transition font-semibold shadow ${
              mode === "pagination"
                ? "bg-gray-800 text-white shadow-lg"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Page Controls
          </button>
          <button
            onClick={() => setMode("infinite")}
            className={`px-5 py-2 rounded-sm transition font-semibold shadow ${
              mode === "infinite"
                ? "bg-gray-800 text-white shadow-lg"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Infinite Scroll
          </button>
        </div>

        <div className="max-w-6xl mx-auto p-8">
          {mode === "pagination" ? <PaginationView /> : <LoadMoreView />}
        </div>
      </div>
    </div>
  );
};

export default PokemonListPage;
