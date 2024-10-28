import { PokemonApiResponse, PokemonData } from "./types.ts";

interface FetchDataProps {
  setPokemonData: React.Dispatch<React.SetStateAction<PokemonData[]>>;
  pokemonDisplay: {
    first: number;
    last: number;
  };
}

const fetchData = async ({
  setPokemonData,
  pokemonDisplay,
}: FetchDataProps): Promise<void> => {
  const fetchJson = async (url: string): Promise<PokemonApiResponse> => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  };

  try {
    const fetchPokemons: Promise<PokemonApiResponse[]> = Promise.all(
      Array.from(
        { length: pokemonDisplay.last - pokemonDisplay.first },
        (_, i) =>
          fetchJson(
            `https://pokeapi.co/api/v2/pokemon/${pokemonDisplay.first + i}`
          )
      )
    );

    const fetchedData = await fetchPokemons;

    const modifiedFetchedData: PokemonData[] = fetchedData.map((data) => ({
      ...data,
      isModalOpen: false,
      isOverviewOpen: false,
    }));

    setPokemonData(modifiedFetchedData);
  } catch (error) {
    console.error(
      "Error fetching Pokémon data:",
      error instanceof Error ? error.message : String(error)
    );
    throw error;
  }
};

export default fetchData;
