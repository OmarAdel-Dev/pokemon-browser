import { Link } from "react-router-dom";

interface PokemonCardProps {
  name: string;
  id: number;
  spriteUrl: string | null;
}

function PokemonCard({ name, id, spriteUrl }: PokemonCardProps) {
  return (
    <Link
      to={`/pokemon/${name}`}
      className="
        flex flex-col items-center bg-white 
         shadow-md hover:shadow-lg hover:-translate-y-1 transition
        p-6 group cursor-pointer border border-gray-100
      "
      style={{ minHeight: 180 }}
      data-testid="pokemon-card"
    >
      {spriteUrl ? (
        <img
          src={spriteUrl}
          alt={name}
          className="w-40 h-30 object-contain mb-2 transition group-hover:scale-105 bg-gray-100"
          draggable={false}
          loading="lazy"
        />
      ) : (
        <div className="w-20 h-20 mb-2 rounded bg-gray-200 animate-pulse" />
      )}

      <div
        className="
          text-gray-900 capitalize font-semibold tracking-wide text-base mb-1 text-center
          group-hover:text-blue-600 transition
        "
        style={{ letterSpacing: "0.03em" }}
      >
        {name}
      </div>

      <div className="text-xs font-mono text-gray-400 tracking-wider">
        {`#${id.toString().padStart(3, "0")}`}
      </div>
    </Link>
  );
}

export default PokemonCard;
