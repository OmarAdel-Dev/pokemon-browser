import { useParams, useNavigate } from "react-router-dom";
import { usePokemonDetail } from "../hooks/usePokemon";
import LoadingSpinner from "../components/Spinner";
import { ArrowLeft, Zap, Ruler, Weight } from "lucide-react";

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const PokemonDetailPage = () => {
  const { name } = useParams<{ name: string }>();
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = usePokemonDetail(name!);

  if (isLoading) return <LoadingSpinner />;

  if (isError || !data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-100 via-pink-50 to-purple-100 p-4">
        <p className="text-red-600 mb-4 text-center">
          Error loading Pokémon details:{" "}
          {(error as Error)?.message || "Unknown error"}
        </p>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-purple-600 text-white rounded flex items-center gap-2 hover:bg-purple-700 transition"
        >
          <ArrowLeft size={20} />
          Back to List
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-purple-100 p-4 md:p-8 flex flex-col items-center relative">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors absolute top-4 left-4 bg-white rounded-md px-3 py-2 shadow z-50"
        aria-label="Back to List"
      >
        <ArrowLeft size={20} />
        <span className="font-medium">Back to List</span>
      </button>

      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl overflow-hidden mt-12">
        <div className="bg-gradient-to-r from-purple-500 via-purple-400 to-pink-400 px-6 py-8 text-center relative">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Zap className="text-white" size={28} />
            <h1 className="text-white text-3xl md:text-4xl font-bold">
              {capitalize(data.name)}
            </h1>
          </div>
          <p className="text-white/80 text-lg font-medium">
            #{data.id.toString().padStart(3, "0")}
          </p>
        </div>

        <div className="p-6 md:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex justify-center">
                <img
                  src={data.sprites.front_default || ""}
                  alt={data.name}
                  className="w-48 h-48 md:w-56 md:h-56 object-contain"
                  draggable={false}
                />
              </div>

              <div className="flex justify-center gap-2">
                {data.types.map((t) => (
                  <span
                    key={t.type.name}
                    className="bg-red-500 text-white px-4 py-2 rounded-full font-semibold text-sm capitalize"
                  >
                    {t.type.name}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-center gap-2 text-gray-600 mb-2">
                    <Ruler size={16} />
                    <span className="text-sm font-medium">Height</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-800">
                    {(data.height / 10).toFixed(1)} m
                  </p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-center gap-2 text-gray-600 mb-2">
                    <Weight size={16} />
                    <span className="text-sm font-medium">Weight</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-800">
                    {(data.weight / 10).toFixed(1)} kg
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Base Stats
                </h2>
                <div className="space-y-4">
                  {data.stats.map((stat, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="w-20 text-sm font-medium text-gray-600 text-right capitalize">
                        {stat.stat.name.replace("-", " ")}
                      </div>
                      <div className="flex-1 bg-gray-200 rounded-full h-3 relative overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-gray-800 to-gray-600 rounded-full transition-all duration-1000 ease-out"
                          style={{ width: `${Math.min(stat.base_stat, 100)}%` }}
                        ></div>
                      </div>
                      <div className="w-8 text-sm font-semibold text-gray-700 text-right">
                        {stat.base_stat}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Abilities
                </h2>
                <div className="space-y-2">
                  {data.abilities.map((ability) => (
                    <div
                      key={ability.ability.name}
                      className="text-gray-700 font-medium capitalize"
                    >
                      {ability.ability.name}
                      {ability.is_hidden && (
                        <span className="text-gray-500 ml-2">(Hidden)</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Base Experience
                </h2>
                <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                  {data.base_experience} XP
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetailPage;
