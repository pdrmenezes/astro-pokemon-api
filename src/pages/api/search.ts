import { Pokemon } from "../../types";

export async function get({ request }) {
  const res = await fetch("http://localhost:8080/pokemon.json");
  const pokemons = (await res.json()) as Pokemon[];

  const req = request[Object.getOwnPropertySymbols(request)[1]];
  const q = req.parsedURL.searchParams.get("q")?.toLowerCase() ?? "";

  return new Response(
    JSON.stringify(
      pokemons.filter((pokemon) => pokemon.name.toLowerCase().includes(q))
    ),
    {
      status: 200,
    }
  );
}
