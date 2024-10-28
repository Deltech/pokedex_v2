import { useState } from "react";
import {
  RenderPokemon,
  pokedexImg,
  arrow,
  pokedexText,
  onButton,
} from "./Components/index.ts";
import "./Css/app.css";
import "./Css/animations.css";

interface PokemonDisplay {
  first: number;
  last: number;
}

function App() {
  const [pokemonDisplay, setPokemonDisplay] = useState<PokemonDisplay>({
    first: 1,
    last: 9,
  });

  function nextPage() {
    if (pokemonDisplay.last + 8 <= 649) {
      setPokemonDisplay({
        first: pokemonDisplay.first + 8,
        last: pokemonDisplay.last + 8,
      });
    } else {
      setPokemonDisplay({
        first: 641,
        last: 649,
      });
    }
  }

  function prevPage() {
    if (pokemonDisplay.first - 8 >= 1) {
      setPokemonDisplay({
        first: pokemonDisplay.first - 8,
        last: pokemonDisplay.last - 8,
      });
    } else {
      setPokemonDisplay({
        first: 1,
        last: 9,
      });
    }
  }

  return (
    <main>
      <div className="unselectable">
        <img src={onButton} className="center" alt="Button" />
        <img src={pokedexImg} className="cover rb" alt="Pokedex" />
        <img src={pokedexImg} className="cover lt" alt="Pokedex" />
      </div>
      <img
        className="arrow arrow-lt"
        onClick={prevPage}
        src={arrow}
        alt="Previous arrow"
      />
      <img
        className="arrow arrow-rb"
        onClick={nextPage}
        src={arrow}
        alt="Next arrow"
      />

      <div className="hero">
        <img src={pokedexText} className="pokedex" alt="Pokedex text" />
        <RenderPokemon pokemonDisplay={pokemonDisplay} />
      </div>
    </main>
  );
}

export default App;

// import { useState, useEffect } from "react";
// import { Display } from "./Components/index.ts";

// function App() {
//   const [pokemonDisplay, setPokemonDisplay] = useState<{
//     first: number;
//     last: number;
//   }>({
//     first: 1,
//     last: 9,
//   });

//   return (
//     <Display
//       pokemonDisplay={pokemonDisplay}
//       setPokemonDisplay={setPokemonDisplay}
//     />
//   );
// }

// export default App;
