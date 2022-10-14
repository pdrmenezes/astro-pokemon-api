import { useEffect, useState } from "react";
import { Pokemon } from "../types";
import PokemonCard from "./PokemonCard";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  useEffect(() => {
    fetch(`/api/search?q=${encodeURIComponent(query)}`)
      .then((res) => res.json())
      .then((pokemons) => setPokemons(pokemons));
  }, [query]);

  return (
    <>
      <input
        type="text"
        name="q"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="p-3 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-xl"
        placeholder="Search"
      />
      <div className="mt-3 grid grid-cols-3 gap-5">
        {pokemons.slice(0, 10).map((pokemon) => (
          <a href={`/pokemon/${pokemon.id}`} key={pokemon.id}>
            <PokemonCard pokemon={pokemon}></PokemonCard>
          </a>
        ))}
      </div>
    </>
  );
}
